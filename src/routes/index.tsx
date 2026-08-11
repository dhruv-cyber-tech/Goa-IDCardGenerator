import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/hh/Header";
import { RoundStamp, Signposts, StampCard } from "@/components/hh/Stickers";
import { Flower2, IdCard, Palmtree, Plane, User } from "lucide-react";
import scene from "@/assets/goa-scene-wide.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HH Goa 2026 Builder Registry — #FrameInGoa" },
      {
        name: "description",
        content:
          "One upload. Instant identity. Join thousands of hackers building, shipping and making waves in Goa.",
      },
      { property: "og:title", content: "HH Goa 2026 Builder Registry" },
      {
        property: "og:description",
        content: "One upload. Instant identity. Built by hackers, for hackers.",
      },
    ],
  }),
  component: Home,
});

const TOOLS = [
  {
    n: "01",
    title: "PROFILE FRAME",
    copy: "Add the HH Goa 2026 frame to your photo and show up on X in style.",
    cta: "CREATE FRAME",
    to: "/frame" as const,
    tone: "pink" as const,
  },
  {
    n: "02",
    title: "BUILDER CARD",
    copy: "Create your personalized builder card with your name, stack, role and more.",
    cta: "CREATE CARD",
    to: "/card" as const,
    tone: "yellow" as const,
  },
];

