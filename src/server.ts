import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

type KVNamespace = {
  put(
    key: string,
    value: ArrayBuffer | Uint8Array,
    options?: { expirationTtl?: number },
  ): Promise<void>;
  get(key: string, type: "arrayBuffer"): Promise<ArrayBuffer | null>;
};

function getKV(env: unknown) {
  const e = env as Record<string, unknown> | undefined;
  if (!e?.["HH_GOA_SHARES"]) {
    throw new Error("KV not configured");
  }
  return e["HH_GOA_SHARES"] as KVNamespace;
}

async function handleShareApi(request: Request, env: unknown, ctx: unknown): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === "/api/share/upload" && request.method === "POST") {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file || !(file instanceof Blob)) {
      return new Response("No file uploaded", { status: 400 });
    }

    const id = crypto.randomUUID().replace(/-/g, "").slice(0, 12);
    const kv = getKV(env);
    const buffer = new Uint8Array(await file.arrayBuffer());
    await kv.put(id, buffer, {
      expirationTtl: 60 * 60 * 24 * 7,
    });

    return Response.json({ id });
  }

  const imageMatch = path.match(/^\/api\/share\/([^/]+)$/);
  if (imageMatch && request.method === "GET") {
    const id = imageMatch[1]!;
    const kv = getKV(env);
    const data = await kv.get(id, "arrayBuffer");
    if (!data) {
      return new Response("Not found", { status: 404 });
    }
    return new Response(data, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  return new Response("Not Found", { status: 404 });
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);

      if (url.pathname.startsWith("/api/share/")) {
        return handleShareApi(request, env, ctx);
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
