"use client";

import { useState } from "react";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { TopBar } from "@/components/TopBar";
import { AccountCard } from "@/components/AccountCard";
import { MoneySheet, type MoneyKind } from "@/components/MoneySheet";
import { Amount, CircleAction, SectionTitle, Segmented } from "@/components/ui";
import { CandlesIcon, PlusIcon, RefreshIcon, ChevronRight } from "@/components/icons";
import { useStore } from "../providers";
import { timeAgo } from "@/lib/format";

const SPECS = [
  { label: "Leverage", value: "up to 1:1000" },
  { label: "Spread from", value: "0.6 pips" },
  { label: "Commission", value: "None" },
  { label: "Platform", value: "MT5 · TradingView" },
];

export default function CfdsPage() {
  const { mode, setMode, accounts, cfdTotal, updatedAt, refresh } = useStore();
  const [sheet, setSheet] = useState<MoneyKind | null>(null);
  const mt5 = accounts.find((a) => a.kind === "mt5")!;

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
            <Amount value={cfdTotal} size="xl" />
            <button onClick={refresh} aria-label="Refresh" className="tap text-white/70 hover:text-white">
              <RefreshIcon width={20} height={20} />
            </button>
          </div>
          <p className="mt-1 text-sm text-white/50">
            Updated {updatedAt ? timeAgo(updatedAt, Date.now()) : "—"}
          </p>
          <div className="mt-6 flex gap-8">
            <CircleAction icon={<PlusIcon width={24} height={24} />} label="Deposit" primary onClick={() => setSheet("deposit")} />
            <CircleAction icon={<CandlesIcon width={22} height={22} />} label="Trade" onClick={() => setSheet("transfer")} />
          </div>
        </div>
      </Hero>

      <section className="rounded-t-3xl bg-surface px-4 pt-6 lg:mt-6 lg:rounded-3xl lg:px-6">
        <SectionTitle>My accounts</SectionTitle>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <AccountCard account={mt5} />
          <button
            onClick={() => setSheet("transfer")}
            className="tap flex flex-col items-start justify-center rounded-2xl border-2 border-dashed border-line p-4 text-left hover:border-coral/50"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-2 text-muted">
              <PlusIcon width={22} height={22} />
            </span>
            <p className="mt-4 text-[15px] font-semibold">Add account</p>
            <p className="text-xs text-muted">Swap-free, Zero spread…</p>
          </button>
        </div>

        <div className="mt-7">
          <SectionTitle
            action={
              <Link href="/markets" className="flex items-center gap-0.5 text-sm font-semibold text-coral">
                All markets <ChevronRight width={15} height={15} />
              </Link>
            }
          >
            Standard account
          </SectionTitle>
          <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {SPECS.map((s) => (
              <div key={s.label} className="rounded-2xl bg-surface-2 p-4">
                <dt className="text-xs text-muted">{s.label}</dt>
                <dd className="mt-1 text-[15px] font-bold">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-7 pb-8">
          <SectionTitle>Featured</SectionTitle>
          <div className="relative overflow-hidden rounded-2xl bg-ink-800 p-6 text-white">
            <div className="max-w-md">
              <p className="text-xs font-bold uppercase tracking-widest text-coral">Deriv MT5</p>
              <h3 className="mt-2 text-2xl font-bold leading-8">
                One platform. Forex, indices, commodities and 24/7 synthetics.
              </h3>
              <p className="mt-2 text-sm text-white/60">
                Institutional-grade execution with charting built for fast-moving derived indices.
              </p>
              <button
                onClick={() => setSheet("deposit")}
                className="tap mt-5 rounded-full bg-white px-6 py-3 text-sm font-bold text-ink hover:bg-mist-100"
              >
                Fund my account
              </button>
            </div>
            <div className="pointer-events-none absolute -right-6 bottom-0 hidden h-40 w-64 opacity-90 sm:block">
              <svg viewBox="0 0 240 150" className="h-full w-full">
                <path d="M8 128 L52 92 L92 108 L132 54 L176 74 L228 22" stroke="#FF444F" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M8 128 L52 92 L92 108 L132 54 L176 74 L228 22 L228 150 L8 150 Z" fill="#FF444F" opacity=".14" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <MoneySheet kind={sheet ?? "deposit"} open={sheet !== null} onClose={() => setSheet(null)} />
    </>
  );
}
