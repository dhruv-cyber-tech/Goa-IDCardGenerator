import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Header } from "@/components/hh/Header";
import { UploadArea } from "@/components/hh/UploadArea";
import { BuilderCard } from "@/components/hh/BuilderCard";
import { DownloadButton, ShareNote, ShareToXButton } from "@/components/hh/ActionButtons";
import { RoundStamp, StampCard } from "@/components/hh/Stickers";
import { randomTitle, serialFor, usePhoto } from "@/components/hh/usePhoto";
import {
  downloadBlob,
  getLastShareBlob,
  renderNodeToPng,
  setLastShareBlob,
  SHARE_HASHTAG,
  shareOrIntent,
  slugify,
} from "@/lib/hh/export";
import { ArrowRight, ChevronDown, Plane, RefreshCw, Smile, Sparkles, User } from "lucide-react";
import sunset from "@/assets/goa-sunset-corner.jpg";
import surfboards from "@/assets/surfboards.png";
import polaroid from "@/assets/polaroid-palm.png";

export const Route = createFileRoute("/card")({
  head: () => ({
    meta: [
      { title: "Create Your Builder Card — HH Goa 2026" },
      {
        name: "description",
        content:
          "One upload. Instant identity. Generate your HH Goa 2026 builder credential and share it on X.",
      },
      { property: "og:title", content: "Create Your Builder Card — HH Goa 2026" },
      { property: "og:description", content: "One upload. Instant identity. #FrameInGoa" },
    ],
  }),
  component: CardPage,
});

const ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Full-stack Developer",
  "Designer",
  "ML Engineer",
  "Founder",
];

