# 法规信息检索（Python 版）

这台电脑没有 Node.js、也不能自行安装软件时，用这一版。只需要已经装好的 Python 和 VS Code（可以用内置的 GitHub Copilot 改代码）。

## 本地打开

1. 解压压缩包。
2. VS Code：文件 → 打开文件夹，选中解压后的这个文件夹。
3. 终端 → 新建终端，运行：

```bash
python serve.py
```

Windows 如果提示找不到 `python`，改成：

```bash
py serve.py
```

4. 浏览器打开 `http://127.0.0.1:8080/`。端口被占用时：`python serve.py 8090`。
5. 停止：在终端按 Ctrl+C。

不要双击 `index.html`。页面要通过这个小服务打开，才能读到 `data/catalog.json`。

## 改哪里

| 想改的内容 | 文件 |
| --- | --- |
| 页面上的固定句子、按钮 | [index.html](index.html) |
| 颜色 | [styles.css](styles.css) 文件开头的变量 |
| 检索、筛选、导入逻辑 | [app.js](app.js) |
| 相关网址 | [data/links.json](data/links.json) 里的 name、url、note |
| 公司标志 | [assets/bi-lockup.png](assets/bi-lockup.png)、[assets/life-forward.png](assets/life-forward.png) |

改完保存，浏览器刷新即可。不需要编译。

在 Copilot 聊天里可以直接说，例如：「在 app.js 里把待审改成监控库」。

`data/catalog.json` 里每一条的字段：

- `title`：法规名称
- `summary`：卡片上的进一步信息
- `detail`：点开后的进一步信息
- `originalUrl`：监管机构原网页
- `fileUrl`：SharePoint 或附件链接
- `library`：`monitor`（待审）或 `relevant`（相关文件）
- `keywords`：关键词数组

网页里「接入数据」上传的 JSON 只存在你自己的浏览器里，同事打开看不到。全公司要用同一份数据时，把 JSON 放进 `data/catalog.json` 再发布。

## 发布到 EDP

这边登录不了你们的 EDP，所以没有代为点击发布。把整个文件夹交给 EDP，两种都能用，问管理员接受哪一种：

1. **静态网站**（优先）：网站根目录就是这个文件夹。访问首页应打开 `index.html`，并且同目录下的 `app.js`、`styles.css`、`data/catalog.json`、`assets/` 都能被浏览器加载。不需要 Python，也不要只传一个 html。
2. **Python 网站**：启动命令是 `python serve.py`。端口读环境变量 `PORT`，不需要 `pip install`，没有第三方包。

发布前先在本地跑一遍，确认检索和原文链接正常。SharePoint 链接要能被员工在公司网络里打开；这个页面不会代替 SharePoint 登录。
