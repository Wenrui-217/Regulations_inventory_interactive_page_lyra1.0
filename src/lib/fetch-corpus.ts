import { createServerFn } from "@tanstack/react-start";
import { assertPublicHttps, parseCorpus } from "@/lib/corpus";
import type { Regulation } from "@/data/corpus";

export type RemoteCorpus = {
  documents: Regulation[];
  errors: string[];
};

export const fetchRemoteCorpus = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const url = typeof input === "object" && input && "url" in input ? String(input.url ?? "") : "";
    return { url: assertPublicHttps(url) };
  })
  .handler(async ({ data }): Promise<RemoteCorpus> => {
    const response = await fetch(data.url, {
      redirect: "error",
      signal: AbortSignal.timeout(12000),
      headers: { Accept: "application/json, text/plain;q=0.9,*/*;q=0.1" },
    });
    if (!response.ok) {
      throw new Error(`远端返回 ${response.status}，没有拿到 JSON。`);
    }
    const body = await response.text();
    if (body.length > 1_500_000) throw new Error("文件超过 1.5 MB。");
    let payload: unknown;
    try {
      payload = JSON.parse(body);
    } catch {
      throw new Error("远端内容不是 JSON。");
    }
    return parseCorpus(payload);
  });
