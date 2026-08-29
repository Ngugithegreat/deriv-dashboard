"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { TopBar, Avatar } from "@/components/TopBar";
import { AccountCard } from "@/components/AccountCard";
import { MoneySheet } from "@/components/MoneySheet";
import { SectionTitle, Amount } from "@/components/ui";
import { useStore } from "./providers";
import {
  ChevronLeft,
  ChevronRight,
  CloseIcon,
  Mt5Badge,
  MoreBadge,
  OptionsBadge,
  P2PBadge,
  RefreshIcon,
  TradingViewBadge,
} from "@/components/icons";

const EXPLORE = [
  { label: "CFDs | Standard", href: "/cfds", mark: <Mt5Badge tag="STD" size={34} /> },
  { label: "Options", href: "/options", mark: <OptionsBadge size={34} /> },
  { label: "TradingView", href: "/markets", mark: <TradingViewBadge size={34} /> },
  { label: "Swap-Free", href: "/cfds", mark: <Mt5Badge tag="SWF" size={34} /> },
  { label: "P2P", href: "/portfolio", mark: <P2PBadge size={34} /> },
  { label: "More", href: "/markets", mark: <MoreBadge size={34} /> },
];

const HIGHLIGHTS = [
  {
    id: "metals",
    title: "Metals",
    body: "Key metals. Tight spreads. Up to 1:800 leverage.",
    tags: ["MT5", "Gold", "Silver", "Copper"],
    art: "linear-gradient(135deg,#3a2c12,#c9a227 45%,#5d4a1c)",
  },
  {
    id: "indices",
    title: "US Indices",
    body: "1:400 leverage and reduced spreads on America's top indices.",
    tags: ["US Tech 100", "US SP 500"],
    art: "linear-gradient(135deg,#0b1c3a,#2a4c8f 55%,#7d1f2b)",
  },
  {
    id: "crypto",
    title: "Crypto",
    body: "Trade BTC and ETH around the clock, weekends included.",
    tags: ["BTC", "ETH", "24/7"],
    art: "linear-gradient(135deg,#1b1526,#6d3bd6 50%,#f7931a)",
  },
];

