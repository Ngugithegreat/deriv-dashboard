"use client";

import { useState } from "react";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { TopBar } from "@/components/TopBar";
import { AccountCard } from "@/components/AccountCard";
import { MoneySheet, type MoneyKind } from "@/components/MoneySheet";
import { Amount, CircleAction, SectionTitle } from "@/components/ui";
import {
  AgentIcon,
  ChevronRight,
  CryptoIcon,
  DollarIcon,
  MinusIcon,
  P2PIcon,
  PlusIcon,
  RefreshIcon,
  ShieldIcon,
  TransferIcon,
} from "@/components/icons";
import { useStore } from "../providers";
import { timeAgo } from "@/lib/format";

const TABS = ["Overview", "Wallet", "Partners", "Payment agents", "Trading"] as const;
type Tab = (typeof TABS)[number];

const METHODS = [
  { id: "usd", title: "USD", body: "Fund via bank, card, e-wallet, and crypto.", Icon: DollarIcon },
  { id: "agent", title: "Payment agent", body: "Deposit and withdraw in your local currency via a verified local agent.", Icon: AgentIcon },
  { id: "p2p", title: "P2P", body: "Buy and sell USD with other traders. Deposit and withdraw in your local currency.", Icon: P2PIcon },
  { id: "crypto", title: "Crypto", body: "Deposit and withdraw in Bitcoin, Ethereum, Tether and more.", Icon: CryptoIcon },
];

const AGENTS = [
  { name: "AbePay", country: "Kenya · KES", fee: "0%", time: "~5 min", rating: "4.9" },
  { name: "SwiftPesa", country: "Kenya · KES", fee: "1%", time: "~12 min", rating: "4.7" },
  { name: "NairaLink", country: "Nigeria · NGN", fee: "0.5%", time: "~8 min", rating: "4.8" },
  { name: "CediPay", country: "Ghana · GHS", fee: "1.2%", time: "~15 min", rating: "4.6" },
];

