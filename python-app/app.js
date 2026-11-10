const STORAGE_KEY = "fagui-search-v1";

const state = {
  catalog: { documents: [], suggestions: [] },
  links: [],
  view: "library",
  query: "",
  sort: "relevance",
  selectedId: null,
  notice: "",
  imported: [],
  hideSeed: false,
  overrides: {},
};

const $ = (id) => document.getElementById(id);

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "\u0026amp;")
    .replace(/</g, "\u0026lt;")
    .replace(/>/g, "\u0026gt;")
    .replace(/"/g, "\u0026quot;");
}

function safeUrl(value) {
  try {
    const url = new URL(value);
    if (url.protocol === "http:" || url.protocol === "https:") return url.toString();
  } catch {
    /* ignore */
  }
  return "";
}

function tokensOf(query) {
  return query.trim().split(/[\s,，、;；]+/).map((item) => item.trim()).filter(Boolean);
}

function highlight(text, tokens) {
  const source = String(text ?? "");
  if (!source) return "";
  if (tokens.length === 0) return esc(source);
  const lower = source.toLowerCase();
  const ranges = [];
  for (const token of tokens) {
    const needle = token.toLowerCase();
    let from = 0;
    while (from < lower.length) {
      const at = lower.indexOf(needle, from);
      if (at < 0) break;
      ranges.push([at, at + needle.length]);
      from = at + needle.length;
    }
  }
  if (ranges.length === 0) return esc(source);
  ranges.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const merged = [];
  for (const range of ranges) {
    const last = merged[merged.length - 1];
    if (!last || range[0] > last[1]) merged.push(range);
    else last[1] = Math.max(last[1], range[1]);
  }
  let html = "";
  let cursor = 0;
  for (const [start, end] of merged) {
    if (cursor < start) html += esc(source.slice(cursor, start));
    html += `<mark>${esc(source.slice(start, end))}</mark>`;
    cursor = end;
  }
  if (cursor < source.length) html += esc(source.slice(cursor));
  return html;
}

function libraryLabel(library) {
  return library === "relevant" ? "相关文件" : "监控库";
}

function docs() {
  const map = new Map();
  if (!state.hideSeed) for (const doc of state.catalog.documents) map.set(doc.id, doc);
  for (const doc of state.imported) map.set(doc.id, doc);
  return [...map.values()].map((doc) =>
    state.overrides[doc.id] ? { ...doc, library: state.overrides[doc.id] } : doc,
  );
}

function scoreDocument(doc, tokens) {
  if (tokens.length === 0) return 1;
  const haystack = [doc.title, doc.source, doc.summary, doc.detail, (doc.keywords || []).join(" "), doc.fileLabel]
    .join("\n")
    .toLowerCase();
  if (!tokens.every((token) => haystack.includes(token.toLowerCase()))) return 0;
  let score = 0;
  for (const token of tokens) {
    const needle = token.toLowerCase();
    if (doc.title.toLowerCase().includes(needle)) score += 50;
    if ((doc.keywords || []).some((keyword) => keyword.toLowerCase().includes(needle))) score += 30;
    if ((doc.summary || "").toLowerCase().includes(needle)) score += 16;
    if ((doc.detail || "").toLowerCase().includes(needle)) score += 8;
    if ((doc.source || "").toLowerCase().includes(needle)) score += 6;
  }
  return score;
}

function searchDocuments(list, query, sort) {
  const tokens = tokensOf(query);
  const ranked = list
    .map((doc) => ({ doc, score: scoreDocument(doc, tokens) }))
    .filter((item) => item.score > 0);
  ranked.sort((a, b) => {
    if (sort === "date" || tokens.length === 0) {
      return b.doc.publishedAt.localeCompare(a.doc.publishedAt) || b.score - a.score;
    }
    return b.score - a.score || b.doc.publishedAt.localeCompare(a.doc.publishedAt);
  });
  return ranked.map((item) => item.doc);
}

function textOf(value) {
  return typeof value === "string" ? value.trim() : "";
}

