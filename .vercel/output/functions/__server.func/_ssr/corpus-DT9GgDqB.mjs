//#region node_modules/.nitro/vite/services/ssr/assets/corpus-DT9GgDqB.js
function asRecord(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return null;
	return value;
}
function text(value) {
	return typeof value === "string" ? value.trim() : "";
}
function isUrl(value) {
	try {
		const url = new URL(value);
		return url.protocol === "http:" || url.protocol === "https:";
	} catch {
		return false;
	}
}
function libraryOf(raw) {
	const value = text(raw.library ?? raw.folder ?? raw.库);
	if (!value) return null;
	if (value === "relevant" || /相关/.test(value)) return "relevant";
	if (value === "monitor" || /监控|待审/.test(value)) return "monitor";
	return null;
}
function languageOf(raw) {
	const value = text(raw.language ?? raw.lang);
	return /^en/i.test(value) ? "en" : "zh";
}
function docTypeOf(raw, fileUrl) {
	const value = text(raw.docType ?? raw.type);
	if (value === "网页" || value === "PDF" || value === "附件") return value;
	if (/\.pdf($|\?)/i.test(fileUrl)) return "PDF";
	if (/\.(doc|docx|xls|xlsx)($|\?)/i.test(fileUrl)) return "附件";
	return "网页";
}
function keywordsOf(raw) {
	const value = raw.keywords ?? raw.关键词;
	if (Array.isArray(value)) return value.map((item) => text(item)).filter(Boolean);
	if (typeof value === "string") return value.split(/[,，、;；]/).map((item) => item.trim()).filter(Boolean);
	return [];
}
function idOf(raw, url, index) {
	const given = text(raw.id);
	if (given) return given;
	let hash = 0;
	for (const char of url) hash = hash * 31 + char.charCodeAt(0) >>> 0;
	return `imp-${hash.toString(16)}-${index + 1}`;
}
function parseCorpus(payload) {
	const root = Array.isArray(payload) ? payload : asRecord(payload)?.documents;
	if (!Array.isArray(root)) return {
		documents: [],
		errors: ["JSON 需要是数组，或包含 documents 数组。"]
	};
	if (root.length > 500) return {
		documents: [],
		errors: ["单次最多导入 500 条。"]
	};
	const documents = [];
	const errors = [];
	root.forEach((item, index) => {
		const raw = asRecord(item);
		const line = index + 1;
		if (!raw) {
			errors.push(`第 ${line} 条不是对象。`);
			return;
		}
		const title = text(raw.title ?? raw.名称 ?? raw.法规名称);
		const originalUrl = text(raw.originalUrl ?? raw.url ?? raw.原文链接);
		const fileUrl = text(raw.fileUrl ?? raw.文件链接 ?? raw.sharepointUrl);
		if (title.length < 2) {
			errors.push(`第 ${line} 条缺少法规名称。`);
			return;
		}
		if (!isUrl(originalUrl)) {
			errors.push(`第 ${line} 条原文链接不是 http(s) 地址。`);
			return;
		}
		if (fileUrl && !isUrl(fileUrl)) {
			errors.push(`第 ${line} 条原文件链接不是 http(s) 地址。`);
			return;
		}
		const library = libraryOf(raw);
		if (!library) {
			errors.push(`第 ${line} 条资料库需为「监控库 / 相关文件」（或 monitor / relevant）。`);
			return;
		}
		const publishedAt = text(raw.publishedAt ?? raw.发布日期) || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
		const capturedAt = text(raw.capturedAt ?? raw.入库日期) || publishedAt;
		documents.push({
			id: idOf(raw, originalUrl, index),
			title,
			source: text(raw.source ?? raw.来源) || "未标明来源",
			library,
			language: languageOf(raw),
			docType: docTypeOf(raw, fileUrl),
			publishedAt,
			capturedAt,
			summary: text(raw.summary ?? raw.摘要 ?? raw.进一步信息) || "未提供摘要。打开原文查看全文。",
			detail: text(raw.detail ?? raw.正文 ?? raw.摘要 ?? raw.进一步信息) || "未提供进一步信息。",
			keywords: keywordsOf(raw),
			originalUrl,
			fileUrl,
			fileLabel: text(raw.fileLabel ?? raw.文件名) || (fileUrl ? "原文件" : "")
		});
	});
	return {
		documents,
		errors
	};
}
function assertPublicHttps(raw) {
	let url;
	try {
		url = new URL(raw.trim());
	} catch {
		throw new Error("链接格式不正确。");
	}
	if (url.protocol !== "https:") throw new Error("远程同步只接受 https 链接。");
	const host = url.hostname.toLowerCase();
	if (host === "localhost" || host.endsWith(".local") || host.endsWith(".internal") || host === "0.0.0.0") throw new Error("不接受内网或本机地址。");
	const ipv4 = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
	if (ipv4) {
		const parts = ipv4.slice(1).map(Number);
		const [a, b] = parts;
		if (a === 10 || a === 127 || a === 192 && b === 168 || a === 172 && b >= 16 && b <= 31 || a === 0 || a === 169 && b === 254 || parts.some((part) => part > 255)) throw new Error("不接受内网 IP。");
	}
	return url.toString();
}
//#endregion
export { parseCorpus as n, assertPublicHttps as t };
