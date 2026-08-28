"use client";

import { useRef, useState } from "react";
import { CloseIcon } from "./icons";

export type Promo = {
  id: string;
  title: string;
  body: string;
  art: "tradingview" | "bot" | "p2p";
};

export const PROMOS: Promo[] = [
  { id: "tv", title: "Trade with TradingView", body: "Advanced charts and tools for 24/7 Derived Indices.", art: "tradingview" },
  { id: "bot", title: "Automate with Deriv Bot", body: "Build a strategy with drag-and-drop blocks — no code.", art: "bot" },
  { id: "p2p", title: "Fund with P2P", body: "Buy and sell USD with local traders at your own rate.", art: "p2p" },
];

export function PromoRail() {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const rail = useRef<HTMLDivElement>(null);
  const items = PROMOS.filter((p) => !dismissed.includes(p.id));

  if (!items.length) return null;

  return (
    <div>
      <div
        ref={rail}
        onScroll={(e) => {
          const el = e.currentTarget;
          setIndex(Math.round(el.scrollLeft / (el.clientWidth * 0.92)));
        }}
        className="no-bar snap-rail -mx-4 flex gap-3 overflow-x-auto px-4 pb-1 lg:mx-0 lg:px-0"
      >
        {items.map((p) => (
          <article
            key={p.id}
            className="grain relative w-[92%] shrink-0 overflow-hidden rounded-2xl bg-ink-800 p-5 text-white sm:w-[420px]"
          >
            <button
              onClick={() => setDismissed((d) => [...d, p.id])}
              aria-label="Dismiss"
              className="tap absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20"
            >
              <CloseIcon width={16} height={16} />
            </button>
            <div className="max-w-[62%]">
              <h3 className="text-lg font-bold leading-6">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-5 text-white/65">{p.body}</p>
            </div>
            <PromoArt art={p.art} />
          </article>
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
        {items.map((p, i) => (
          <span
            key={p.id}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-ink" : "w-1.5 bg-mist-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function PromoArt({ art }: { art: Promo["art"] }) {
  if (art === "tradingview")
    return (
      <svg viewBox="0 0 120 80" className="pointer-events-none absolute bottom-3 right-4 h-20 w-32">
        <rect x="6" y="26" width="46" height="30" rx="6" fill="#E8656E" />
        <rect x="52" y="34" width="16" height="6" rx="3" fill="#9aa0ad" />
        <rect x="66" y="22" width="46" height="34" rx="6" fill="#0E0E0E" stroke="#3a3f4b" />
        <path d="M78 46l7-9 6 7 8-12" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      </svg>
    );
  if (art === "bot")
    return (
      <svg viewBox="0 0 120 80" className="pointer-events-none absolute bottom-3 right-4 h-20 w-32">
        <rect x="34" y="20" width="52" height="40" rx="10" fill="#FF444F" />
        <circle cx="50" cy="38" r="5" fill="#fff" />
        <circle cx="70" cy="38" r="5" fill="#fff" />
        <path d="M50 50h20" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        <path d="M60 20v-8M52 12h16" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  return (
    <svg viewBox="0 0 120 80" className="pointer-events-none absolute bottom-3 right-4 h-20 w-32">
      <circle cx="44" cy="40" r="18" fill="#FF444F" opacity=".9" />
      <circle cx="76" cy="40" r="18" fill="#fff" opacity=".85" />
      <path d="M38 40h14l-4-4M82 40H68l4 4" stroke="#0E0E0E" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}
