import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Header } from "@/components/hh/Header";
import { UploadArea } from "@/components/hh/UploadArea";
import { DownloadButton, ShareNote, ShareToXButton } from "@/components/hh/ActionButtons";
import { Foliage, RoundStamp, Signposts, StampCard } from "@/components/hh/Stickers";
import { usePhoto } from "@/components/hh/usePhoto";
import { downloadBlob, renderNodeToPng, SHARE_HASHTAG, shareOrIntent } from "@/lib/hh/export";
import { Download, Flower2, Loader2, Lock, Palmtree, Plane, Sparkle } from "lucide-react";
import ring from "@/assets/profile-frame-ring.png";
import sunset from "@/assets/goa-sunset-corner.jpg";

export const Route = createFileRoute("/frame")({
  head: () => ({
    meta: [
      { title: "Frame Your Builder — HH Goa 2026" },
      {
        name: "description",
        content:
          "Turn your profile photo into an HH Goa artifact. Add the HH Goa 2026 frame and share it on X.",
      },
      { property: "og:title", content: "Frame Your Builder — HH Goa 2026" },
      { property: "og:description", content: "Turn your profile photo into an HH Goa artifact." },
    ],
  }),
  component: FramePage,
});

function FramePage() {
  const { photo, focus, select, state, error } = usePhoto();
  // The frame preview is rendered twice (mobile + desktop); capture whichever
  // instance is actually visible so the PNG matches what the user sees.
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [busy, setBusy] = useState<null | "download" | "share">(null);
  const filename = "hh-goa-2026-profile-frame.png";

  /** Canonical render of the exact frame composition on screen. */
  const renderFrame = async () => {
    const node = frameRefs.current.find((n) => n && n.offsetWidth > 0);
    if (!node) throw new Error("Frame not ready yet.");
    return renderNodeToPng(node, 2);
  };

  const handleDownload = async () => {
    setBusy("download");
    try {
      downloadBlob(await renderFrame(), filename);
    } catch (err) {
      console.error(err);
      toast.error("Could not render your frame. Please try again.");
    } finally {
      setBusy(null);
    }
  };

  const handleShare = async () => {
    setBusy("share");
    try {
      const result = await shareOrIntent({
        blob: await renderFrame(),
        filename,
        text: `Framed and ready for HH Goa 2026. ${SHARE_HASHTAG}`,
      });
      if (result === "intent") {
        toast.success("PNG saved — attach it to the post we just opened.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Could not prepare the share image.");
    } finally {
      setBusy(null);
    }
  };

  const preview = (slot: number) => (
    <div
      ref={(el) => {
        frameRefs.current[slot] = el;
      }}
      className="relative mx-auto aspect-square w-full max-w-[420px]"
    >
      <div className="absolute inset-[22%] overflow-hidden rounded-full bg-goa-green-deep">
        {photo ? (
          <img
            src={photo}
            alt="Your framed profile photo"
            style={{ objectPosition: `${focus.x}% ${focus.y}%` }}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center px-6 text-center font-mono text-[0.6rem] tracking-[0.12em] text-goa-cream/80">
            YOUR PHOTO HERE
          </span>
        )}
      </div>
      <img
        src={ring}
        alt=""
        aria-hidden="true"
        width={1024}
        height={1024}
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
      />
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-goa-green font-mono text-goa-cream">
      <Header variant="compact" />

      <img
        src={sunset}
        alt="Illustrated Goan sunset with palms, a cottage and a scooter"
        loading="lazy"
        width={1024}
        height={768}
        className="pointer-events-none absolute right-0 top-[96px] w-[48%] select-none opacity-70 md:hidden"
      />
      <Foliage className="absolute left-0 top-[22%] hidden w-[22%] md:block" />

      <main className="relative z-10 mx-auto grid max-w-[1320px] gap-8 px-4 pb-10 pt-6 md:grid-cols-2 md:gap-12 md:px-8">
        {/* Left column */}
        <section className="relative md:pl-[16%]">
          <h1 className="font-display text-[2.9rem] leading-[0.9] tracking-[0.01em] md:text-[4rem]">
            <span className="block text-goa-cream">FRAME YOUR</span>
            <span className="block text-goa-pink">BUILDER</span>
          </h1>
          <div className="hh-squiggle mt-3 w-[58%]" />
          <p className="mt-4 max-w-[26ch] text-[0.85rem] leading-[1.7] text-goa-cream">
            Turn your profile photo into an HH Goa artifact.
          </p>

          <div className="relative mt-6 bg-goa-cream px-5 pb-6 pt-6 shadow-[6px_6px_0_rgba(0,0,0,0.22)] md:mt-8 md:px-7">
            <p className="mb-3 flex items-center gap-3 font-mono text-[0.78rem] font-bold tracking-[0.08em] text-goa-green-deep">
              <span className="bg-goa-pink px-1.5 py-0.5 text-[0.66rem] text-goa-cream">01</span>
              <label htmlFor="hh-photo">YOUR PHOTO</label>
            </p>
            <UploadArea photo={photo} onSelect={select} />
            {state === "uploading" && (
              <p className="mt-2 font-mono text-[0.62rem] tracking-[0.1em] text-goa-green-deep/70">
                PROCESSING PHOTO…
              </p>
            )}
            {error && (
              <p className="mt-2 font-mono text-[0.62rem] tracking-[0.1em] text-goa-pink">
                {error.toUpperCase()}
              </p>
            )}
            <p className="mt-3 flex items-center gap-2 font-mono text-[0.66rem] tracking-[0.04em] text-goa-green-deep">
              <Lock aria-hidden="true" className="h-3.5 w-3.5" /> Your photo is private and never
              stored.
            </p>

            <p className="mt-6 font-display text-base tracking-[0.04em] text-goa-green-deep">
              YOUR PROFILE FRAME PREVIEW
            </p>
            <div className="hh-squiggle mt-1 w-[62%]" />

            {/* Mobile keeps the preview inside the cream panel */}
            <div className="mt-5 md:hidden">{preview(0)}</div>

            <p className="mt-4 hidden items-start gap-2 font-mono text-[0.68rem] leading-[1.7] text-goa-green-deep md:flex">
              <Sparkle aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-goa-yellow" />
              <span>
                This is how your frame will look.
                <br />
                Perfect for your X profile picture.
              </span>
            </p>

            <div className="mt-5 grid gap-3 md:hidden">
              <button
                type="button"
                onClick={handleDownload}
                disabled={busy !== null}
                className="flex w-full items-center justify-center gap-3 border-2 border-goa-yellow bg-goa-green-deep px-6 py-4 font-display text-base tracking-[0.06em] text-goa-yellow"
              >
                {busy === "download" ? (
                  <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
                ) : (
                  <Download aria-hidden="true" className="h-4 w-4" />
                )}{" "}
                {busy === "download" ? "PREPARING…" : "DOWNLOAD FRAME"}
              </button>
              <ShareToXButton onClick={handleShare} busy={busy === "share"} />
            </div>

            <div aria-hidden="true" className="hh-lace mt-6 h-3 w-full" />
          </div>

          <Signposts className="absolute -left-[6%] top-[2%] hidden md:flex" />
          <StampCard className="absolute -left-4 bottom-[-14px] hidden -rotate-[2deg] 2xl:block">
            <Plane aria-hidden="true" className="mx-auto mb-1 h-3.5 w-3.5 -rotate-45" />
            28 – 31 OCT 2026
            <br />
            GOA, INDIA
          </StampCard>
        </section>

        {/* Right column: preview */}
        <section className="relative hidden md:block">
          <p className="mx-auto w-fit border-2 border-dashed border-goa-green/40 bg-goa-yellow px-6 py-2 font-mono text-[0.72rem] font-bold tracking-[0.1em] text-goa-green-deep">
            YOUR PROFILE FRAME PREVIEW
          </p>

          <div className="mt-6">{preview(1)}</div>

          <div className="mx-auto mt-6 grid max-w-[520px] grid-cols-2 gap-5">
            <DownloadButton onClick={handleDownload} busy={busy === "download"} />
            <ShareToXButton onClick={handleShare} busy={busy === "share"} />
          </div>
          <ShareNote />

          <RoundStamp
            lines={["BUILT BY", <Palmtree key="p" className="h-4 w-4" />, "HACKERS"]}
            tone="pink"
            className="absolute -right-8 top-0 hidden w-[120px] xl:block"
          />
          <RoundStamp
            lines={["BUILD", "SHIP", "REPEAT"]}
            className="absolute -right-12 top-[52%] hidden w-[100px] xl:block"
          />
        </section>

        {/* Mobile sticker row */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:hidden">
          <StampCard>
            <Flower2 aria-hidden="true" className="h-5 w-5 text-goa-pink" />
          </StampCard>
          <RoundStamp lines={["</>"]} className="w-[52px]" />
          <RoundStamp lines={["BUILT", "BY", "HACKERS"]} className="w-[74px]" />
          <StampCard tone="pink">
            <Plane aria-hidden="true" className="mx-auto mb-1 h-3.5 w-3.5 -rotate-45" />
            28 – 31 OCT 2026
          </StampCard>
          <StampCard tone="yellow">
            <Palmtree aria-hidden="true" className="mx-auto mb-1 h-3.5 w-3.5" />
            GOA
            <br />
            INDIA
          </StampCard>
        </div>
      </main>

      <footer className="relative z-10 flex flex-wrap items-center justify-center gap-6 bg-goa-cream px-4 py-4 md:justify-between md:px-10">
        <p className="hidden items-center gap-2 font-mono text-[0.7rem] tracking-[0.06em] text-goa-green-deep md:flex">
          <Palmtree aria-hidden="true" className="h-4 w-4" /> MADE BY HACKERS, FOR HACKERS.
          <span className="text-goa-pink">THIS IS HH GOA.</span>
        </p>
        <p className="flex items-center gap-3 font-mono text-[0.68rem] leading-[1.5] tracking-[0.06em] text-goa-green-deep md:hidden">
          <Plane aria-hidden="true" className="h-4 w-4 -rotate-45" />
          <span>
            28 – 31 OCT 2026
            <br />
            GOA, INDIA
          </span>
        </p>
        <span className="border-2 border-dashed border-goa-green/50 bg-goa-yellow px-4 py-2 font-mono text-[0.7rem] font-bold tracking-[0.06em] text-goa-green-deep">
          #FrameInGoa
        </span>
      </footer>
    </div>
  );
}
