export function Logo({ className = "" }: { className?: string }) {
  return (
    <a
      href="/"
      aria-label="Hacker House Goa — home"
      className={`relative inline-block select-none leading-[0.82] ${className}`}
    >
      <span className="block font-logo text-[1.5rem] tracking-[0.02em] text-goa-yellow md:text-[1.9rem]">
        HACKER
      </span>
      <span className="block font-logo text-[1.5rem] tracking-[0.02em] text-goa-yellow md:text-[1.9rem]">
        HOUSE
      </span>
      <span className="absolute left-[38%] top-[38%] -rotate-[4deg] rounded-[3px] bg-goa-pink px-[5px] py-[1px] font-mono text-[0.6rem] font-bold text-goa-cream md:text-[0.72rem]">
        गोवा
      </span>
    </a>
  );
}