function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-goa-green font-mono text-goa-cream">
      <div className="relative flex flex-1 flex-col">
      <Header />

      {/* Desktop: full-bleed illustration behind the composition */}
      <img
        src={scene}
        alt="Illustrated Goa beach village with palms, sunset and scooters"
        width={1920}
        height={1088}
        className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[58%] w-full select-none object-cover object-top opacity-95 md:block"
      />

      <main className="relative z-10 mx-auto max-w-[1180px] px-4 pb-10 md:px-8">
        <div className="relative pt-6 md:pt-8">
          {/* Mobile heading */}
          <div className="md:hidden">
            <div className="flex items-start justify-between gap-4">
              <h1 className="font-display text-[3.1rem] leading-[0.88] tracking-[0.01em]">
                <span className="block text-goa-cream">BUILT BY</span>
                <span className="block text-goa-pink">HACKERS</span>
              </h1>
              <RoundStamp
                lines={["BUILT BY", "</>", "HACKERS"]}
                tone="pink"
                className="mt-2 w-[104px] shrink-0"
              />
            </div>
            <div className="hh-squiggle mt-3 w-[62%]" />
            <p className="mt-4 max-w-[30ch] text-[0.82rem] leading-[1.7] text-goa-cream">
              One upload. Instant identity. Join thousands of hackers building, shipping and making
              waves in Goa.
            </p>
          </div>

          {/* Desktop heading */}
          <div className="hidden text-center md:block">
            <h1 className="font-display text-[5.6rem] leading-[0.9] tracking-[0.01em] text-goa-cream">
              HH GOA 2026
            </h1>
            <p className="mt-1 font-display text-[2.6rem] leading-none tracking-[0.02em] text-goa-pink">
              BUILDER REGISTRY
            </p>
            <div className="hh-squiggle mx-auto mt-4 w-[300px]" />
            <p className="mx-auto mt-5 max-w-[46ch] text-[0.82rem] leading-[1.8]">
              One upload. Instant identity.
              <br />
              Join thousands of hackers building, shipping
              <br />
              and making waves in Goa.
            </p>
          </div>

          {/* Desktop stickers */}
          <Signposts className="absolute -left-10 top-[14%] hidden md:flex" />
          <RoundStamp
            lines={["BUILT BY", "</>", "HACKERS"]}
            tone="pink"
            className="absolute -right-10 -top-2 hidden w-[104px] md:block"
          />
          <StampCard className="absolute right-[3%] top-[64%] hidden rotate-[3deg] md:block">
            <Flower2 aria-hidden="true" className="mx-auto mb-1 h-4 w-4 text-goa-pink" />
            GOA
            <br />
            INDIA
          </StampCard>
        </div>

        {/* Mobile illustration strip */}
        <img
          src={scene}
          alt="Illustrated Goa beach village with palms, sunset and scooters"
          loading="lazy"
          width={1920}
          height={1088}
          className="-mx-4 mt-6 w-[calc(100%+2rem)] object-cover md:hidden"
        />

        {/* Tool cards */}
        <div className="mt-6 grid gap-4 md:mt-10 md:grid-cols-2 md:gap-8">
          {TOOLS.map((t) => (
            <div key={t.n} className="relative">
              <span
                aria-hidden="true"
                className={`absolute -top-2 left-1/2 hidden h-5 w-24 -translate-x-1/2 md:block ${
                  t.tone === "pink" ? "bg-goa-pink" : "bg-goa-yellow"
                }`}
              />
              {/* Mobile: horizontal row card */}
              <div className="flex items-center gap-4 bg-goa-cream px-4 py-5 md:hidden">
                <div className="relative shrink-0">
                  <span
                    className={`absolute -left-1 -top-3 px-1.5 py-0.5 font-mono text-[0.6rem] font-bold ${
                      t.tone === "pink"
                        ? "bg-goa-pink text-goa-cream"
                        : "bg-goa-yellow text-goa-green-deep"
                    }`}
                  >
                    {t.n}
                  </span>
                  <span
                    className={`flex h-[74px] w-[74px] items-center justify-center rounded-full border-2 border-dashed bg-goa-green-deep text-2xl ${
                      t.tone === "pink" ? "border-goa-pink" : "border-goa-yellow"
                    }`}
                    aria-hidden="true"
                  >
                    {t.tone === "pink" ? (
                      <User className="h-8 w-8 text-goa-cream" strokeWidth={1.5} />
                    ) : (
                      <IdCard className="h-8 w-8 text-goa-cream" strokeWidth={1.5} />
                    )}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-xl tracking-[0.02em] text-goa-green-deep">
                    {t.title}
                  </h2>
                  <div
                    className={`${t.tone === "pink" ? "hh-squiggle-pink" : "hh-squiggle"} mt-1 w-[70%]`}
                  />
                  <p className="mt-2 text-[0.76rem] leading-[1.7] text-goa-green-deep">{t.copy}</p>
                </div>
                <Link
                  to={t.to}
                  aria-label={t.cta}
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg ${
                    t.tone === "pink"
                      ? "bg-goa-pink text-goa-cream"
                      : "bg-goa-yellow text-goa-green-deep"
                  }`}
                >
                  <span aria-hidden="true">→</span>
                </Link>
              </div>

              {/* Desktop: tall card */}
              <div className="hidden bg-goa-cream px-8 py-8 text-center shadow-[6px_6px_0_rgba(0,0,0,0.2)] md:block">
                <span
                  className={`absolute left-6 top-6 px-2 py-0.5 font-mono text-[0.66rem] font-bold ${
                    t.tone === "pink"
                      ? "bg-goa-pink text-goa-cream"
                      : "bg-goa-yellow text-goa-green-deep"
                  }`}
                >
                  {t.n}
                </span>
                <span
                  className={`mx-auto flex h-[86px] w-[86px] items-center justify-center rounded-full border-2 border-dashed bg-goa-green-deep text-3xl ${
                    t.tone === "pink" ? "border-goa-pink" : "border-goa-yellow"
                  }`}
                  aria-hidden="true"
                >
                  {t.tone === "pink" ? (
                    <User className="h-10 w-10 text-goa-cream" strokeWidth={1.5} />
                  ) : (
                    <IdCard className="h-10 w-10 text-goa-cream" strokeWidth={1.5} />
                  )}
                </span>
                <h2 className="mt-6 font-display text-[1.85rem] tracking-[0.02em] text-goa-green-deep">
                  {t.title}
                </h2>
                <div
                  className={`${t.tone === "pink" ? "hh-squiggle-pink" : "hh-squiggle"} mx-auto mt-2 w-[75%]`}
                />
                <p className="mx-auto mt-4 max-w-[30ch] text-[0.78rem] leading-[1.8] text-goa-green-deep">
                  {t.copy}
                </p>
                <Link
                  to={t.to}
                  className={`mt-7 flex w-full items-center justify-center gap-3 px-6 py-3 font-mono text-[0.76rem] font-bold tracking-[0.1em] ${
                    t.tone === "pink"
                      ? "bg-goa-pink text-goa-cream hover:bg-goa-pink/90"
                      : "bg-goa-yellow text-goa-green-deep hover:bg-goa-yellow/90"
                  }`}
                >
                  {t.cta} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Made-by badge */}
        <div className="mt-6 flex justify-center md:mt-10">
          <p className="border-2 border-dashed border-goa-yellow/70 bg-goa-green-deep/70 px-5 py-2.5 text-center text-[0.72rem] leading-[1.6] tracking-[0.06em] md:text-left">
            <span className="mr-2 text-goa-pink" aria-hidden="true">
              {"</>"}
            </span>
            MADE BY HACKERS, FOR HACKERS.
            <br className="md:hidden" />
            <span className="ml-0 block text-goa-pink md:ml-6 md:inline">THIS IS HH GOA. <Palmtree aria-hidden="true" className="inline h-3.5 w-3.5" /></span>
          </p>
        </div>
      </main>
      </div>

      <footer className="relative z-10 mt-6 flex items-center justify-center gap-6 bg-goa-cream px-4 py-4 md:mt-8">
        <p className="flex items-center gap-3 font-mono text-[0.68rem] leading-[1.5] tracking-[0.06em] text-goa-green-deep">
          <Plane aria-hidden="true" className="h-4 w-4 -rotate-45" />
          <span>
            28 – 31 OCT 2026
            <br />
            GOA, INDIA
          </span>
        </p>
        <span aria-hidden="true" className="h-8 w-px border-l-2 border-dashed border-goa-green/40" />
        <span className="border-2 border-dashed border-goa-green/50 bg-goa-yellow px-4 py-2 font-mono text-[0.7rem] font-bold tracking-[0.06em] text-goa-green-deep">
          #FrameInGoa
        </span>
      </footer>
    </div>
  );
}