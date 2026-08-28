"use client";

import Link from "next/link";
import type { Market, Quote } from "@/lib/markets";
import { num, signed } from "@/lib/format";
import { Sparkline } from "./Sparkline";

export function MarketTile({ market, quote }: { market: Market; quote: Quote }) {
  const up = quote.change >= 0;
  return (
    <Link
      href={`/markets/${market.id}`}
      className="tap block rounded-2xl bg-surface-2 p-4 hover:bg-surface-3"
    >
      <div className="flex items-center gap-1.5">
        <span className="rounded-md bg-ink-900 px-1.5 py-0.5 text-[10px] font-bold text-white">{market.badge}</span>
        <span className="rounded-md bg-coral px-1.5 py-0.5 text-[10px] font-bold text-white">{market.tick}</span>
      </div>
      <p className="mt-3 text-[15px] font-semibold leading-5">{market.name}</p>
      <p className="mt-2 text-2xl font-bold tabular-nums tracking-tight">{num(quote.price, market.digits)}</p>
      <div className="mt-2 flex items-center justify-between gap-2">
        <Sparkline series={quote.series} up={up} />
        <span className={`text-sm font-semibold tabular-nums ${up ? "text-mint" : "text-coral"}`}>
          {signed(quote.change)}{" "}
          <span className="text-xs font-medium text-muted">(5m)</span>
        </span>
      </div>
    </Link>
  );
}

export function MarketRow({ market, quote }: { market: Market; quote: Quote }) {
  const up = quote.change >= 0;
  return (
    <Link
      href={`/markets/${market.id}`}
      className="tap flex items-center gap-3 rounded-2xl bg-surface-2 px-4 py-3 hover:bg-surface-3"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink-900 text-xs font-bold text-white">
        {market.badge}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-semibold">{market.name}</p>
        <p className="text-xs text-muted">{market.short} · {market.tick}</p>
      </div>
      <Sparkline series={quote.series} up={up} width={70} height={28} />
      <div className="w-24 text-right">
        <p className="text-[15px] font-bold tabular-nums">{num(quote.price, market.digits)}</p>
        <p className={`text-xs font-semibold tabular-nums ${up ? "text-mint" : "text-coral"}`}>{signed(quote.change)}</p>
      </div>
    </Link>
  );
}
