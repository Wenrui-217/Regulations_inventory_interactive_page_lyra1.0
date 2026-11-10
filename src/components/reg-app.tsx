import { useEffect, useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ExternalLink, Search, X } from "lucide-react";
import lockup from "@/assets/bi-lockup.png";
import slogan from "@/assets/life-forward.png";
import { MONITOR_SITES, SEED, SUGGESTIONS, libraryLabel, type Library, type Regulation } from "@/data/corpus";
import { parseCorpus } from "@/lib/corpus";
import { fetchRemoteCorpus } from "@/lib/fetch-corpus";
import { queryTokens, searchDocuments, splitHighlight } from "@/lib/search";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "fagui-liaowang-v1";

type View = "library" | "sites" | "connect";

type Persist = {
  imported: Regulation[];
  hideSeed: boolean;
  overrides: Record<string, Library>;
};

function useCorpus() {
  const [imported, setImported] = useState<Regulation[]>([]);
  const [hideSeed, setHideSeed] = useState(false);
  const [overrides, setOverrides] = useState<Record<string, Library>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Persist>;
        if (Array.isArray(parsed.imported)) setImported(parsed.imported);
        setHideSeed(Boolean(parsed.hideSeed));
        if (parsed.overrides && typeof parsed.overrides === "object") setOverrides(parsed.overrides);
      }
    } catch {
      /* keep the seeded library */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const payload: Persist = { imported, hideSeed, overrides };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [imported, hideSeed, overrides, ready]);

  const docs = useMemo(() => {
    const map = new Map<string, Regulation>();
    if (!hideSeed) for (const doc of SEED) map.set(doc.id, doc);
    for (const doc of imported) map.set(doc.id, doc);
    return [...map.values()].map((doc) =>
      overrides[doc.id] ? { ...doc, library: overrides[doc.id] } : doc,
    );
  }, [imported, hideSeed, overrides]);

  return { docs, hideSeed, setImported, setHideSeed, setOverrides, ready };
}

function Highlight({ text, tokens }: { text: string; tokens: string[] }) {
  return splitHighlight(text, tokens).map((part, index) =>
    part.hit ? <mark key={index}>{part.text}</mark> : <span key={index}>{part.text}</span>,
  );
}

function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

const TEMPLATE = {
  documents: [
    {
      title: "法规名称",
      source: "上海药监-药品法规",
      library: "相关文件",
      language: "zh",
      docType: "PDF",
      publishedAt: "2026-09-01",
      capturedAt: "2026-11-10",
      summary: "卡片上展示的进一步信息，两三句话说明这条法规管什么。",
      detail: "点开后看到的进一步信息。可以放正文摘录，或 SharePoint 里文本文件的内容。",
      keywords: ["制药用水", "数据可靠性"],
      originalUrl: "https://yjj.sh.gov.cn/fg-yp/index.html",
      fileUrl: "https://contoso.sharepoint.com/sites/regulations/Shared%20Documents/example.pdf",
      fileLabel: "SharePoint 原文件",
    },
  ],
};

