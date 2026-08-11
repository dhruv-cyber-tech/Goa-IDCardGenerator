import { Palmtree } from "lucide-react";
import { XLogo } from "./XLogo";
import { Logo } from "./Logo";
import { shareLastBlob, SHARE_HASHTAG } from "@/lib/hh/export";

export function Header({
  variant = "full",
}: {
  /** "full" shows FAQs + primary action (home), "compact" shows About + share (tools) */
  variant?: "full" | "compact";
}) {
  return (
    <header className="relative z-20 flex items-start justify-between gap-4 px-4 pt-5 md:px-8 md:pt-6">
      <div className="flex items-start gap-4 md:gap-8">
        <Logo />
        <div className="pt-1">
          <p className="font-display text-lg tracking-[0.06em] text-goa-yellow md:text-xl">
            HH GOA 2026
          </p>
          <p className="mt-1 font-mono text-[0.62rem] tracking-[0.14em] text-goa-cream md:text-xs">
            BUILDING <span className="text-goa-pink">•</span> SHARING{" "}
            <span className="text-goa-pink">•</span> SHIPPING
          </p>
        </div>
      </div>

      <nav className="flex items-center gap-4 md:gap-6">
        <button
          type="button"
          className="hidden font-mono text-[0.7rem] tracking-[0.12em] text-goa-cream hover:text-goa-yellow md:block"
        >
          ABOUT HH GOA
        </button>
        {variant === "full" && (
          <>
            <span className="hidden h-5 w-px bg-goa-cream/30 md:block" />
            <button
              type="button"
              className="hidden font-mono text-[0.7rem] tracking-[0.12em] text-goa-cream hover:text-goa-yellow md:block"
            >
              FAQS
            </button>
            <span className="hidden bg-goa-pink px-4 py-2 font-mono text-[0.7rem] font-bold tracking-[0.12em] text-goa-cream md:block">
              BUILT BY HACKERS <Palmtree aria-hidden="true" className="ml-1 inline h-3.5 w-3.5" />
            </span>
          </>
        )}
        {variant === "compact" && (
          <button
            type="button"
            onClick={() =>
              shareLastBlob(
                `${SHARE_HASHTAG} Built in Goa. Shipping ideas, code, and chaos.`,
              ).catch(() => {
                window.open(
                  "https://x.com/intent/post?text=" +
                    encodeURIComponent(
                      `${SHARE_HASHTAG} Built in Goa. Shipping ideas, code, and chaos.`,
                    ),
                  "_blank",
                  "noreferrer",
                );
              })
            }
            className="hidden items-center gap-2 bg-goa-pink px-5 py-2.5 font-mono text-[0.72rem] font-bold tracking-[0.12em] text-goa-cream transition-colors hover:bg-goa-pink/90 md:flex"
          >
            SHARE ON X <span aria-hidden="true">→</span>
          </button>
        )}
        <button
          type="button"
          className="border-2 border-dashed border-goa-cream/70 bg-goa-cream/10 px-3 py-1.5 text-center font-mono text-[0.6rem] font-bold leading-tight tracking-[0.1em] text-goa-cream md:hidden"
        >
          <Palmtree aria-hidden="true" className="mx-auto mb-1 h-3.5 w-3.5" />
          ABOUT
          <br />
          HH GOA
        </button>
      </nav>
    </header>
  );
}