export default function HomePage() {
  const { accounts, estTotal, hidden } = useStore();
  const [sheet, setSheet] = useState(false);
  const fin = accounts.find((a) => a.id === "mt5-fin")!;
  const std = accounts.find((a) => a.id === "mt5-std")!;

  return (
    <>
      <Hero>
        <TopBar left={<Avatar />} />
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <Link href="/portfolio" className="tap flex items-center gap-1 text-[13px] text-white/60">
              Total value <ChevronRight width={14} height={14} />
            </Link>
            <div className="mt-0.5 flex items-center gap-2">
              {hidden ? (
                <span className="text-[22px] font-bold leading-7 tracking-[0.1em]">••••••</span>
              ) : (
                <Amount value={estTotal} size="lg" />
              )}
              <RefreshIcon width={17} height={17} className="text-white/70" />
            </div>
            <p className="text-[13px] text-white/50">Updated just now</p>
          </div>
          <button
            onClick={() => setSheet(true)}
            className="tap mt-2 shrink-0 rounded-full bg-coral px-6 py-2.5 text-[16px] font-bold text-white hover:bg-coral-hover"
          >
            Deposit
          </button>
        </div>
      </Hero>

      <section className="bg-surface px-4 pt-6 lg:mt-6 lg:rounded-3xl lg:px-6">
        <SectionTitle>My trading accounts</SectionTitle>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <AccountCard account={fin} href="/cfds" />
          <AccountCard account={std} href="/cfds" />
        </div>

        <div className="mt-6">
          <PromoRail />
        </div>

        <div className="mt-8">
          <SectionTitle>Explore Deriv</SectionTitle>
          <div className="grid grid-cols-3 gap-y-5 lg:grid-cols-6">
            {EXPLORE.map((e) => (
              <Link key={e.label} href={e.href} className="tap flex flex-col items-center gap-2">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-2">
                  {e.mark}
                </span>
                <span className="max-w-[92px] text-center text-xs font-medium leading-4">
                  {e.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <WhatsNew />

        <div className="mt-8 pb-8">
          <Highlights />
        </div>
      </section>

      <MoneySheet kind="deposit" open={sheet} onClose={() => setSheet(false)} />
    </>
  );
}

const PROMOS = [
  {
    id: "ai",
    title: "AI market analysis",
    body: "Get AI-powered insights on Gold, BTC, Silver, ETH, and more.",
  },
  {
    id: "tv",
    title: "Trade with TradingView",
    body: "Advanced charts and tools for 24/7 Derived Indices.",
  },
];

function PromoRail() {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const items = PROMOS.filter((p) => !dismissed.includes(p.id));
  if (!items.length) return null;

  return (
    <div>
      <div
        onScroll={(e) => {
          const el = e.currentTarget;
          setIndex(Math.round(el.scrollLeft / (el.clientWidth * 0.94)));
        }}
        className="no-bar snap-rail -mx-4 flex gap-3 overflow-x-auto px-4 lg:mx-0 lg:px-0"
      >
        {items.map((p) => (
          <article
            key={p.id}
            className="relative flex w-[94%] shrink-0 items-center gap-3 overflow-hidden rounded-2xl bg-ink-800 p-4 pr-12 text-white sm:w-[440px]"
          >
            <div className="min-w-0 flex-1">
              <h3 className="text-[17px] font-bold leading-6">{p.title}</h3>
              <p className="mt-1 text-sm leading-5 text-white/60">{p.body}</p>
            </div>
            <PromoArt id={p.id} />
            <button
              onClick={() => setDismissed((d) => [...d, p.id])}
              aria-label="Dismiss"
              className="tap absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20"
            >
              <CloseIcon width={14} height={14} />
            </button>
          </article>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-center gap-1.5">
        {items.map((p, i) => (
          <span
            key={p.id}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-7 bg-fg" : "w-1.5 bg-line"}`}
          />
        ))}
      </div>
    </div>
  );
}

function PromoArt({ id }: { id: string }) {
  if (id === "ai")
    return (
      <svg viewBox="0 0 90 64" className="h-16 w-24 shrink-0" aria-hidden>
        <rect x="10" y="8" width="52" height="40" rx="5" fill="#F4F5F7" />
        <path d="M16 40l10-12 8 8 12-18" stroke="#FF444F" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <circle cx="70" cy="40" r="12" fill="#F7931A" />
        <text x="70" y="45" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">₿</text>
        <rect x="4" y="46" width="34" height="10" rx="3" fill="#C9A227" />
      </svg>
    );
  return (
    <svg viewBox="0 0 90 64" className="h-16 w-24 shrink-0" aria-hidden>
      <rect x="6" y="16" width="40" height="30" rx="5" fill="#E8656E" />
      <rect x="50" y="12" width="36" height="34" rx="5" fill="#0E0E0E" stroke="#3a3f4b" />
      <path d="M58 36l6-8 5 6 7-11" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function WhatsNew() {
  const [gone, setGone] = useState(false);
  if (gone) return null;
  return (
    <div className="relative mt-6 flex items-center gap-4 overflow-hidden rounded-2xl bg-surface-2 p-4 pr-10">
      <div className="min-w-0 flex-1">
        <p className="text-[17px] font-bold">What&apos;s new in Deriv</p>
        <p className="mt-1 text-sm leading-5 text-muted">
          Explore a unified wallet, faster trading, and more.
        </p>
      </div>
      <svg viewBox="0 0 64 64" className="h-16 w-16 shrink-0 rounded-xl" aria-hidden>
        <rect width="64" height="64" rx="10" fill="#1a1013" />
        <path d="M20 46V18h10c9 0 15 5.6 15 14s-6 14-15 14z" fill="#FF6A50" />
        <circle cx="46" cy="20" r="5" fill="#ff9d7a" opacity=".75" />
      </svg>
      <button
        onClick={() => setGone(true)}
        aria-label="Dismiss"
        className="tap absolute right-3 top-3 text-muted hover:text-fg"
      >
        <CloseIcon width={16} height={16} />
      </button>
    </div>
  );
}

function Highlights() {
  const rail = useRef<HTMLDivElement>(null);
  const scroll = (dir: -1 | 1) =>
    rail.current?.scrollBy({ left: dir * (rail.current.clientWidth * 0.8), behavior: "smooth" });

  return (
    <>
      <div className="mb-3 flex items-center justify-between px-1">
        <h2 className="text-[19px] font-bold tracking-tight">Highlights</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll(-1)}
            aria-label="Previous"
            className="tap flex h-8 w-8 items-center justify-center rounded-full border border-line hover:bg-surface-2"
          >
            <ChevronLeft width={16} height={16} />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Next"
            className="tap flex h-8 w-8 items-center justify-center rounded-full border border-line hover:bg-surface-2"
          >
            <ChevronRight width={16} height={16} />
          </button>
        </div>
      </div>
      <div ref={rail} className="no-bar snap-rail -mx-4 flex gap-3 overflow-x-auto px-4 lg:mx-0 lg:px-0">
        {HIGHLIGHTS.map((h) => (
          <article key={h.id} className="w-[72%] shrink-0 overflow-hidden rounded-2xl bg-surface-2 sm:w-[280px]">
            <div className="h-32" style={{ background: h.art }} />
            <div className="p-4">
              <p className="text-[17px] font-bold">{h.title}</p>
              <p className="mt-1 text-sm leading-5 text-muted">{h.body}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {h.tags.map((t) => (
                  <span key={t} className="rounded-md bg-surface px-2 py-1 text-[11px] font-semibold">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
