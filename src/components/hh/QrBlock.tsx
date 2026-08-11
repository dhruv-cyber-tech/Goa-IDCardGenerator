const N = 21;

export function QrBlock({ className = "" }: { className?: string }) {
  // Deterministic decorative QR-like block (a real QR arrives with the generation engine)
  const rects: { x: number; y: number }[] = [];
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const inFinder = (x < 7 && y < 7) || (x > N - 8 && y < 7) || (x < 7 && y > N - 8);
      const on = inFinder
        ? x === 0 || y === 0 || x === 6 || y === 6 || x === N - 1 || y === N - 1
          ? true
          : (x >= 2 && x <= 4 && y >= 2 && y <= 4) ||
            (x >= N - 5 && x <= N - 3 && y >= 2 && y <= 4) ||
            (x >= 2 && x <= 4 && y >= N - 5 && y <= N - 3)
        : (x * 7 + y * 13 + ((x * y) % 5)) % 3 === 0;
      if (on) rects.push({ x, y });
    }
  }
  return (
    <svg
      viewBox={`0 0 ${N} ${N}`}
      aria-hidden="true"
      className={className}
      shapeRendering="crispEdges"
    >
      {rects.map((r) => (
        <rect key={`${r.x}-${r.y}`} x={r.x} y={r.y} width={1} height={1} fill="currentColor" />
      ))}
    </svg>
  );
}
