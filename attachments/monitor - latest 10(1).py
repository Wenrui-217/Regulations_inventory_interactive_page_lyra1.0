from datetime import datetime
from pathlib import Path
import hashlib
import json
import os
import random
import re
import time
from bs4 import BeautifulSoup
import requests
from urllib.parse import urljoin
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

SAVE_PATH = "./regulatory_docs"
ATTACH_DIR = os.path.join(SAVE_PATH, "attachments") 
HISTORY_FILE = "history_urls.txt"

if not os.path.exists(SAVE_PATH):
  os.makedirs(SAVE_PATH)
if not os.path.exists(ATTACH_DIR):
  os.makedirs(ATTACH_DIR)

BASE_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,"
        " like Gecko) Chrome/122.0.0.0 Safari/537.36"
    ),
    "Accept": (
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8"
    ),
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    "Connection": "keep-alive",
}


def load_history():
  if not os.path.exists(HISTORY_FILE):
    return set()
  with open(HISTORY_FILE, "r", encoding="utf-8") as f:
    return set(line.strip() for line in f if line.strip())


def save_history(url):
  with open(HISTORY_FILE, "a", encoding="utf-8") as f:
    f.write(url + "\n")


def is_english_content(text):
  if not text:
    return True
  chinese_count = sum(1 for char in text if "\u4e00" <= char <= "\u9fa5")
  return (chinese_count / len(text)) < 0.08


def scrape_detail_page(session, url, site_name, title):
  try:
    time.sleep(1.5)
    headers = BASE_HEADERS.copy()
    if "yjj.sh.gov.cn" in url:
            headers["Referer"] = "https://yjj.sh.gov.cn/"

    detail_timeout = 25 if "picscheme.org" in url else 15

    print(f"   🔍 [正在请求] {url}")
    res = session.get(url, headers=headers, timeout=detail_timeout, verify=False)
    print(f"   📥 [请求成功] 状态码: {res.status_code}, 长度: {len(res.text)}")

    res.encoding = (
        res.apparent_encoding if res.encoding == "ISO-8859-1" else res.encoding
    )
    soup = BeautifulSoup(res.text, "html.parser")

    content_div = (
        soup.select_one("div.article_content")
        or soup.select_one("div.content")
        or soup.select_one("#Articles")
        or soup.select_one("div.text")
        or soup.select_one(".wy_main_wz_txt")
        or soup.select_one(".article-content")
        or soup.select_one(".text_list")
        or soup.select_one("#con")
    )

    if content_div:
      body_text = content_div.get_text()
    else:
      paragraphs = soup.find_all("p")
      body_text = "\n".join(
          [p.get_text().strip() for p in paragraphs if p.get_text().strip()]
      )

    if not body_text.strip():
      body_text = soup.get_text()

    is_eng = is_english_content(title) or is_english_content(body_text[:300])
    clean_title = "".join(
        [c for c in title if c not in r"\/:?*?\"<>|"]
    ).strip()

    url_hash = hashlib.md5(url.encode("utf-8")).hexdigest()[:6]
    filename = f"{datetime.now().strftime('%Y-%m-%d')}_{site_name}_{url_hash}_{clean_title[:35]}.txt"
    filepath = os.path.join(SAVE_PATH, filename)

    try:
      with open(filepath, "w", encoding="utf-8") as f:
        if is_eng:
          f.write(f"请分析以下英文法规网址：{url}")
        else:
          f.write(
              f"来源网站: {site_name}\n原文链接:"
              f" {url}\n\n{body_text.strip()}"
          )

      if os.path.exists(filepath) and os.path.getsize(filepath) > 0:
        print(f"   💾 [落盘成功并校验通过] -> {filename}")
      else:
        print(f"   ❌ [落盘异常] 文件未成功生成或大小为0: {filepath}")
        return False
    except Exception as write_err:
      print(f"   ❌ [落盘暴雷] 写入文件失败! 路径: {filepath}, 原因: {write_err}")
      return False

    return True

  except Exception as e:
    print(f"   ❌ 详情页抓取异常: {e}")
    return False


