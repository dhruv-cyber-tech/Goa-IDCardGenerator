import { toBlob } from "html-to-image";

/**
 * Render the *visible* composition (the real DOM node the user sees) to a PNG.
 * One canonical result is reused for preview → download → share.
 */
export async function renderNodeToPng(node: HTMLElement, scale = 2): Promise<Blob> {
  const width = node.offsetWidth;
  const height = node.offsetHeight;
  const blob = await toBlob(node, {
    type: "image/png",
    pixelRatio: scale,
    width,
    height,
    cacheBust: true,
    skipFonts: false,
    backgroundColor: "transparent",
  });
  if (!blob) throw new Error("Could not render the image.");
  return blob;
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export function slugify(value: string, fallback = "builder") {
  const s = value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return s || fallback;
}

export const SHARE_HASHTAG = "#FrameInGoa";

/** True when this browser can share an actual PNG file (mostly mobile). */
export function canShareFile(file: File) {
  return typeof navigator !== "undefined" && !!navigator.canShare?.({ files: [file] });
}

const shareCache = new Map<string, string>();
let lastBlob: Blob | undefined;
let lastFilename: string | undefined;

export function setLastShareBlob(blob: Blob, filename: string) {
  lastBlob = blob;
  lastFilename = filename;
}

export function getLastShareBlob() {
  return { blob: lastBlob, filename: lastFilename };
}

export async function shareLastBlob(text: string) {
  if (lastBlob && lastFilename) {
    return shareOrIntent({
      blob: lastBlob,
      filename: lastFilename,
      text,
    });
  }

  const params = new URLSearchParams({ text });
  window.open(`https://x.com/intent/post?${params.toString()}`, "_blank", "noreferrer");
  return "intent";
}

async function uploadShare(blob: Blob): Promise<string> {
  const cacheKey = `${blob.size}-${blob.type}`;
  const cached = shareCache.get(cacheKey);
  if (cached) return cached;

  const form = new FormData();
  form.append("file", blob, "share.png");

  const res = await fetch("/api/share/upload", {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "Upload failed");
    throw new Error(`Share upload failed: ${res.status} ${text}`);
  }

  const { id } = (await res.json()) as { id: string };
  const shareUrl = `/share/${id}`;
  shareCache.set(cacheKey, shareUrl);
  return shareUrl;
}

export async function shareOrIntent({
  blob,
  filename,
  text,
  url,
}: {
  blob: Blob;
  filename: string;
  text: string;
  url?: string;
}): Promise<"shared" | "intent"> {
  let shareUrl = url;
  let shareText = text;

  if (!shareUrl) {
    try {
      shareUrl = await uploadShare(blob);
      shareText = `${text} ${window.location.origin}${shareUrl}`;
    } catch {
      shareUrl = undefined;
      shareText = text;
    }
  } else if (url) {
    shareText = `${text} ${url}`;
  }

  const file = new File([blob], filename, { type: "image/png" });
  if (canShareFile(file)) {
    try {
      await navigator.share({ files: [file], text: shareText });
      return "shared";
    } catch (err) {
      if ((err as DOMException)?.name === "AbortError") return "shared";
    }
  }

  downloadBlob(blob, filename);
  const params = new URLSearchParams({ text: shareText });
  window.open(`https://x.com/intent/post?${params.toString()}`, "_blank", "noreferrer");
  return "intent";
}
