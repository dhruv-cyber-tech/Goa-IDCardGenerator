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
  const file = new File([blob], filename, { type: "image/png" });
  if (canShareFile(file)) {
    try {
      await navigator.share({ files: [file], text });
      return "shared";
    } catch (err) {
      if ((err as DOMException)?.name === "AbortError") return "shared";
    }
  }
  // Desktop: X intents cannot attach a local file. Save the PNG, then open the
  // composer with the caption prefilled so the user attaches the saved image.
  downloadBlob(blob, filename);
  const params = new URLSearchParams({ text });
  if (url) params.set("url", url);
  window.open(`https://x.com/intent/post?${params.toString()}`, "_blank", "noreferrer");
  return "intent";
}
