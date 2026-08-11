import { Globe } from "lucide-react";
import { QrBlock } from "./QrBlock";

export function BuilderCard({
  photo,
  focus,
  name,
  role,
  title,
  serial,
  cardRef,
}: {
  photo: string | null;
  focus?: { x: number; y: number };
  name: string;
  role: string;
  title: string;
  serial: string;
  cardRef?: React.Ref<HTMLElement>;
}) {
  return (
    <div className="relative">
      {/* lanyard */}
      <div
        aria-hidden="true"
        className="absolute -top-[86px] left-1/2 z-0 flex -translate-x-1/2 flex-col items-center"
      >
        <div className="h-16 w-7 border-x-2 border-goa-green-deep bg-goa-green" />
        <div className="h-8 w-5 rounded-b-md border-2 border-goa-cream-50 bg-goa-cream-70" />
      </div>

      <article
        ref={cardRef}
        className="relative z-10 overflow-hidden rounded-[14px] bg-goa-cream shadow-[8px_8px_0_rgba(0,0,0,0.22)]"
      >
        {/* pink candy stripe corner */}
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 h-24 w-8"
          style={{
            backgroundImage: "repeating-linear-gradient(-45deg, #E5266D 0 6px, #F2EAD3 6px 12px)",
          }}
        />
        {/* lanyard slot */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-3 h-4 w-16 -translate-x-1/2 rounded-full bg-goa-green-deep"
        />

        <div className="grid gap-5 px-6 pb-6 pt-8 md:grid-cols-[1fr_auto] md:px-8 md:pt-9">
          <div>
            <p className="font-display text-lg tracking-[0.02em] text-goa-pink">HH</p>
            <h2 className="mt-1 font-display text-[2.1rem] leading-[0.95] tracking-[0.01em] text-goa-green-deep md:text-[3rem]">
              HH GOA 2026
            </h2>
            <p className="mt-1 font-display text-sm tracking-[0.06em] text-goa-pink md:text-base">
              BUILDER CREDENTIAL
            </p>
          </div>

          <div className="hidden flex-col items-end gap-2 md:flex">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.58rem] leading-tight tracking-[0.1em] text-goa-green-deep">
                EDITION
                <br />
                2026
              </span>
              <Globe aria-hidden="true" className="h-5 w-5 text-goa-green-deep" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <div className="grid gap-5 px-6 md:grid-cols-[1fr_170px] md:px-8">
          <div className="relative aspect-[16/9] overflow-hidden bg-goa-pink md:aspect-[16/10]">
            {photo ? (
              <img
                src={photo}
                alt={name ? `${name}'s builder photo` : "Builder photo"}
                style={{ objectPosition: `${focus?.x ?? 50}% ${focus?.y ?? 42}%` }}
                className="h-full w-full object-cover mix-blend-luminosity"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center font-mono text-[0.62rem] tracking-[0.14em] text-goa-cream">
                YOUR PHOTO HERE
              </span>
            )}
          </div>

          <div className="flex flex-row items-start justify-between gap-4 md:flex-col md:border-l md:border-goa-green-deep-30 md:pl-5">
            <div className="md:hidden">
              <p className="font-mono text-[0.58rem] leading-tight tracking-[0.1em] text-goa-green-deep">
                EDITION 2026
              </p>
            </div>
            <p className="font-mono text-[0.6rem] leading-[1.6] tracking-[0.1em] text-goa-green-deep">
              BUILDING
              <br />
              THE FUTURE
              <br />
              TOGETHER
            </p>
            <QrBlock className="h-24 w-24 shrink-0 text-goa-green-deep" />
          </div>
        </div>

        <div className="px-6 pb-6 pt-5 md:px-8">
          <p className="font-mono text-[0.58rem] tracking-[0.12em] text-goa-pink">BUILDER NAME</p>
          <p className="mt-1 font-display text-2xl tracking-[0.02em] text-goa-green-deep md:text-[2rem]">
            {name || "YOUR NAME"}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4 border-t border-goa-green-deep-30 pt-3">
            <div>
              <p className="font-mono text-[0.58rem] tracking-[0.12em] text-goa-pink">
                STACK / ROLE
              </p>
              <p className="mt-1 font-display text-base tracking-[0.03em] text-goa-green-deep md:text-lg">
                {role || "—"}
              </p>
            </div>
             <div className="border-l border-goa-green-deep-30 pl-4">
              <p className="font-mono text-[0.58rem] tracking-[0.12em] text-goa-pink">
                BUILDER TITLE
              </p>
              <p className="mt-1 font-display text-base tracking-[0.03em] text-goa-green-deep md:text-lg">
                {title}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 bg-goa-yellow px-6 py-3 md:px-8">
          {[
            ["SERIAL NO.", serial],
            ["COORDINATES", "15.2993° N, 74.1240° E"],
            ["VALID THRU", "FEB 15, 2026"],
          ].map(([k, v], i) => (
            <div key={k} className={i ? "border-l border-goa-green-deep-40 pl-3" : ""}>
                <p className="font-mono text-[0.55rem] tracking-[0.1em] text-goa-green-deep-op80">
                {k}
              </p>
              <p className="mt-0.5 font-mono text-[0.6rem] font-bold tracking-[0.04em] text-goa-green-deep">
                {v}
              </p>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
