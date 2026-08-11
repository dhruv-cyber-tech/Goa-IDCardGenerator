import { Download, Loader2 } from "lucide-react";
import { XLogo } from "./XLogo";

export function DownloadButton({
  onClick,
  busy = false,
  label = "DOWNLOAD IMAGE",
}: {
  onClick?: () => void;
  busy?: boolean;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className="flex w-full items-center justify-center gap-3 border-2 border-goa-yellow bg-transparent px-6 py-4 font-display text-base tracking-[0.06em] text-goa-yellow transition-colors hover:bg-goa-yellow/10 disabled:opacity-60"
    >
      {busy ? (
        <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
      ) : (
        <Download aria-hidden="true" className="h-4 w-4" />
      )}{" "}
      {busy ? "PREPARING…" : label}
    </button>
  );
}

export function ShareToXButton({
  label = "SHARE ON",
  onClick,
  busy = false,
}: {
  label?: string;
  onClick?: () => void;
  busy?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className="flex w-full items-center justify-center gap-3 bg-goa-pink px-6 py-4 font-display text-base tracking-[0.06em] text-goa-cream transition-colors hover:bg-goa-pink/90 disabled:opacity-60"
    >
      {busy ? <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" /> : null}
      {label} <XLogo className="h-4 w-4" />
    </button>
  );
}

export function ShareNote() {
  return (
    <p className="mt-3 text-center font-mono text-[0.62rem] tracking-[0.06em] text-goa-cream/80">
      On mobile we share the PNG directly. On desktop we save the PNG and prefill your post.{" "}
      <span className="text-goa-pink">#FrameInGoa</span>
    </p>
  );
}
