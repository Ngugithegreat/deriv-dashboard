"use client";

import { useState } from "react";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { TopBar } from "@/components/TopBar";
import { MoneySheet, type MoneyKind } from "@/components/MoneySheet";
import { MarketTile } from "@/components/MarketCard";
import { Amount, CircleAction, Segmented } from "@/components/ui";
import {
  ArrowRightIcon,
  CandlesIcon,
  PlatformBadge,
  RefreshIcon,
  TradeTypeGlyph,
  TransferIcon,
} from "@/components/icons";
import { MARKETS, useQuotes } from "@/lib/markets";
import { useStore } from "../providers";

const PLATFORMS = [
  { id: "dt", name: "Deriv Trader", body: "Trade options on 100+ markets. No overnight swap fees.", label: "DT", color: "#FF444F" },
  { id: "db", name: "Deriv Bot", body: "Build and run automated bots, no coding needed.", label: "DB", color: "#D6303C" },
  { id: "st", name: "SmartTrader", body: "Classic interface for advanced options traders.", label: "ST", color: "#2A3B70" },
];

const TRADE_TYPES = [
  "Rise/Fall",
  "Higher/Lower",
  "Matches/Differs",
  "Even/Odd",
  "Accumulators",
  "Over/Under",
  "Multipliers",
  "Touch/No Touch",
  "Vanillas",
  "Turbos",
];

const FEATURED = [
  {
    id: "rf",
    title: "Rise / Fall",
    body: "Predict whether the market price will rise or fall by the end of your contract.",
    chips: ["100+ markets", "From 1 USD"],
    art: "linear-gradient(160deg,#101319,#1d2431)",
  },
  {
    id: "acc",
    title: "Accumulators",
    body: "Grow your stake by a fixed rate for every tick that stays inside the range.",
    chips: ["Up to 5% / tick", "From 1 USD"],
    art: "linear-gradient(160deg,#141018,#2c1d33)",
  },
];

export default function OptionsPage() {
  const { mode, setMode, optionsTotal, refresh } = useStore();
  const [sheet, setSheet] = useState<MoneyKind | null>(null);
  const [platform, setPlatform] = useState("Deriv Trader");
  const [featured, setFeatured] = useState(0);
  const quotes = useQuotes();
  const top = MARKETS.filter((m) => m.group === "derived").slice(0, 5);

  return (
    <>
      <Hero>
        <TopBar
          center={
            <Segmented
              value={mode}
              onChange={setMode}
              options={[
                { value: "real", label: "Real" },
                { value: "demo", label: "Demo" },
              ]}
            />
          }
        />
        <div className="mt-4">
          <p className="text-[13px] text-white/60">Total trading value</p>
          <div className="flex items-center gap-2">
            <Amount value={optionsTotal} size="lg" />
            <button onClick={refresh} aria-label="Refresh" className="tap text-white/70 hover:text-white">
              <RefreshIcon width={18} height={18} />
            </button>
          </div>
          <p className="text-[13px] text-white/50">Updated just now</p>
          <div className="mt-5 flex justify-center gap-14">
            <CircleAction icon={<CandlesIcon width={22} height={22} />} label="Trade" primary onClick={() => setSheet("deposit")} />
            <CircleAction icon={<TransferIcon width={22} height={22} />} label="Transfer" onClick={() => setSheet("transfer")} />
          </div>
        </div>
      </Hero>

      <section className="bg-surface px-4 pt-6 lg:mt-6 lg:rounded-3xl lg:px-6">
        <h2 className="mb-3 text-[19px] font-bold tracking-tight">Most traded markets</h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {top.map((m) => (
            <MarketTile key={m.id} market={m} quote={quotes[m.id]} />
          ))}
          <Link
            href="/markets"
            className="tap flex flex-col items-center justify-center gap-2 rounded-2xl bg-surface-2 p-4 hover:bg-surface-3"
          >
            <ArrowRightIcon width={22} height={22} />
            <span className="text-[15px] font-semibold">View all</span>
          </Link>
        </div>

        <h2 className="mb-3 mt-8 text-[19px] font-bold tracking-tight">Featured</h2>
        <div
          onScroll={(e) => {
            const el = e.currentTarget;
            setFeatured(Math.round(el.scrollLeft / (el.clientWidth * 0.96)));
          }}
          className="no-bar snap-rail -mx-4 flex gap-3 overflow-x-auto px-4 lg:mx-0 lg:px-0"
        >
          {FEATURED.map((f) => (
            <article key={f.id} className="w-[96%] shrink-0 overflow-hidden rounded-2xl bg-surface-2 sm:w-[440px]">
              <div className="mx-2 mt-2 h-36 rounded-xl" style={{ background: f.art }} />
              <div className="p-4">
                <p className="text-[19px] font-bold">{f.title}</p>
                <p className="mt-1 text-sm leading-5 text-muted">{f.body}</p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {f.chips.map((c) => (
                      <span key={c} className="rounded-md bg-surface px-2 py-1 text-[11px] font-semibold">
                        {c}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setSheet("deposit")}
                    className="tap shrink-0 rounded-full border border-fg/25 px-5 py-2 text-sm font-semibold hover:bg-surface-3"
                  >
                    Trade now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-3 flex justify-center gap-1.5">
          {FEATURED.map((f, i) => (
            <span key={f.id} className={`h-1.5 rounded-full ${i === featured ? "w-6 bg-fg" : "w-1.5 bg-line"}`} />
          ))}
        </div>

        <h2 className="mb-3 mt-8 text-[19px] font-bold tracking-tight">Platforms</h2>
        <ul className="space-y-3">
          {PLATFORMS.map((p) => (
            <li key={p.id}>
              <button
                onClick={() => setSheet("deposit")}
                className="tap flex w-full items-center gap-3 rounded-2xl bg-surface-2 p-4 text-left hover:bg-surface-3"
              >
                <PlatformBadge label={p.label} color={p.color} size={40} />
                <span className="min-w-0 flex-1">
                  <span className="block text-[16px] font-bold">{p.name}</span>
                  <span className="mt-0.5 block text-sm leading-5 text-muted">{p.body}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <h2 className="mb-3 mt-8 text-[19px] font-bold tracking-tight">Trade types</h2>
        <div className="no-bar -mx-4 flex gap-2 overflow-x-auto px-4 pb-3 lg:mx-0 lg:px-0">
          {PLATFORMS.map((p) => (
            <button
              key={p.id}
              onClick={() => setPlatform(p.name)}
              className={`tap shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${
                platform === p.name ? "border-fg text-fg" : "border-line text-muted hover:border-fg/40"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3 pb-8">
          {TRADE_TYPES.map((t, i) => (
            <button
              key={t}
              onClick={() => setSheet("deposit")}
              className="tap flex flex-col items-center justify-center gap-2 rounded-2xl bg-surface-2 px-2 py-5 hover:bg-surface-3"
            >
              <TradeTypeGlyph variant={i} />
              <span className="w-full truncate text-center text-xs font-medium">{t}</span>
            </button>
          ))}
        </div>
      </section>

      <MoneySheet kind={sheet ?? "deposit"} open={sheet !== null} onClose={() => setSheet(null)} />
    </>
  );
}