function parseCorpus(payload) {
  const root = Array.isArray(payload) ? payload : payload && payload.documents;
  if (!Array.isArray(root)) return { documents: [], errors: ["JSON 需要是数组，或包含 documents 数组。"] };
  if (root.length > 500) return { documents: [], errors: ["单次最多导入 500 条。"] };
  const documents = [];
  const errors = [];
  root.forEach((item, index) => {
    const line = index + 1;
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      errors.push(`第 ${line} 条不是对象。`);
      return;
    }
    const title = textOf(item.title || item.名称 || item.法规名称);
    const originalUrl = textOf(item.originalUrl || item.url || item.原文链接);
    const fileUrl = textOf(item.fileUrl || item.文件链接 || item.sharepointUrl);
    if (title.length < 2) {
      errors.push(`第 ${line} 条缺少法规名称。`);
      return;
    }
    if (!safeUrl(originalUrl)) {
      errors.push(`第 ${line} 条原文链接不是 http(s) 地址。`);
      return;
    }
    if (fileUrl && !safeUrl(fileUrl)) {
      errors.push(`第 ${line} 条原文件链接不是 http(s) 地址。`);
      return;
    }
    const libraryRaw = textOf(item.library || item.folder || item.库);
    let library = null;
    if (libraryRaw === "relevant" || /相关/.test(libraryRaw)) library = "relevant";
    if (libraryRaw === "monitor" || /监控|待审/.test(libraryRaw)) library = "monitor";
    if (!library) {
      errors.push(`第 ${line} 条资料库需为「监控库 / 相关文件」。`);
      return;
    }
    let keywords = item.keywords || item.关键词 || [];
    if (typeof keywords === "string") keywords = keywords.split(/[,，、;；]/).map((part) => part.trim()).filter(Boolean);
    if (!Array.isArray(keywords)) keywords = [];
    const publishedAt = textOf(item.publishedAt || item.发布日期) || new Date().toISOString().slice(0, 10);
    documents.push({
      id: textOf(item.id) || `imp-${index + 1}-${originalUrl.length}`,
      title,
      source: textOf(item.source || item.来源) || "未标明来源",
      library,
      language: /^en/i.test(textOf(item.language || item.lang)) ? "en" : "zh",
      docType: textOf(item.docType || item.type) || (/\.pdf($|\?)/i.test(fileUrl) ? "PDF" : "网页"),
      publishedAt,
      capturedAt: textOf(item.capturedAt || item.入库日期) || publishedAt,
      summary: textOf(item.summary || item.摘要 || item.进一步信息) || "未提供摘要。打开原文查看全文。",
      detail: textOf(item.detail || item.正文 || item.摘要 || item.进一步信息) || "未提供进一步信息。",
      keywords: keywords.map((keyword) => textOf(keyword)).filter(Boolean),
      originalUrl: safeUrl(originalUrl),
      fileUrl: fileUrl ? safeUrl(fileUrl) : "",
      fileLabel: textOf(item.fileLabel || item.文件名) || (fileUrl ? "原文件" : ""),
    });
  });
  return { documents, errors };
}

function persist() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ imported: state.imported, hideSeed: state.hideSeed, overrides: state.overrides }),
  );
}

function loadPersist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed.imported)) state.imported = parsed.imported;
    state.hideSeed = Boolean(parsed.hideSeed);
    if (parsed.overrides && typeof parsed.overrides === "object") state.overrides = parsed.overrides;
  } catch {
    /* keep the seeded library */
  }
}

