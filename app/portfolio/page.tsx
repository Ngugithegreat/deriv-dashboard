"use client";

import { useState } from "react";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { TopBar } from "@/components/TopBar";
import { AccountRow } from "@/components/AccountCard";
import { MoneySheet, type MoneyKind } from "@/components/MoneySheet";
import { Amount, CircleAction, Segmented } from "@/components/ui";
import {
  ChevronRight,
  MinusIcon,
  PlusIcon,
  RefreshIcon,
  ShieldIcon,
  TransferIcon,
} from "@/components/icons";
import { useStore } from "../providers";

const TABS = ["Overview", "Wallet", "Partners", "Trading", "P2P"] as const;
type Tab = (typeof TABS)[number];

const ADVERTS = [
  { name: "AbePay", rate: 129.4, limits: "10 – 500 USD", methods: "M-Pesa, Bank transfer", orders: 812, rating: "99%" },
  { name: "SwiftPesa", rate: 129.1, limits: "5 – 250 USD", methods: "M-Pesa", orders: 431, rating: "98%" },
  { name: "NairaLink", rate: 128.8, limits: "20 – 1,000 USD", methods: "Bank transfer", orders: 1204, rating: "99%" },
];

const PARTNERS = [
  { t: "Affiliate", d: "Earn up to 45% of net revenue from referred traders.", cta: "Join programme" },
  { t: "Introducing broker", d: "Commission on every CFD lot your clients trade.", cta: "Apply as IB" },
  { t: "Payment agent", d: "Serve traders in your country and earn on volume.", cta: "Become an agent" },
  { t: "API developer", d: "Build your own terminal on the public WebSocket API.", cta: "Read the docs" },
];

export default function PortfolioPage() {
  const { wallets, trading, estTotal, refresh } = useStore();
  const [tab, setTab] = useState<Tab>("Overview");
  const [sheet, setSheet] = useState<MoneyKind | null>(null);
  const [side, setSide] = useState<"buy" | "sell">("buy");

  return (
    <>
      <Hero>
        <TopBar />
        <div className="no-bar -mx-4 mt-4 flex gap-6 overflow-x-auto px-4 lg:mx-0 lg:px-0">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`tap relative shrink-0 pb-2 text-[15px] font-semibold ${
                tab === t ? "text-white" : "text-white/50"
              }`}
            >
              {t}
              {tab === t && <span className="absolute inset-x-0 -bottom-px h-[3px] rounded-full bg-coral" />}
            </button>
          ))}
        </div>
        <div className="mt-4">
          <p className="text-[13px] text-white/60">Est. total value</p>
          <div className="flex items-center gap-2">
            <Amount value={estTotal} size="lg" />
            <button onClick={refresh} aria-label="Refresh" className="tap text-white/70 hover:text-white">
              <RefreshIcon width={18} height={18} />
            </button>
          </div>
          <p className="text-[13px] text-white/50">Updated just now</p>
          <div className="mt-5 flex gap-6">
            <CircleAction icon={<PlusIcon width={24} height={24} />} label="Deposit" primary onClick={() => setSheet("deposit")} />
            <CircleAction icon={<TransferIcon width={22} height={22} />} label="Transfer" onClick={() => setSheet("transfer")} />
            <CircleAction icon={<MinusIcon width={24} height={24} />} label="Withdraw" onClick={() => setSheet("withdraw")} />
          </div>
        </div>
      </Hero>

      <section className="bg-surface px-4 pt-6 lg:mt-6 lg:rounded-3xl lg:px-6">
        {(tab === "Overview" || tab === "Wallet") && (
          <>
            <h2 className="mb-1 text-[19px] font-bold tracking-tight">Wallet</h2>
            <div>
              {wallets.map((w) => (
                <AccountRow key={w.id} account={w} href={`/wallet/${w.id}`} />
              ))}
            </div>
          </>
        )}

        {(tab === "Overview" || tab === "Trading") && (
          <>
            <h2 className="mb-1 mt-7 text-[19px] font-bold tracking-tight">Trading</h2>
            <div>
              {trading.map((t) => (
                <AccountRow key={t.id} account={t} href={t.kind === "options" ? "/options" : "/cfds"} />
              ))}
            </div>
          </>
        )}

        {(tab === "Overview" || tab === "Wallet" || tab === "Trading") && (
          <div className="mt-7 flex justify-center pb-8">
            <Link
              href="/transactions"
              className="tap flex items-center gap-2 rounded-full border border-line px-6 py-3 text-[15px] font-semibold hover:bg-surface-2"
            >
              <TransferIcon width={18} height={18} /> View all transactions
            </Link>
          </div>
        )}

        {tab === "Partners" && (
          <div className="pb-8">
            <h2 className="mb-3 text-[19px] font-bold tracking-tight">Partnership programmes</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {PARTNERS.map((x) => (
                <div key={x.t} className="rounded-2xl bg-surface-2 p-5">
                  <p className="text-[17px] font-bold">{x.t}</p>
                  <p className="mt-1 text-sm leading-5 text-muted">{x.d}</p>
                  <span className="mt-3 inline-flex items-center gap-0.5 text-sm font-semibold text-coral">
                    {x.cta} <ChevronRight width={15} height={15} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "P2P" && (
          <div className="pb-8">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[19px] font-bold tracking-tight">Deriv P2P</h2>
              <Segmented
                tone="light"
                value={side}
                onChange={setSide}
                options={[
                  { value: "buy", label: "Buy" },
                  { value: "sell", label: "Sell" },
                ]}
              />
            </div>
            <ul className="mt-3 space-y-3">
              {ADVERTS.map((a) => (
                <li key={a.name} className="rounded-2xl bg-surface-2 p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-900 text-xs font-bold text-white">
                      {a.name.slice(0, 2).toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-1.5 truncate text-[16px] font-semibold">
                        {a.name}
                        <ShieldIcon width={14} height={14} className="text-mint" />
                      </p>
                      <p className="text-xs text-muted">
                        {a.orders} orders · {a.rating} completion
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[16px] font-bold tabular-nums">{a.rate.toFixed(2)}</p>
                      <p className="text-xs text-muted">KES / USD</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <div className="text-xs text-muted">
                      <p>Limits {a.limits}</p>
                      <p className="mt-0.5">{a.methods}</p>
                    </div>
                    <button
                      onClick={() => setSheet(side === "buy" ? "deposit" : "withdraw")}
                      className="tap rounded-full bg-coral px-5 py-2 text-sm font-bold text-white"
                    >
                      {side === "buy" ? "Buy USD" : "Sell USD"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <MoneySheet kind={sheet ?? "deposit"} open={sheet !== null} onClose={() => setSheet(null)} />
    </>
  );
}
