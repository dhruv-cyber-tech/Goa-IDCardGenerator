export type NormalizedPhoto = {
  /** data URL of the orientation-corrected, size-normalized image */
  url: string;
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
};

const MAX_EDGE = 1600;

function isHeic(file: File) {
  const n = file.name.toLowerCase();
  return (
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    n.endsWith(".heic") ||
    n.endsWith(".heif")
  );
}

/** Decode any supported file into a bitmap with EXIF orientation applied. */
async function decode(file: File): Promise<ImageBitmap | HTMLImageElement> {
  let blob: Blob = file;

  if (isHeic(file)) {
    try {
      const { heicTo } = await import("heic-to");
      blob = await heicTo({ blob: file, type: "image/jpeg", quality: 0.92 });
    } catch {
      // Safari decodes HEIC natively — fall through with the original blob.
    }
  }

  if (typeof createImageBitmap === "function") {
    try {
      // `from-image` applies EXIF orientation; browsers that ignore the option
      // still hand back a correctly oriented bitmap for JPEG in practice.
      return await createImageBitmap(blob, { imageOrientation: "from-image" });
    } catch {
      /* fall back to <img> */
    }
  }

  const url = URL.createObjectURL(blob);
  try {
    const img = new Image();
    img.decoding = "sync";
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Could not read that image."));
      img.src = url;
    });
    await img.decode?.().catch(() => undefined);
    return img;
  } finally {
    // The bitmap/image data is copied to a canvas by the caller, so it is safe
    // to release the object URL on the next tick.
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }
}

/**
 * Upload → orientation-corrected, downscaled canvas. Handles JPG/PNG/WEBP and
 * HEIC/HEIF (iPhone), portrait/landscape/rotated photos and any aspect ratio.
 */
export async function normalizePhoto(file: File): Promise<NormalizedPhoto> {
  const source = await decode(file);
  const sw = "width" in source ? source.width : 0;
  const sh = "height" in source ? source.height : 0;
  if (!sw || !sh) throw new Error("Could not read that image.");

  const scale = Math.min(1, MAX_EDGE / Math.max(sw, sh));
  const width = Math.max(1, Math.round(sw * scale));
  const height = Math.max(1, Math.round(sh * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable.");
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(source as CanvasImageSource, 0, 0, width, height);
  if ("close" in source) source.close();

  return { url: canvas.toDataURL("image/jpeg", 0.92), width, height, canvas };
}