function CardPage() {
  const { photo, focus, select, state, error } = usePhoto();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [title, setTitle] = useState("SHIPWRECK ARCHITECT");
  const cardRef = useRef<HTMLElement>(null);
  const [busy, setBusy] = useState<null | "download" | "share">(null);

  const filename = `hh-goa-2026-builder-card-${slugify(name)}.png`;

  /** One canonical render of the card the user sees — reused for download & share. */
  const renderCard = async () => {
    const node = cardRef.current;
    if (!node) throw new Error("Card not ready yet.");
    return renderNodeToPng(node, 2);
  };

  const handleDownload = async () => {
    setBusy("download");
    try {
      downloadBlob(await renderCard(), filename);
    } catch (err) {
      console.error(err);
      toast.error("Could not render your card. Please try again.");
    } finally {
      setBusy(null);
    }
  };

  const handleShare = async () => {
    setBusy("share");
    try {
      let blob = await renderCard().catch(() => undefined);
      if (!blob) {
        const cached = getLastShareBlob();
        if (cached.blob && cached.filename === filename) {
          blob = cached.blob;
        }
      }
      if (!blob) {
        toast.error("Generate your card first, then share it.");
        return;
      }
      setLastShareBlob(blob, filename);
      const result = await shareOrIntent({
        blob,
        filename,
        text: `My HH Goa 2026 builder credential. ${SHARE_HASHTAG}`,
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

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-goa-green font-mono text-goa-cream">
      <Header variant="compact" />

      <img
        src={sunset}
        alt="Illustrated Goan sunset with palms, a cottage and a scooter"
        width={1024}
        height={768}
        className="pointer-events-none absolute left-0 top-0 hidden w-[36%] select-none md:block"
      />
      <img
        src={sunset}
        alt="Illustrated Goan sunset with palms, a cottage and a scooter"
        loading="lazy"
        width={1024}
        height={768}
        className="pointer-events-none absolute right-0 top-[92px] w-[48%] select-none opacity-70 md:hidden"
      />

      <main className="relative z-10 mx-auto grid max-w-[1320px] gap-8 px-4 pb-10 pt-6 md:grid-cols-2 md:gap-12 md:px-8 md:pt-4">
        {/* ── Form column ─────────────────────────── */}
        <h1 className="sr-only">Create your HH Goa 2026 builder card</h1>
        <section className="relative">
          {/* Mobile hero heading sits on the green background, above the form */}
          <div className="mb-5 md:hidden">
            <p className="font-display text-[2.5rem] leading-[0.9] tracking-[0.01em]">
              <span className="block text-goa-cream">CREATE YOUR</span>
              <span className="block text-[3.1rem] text-goa-pink">BUILDER CARD</span>
            </p>
            <div className="hh-squiggle mt-3 w-[52%]" />
            <p className="mt-4 font-mono text-[0.78rem] tracking-[0.08em] text-goa-cream">
              ONE UPLOAD. INSTANT IDENTITY.
            </p>
          </div>

          <div className="relative bg-goa-cream px-5 pb-6 pt-6 shadow-[6px_6px_0_rgba(0,0,0,0.22)] md:px-10 md:pb-8 md:pt-9">
            <div className="hidden md:block">
              <h2 className="font-display text-[2.1rem] leading-[0.92] tracking-[0.01em] text-goa-green-deep">
                CREATE YOUR
                <br />
                <span className="text-[3.1rem] leading-[0.9]">BUILDER CARD</span>
              </h2>
              <p className="mt-3 font-mono text-[0.72rem] tracking-[0.08em] text-goa-green-deep">
                ONE UPLOAD. INSTANT IDENTITY.
              </p>
              <div className="hh-squiggle-pink mt-2 w-[60%]" />
            </div>

            <form
              className="mt-6 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                void handleDownload();
              }}
            >
              <Field n="01" label="UPLOAD YOUR PHOTO" htmlFor="hh-photo">
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
              </Field>

              <Field n="02" label="YOUR NAME" htmlFor="hh-name">
                <div className="relative">
                  <input
                    id="hh-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full border-2 border-goa-pink/60 bg-transparent px-4 py-3 pr-10 font-mono text-[0.8rem] text-goa-green-deep placeholder:text-goa-green-deep/50 focus:outline-2 focus:outline-offset-2 focus:outline-goa-pink"
                  />
                  <User
                    aria-hidden="true"
                    className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-goa-pink"
                  />
                </div>
              </Field>

              <Field n="03" label="YOUR STACK / ROLE" htmlFor="hh-role">
                <div className="relative">
                  <select
                    id="hh-role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full appearance-none border-2 border-goa-pink/60 bg-transparent px-4 py-3 pr-10 font-mono text-[0.8rem] text-goa-green-deep focus:outline-2 focus:outline-offset-2 focus:outline-goa-pink"
                  >
                    <option value="">e.g. Frontend Developer</option>
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden="true"
                    className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-goa-pink"
                  />
                </div>
              </Field>

              <Field n="04" label="YOUR BUILDER TITLE (AUTO-GENERATED)">
                <div className="flex items-center justify-between border-2 border-dashed border-goa-green/50 px-4 py-3">
                  <p className="flex items-center gap-2 font-display text-base tracking-[0.04em] text-goa-green-deep">
                    <Sparkles aria-hidden="true" className="h-4 w-4 text-goa-green" />
                    {title}
                  </p>
                  <button
                    type="button"
                    aria-label="Generate a new builder title"
                    onClick={() => setTitle(randomTitle(title))}
                    className="text-goa-green-deep transition-transform hover:rotate-90"
                  >
                    <RefreshCw aria-hidden="true" className="h-4 w-4" />
                  </button>
                </div>
              </Field>

              <button
                type="submit"
                className="flex w-full items-center justify-between bg-goa-pink px-7 py-4 font-display text-lg tracking-[0.06em] text-goa-cream transition-colors hover:bg-goa-pink/90 disabled:opacity-70"
                disabled={busy !== null}
              >
                {busy === "download" ? "PREPARING…" : "DOWNLOAD MY CARD"}
                <ArrowRight aria-hidden="true" className="h-5 w-5" />
              </button>
            </form>

            <div aria-hidden="true" className="hh-lace mt-6 h-3 w-full" />

            <img
              src={polaroid}
              alt=""
              aria-hidden="true"
              loading="lazy"
              width={640}
              height={640}
              className="pointer-events-none absolute -right-8 top-16 w-28 rotate-[3deg] md:-right-14 md:top-20 md:w-32"
            />
          </div>

          <img
            src={surfboards}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={640}
            height={768}
            className="pointer-events-none absolute -right-6 bottom-16 w-28 md:-right-16 md:bottom-10 md:w-36"
          />
          <RoundStamp
            lines={["MADE BY", "HACKERS", "FOR", "HACKERS"]}
            className="absolute -right-24 top-[46%] hidden w-[110px] 2xl:block"
          />
        </section>

        {/* ── Preview column ──────────────────────── */}
        <section className="relative">
          {/* mobile hero title above preview */}
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="font-mono text-[0.7rem] font-bold tracking-[0.1em] text-goa-yellow">
                YOUR BUILDER CARD PREVIEW
              </p>
              <div className="hh-squiggle mt-1 w-[70%]" />
            </div>
            <button
              type="button"
              onClick={() => setTitle(randomTitle(title))}
              className="flex shrink-0 items-center gap-2 border-2 border-goa-yellow px-4 py-2 font-mono text-[0.68rem] font-bold tracking-[0.1em] text-goa-yellow hover:bg-goa-yellow/10"
            >
              <Smile aria-hidden="true" className="h-4 w-4" /> MOOD CHANGE
            </button>
          </div>

          <div className="mt-[86px] md:mt-[96px]">
            <BuilderCard
              photo={photo}
              focus={focus}
              name={name.toUpperCase()}
              role={role.toUpperCase()}
              title={title}
              serial={serialFor(name)}
              cardRef={cardRef}
            />
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 md:gap-5">
            <DownloadButton onClick={handleDownload} busy={busy === "download"} />
            <ShareToXButton onClick={handleShare} busy={busy === "share"} />
          </div>
          <ShareNote />

          <StampCard
            tone="pink"
            className="absolute -right-24 top-8 hidden rotate-[2deg] 2xl:block"
          >
            <Plane aria-hidden="true" className="mx-auto mb-1 h-3.5 w-3.5 -rotate-45" />
            28 – 31
            <br />
            OCT
            <br />
            2026
          </StampCard>
          <RoundStamp
            lines={["BUILD", "SHIP", "REPEAT"]}
            className="absolute -right-24 top-[42%] hidden w-[104px] 2xl:block"
          />
        </section>
      </main>

      <footer className="relative z-10 border-t-2 border-dashed border-goa-cream/30 px-4 py-4 text-center font-mono text-[0.66rem] tracking-[0.08em] text-goa-cream/80 md:text-left md:px-8">
        © 2026 HH-GOA. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}

function Field({
  n,
  label,
  htmlFor,
  children,
}: {
  n: string;
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  const Tag = htmlFor ? "label" : "p";
  return (
    <div>
      <Tag
        {...(htmlFor ? { htmlFor } : {})}
        className="mb-2 flex items-center gap-3 font-mono text-[0.72rem] font-bold tracking-[0.08em] text-goa-green-deep"
      >
        <span className="bg-goa-pink px-1.5 py-0.5 text-[0.66rem] text-goa-cream">{n}</span>
        {label}
      </Tag>
      {children}
    </div>
  );
}