export default function PortfolioPage() {
  const { accounts, estTotal, walletTotal, txns, updatedAt, refresh } = useStore();
  const [tab, setTab] = useState<Tab>("Overview");
  const [sheet, setSheet] = useState<MoneyKind | null>(null);

  return (
    <>
      <Hero>
        <TopBar />
        <div className="no-bar mt-5 -mx-4 flex gap-6 overflow-x-auto px-4 lg:mx-0 lg:px-0">
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
        <div className="mt-5">
          <p className="text-sm text-white/60">Est. total value</p>
          <div className="mt-0.5 flex items-center gap-3">
            <Amount value={estTotal} size="xl" />
            <button onClick={refresh} aria-label="Refresh" className="tap text-white/70 hover:text-white">
              <RefreshIcon width={20} height={20} />
            </button>
          </div>
          <p className="mt-1 text-sm text-white/50">
            Updated {updatedAt ? timeAgo(updatedAt, Date.now()) : "—"}
          </p>
          <div className="mt-6 flex gap-6">
            <CircleAction icon={<PlusIcon width={24} height={24} />} label="Deposit" primary onClick={() => setSheet("deposit")} />
            <CircleAction icon={<TransferIcon width={22} height={22} />} label="Transfer" onClick={() => setSheet("transfer")} />
            <CircleAction icon={<MinusIcon width={24} height={24} />} label="Withdraw" onClick={() => setSheet("withdraw")} />
          </div>
        </div>
      </Hero>

      <section className="rounded-t-3xl bg-surface px-4 pt-6 lg:mt-6 lg:rounded-3xl lg:px-6">
        {tab === "Overview" && (
          <>
            <SectionTitle>Browse all payment methods</SectionTitle>
            <ul className="space-y-3">
              {METHODS.map(({ id, title, body, Icon }) => (
                <li key={id}>
                  <button
                    onClick={() => setSheet("deposit")}
                    className="tap flex w-full items-center gap-4 rounded-2xl bg-surface-2 p-4 text-left hover:bg-surface-3"
                  >
                    <Icon width={26} height={26} className="shrink-0 text-fg" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[17px] font-semibold">{title}</span>
                      <span className="mt-0.5 block text-sm leading-5 text-muted">{body}</span>
                    </span>
                    <ChevronRight width={18} height={18} className="shrink-0 text-muted" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-7 pb-8">
              <SectionTitle
                action={
                  <Link href="/transactions" className="flex items-center gap-0.5 text-sm font-semibold text-coral">
                    Statement <ChevronRight width={15} height={15} />
                  </Link>
                }
              >
                Recent transactions
              </SectionTitle>
              <ul className="divide-y divide-line overflow-hidden rounded-2xl bg-surface-2">
                {txns.map((t) => (
                  <li key={t.id} className="flex items-center justify-between gap-3 px-4 py-3.5">
                    <div className="min-w-0">
                      <p className="truncate text-[15px] font-semibold">{t.label}</p>
                      <p className="truncate text-xs text-muted">{t.method}</p>
                    </div>
                    <div className="text-right">
                      <Amount value={t.amount} currency={t.currency} size="sm" />
                      <p
                        className={`text-xs font-semibold capitalize ${
                          t.status === "completed" ? "text-mint" : t.status === "pending" ? "text-amber-500" : "text-coral"
                        }`}
                      >
                        {t.status}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {tab === "Wallet" && (
          <div className="pb-8">
            <SectionTitle>Your wallets</SectionTitle>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {accounts.map((a) => (
                <AccountCard key={a.id} account={a} />
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-surface-2 p-5">
              <p className="text-sm text-muted">Available to withdraw</p>
              <Amount value={walletTotal} size="lg" />
              <button
                onClick={() => setSheet("withdraw")}
                className="tap mt-4 rounded-full bg-ink-900 px-6 py-3 text-sm font-bold text-white"
              >
                Withdraw funds
              </button>
            </div>
          </div>
        )}

        {tab === "Partners" && (
          <div className="pb-8">
            <SectionTitle>Partnership programmes</SectionTitle>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { t: "Affiliate", d: "Earn up to 45% of net revenue from referred traders.", cta: "Join programme" },
                { t: "Introducing broker", d: "Commission on every CFD lot your clients trade.", cta: "Apply as IB" },
                { t: "Payment agent", d: "Serve traders in your country and earn on volume.", cta: "Become an agent" },
                { t: "API developer", d: "Build your own terminal on the public WebSocket API.", cta: "Read the docs" },
              ].map((x) => (
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

        {tab === "Payment agents" && (
          <div className="pb-8">
            <SectionTitle>Verified agents near you</SectionTitle>
            <ul className="space-y-3">
              {AGENTS.map((a) => (
                <li key={a.name} className="flex items-center gap-4 rounded-2xl bg-surface-2 p-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink-900 text-sm font-bold text-white">
                    {a.name.slice(0, 2).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1.5 text-[16px] font-semibold">
                      {a.name}
                      <ShieldIcon width={15} height={15} className="text-mint" />
                    </p>
                    <p className="text-xs text-muted">
                      {a.country} · fee {a.fee} · {a.time} · ★ {a.rating}
                    </p>
                  </div>
                  <button
                    onClick={() => setSheet("deposit")}
                    className="tap rounded-full bg-coral px-4 py-2 text-sm font-bold text-white"
                  >
                    Deposit
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === "Trading" && (
          <div className="pb-8">
            <SectionTitle>Open positions</SectionTitle>
            <div className="rounded-2xl bg-surface-2 p-8 text-center">
              <p className="text-[17px] font-semibold">No open positions</p>
              <p className="mx-auto mt-1 max-w-xs text-sm text-muted">
                Positions you open on Options or MT5 will appear here with live profit and loss.
              </p>
              <button
                onClick={() => setSheet("deposit")}
                className="tap mt-4 rounded-full bg-coral px-6 py-3 text-sm font-bold text-white"
              >
                Fund and trade
              </button>
            </div>
          </div>
        )}
      </section>

      <MoneySheet kind={sheet ?? "deposit"} open={sheet !== null} onClose={() => setSheet(null)} />
    </>
  );
}
