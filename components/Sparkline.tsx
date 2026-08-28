"use client";

import { sparkPath } from "@/lib/markets";

export function Sparkline({
  series,
  up,
  width = 110,
  height = 38,
}: {
  series: number[];
  up: boolean;
  width?: number;
  height?: number;
}) {
  const d = sparkPath(series, width, height);
  const stroke = up ? "#00C390" : "#FF444F";
  const id = `g-${up ? "u" : "d"}-${series.length}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.28" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L${width - 2},${height} L2,${height} Z`} fill={`url(#${id})`} />
      <path d={d} fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
