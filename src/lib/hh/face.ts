export type Focus = { x: number; y: number };

/** Center fallback, biased slightly upward where heads usually sit. */
export const DEFAULT_FOCUS: Focus = { x: 50, y: 42 };

type Prediction = { topLeft: number[]; bottomRight: number[] };

let modelPromise: Promise<{
  estimateFaces: (i: HTMLCanvasElement, f?: boolean) => Promise<Prediction[]>;
}> | null = null;

async function getModel() {
  if (!modelPromise) {
    modelPromise = (async () => {
      const tf = await import("@tensorflow/tfjs-core");
      await import("@tensorflow/tfjs-backend-webgl");
      await import("@tensorflow/tfjs-backend-cpu");
      // WebGL when available, CPU otherwise (older/locked-down browsers).
      const ok = await tf.setBackend("webgl").catch(() => false);
      if (ok === false) await tf.setBackend("cpu").catch(() => undefined);
      await tf.ready();
      const blazeface = await import("@tensorflow-models/blazeface");
      return (await blazeface.load()) as never;
    })().catch((err) => {
      modelPromise = null;
      throw err;
    });
  }
  return modelPromise;
}

/**
 * Detect faces and return the focal point (in % of the image) that a crop
 * should keep visible. Never rotates or alters the image itself; if nothing is
 * detected we fall back to a sensible focal point.
 */
export async function detectFocus(canvas: HTMLCanvasElement): Promise<Focus> {
  try {
    const model = await getModel();
    const faces = await model.estimateFaces(canvas, false);
    if (!faces.length) return DEFAULT_FOCUS;

    // Multiple faces: use the union box of all detections so the group stays in.
    let x1 = Infinity;
    let y1 = Infinity;
    let x2 = -Infinity;
    let y2 = -Infinity;
    for (const f of faces) {
      x1 = Math.min(x1, f.topLeft[0]!);
      y1 = Math.min(y1, f.topLeft[1]!);
      x2 = Math.max(x2, f.bottomRight[0]!);
      y2 = Math.max(y2, f.bottomRight[1]!);
    }
    const cx = ((x1 + x2) / 2 / canvas.width) * 100;
    // Include a little headroom above the face box.
    const cy = ((y1 + (y2 - y1) * 0.42) / canvas.height) * 100;
    const clamp = (v: number) => Math.min(92, Math.max(8, v));
    return { x: clamp(cx), y: clamp(cy) };
  } catch {
    return DEFAULT_FOCUS;
  }
}