def monitor_site(session, history, site_name, list_url, selectors):
  print(f"\n⚡ 正在检索站点: 【{site_name}】...")
  try:
    req_timeout = 25 if "PIC-S" in site_name or "PICS" in site_name else 12
    res = session.get(
        list_url, headers=BASE_HEADERS, timeout=req_timeout, verify=False
    )
    res.encoding = res.apparent_encoding

    is_rss = "rss" in list_url.lower() or res.text.strip().startswith("<?xml")

    new_count = 0
    if is_rss:
      items = re.findall(
          r"<item>(.*?)</item>", res.text, re.DOTALL | re.IGNORECASE
      )
      # 只取最新10条
      items = items[:10]
      print(f"[RSS源] 仅检查最新 {len(items)} 个候选条目...")
      for item_content in items:
        title_m = re.search(
            r"<title[^>]*>(.*?)</title>", item_content, re.DOTALL | re.IGNORECASE
        )
        link_m = re.search(
            r"<link[^>]*>(.*?)</link>", item_content, re.DOTALL | re.IGNORECASE
        )
        if not title_m or not link_m:
          continue

        title = title_m.group(1).strip()
        title = re.sub(r"<!\[CDATA\[(.*?)\]\]>", r"\1", title, flags=re.DOTALL)
        full_url = link_m.group(1).strip()
        print("标题：", title)
        print("URL:",full_url)
        full_url = re.sub(
            r"<!\[CDATA\[(.*?)\]\]>", r"\1", full_url, flags=re.DOTALL
        )

        if "PICS" in site_name or "PIC-S" in site_name:
          pics_keywords = [
              "Documents for Industry",
              "Documents for Inspectors",
              "Adoption and EN",
              "Joint targeted",
              "Publication of",
              "Revision of PIC",
              "Concept",
              "Focused stakeho",
              "ICH",
              "Revised Annex1",
              "Revised Annex 1",
          ]
          match_text = title.lower()
          if not any(kw.lower() in match_text for kw in pics_keywords):
            continue

        if full_url not in history:
          print(f"   ✨ [发现目标更新] {title[:25]}...")
          if scrape_detail_page(session, full_url, site_name, title):
            save_history(full_url)
            history.add(full_url)
            new_count += 1

    else:
      soup = BeautifulSoup(res.text, "html.parser")
      links = []
      for selector in selectors:
        found_links = soup.select(selector)
        if found_links:
          links = found_links
          break

      print(f"   找到 {len(links)} 个候选链接，开始比对排重...")

      for link in links[:10]:
        href = link.get("href")
        if not href or "javascript" in href or "#" in href:
          continue

        full_url = urljoin(list_url, href)
        title = link.get_text().strip()
        if len(title) < 5 or "下一页" in title or "尾页" in title:
          continue

        if full_url not in history:
          print(f"   ✨ [发现更新] {title[:25]}...")
          if scrape_detail_page(session, full_url, site_name, title):
            save_history(full_url)
            history.add(full_url)
            new_count += 1

    print(f"   【{site_name}】扫描结束，本轮成功落盘 {new_count} 个核心法规。")

  except Exception as e:
    print(f"   ❌ 列表页读取失败: {e}")


def run_module_one():
  history = load_history()
  session = requests.Session()

  print("=" * 15 + " 【模块一】多站点中英分流监控系统启动 " + "=" * 15)
  print(f"当前排重库已载入: {len(history)} 条记录")

  site_tasks = [
      {
          "name": "PICS",
          "url": "https://picscheme.org/rss/general_en.rss",
          "selectors": [],
      },
      {
          "name": "上海药监-药品法规",
          "url": "https://yjj.sh.gov.cn/fg-yp/index.html",
          "selectors": [".pageList li a", "div.page-list ul li a", ".list-txt a"],
      },
      {
          "name": "上海药监-综合法规",
          "url": "https://yjj.sh.gov.cn/fg-zh/index.html",
          "selectors": [".pageList li a", "div.page-list ul li a", ".list-txt a"],
      },
      {
          "name": "上海药监-行政法规",
          "url": "https://yjj.sh.gov.cn/xzfg/index.html",
          "selectors": [".pageList li a", "div.page-list ul li a", ".list-txt a"],
      },
      {
          "name": "上海药监-部门规章",
          "url": "https://yjj.sh.gov.cn/bmgz/index.html",
          "selectors": [".pageList li a", "div.page-list ul li a", ".list-txt a"],
      }
  ]

  for task in site_tasks:
    monitor_site(
        session, history, task["name"], task["url"], task["selectors"]
    )

  print("=" * 16 + " 【模块一】巡检全部结束 " + "=" * 16)


def safe_file_name(name, max_len=80):
  name = re.sub(r'[\\/:*?"<>|]', "_", name)
  name = re.sub(r"\s+", " ", name).strip()
  return name[:max_len].strip()

# ==================================================================
# 新增：PICS Publications 页面监控 + PDF 下载
# ==================================================================
PICS_PUBLICATIONS_URL = "https://picscheme.org/en/publications?tri=date#zone"
PICS_BASE_URL = "https://picscheme.org"


