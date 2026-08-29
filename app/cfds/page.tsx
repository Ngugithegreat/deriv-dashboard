"use client";

import { useState } from "react";
import { Hero } from "@/components/Hero";
import { TopBar } from "@/components/TopBar";
import { AccountCard } from "@/components/AccountCard";
import { MoneySheet, type MoneyKind } from "@/components/MoneySheet";
import { Amount, CircleAction, Segmented } from "@/components/ui";
import { CandlesIcon, Mt5Badge, PlatformBadge, RefreshIcon, TransferIcon } from "@/components/icons";
import { useStore } from "../providers";

const FEATURED = [
  {
    id: "gold",
    title: "Gold",
    body: "Specialised account for gold and metals",
    badge: <Mt5Badge tag="GOLD" size={34} />,
    name: "Gold",
    art: "linear-gradient(160deg,#0d0d0f,#1c1a12)",
  },
  {
    id: "swf",
    title: "Swap-Free",
    body: "Hold positions overnight with no swap charges",
    badge: <Mt5Badge tag="SWF" size={34} />,
    name: "Swap-Free",
    art: "linear-gradient(160deg,#0b1417,#122a2a)",
  },
];

const AVAILABLE = [
  {
    id: "std",
    title: "CFDs | Standard",
    body: "Trade CFDs on forex, stocks, and more",
    tag: "Standard",
    mark: <Mt5Badge tag="STD" size={44} />,
  },
  {
    id: "zero",
    title: "Zero Spread",
    body: "Cost-efficient trading from 0 pips",
    tag: "Trade with 0 pips",
    mark: <Mt5Badge tag="FIN" size={44} />,
  },
  {
    id: "ctrader",
    title: "cTrader",
    body: "CFDs copy trading with 150+ assets",
    tag: "Copy Trading",
    mark: <PlatformBadge label="cT" color="#D6303C" size={44} />,
  },
];

export default function CfdsPage() {
  const { mode, setMode, accounts, cfdTotal, refresh } = useStore();
  const [sheet, setSheet] = useState<MoneyKind | null>(null);
  const [featured, setFeatured] = useState(0);
  const mt5 = accounts.filter((a) => a.kind === "mt5");

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
            <Amount value={cfdTotal} size="lg" />
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
        <h2 className="mb-3 text-[19px] font-bold tracking-tight">My accounts</h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {mt5.map((a) => (
            <AccountCard key={a.id} account={a} />
          ))}
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
              <div className="mx-2 mt-2 h-40 rounded-xl" style={{ background: f.art }} />
              <div className="p-4">
                <p className="text-[19px] font-bold">{f.title}</p>
                <p className="mt-1 text-sm leading-5 text-muted">{f.body}</p>
              </div>
              <div className="flex items-center gap-3 border-t border-line px-4 py-3">
                {f.badge}
                <span className="flex-1 text-[15px] font-semibold">{f.name}</span>
                <button
                  onClick={() => setSheet("transfer")}
                  className="tap rounded-full border border-fg/25 px-5 py-2 text-sm font-semibold hover:bg-surface-3"
                >
                  Activate now
                </button>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-3 flex justify-center gap-1.5">
          {FEATURED.map((f, i) => (
            <span key={f.id} className={`h-1.5 rounded-full ${i === featured ? "w-6 bg-fg" : "w-1.5 bg-line"}`} />
          ))}
        </div>

        <div className="mb-3 mt-8 flex items-center justify-between gap-3">
          <h2 className="text-[19px] font-bold tracking-tight">Available accounts</h2>
          <button
            onClick={() => setSheet("transfer")}
            className="tap rounded-full border border-fg/25 px-5 py-2 text-sm font-semibold hover:bg-surface-2"
          >
            Compare
          </button>
        </div>
        <div className="no-bar snap-rail -mx-4 flex gap-3 overflow-x-auto px-4 pb-8 lg:mx-0 lg:px-0">
          {AVAILABLE.map((a) => (
            <article
              key={a.id}
              className="flex w-[78%] shrink-0 flex-col rounded-2xl bg-surface-2 p-4 sm:w-[300px]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[17px] font-bold leading-6">{a.title}</p>
                  <p className="mt-1 text-sm leading-5 text-muted">{a.body}</p>
                </div>
                <span className="shrink-0">{a.mark}</span>
              </div>
              <span className="mt-4 w-fit rounded-md bg-surface px-2 py-1 text-[11px] font-semibold">
                {a.tag}
              </span>
            </article>
          ))}
        </div>
      </section>

      <MoneySheet kind={sheet ?? "deposit"} open={sheet !== null} onClose={() => setSheet(null)} />
    </>
  );
}