function downloadJson(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function filteredDocs() {
  return docs();
}

function renderCards() {
  const tokens = tokensOf(state.query);
  const sort = tokens.length === 0 ? "date" : state.sort;
  const results = searchDocuments(filteredDocs(), state.query, sort);
  const label = tokens.length === 0 ? "最新更新" : `「${state.query.trim()}」`;
  const mode = state.hideSeed ? "已替换为导入数据" : "含演示库";
  $("result-meta").textContent = `${label} · ${results.length} 条 · ${mode}`;
  document.querySelectorAll("[data-sort]").forEach((button) => {
    button.classList.toggle("on", button.dataset.sort === sort);
  });
  if (results.length === 0) {
    $("cards").innerHTML = `<li class="card empty"><p class="muted small">没有命中。换一个词，或到「接入数据」导入 JSON。多个词按空格分开，需要同时出现。</p></li>`;
    return;
  }
  $("cards").innerHTML = results
    .map((doc) => {
      const file = doc.fileUrl
        ? `<a class="linkish" href="${esc(doc.fileUrl)}" target="_blank" rel="noreferrer">${esc(doc.fileLabel || "原文件")}</a>`
        : "";
      const keys = (doc.keywords || []).slice(0, 5).join(" · ");
      return `<li class="card">
        <button type="button" class="open-title" data-open="${esc(doc.id)}">
          <div class="tags">
            <span class="tag source">${esc(doc.source)}</span>
            <span class="tag">${libraryLabel(doc.library)}</span>
            <span>${esc(doc.publishedAt)}</span>
            <span>${esc(doc.docType)}</span>
          </div>
          <h2>${highlight(doc.title, tokens)}</h2>
          <p class="summary">${highlight(doc.summary, tokens)}</p>
        </button>
        ${keys ? `<p class="keys">${esc(keys)}</p>` : ""}
        <div class="actions">
          <a class="linkish" href="${esc(doc.originalUrl)}" target="_blank" rel="noreferrer">监管机构原文</a>
          ${file}
          <button type="button" class="text-btn" data-open="${esc(doc.id)}">进一步信息</button>
        </div>
      </li>`;
    })
    .join("");
}

function renderCounts() {
  const all = docs();
  $("export").textContent = `导出当前 ${all.length} 条`;
  $("import-note").textContent = state.hideSeed
    ? "演示库已隐藏，当前是导入的数据。导入内容只在这台浏览器。全公司发布请改 data/catalog.json。"
    : "当前混有演示库，便于先试用检索。导入内容只在这台浏览器。";
}

function renderSheet() {
  const doc = docs().find((item) => item.id === state.selectedId);
  const sheet = $("sheet");
  const backdrop = $("backdrop");
  if (!doc) {
    sheet.hidden = true;
    backdrop.hidden = true;
    sheet.innerHTML = "";
    return;
  }
  const tokens = tokensOf(state.query);
  const paragraphs = String(doc.detail || "")
    .split("\n")
    .filter(Boolean)
    .map((paragraph) => `<p>${highlight(paragraph, tokens)}</p>`)
    .join("");
  const file = doc.fileUrl
    ? `<a class="ghost" href="${esc(doc.fileUrl)}" target="_blank" rel="noreferrer">${esc(doc.fileLabel || "打开原文件")}</a>`
    : `<p class="small muted">这条暂无单独原文件。接入 SharePoint 后，把文件夹链接填进 fileUrl。</p>`;
  sheet.hidden = false;
  backdrop.hidden = false;
  sheet.innerHTML = `
    <header>
      <div>
        <p class="small muted">${esc(doc.source)} · ${libraryLabel(doc.library)} · ${esc(doc.publishedAt)}</p>
        <h2>${highlight(doc.title, tokens)}</h2>
      </div>
      <button type="button" class="close" id="close-sheet" aria-label="关闭">×</button>
    </header>
    <div class="body">
      <h3>进一步信息</h3>
      <div class="detail">${paragraphs}</div>
      ${(doc.keywords || []).length ? `<p class="small muted">关键词：${esc(doc.keywords.join("、"))}</p>` : ""}
      <div class="stack">
        <a class="solid" href="${esc(doc.originalUrl)}" target="_blank" rel="noreferrer">打开监管机构原文</a>
        ${file}
      </div>
      <button type="button" class="quiet" id="toggle-library">${doc.library === "relevant" ? "移回待审监控库" : "在本机标为相关文件"}</button>
      <p class="small muted">这个标记只留在当前浏览器，不会写回 SharePoint。正式相关与否，仍以「相关文件」文件夹为准。</p>
    </div>`;
  $("close-sheet").onclick = () => {
    state.selectedId = null;
    renderSheet();
  };
  $("toggle-library").onclick = () => {
    state.overrides[doc.id] = doc.library === "relevant" ? "monitor" : "relevant";
    persist();
    renderCounts();
    renderCards();
    renderSheet();
  };
}

function renderSites() {
  $("sites").innerHTML = state.links
    .map(
      (link) => `<li class="site">
        <h3>${esc(link.name)}</h3>
        <p class="small muted">${esc(link.note || "")}</p>
        <a class="linkish" href="${esc(link.url)}" target="_blank" rel="noreferrer">${esc(link.url)}</a>
      </li>`,
    )
    .join("");
}

function renderChips() {
  $("chips").innerHTML = state.catalog.suggestions
    .map(
      (item) =>
        `<button type="button" data-chip="${esc(item)}" class="${state.query === item ? "on" : ""}">${esc(item)}</button>`,
    )
    .join("");
}

function showView(view) {
  state.view = view;
  $("view-library").hidden = view !== "library";
  $("view-sites").hidden = view !== "sites";
  $("view-connect").hidden = view !== "connect";
  document.querySelectorAll("nav button").forEach((button) => {
    button.classList.toggle("on", button.dataset.view === view);
  });
  if (view === "sites") renderSites();
}

function applyImport(parsed, mode) {
  if (parsed.documents.length === 0) {
    state.notice = parsed.errors[0] || "没有可导入的条目。";
    $("notice").textContent = state.notice;
    return;
  }
  if (mode === "replace") {
    state.hideSeed = true;
    state.imported = parsed.documents;
    state.overrides = {};
  } else {
    const map = new Map(state.imported.map((doc) => [doc.id, doc]));
    for (const doc of parsed.documents) map.set(doc.id, doc);
    state.imported = [...map.values()];
  }
  persist();
  const tail = parsed.errors.length ? `另有 ${parsed.errors.length} 条未导入。` : "";
  state.notice = `已用 ${parsed.documents.length} 条替换。${tail}`;
  $("notice").textContent = state.notice;
  state.query = "";
  $("query").value = "";
  showView("library");
  renderCounts();
  renderChips();
  renderCards();
}

function bind() {
  document.querySelectorAll("nav button").forEach((button) => {
    button.onclick = () => showView(button.dataset.view);
  });
  $("query").addEventListener("input", (event) => {
    state.query = event.target.value;
    renderChips();
    renderCards();
  });
  $("chips").addEventListener("click", (event) => {
    const button = event.target.closest("[data-chip]");
    if (!button) return;
    state.query = button.dataset.chip;
    $("query").value = state.query;
    renderChips();
    renderCards();
  });
  document.querySelectorAll("[data-sort]").forEach((button) => {
    button.onclick = () => {
      state.sort = button.dataset.sort;
      renderCards();
    };
  });
  $("cards").addEventListener("click", (event) => {
    const button = event.target.closest("[data-open]");
    if (!button) return;
    state.selectedId = button.dataset.open;
    renderSheet();
  });
  $("backdrop").onclick = () => {
    state.selectedId = null;
    renderSheet();
  };
  $("file").addEventListener("change", async (event) => {
    const file = event.target.files && event.target.files[0];
    event.target.value = "";
    if (!file) return;
    try {
      applyImport(parseCorpus(JSON.parse(await file.text())), "replace");
    } catch {
      $("notice").textContent = "这个文件不是合法的 JSON。";
    }
  });
  $("template").onclick = () => {
    downloadJson("法规信息检索-导入模板.json", {
      documents: [
        {
          title: "法规名称",
          source: "上海药监-药品法规",
          library: "相关文件",
          language: "zh",
          docType: "PDF",
          publishedAt: "2026-09-01",
          summary: "卡片上展示的进一步信息。",
          detail: "点开后看到的进一步信息。",
          keywords: ["制药用水", "数据可靠性"],
          originalUrl: "https://yjj.sh.gov.cn/fg-yp/index.html",
          fileUrl: "https://contoso.sharepoint.com/sites/regulations/Shared%20Documents/example.pdf",
          fileLabel: "SharePoint 原文件",
        },
      ],
    });
  };
  $("export").onclick = () => downloadJson("法规信息检索-资料.json", { documents: docs() });
  $("reset").onclick = () => {
    state.imported = [];
    state.hideSeed = false;
    state.overrides = {};
    persist();
    $("notice").textContent = "已恢复演示库。";
    renderCounts();
    renderCards();
    renderSheet();
  };
  $("remote").addEventListener("submit", async (event) => {
    event.preventDefault();
    const raw = $("remote-url").value.trim();
    let url;
    try {
      url = new URL(raw);
    } catch {
      $("notice").textContent = "链接格式不正确。";
      return;
    }
    if (url.protocol !== "https:") {
      $("notice").textContent = "远程同步只接受 https 链接。";
      return;
    }
    $("sync").textContent = "正在同步";
    try {
      const response = await fetch(url.toString());
      if (!response.ok) throw new Error("读取失败。");
      applyImport(parseCorpus(await response.json()), "replace");
    } catch (error) {
      $("notice").textContent = error instanceof Error ? error.message : "同步失败。对方地址需要允许浏览器读取。";
    } finally {
      $("sync").textContent = "同步";
    }
  });
}

async function main() {
  loadPersist();
  const response = await fetch("data/catalog.json");
  if (!response.ok) throw new Error("catalog");
  state.catalog = await response.json();
  const linksResponse = await fetch("data/links.json");
  if (linksResponse.ok) state.links = await linksResponse.json();
  bind();
  renderChips();
  renderSites();
  renderCounts();
  renderCards();
  showView("library");
}

main().catch(() => {
  $("cards").innerHTML = `<li class="card"><p>资料没有加载出来。请在本文件夹打开终端，运行 python serve.py，再用浏览器访问终端里的地址。不要直接双击 index.html。</p></li>`;
});