export function RegApp() {
  const corpus = useCorpus();
  const [view, setView] = useState<View>("library");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"relevance" | "date">("relevance");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [remoteUrl, setRemoteUrl] = useState("");
  const [busy, setBusy] = useState(false);

  const tokens = queryTokens(query);

  const results = useMemo(() => searchDocuments(corpus.docs, query, sort), [corpus.docs, query, sort]);
  const selected = corpus.docs.find((doc) => doc.id === selectedId) ?? null;

  useEffect(() => {
    if (selectedId && !selected) setSelectedId(null);
  }, [selectedId, selected]);

  function applyImport(documents: Regulation[], errors: string[], mode: "merge" | "replace") {
    if (documents.length === 0) {
      setNotice(errors[0] ?? "没有可导入的条目。");
      return;
    }
    if (mode === "replace") {
      corpus.setHideSeed(true);
      corpus.setImported(documents);
      corpus.setOverrides({});
    } else {
      corpus.setImported((current) => {
        const map = new Map(current.map((doc) => [doc.id, doc]));
        for (const doc of documents) map.set(doc.id, doc);
        return [...map.values()];
      });
    }
    const tail = errors.length ? `另有 ${errors.length} 条未导入。` : "";
    setNotice(
      mode === "replace"
        ? `已用 ${documents.length} 条替换演示库。${tail}`
        : `已并入 ${documents.length} 条。${tail}`,
    );
    setView("library");
    setQuery("");
  }

  async function onFile(file: File | undefined) {
    if (!file) return;
    try {
      const parsed = parseCorpus(JSON.parse(await file.text()));
      applyImport(parsed.documents, parsed.errors, "replace");
    } catch {
      setNotice("这个文件不是合法的 JSON。");
    }
  }

  async function onRemote() {
    setBusy(true);
    setNotice("");
    try {
      const parsed = await fetchRemoteCorpus({ data: { url: remoteUrl } });
      applyImport(parsed.documents, parsed.errors, "replace");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "同步失败。");
    } finally {
      setBusy(false);
    }
  }

  function toggleLibrary(doc: Regulation) {
    const next: Library = doc.library === "relevant" ? "monitor" : "relevant";
    corpus.setOverrides((current) => ({ ...current, [doc.id]: next }));
  }

  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <img src={lockup} alt="Boehringer Ingelheim" className="h-10 w-auto" />
            <img src={slogan} alt="Life forward" className="h-6 w-auto" />
          </div>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-3xl font-medium tracking-tight text-fg">法规信息检索</h1>
            </div>
            <nav className="flex gap-2" aria-label="栏目">
              <TabButton active={view === "library"} onClick={() => setView("library")}>
                检索
              </TabButton>
              <TabButton active={view === "sites"} onClick={() => setView("sites")}>
                监测站点
              </TabButton>
              <TabButton active={view === "connect"} onClick={() => setView("connect")}>
                接入数据
              </TabButton>
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <section className="min-w-0">
          {view === "library" && (
            <LibraryView
              query={query}
              setQuery={setQuery}
              tokens={tokens}
              sort={tokens.length === 0 ? "date" : sort}
              setSort={setSort}
              results={results}
              hideSeed={corpus.hideSeed}
              onOpen={setSelectedId}
            />
          )}
          {view === "sites" && <SitesView />}
          {view === "connect" && (
            <ConnectView
              notice={notice}
              remoteUrl={remoteUrl}
              setRemoteUrl={setRemoteUrl}
              busy={busy}
              hideSeed={corpus.hideSeed}
              count={corpus.docs.length}
              onFile={(file) => void onFile(file)}
              onRemote={() => void onRemote()}
              onExport={() =>
                downloadJson("法规信息检索-资料.json", {
                  documents: corpus.docs,
                })
              }
              onTemplate={() => downloadJson("法规信息检索-导入模板.json", TEMPLATE)}
              onReset={() => {
                corpus.setImported([]);
                corpus.setHideSeed(false);
                corpus.setOverrides({});
                setNotice("已恢复演示库。");
              }}
            />
          )}
        </section>
      </main>

      <Dialog.Root open={Boolean(selected)} onOpenChange={(open) => !open && setSelectedId(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-bg-deep/70" />
          <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col border-l border-line bg-surface outline-none">
            {selected && (
              <Detail
                doc={selected}
                tokens={tokens}
                onToggle={() => toggleLibrary(selected)}
              />
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-sm px-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        active ? "bg-accent text-ink" : "bg-surface text-fg",
      )}
    >
      {children}
    </button>
  );
}

