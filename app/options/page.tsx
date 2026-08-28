"use client";

import { useState } from "react";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { TopBar } from "@/components/TopBar";
import { MoneySheet, type MoneyKind } from "@/components/MoneySheet";
import { MarketTile } from "@/components/MarketCard";
import { Amount, CircleAction, SectionTitle, Segmented } from "@/components/ui";
import { CandlesIcon, RefreshIcon, TransferIcon, ChevronRight } from "@/components/icons";
import { MARKETS, useQuotes } from "@/lib/markets";
import { useStore } from "../providers";
import { timeAgo } from "@/lib/format";

export default function OptionsPage() {
  const { mode, setMode, optionsTotal, updatedAt, refresh } = useStore();
  const [sheet, setSheet] = useState<MoneyKind | null>(null);
  const quotes = useQuotes();
  const top = MARKETS.filter((m) => m.group === "derived").slice(0, 4);

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
        <div className="mt-6">
          <p className="text-sm text-white/60">Total trading value</p>
          <div className="mt-0.5 flex items-center gap-3">
            <Amount value={optionsTotal} size="xl" />
            <button onClick={refresh} aria-label="Refresh" className="tap text-white/70 hover:text-white">
              <RefreshIcon width={20} height={20} />
            </button>
          </div>
          <p className="mt-1 text-sm text-white/50">
            Updated {updatedAt ? timeAgo(updatedAt, Date.now()) : "—"}
          </p>
          <div className="mt-6 flex gap-8">
            <CircleAction icon={<CandlesIcon width={22} height={22} />} label="Trade" primary onClick={() => setSheet("deposit")} />
            <CircleAction icon={<TransferIcon width={22} height={22} />} label="Transfer" onClick={() => setSheet("transfer")} />
          </div>
        </div>
      </Hero>

      <section className="rounded-t-3xl bg-white px-4 pt-6 lg:mt-6 lg:rounded-3xl lg:px-6">
        <SectionTitle
          action={
            <Link href="/markets" className="flex items-center gap-0.5 text-sm font-semibold text-coral">
              See all <ChevronRight width={15} height={15} />
            </Link>
          }
        >
          Most traded markets
        </SectionTitle>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {top.map((m) => (
            <MarketTile key={m.id} market={m} quote={quotes[m.id]} />
          ))}
        </div>

        <div className="mt-7 pb-8">
          <SectionTitle>Trade types</SectionTitle>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { t: "Rise / Fall", d: "Predict direction over a set duration" },
              { t: "Higher / Lower", d: "Set your own barrier price" },
              { t: "Matches / Differs", d: "Call the last digit of the tick" },
              { t: "Touch / No touch", d: "Will price touch the barrier?" },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl bg-mist-100 p-4">
                <p className="text-[15px] font-semibold">{x.t}</p>
                <p className="mt-1 text-xs leading-4 text-mist-500">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MoneySheet kind={sheet ?? "deposit"} open={sheet !== null} onClose={() => setSheet(null)} />
    </>
  );
}