def download_pics_pdf(session, docview_url, ref_no, title):
  """
  docview/xxx 这个链接本身直接返回 PDF 二进制内容（浏览器用自带PDF插件渲染），
  不是一个包含下载按钮的 HTML 页面，所以直接请求该 URL 并保存响应内容即可，
  无需再解析 HTML 寻找"下载链接"。
  """
  try:
    print(f"   🔍 [正在请求 PDF] {docview_url}")
    res = session.get(docview_url, headers=BASE_HEADERS, timeout=30, verify=False)

    content_type = res.headers.get("Content-Type", "").lower()
    is_pdf = "application/pdf" in content_type or res.content[:4] == b"%PDF"
    print(
        f"   📥 [请求成功] 状态码: {res.status_code}, "
        f"Content-Type: {content_type or '未知'}, 大小: {len(res.content)} bytes"
    )

    if res.status_code == 200 and is_pdf:
      base = safe_file_name(f"{ref_no}_{title}"[:60]) or "pics_document"
      filepath = os.path.join(ATTACH_DIR, base + ".pdf")
      with open(filepath, "wb") as f:
        f.write(res.content)

      if os.path.exists(filepath) and os.path.getsize(filepath) > 0:
        print(f"   💾 [落盘成功并校验通过] -> {os.path.basename(filepath)}")
        print(f"   📥 [PICS PDF 下载成功] -> {os.path.basename(filepath)}")
        return True
      else:
        print(f"   ❌ [落盘异常] 文件未成功生成或大小为0: {filepath}")
        return False
    else:
      print(
          f"   ❌ [PICS PDF 下载失败] 状态码: {res.status_code}, "
          f"Content-Type: {content_type}, url: {docview_url}"
      )
      return False
  except Exception as e:
    print(f"   ❌ [PICS PDF 下载异常] {e}")
    return False


def monitor_pics_publications(session, history):
  print("\n" + "=" * 15 + " 【子任务 B】PICS Publications 监控启动 " + "=" * 15)
  print(f"⚡ 正在检索页面: 【PICS-Publications】...")
  try:
    res = session.get(
        PICS_PUBLICATIONS_URL, headers=BASE_HEADERS, timeout=25, verify=False
    )
    print(f"   📥 [列表页请求成功] 状态码: {res.status_code}, 长度: {len(res.text)}")
    res.encoding = res.apparent_encoding
    soup = BeautifulSoup(res.text, "html.parser")

    # 页面上每个文件对应的链接结构已通过"检查元素"确认为：
    # <a href="/docview/11277" title="2026-10-01" target="_blank">标题</a>
    # 直接按 href 前缀匹配即可，无需关心外层是 table/div/li，这样最稳健。
    doc_links = soup.select('a[href^="/docview/"]')

    if not doc_links:
      print("   ⚠️ [警告] 未找到任何 /docview/ 链接，页面结构可能已变化，请检查选择器。")
    else:
      print(f"   ✅ 找到 {len(doc_links)} 个文件链接，页面已按发布日期排序，开始比对排重...")

    new_count = 0
    skip_count = 0
    fail_count = 0
    # 页面已按 tri=date 排序，最新的排最前，只需检查前面若干条即可覆盖本轮更新
    for link_tag in doc_links[:15]:
      href = link_tag.get("href", "").strip()
      if not href:
        continue

      full_url = urljoin(PICS_BASE_URL, href)
      title = link_tag.get_text().strip()
      # title 属性里带有发布/更新日期，例如 "2026-10-01"，可用于记录和排序判断
      publish_date = (link_tag.get("title") or "").strip()

      if len(title) < 3:
        continue

      if full_url in history:
        print(f"   ⏩ [已存在记录，跳过] [{publish_date}] {title[:35]}")
        skip_count += 1
        continue

      print(f"   ✨ [发现新文件/更新] [{publish_date}] {title[:35]}...")
      try:
        # docview 链接直接返回 PDF 二进制流，直接下载即可，无需先访问再解析 HTML
        success = download_pics_pdf(session, full_url, publish_date or "PICS-DOC", title)

        if not success:
          # 极少数情况下该 docview 链接可能不是 PDF（如已下线/权限限制），
          # 兜底尝试按网页方式保存文本，避免完全丢失信息
          print("   ⚠️ [非PDF响应，回退按网页正文尝试保存]")
          success = scrape_detail_page(session, full_url, "PICS-Publications", title)

        if success:
          save_history(full_url)
          history.add(full_url)
          new_count += 1
          print(f"   ✅ [处理完成] -> {title[:35]}")
        else:
          fail_count += 1
          print(f"   ❌ [处理失败，本次未落盘] -> {title[:35]}")

      except Exception as e:
        fail_count += 1
        print(f"   ❌ 详情页处理异常: {e}")

    print(
        f"   【PICS-Publications】扫描结束，"
        f"本轮新增落盘 {new_count} 个文件，跳过已有 {skip_count} 条，失败 {fail_count} 条。"
    )
    print("=" * 16 + " 【子任务 B】PICS Publications 监控结束 " + "=" * 16)

  except Exception as e:
    print(f"   ❌ PICS Publications 列表页读取失败: {e}")


