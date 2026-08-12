import "./lib/error-capture";

import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";
import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { head, put } from "@vercel/blob";

const startHandler = createStartHandler(defaultStreamHandler);

async function handleShareApi(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;

  // Upload image to Vercel Blob
  if (path === "/api/share/upload" && request.method === "POST") {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return new Response("No file uploaded", { status: 400 });
    }

    const id = crypto.randomUUID().replace(/-/g, "").slice(0, 12);

    const buffer = await file.arrayBuffer();

    const blob = await put(`shares/${id}.png`, buffer, {
      access: "public",
      contentType: "image/png",
      addRandomSuffix: false,
    });

    return Response.json({
      id,
      url: blob.url,
    });
  }

  // Serve the shared image through our existing API URL
  const imageMatch = path.match(/^\/api\/share\/([^/]+)$/);

  if (imageMatch && request.method === "GET") {
    const id = imageMatch[1]!;

    try {
      const blob = await head(`shares/${id}.png`);

      return Response.redirect(blob.url, 302);
    } catch {
      return new Response("Not found", { status: 404 });
    }
  }

  return new Response("Not Found", { status: 404 });
}

// h3 can swallow in-handler throws into a normal 500 response.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();

  if (isH3SwallowedErrorBody(body)) return response;

  console.error(
    consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`),
  );

  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as {
      unhandled?: unknown;
      message?: unknown;
    };

    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request) {
    try {
      const url = new URL(request.url);

      if (url.pathname.startsWith("/api/share/")) {
        return handleShareApi(request);
      }

      const response = await startHandler(request);

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