function LibraryView({
  query,
  setQuery,
  tokens,
  sort,
  setSort,
  results,
  hideSeed,
  onOpen,
}: {
  query: string;
  setQuery: (value: string) => void;
  tokens: string[];
  sort: "relevance" | "date";
  setSort: (value: "relevance" | "date") => void;
  results: Regulation[];
  hideSeed: boolean;
  onOpen: (id: string) => void;
}) {
  return (
    <div>
      <label className="relative block">
        <span className="sr-only">关键词</span>
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="检索法规名称或关键词，例如制药用水"
          className="h-12 w-full rounded-md border border-line bg-surface pr-4 pl-10 text-base text-fg placeholder:text-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
      </label>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {SUGGESTIONS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setQuery(item)}
            className={cn(
              "min-h-11 shrink-0 rounded-sm border px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              query === item ? "border-accent bg-accent text-ink" : "border-line text-muted",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted" aria-live="polite">
          {tokens.length === 0 ? "最新更新" : `「${query.trim()}」`} · {results.length} 条
          {hideSeed ? " · 已替换为导入数据" : " · 含演示库"}
        </p>
        <div className="flex rounded-md bg-bg-deep p-1">
          <button
            type="button"
            onClick={() => setSort("relevance")}
            className={cn(
              "min-h-11 rounded-sm px-3 text-sm",
              sort === "relevance" ? "bg-surface-2 text-fg" : "text-muted",
            )}
          >
            相关度
          </button>
          <button
            type="button"
            onClick={() => setSort("date")}
            className={cn(
              "min-h-11 rounded-sm px-3 text-sm",
              sort === "date" ? "bg-surface-2 text-fg" : "text-muted",
            )}
          >
            发布日期
          </button>
        </div>
      </div>

      {results.length === 0 ? (
        <p className="mt-8 rounded-xl border border-line bg-surface px-4 py-8 text-sm text-muted">
          没有命中。换一个词，或到「接入数据」导入 SharePoint 导出的 JSON。多个词按空格分开，需要同时出现。
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {results.map((doc) => (
            <li key={doc.id}>
              <article className="rounded-xl border border-line bg-surface p-4 transition-colors duration-150 hover:border-accent">
                <button type="button" onClick={() => onOpen(doc.id)} className="block w-full text-left">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                    <span className="rounded-sm bg-bg-deep px-2 py-1 text-accent">{doc.source}</span>
                    <span className="rounded-sm bg-bg-deep px-2 py-1">{libraryLabel(doc.library)}</span>
                    <span className="tabular-nums">{doc.publishedAt}</span>
                    <span>{doc.docType}</span>
                  </div>
                  <h2 className="mt-3 text-xl leading-snug font-medium text-fg">
                    <Highlight text={doc.title} tokens={tokens} />
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    <Highlight text={doc.summary} tokens={tokens} />
                  </p>
                </button>
                {doc.keywords.length > 0 && (
                  <p className="mt-3 flex flex-wrap gap-2 text-xs text-subtle">
                    {doc.keywords.slice(0, 5).join(" · ")}
                  </p>
                )}
                <div className="mt-3 flex flex-wrap gap-2">
                  <TextLink href={doc.originalUrl}>监管机构原文</TextLink>
                  {doc.fileUrl ? <TextLink href={doc.fileUrl}>{doc.fileLabel || "原文件"}</TextLink> : null}
                  <button
                    type="button"
                    onClick={() => onOpen(doc.id)}
                    className="min-h-11 px-1 text-sm text-fg underline decoration-line underline-offset-4"
                  >
                    进一步信息
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function TextLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-h-11 items-center gap-1 text-sm text-accent underline decoration-line underline-offset-4"
    >
      {children}
      <ExternalLink className="size-3.5" aria-hidden="true" />
    </a>
  );
}

function Detail({ doc, tokens, onToggle }: { doc: Regulation; tokens: string[]; onToggle: () => void }) {
  return (
    <>
      <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
        <div className="min-w-0">
          <p className="text-xs text-muted">
            {doc.source} · {libraryLabel(doc.library)} · <span className="tabular-nums">{doc.publishedAt}</span>
          </p>
          <Dialog.Title className="mt-2 text-2xl leading-snug font-medium text-fg">
            <Highlight text={doc.title} tokens={tokens} />
          </Dialog.Title>
        </div>
        <Dialog.Close className="inline-flex size-11 shrink-0 items-center justify-center rounded-sm text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
          <X className="size-5" />
          <span className="sr-only">关闭</span>
        </Dialog.Close>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
        <h3 className="text-sm font-medium text-accent">进一步信息</h3>
        <div className="mt-3 space-y-3 text-sm leading-7 text-fg">
          {doc.detail.split("\n").filter(Boolean).map((paragraph, index) => (
            <p key={index}>
              <Highlight text={paragraph} tokens={tokens} />
            </p>
          ))}
        </div>
        {doc.keywords.length > 0 && (
          <p className="mt-5 text-sm text-muted">关键词：{doc.keywords.join("、")}</p>
        )}
        <div className="mt-6 flex flex-col gap-2">
          <a
            href={doc.originalUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-accent px-4 text-sm font-medium text-ink"
          >
            打开监管机构原文
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
          {doc.fileUrl ? (
            <a
              href={doc.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-line px-4 text-sm font-medium text-fg"
            >
              {doc.fileLabel || "打开原文件"}
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          ) : (
            <p className="text-sm text-muted">这条暂无单独原文件。接入 SharePoint 后，把文件夹链接填进 fileUrl。</p>
          )}
        </div>
        <button
          type="button"
          onClick={onToggle}
          className="mt-4 min-h-11 text-sm text-muted underline decoration-line underline-offset-4"
        >
          {doc.library === "relevant" ? "移回待审监控库" : "在本机标为相关文件"}
        </button>
        <p className="mt-2 text-xs leading-5 text-subtle">
          这个标记只留在当前浏览器，不会写回 SharePoint。正式相关与否，仍以「相关文件」文件夹为准。
        </p>
      </div>
    </>
  );
}

function SitesView() {
  return (
    <div>
      <h2 className="text-2xl font-medium">监测站点</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
        与现有爬虫一致：列表只核对最新若干条，命中后抓正文；英文页只保留网址，中文页保留正文。PICS Publications 的 docview 链接直接存成 PDF。文件再由 Power Automate 同步到 SharePoint，人工确认相关后转入「相关文件」。
      </p>
      <ul className="mt-5 space-y-3">
        {MONITOR_SITES.map((site) => (
          <li key={site.name} className="rounded-xl border border-line bg-surface p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-medium text-fg">{site.name}</h3>
              <a
                href={site.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-1 text-sm text-accent"
              >
                打开列表
                <ExternalLink className="size-3.5" aria-hidden="true" />
              </a>
            </div>
            <p className="mt-1 text-sm leading-6 text-muted">{site.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ConnectView({
  notice,
  remoteUrl,
  setRemoteUrl,
  busy,
  hideSeed,
  count,
  onFile,
  onRemote,
  onExport,
  onTemplate,
  onReset,
}: {
  notice: string;
  remoteUrl: string;
  setRemoteUrl: (value: string) => void;
  busy: boolean;
  hideSeed: boolean;
  count: number;
  onFile: (file: File | undefined) => void;
  onRemote: () => void;
  onExport: () => void;
  onTemplate: () => void;
  onReset: () => void;
}) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-medium">接入 SharePoint 资料</h2>
      <p className="mt-2 text-sm leading-6 text-muted">
        平台不直接登录 SharePoint。沿用现有审批流：爬虫落盘，Power Automate 同步到监控文件夹，相关条目再移到「相关文件」。把这两个文件夹导出成 JSON，上传到这里即可检索。
      </p>
      <ol className="mt-4 space-y-2 text-sm leading-6 text-muted">
        <li>1. 在 Power Automate 里读取两个文档库的文件名、链接和正文摘录。</li>
        <li>2. 监控文件夹的 library 写成「监控库」，相关文件夹写成「相关文件」。</li>
        <li>3. originalUrl 放监管机构原网页，fileUrl 放 SharePoint 文件链接。</li>
        <li>4. 生成 JSON 后上传，或把 JSON 放到一个无需登录的 https 地址再同步。</li>
      </ol>

      <div className="mt-5 flex flex-wrap gap-2">
        <label className="inline-flex min-h-11 cursor-pointer items-center rounded-sm bg-accent px-4 text-sm font-medium text-ink">
          上传 JSON 并替换
          <input
            type="file"
            accept="application/json,.json"
            className="sr-only"
            onChange={(event) => onFile(event.target.files?.[0])}
          />
        </label>
        <button
          type="button"
          onClick={onTemplate}
          className="min-h-11 rounded-sm border border-line px-4 text-sm text-fg"
        >
          下载模板
        </button>
        <button
          type="button"
          onClick={onExport}
          className="min-h-11 rounded-sm border border-line px-4 text-sm text-fg"
        >
          导出当前 {count} 条
        </button>
        <button type="button" onClick={onReset} className="min-h-11 px-3 text-sm text-muted">
          恢复演示库
        </button>
      </div>

      <form
        className="mt-5"
        onSubmit={(event) => {
          event.preventDefault();
          onRemote();
        }}
      >
        <label className="text-sm text-muted" htmlFor="remote-url">
          或从 https 链接同步 JSON
        </label>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <input
            id="remote-url"
            value={remoteUrl}
            onChange={(event) => setRemoteUrl(event.target.value)}
            placeholder="https://.../regulations.json"
            className="h-12 min-w-0 flex-1 rounded-md border border-line bg-surface px-3 text-sm text-fg placeholder:text-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
          <button
            type="submit"
            disabled={busy || remoteUrl.trim().length < 8}
            className="min-h-12 rounded-sm bg-surface-2 px-4 text-sm font-medium text-fg disabled:opacity-50"
          >
            {busy ? "正在同步" : "同步"}
          </button>
        </div>
      </form>

      {notice ? <p className="mt-4 text-sm text-accent">{notice}</p> : null}
      <p className="mt-4 text-xs leading-5 text-subtle">
        {hideSeed ? "演示库已隐藏，当前是导入的数据。" : "当前混有演示库，便于先试用检索。"}
        导入内容保存在这台浏览器。SharePoint 需要登录的链接无法被远程同步直接读取，请上传文件，或由流程把 JSON 放到可公开读取的地址。
      </p>

      <div className="mt-8 overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <thead className="bg-bg-deep text-muted">
            <tr>
              <th className="px-3 py-3 font-medium">字段</th>
              <th className="px-3 py-3 font-medium">含义</th>
            </tr>
          </thead>
          <tbody className="text-fg">
            {[
              ["title", "法规名称，卡片标题"],
              ["summary", "进一步信息，显示在标题下方"],
              ["detail", "点开后的进一步信息"],
              ["originalUrl", "监管机构原网页"],
              ["fileUrl", "SharePoint 或附件原文件"],
              ["library", "监控库，或相关文件"],
              ["source", "如 PICS、上海药监-药品法规、CFDI"],
              ["keywords", "关键词数组，或用顿号分隔的字符串"],
              ["publishedAt", "发布日期，YYYY-MM-DD"],
            ].map(([field, meaning]) => (
              <tr key={field} className="border-t border-line">
                <td className="px-3 py-3 font-medium text-accent">{field}</td>
                <td className="px-3 py-3 text-muted">{meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
