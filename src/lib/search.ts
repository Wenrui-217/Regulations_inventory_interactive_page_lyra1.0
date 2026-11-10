import type { Regulation } from "@/data/corpus";

export type Segment = { text: string; hit: boolean };

export function queryTokens(query: string) {
  return query
    .trim()
    .split(/[\s,，、;；]+/)
    .map((token) => token.trim())
    .filter(Boolean);
}

export function splitHighlight(text: string, tokens: string[]): Segment[] {
  if (!text) return [];
  if (tokens.length === 0) return [{ text, hit: false }];
  const lower = text.toLowerCase();
  const ranges: Array<[number, number]> = [];
  for (const token of tokens) {
    const needle = token.toLowerCase();
    if (!needle) continue;
    let from = 0;
    while (from < lower.length) {
      const at = lower.indexOf(needle, from);
      if (at < 0) break;
      ranges.push([at, at + needle.length]);
      from = at + needle.length;
    }
  }
  if (ranges.length === 0) return [{ text, hit: false }];
  ranges.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const merged: Array<[number, number]> = [];
  for (const range of ranges) {
    const last = merged[merged.length - 1];
    if (!last || range[0] > last[1]) merged.push(range);
    else last[1] = Math.max(last[1], range[1]);
  }
  const parts: Segment[] = [];
  let cursor = 0;
  for (const [start, end] of merged) {
    if (cursor < start) parts.push({ text: text.slice(cursor, start), hit: false });
    parts.push({ text: text.slice(start, end), hit: true });
    cursor = end;
  }
  if (cursor < text.length) parts.push({ text: text.slice(cursor), hit: false });
  return parts;
}

function blob(doc: Regulation) {
  return [doc.title, doc.source, doc.summary, doc.detail, doc.keywords.join(" "), doc.fileLabel]
    .join("\n")
    .toLowerCase();
}

export function scoreDocument(doc: Regulation, tokens: string[]) {
  if (tokens.length === 0) return 1;
  const haystack = blob(doc);
  if (!tokens.every((token) => haystack.includes(token.toLowerCase()))) return 0;
  let score = 0;
  for (const token of tokens) {
    const needle = token.toLowerCase();
    if (doc.title.toLowerCase().includes(needle)) score += 50;
    if (doc.keywords.some((keyword) => keyword.toLowerCase().includes(needle))) score += 30;
    if (doc.summary.toLowerCase().includes(needle)) score += 16;
    if (doc.detail.toLowerCase().includes(needle)) score += 8;
    if (doc.source.toLowerCase().includes(needle)) score += 6;
  }
  const phrase = tokens.join(" ").toLowerCase();
  if (tokens.length > 1 && doc.title.toLowerCase().includes(phrase)) score += 24;
  const published = Date.parse(doc.publishedAt);
  if (!Number.isNaN(published)) score += Math.max(0, (published - Date.parse("2016-01-01")) / 86400000) / 400;
  return score;
}

export function searchDocuments(
  docs: Regulation[],
  query: string,
  sort: "relevance" | "date",
) {
  const tokens = queryTokens(query);
  const ranked = docs
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
