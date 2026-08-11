import foliage from "@/assets/foliage-corner.png";

export function StampCard({
  children,
  tone = "cream",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "cream" | "pink" | "yellow";
  className?: string;
}) {
  const tones = {
    cream: "bg-goa-cream text-goa-green-deep border-goa-green/40",
    pink: "bg-goa-pink text-goa-cream border-goa-cream/60",
    yellow: "bg-goa-yellow text-goa-green-deep border-goa-green/40",
  } as const;
  return (
    <div
      aria-hidden="true"
      className={`border-2 border-dashed px-3 py-2 text-center font-mono text-[0.62rem] font-bold leading-tight tracking-[0.08em] shadow-[3px_3px_0_rgba(0,0,0,0.18)] ${tones[tone]} ${className}`}
    >
      {children}
    </div>
  );
}

export function RoundStamp({
  lines,
  tone = "yellow",
  className = "",
}: {
  lines: React.ReactNode[];
  tone?: "yellow" | "pink";
  className?: string;
}) {
  const color =
    tone === "yellow" ? "border-goa-yellow text-goa-yellow" : "border-goa-pink text-goa-pink";
  return (
    <div
      aria-hidden="true"
      className={`flex aspect-square items-center justify-center rounded-full border-2 border-dashed text-center font-display text-[0.7rem] leading-[1.15] tracking-[0.06em] ${color} ${className}`}
    >
      <span>
        {lines.map((l, i) => (
          <span key={i} className="flex items-center justify-center">
            {l}
          </span>
        ))}
      </span>
    </div>
  );
}

export function CodeBadge({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`flex aspect-square items-center justify-center rounded-full border-2 border-goa-yellow font-mono text-sm font-bold text-goa-yellow ${className}`}
    >
      {"</>"}
    </div>
  );
}

export function Foliage({ className = "" }: { className?: string }) {
  return (
    <img
      src={foliage}
      alt=""
      aria-hidden="true"
      loading="lazy"
      width={768}
      height={640}
      className={`pointer-events-none select-none ${className}`}
    />
  );
}

export function Signposts({ className = "" }: { className?: string }) {
  const items = [
    { label: "BUILD", tone: "bg-goa-yellow text-goa-green-deep" },
    { label: "SHIP", tone: "bg-goa-pink text-goa-cream" },
    { label: "REPEAT", tone: "bg-goa-yellow text-goa-green-deep" },
  ];
  return (
    <div aria-hidden="true" className={`flex flex-col items-start gap-2 ${className}`}>
      {items.map((i, idx) => (
        <div
          key={i.label}
          style={{ marginLeft: idx * 8 }}
          className={`border-2 border-goa-green-deep px-4 py-1 font-display text-sm tracking-[0.08em] shadow-[3px_3px_0_rgba(0,0,0,0.2)] ${i.tone}`}
        >
          {i.label}
        </div>
      ))}
    </div>
  );
}