def run_module_two():
  print(
      "\n"
      + "=" * 15
      + " 【模块二】Requests 深度抓取系统启动（已脱离 Playwright） "
      + "=" * 15
  )
  history = load_history()
  session = requests.Session()

  # -------------------------------------------------------------
  # 子任务 A: 抓取 CFDI 页面
  # -------------------------------------------------------------
  print("\n--- [子任务 A] 开始执行 CFDI 深度抓取 ---")
  cfdi_list_url = "https://www.cfdi.org.cn/cfdi/index?module=A001&nty=D06"
  try:
    res = session.get(
        cfdi_list_url, headers=BASE_HEADERS, timeout=30, verify=False
    )
    res.encoding = res.apparent_encoding
    soup_list = BeautifulSoup(res.text, "html.parser")

    cfdi_items = []
    for link in soup_list.find_all("a", href=True):
      title = link.get_text().strip()
      href = link["href"]
      if (
          title
          and href
          and ("公开征求" in title or "通告" in title or "公告" in title)
          and len(title) > 10
      ):
        full_url = (
            "https://www.cfdi.org.cn/" + href
            if not href.startswith("http")
            else href
        )
        if {"title": title, "url": full_url} not in cfdi_items:
          cfdi_items.append({"title": title, "url": full_url})

    print(f"CFDI 找到 {len(cfdi_items)} 条记录")
    for item in cfdi_items:
      if item["url"] in history:
        print(f"   ⏩ [已存在记录，跳过] {item['title']}")
        continue

      print(f"正在爬取 CFDI: {item['title']}")
      if scrape_detail_page(session, item["url"], "CFDI", item["title"]):
        # 抓取并下载附件
        try:
          detail_res = session.get(
              item["url"], headers=BASE_HEADERS, timeout=30, verify=False
          )
          detail_soup = BeautifulSoup(detail_res.text, "html.parser")
          attach_links = detail_soup.select(
              'a[href$=".pdf"], a[href$=".doc"], a[href$=".docx"],'
              ' a[href$=".xls"], a[href$=".xlsx"]'
          )
          for a in attach_links:
            href = a.get("href")
            text = a.get_text().strip()
            try:
                text = text.encode("latin1").decode("utf-8")
            except Exception:
                pass
            if href:
              full_attach_url = (
                  "https://www.cfdi.org.cn/c" + href
                  if not href.startswith("http")
                  else href
              )
              ext = os.path.splitext(href.split("?")[0])[1] or ".pdf"
              base = safe_file_name(text[:30]) or "cfdi_attachment"
              attach_path = os.path.join(ATTACH_DIR, base + ext)
              att_res = session.get(
                  full_attach_url, headers=BASE_HEADERS, timeout=30, verify=False
              )
              if att_res.status_code == 200:
                with open(attach_path, "wb") as f:
                  f.write(att_res.content)
                print(
                    "   📥 [CFDI 附件下载成功] ->"
                    f" {os.path.basename(attach_path)}"
                )
        except Exception as e:
          print(f"   ❌ CFDI 附件下载异常: {e}")

        save_history(item["url"])
        history.add(item["url"])
        print(f"   ✅ [CFDI 处理完成] -> {item['title']}")

  except Exception as e:
    print(f"   ❌ CFDI 列表页抓取异常: {e}")

  # -------------------------------------------------------------
  # 子任务 B: PICS Publications 监控 + PDF 下载
  # -------------------------------------------------------------
  monitor_pics_publications(session, history)

  print("=" * 16 + " 【模块二】所有任务执行完毕 " + "=" * 16)


if __name__ == "__main__":
  try:
    print("==================================================================")
    print(" 🎯 两大核心自动化监控流启动：按顺序依次执行...")
    print("==================================================================")

    run_module_one()

    print("\n" + "-" * 60)
    print(" ✅ 模块一运行完毕，正在无缝衔接启动模块二（Requests 深度爬虫）...")
    print("-" * 60 + "\n")

    run_module_two()

    print("\n==================================================================")
    print(" 🎉 全部流程圆满结束：两个脚本已成功按序串联运行完毕！")
    print("==================================================================")

  except KeyboardInterrupt:
    print("\n[系统] 任务已被用户手动终止。")
  except Exception as e:
    print(f"\n[异常报错] 运行出错: {e}")
