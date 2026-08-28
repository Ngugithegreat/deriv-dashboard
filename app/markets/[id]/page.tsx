"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Hero } from "@/components/Hero";
import { TopBar } from "@/components/TopBar";
import { Segmented, SectionTitle } from "@/components/ui";
import { ChevronLeft } from "@/components/icons";
import { MARKETS, sparkPath, useQuotes } from "@/lib/markets";
import { num, signed } from "@/lib/format";
import { useStore } from "@/app/providers";

const DURATIONS = ["1 tick", "5 ticks", "1 min", "5 min"];

export default function MarketDetailPage() {
  const params = useParams<{ id: string }>();
  const quotes = useQuotes(800);
  const { say, mode } = useStore();
  const [dir, setDir] = useState<"rise" | "fall">("rise");
  const [stake, setStake] = useState("10");
  const [duration, setDuration] = useState(DURATIONS[1]);

  const market = MARKETS.find((m) => m.id === params.id);
  const quote = market ? quotes[market.id] : undefined;

  const chart = useMemo(() => {
    if (!quote) return null;
    const w = 700;
    const h = 220;
    return { w, h, d: sparkPath(quote.series, w, h, 6) };
  }, [quote]);

  if (!market || !quote || !chart) {
    return (
      <div className="p-8">
        <p className="text-lg font-semibold">Market not found.</p>
        <Link href="/markets" className="mt-3 inline-block font-semibold text-coral">
          Back to markets
        </Link>
      </div>
    );
  }

  const up = quote.change >= 0;
  const payout = (Number(stake) || 0) * 1.94;

  return (
    <>
      <Hero>
        <TopBar
          left={
            <Link
              href="/markets"
              className="tap flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
            >
              <ChevronLeft width={20} height={20} />
            </Link>
          }
          center={<span className="text-[15px] font-bold">{market.short}</span>}
        />
        <div className="mt-6">
          <p className="text-sm text-white/60">{market.name}</p>
          <div className="mt-1 flex items-baseline gap-3">
            <span className="text-[34px] font-bold tabular-nums leading-10 tracking-tight">
              {num(quote.price, market.digits)}
            </span>
            <span className={`text-base font-semibold tabular-nums ${up ? "text-mint" : "text-coral"}`}>
              {signed(quote.change)}
            </span>
          </div>
          <svg
            viewBox={`0 0 ${chart.w} ${chart.h}`}
            preserveAspectRatio="none"
            className="mt-4 h-48 w-full"
          >
            <defs>
              <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={up ? "#00C390" : "#FF444F"} stopOpacity="0.35" />
                <stop offset="100%" stopColor={up ? "#00C390" : "#FF444F"} stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0.25, 0.5, 0.75].map((f) => (
              <line
                key={f}
                x1="0"
                x2={chart.w}
                y1={chart.h * f}
                y2={chart.h * f}
                stroke="#ffffff"
                strokeOpacity="0.08"
                strokeDasharray="4 6"
              />
            ))}
            <path d={`${chart.d} L${chart.w - 6},${chart.h} L6,${chart.h} Z`} fill="url(#area)" />
            <path
              d={chart.d}
              fill="none"
              stroke={up ? "#00C390" : "#FF444F"}
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </Hero>

      <section className="rounded-t-3xl bg-surface px-4 pt-6 lg:mt-6 lg:rounded-3xl lg:px-6">
        <SectionTitle>Place a trade</SectionTitle>
        <div className="rounded-2xl bg-surface-2 p-4">
          <Segmented
            tone="light"
            value={dir}
            onChange={setDir}
            options={[
              { value: "rise", label: "Rise" },
              { value: "fall", label: "Fall" },
            ]}
          />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-muted">Stake (USD)</span>
              <input
                inputMode="decimal"
                value={stake}
                onChange={(e) => setStake(e.target.value.replace(/[^0-9.]/g, ""))}
                className="w-full rounded-xl bg-surface px-4 py-3 text-lg font-bold tabular-nums outline-none ring-coral/40 focus:ring-2"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-muted">Duration</span>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full rounded-xl bg-surface px-4 py-3.5 text-[15px] font-semibold outline-none ring-coral/40 focus:ring-2"
              >
                {DURATIONS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-surface px-4 py-3">
            <span className="text-sm text-muted">Payout if correct</span>
            <span className="text-lg font-bold tabular-nums">{payout.toFixed(2)} USD</span>
          </div>
          <button
            onClick={() =>
              say(`${dir === "rise" ? "Rise" : "Fall"} · ${stake} USD · ${duration} placed on ${market.short} (${mode})`)
            }
            className={`tap mt-4 w-full rounded-full py-3.5 text-base font-bold text-white ${
              dir === "rise" ? "bg-mint hover:brightness-95" : "bg-coral hover:bg-coral-hover"
            }`}
          >
            {dir === "rise" ? "Buy Rise" : "Buy Fall"}
          </button>
          <p className="mt-3 text-center text-xs text-muted">
            Demo interface — contracts are not sent anywhere.
          </p>
        </div>

        <div className="mt-7 pb-8">
          <SectionTitle>About this market</SectionTitle>
          <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { k: "Symbol", v: market.id },
              { k: "Type", v: market.group },
              { k: "Tick interval", v: market.tick },
              { k: "Trading hours", v: market.group === "derived" ? "24/7" : "24/5" },
            ].map((x) => (
              <div key={x.k} className="rounded-2xl bg-surface-2 p-4">
                <dt className="text-xs text-muted">{x.k}</dt>
                <dd className="mt-1 text-[15px] font-bold capitalize">{x.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
