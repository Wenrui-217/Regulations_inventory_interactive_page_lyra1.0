import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { n as parseCorpus, t as assertPublicHttps } from "./corpus-DT9GgDqB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fetch-corpus-hGTBE1wQ.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var fetchRemoteCorpus_createServerFn_handler = createServerRpc({
	id: "ba8b18e8fba3a271f505c44e3c4c7e69ee64340e32381867c507452a839e6584",
	name: "fetchRemoteCorpus",
	filename: "src/lib/fetch-corpus.ts"
}, (opts) => fetchRemoteCorpus.__executeServer(opts));
var fetchRemoteCorpus = createServerFn({ method: "POST" }).validator((input) => {
	const url = typeof input === "object" && input && "url" in input ? String(input.url ?? "") : "";
	return { url: assertPublicHttps(url) };
}).handler(fetchRemoteCorpus_createServerFn_handler, async ({ data }) => {
	const response = await fetch(data.url, {
		redirect: "error",
		signal: AbortSignal.timeout(12e3),
		headers: { Accept: "application/json, text/plain;q=0.9,*/*;q=0.1" }
	});
	if (!response.ok) throw new Error(`远端返回 ${response.status}，没有拿到 JSON。`);
	const body = await response.text();
	if (body.length > 15e5) throw new Error("文件超过 1.5 MB。");
	let payload;
	try {
		payload = JSON.parse(body);
	} catch {
		throw new Error("远端内容不是 JSON。");
	}
	return parseCorpus(payload);
});
//#endregion
export { fetchRemoteCorpus_createServerFn_handler };
