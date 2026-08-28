"use client";

import { useState } from "react";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { TopBar, Avatar } from "@/components/TopBar";
import { AccountCard } from "@/components/AccountCard";
import { PromoRail } from "@/components/Promos";
import { MoneySheet } from "@/components/MoneySheet";
import { SectionTitle, Amount } from "@/components/ui";
import { useStore } from "./providers";
import { ChevronRight, TrendIcon, P2PIcon, AgentIcon, SparkleIcon } from "@/components/icons";
import { timeAgo } from "@/lib/format";

const EXPLORE = [
  { href: "/markets", label: "Markets", body: "Live derived, forex & crypto quotes", Icon: TrendIcon },
  { href: "/options", label: "Options", body: "Trade rise/fall in one tap", Icon: SparkleIcon },
  { href: "/portfolio", label: "P2P", body: "Buy USD from local traders", Icon: P2PIcon },
  { href: "/portfolio", label: "Payment agents", body: "Fund in your local currency", Icon: AgentIcon },
];

export default function HomePage() {
  const { accounts, estTotal, txns, updatedAt } = useStore();
  const [sheet, setSheet] = useState(false);
  const funded = estTotal > 0;

  return (
    <>
      <Hero>
        <TopBar left={<Avatar />} />
        <div className="mt-6 flex items-end justify-between gap-4">
          <div className="max-w-[64%]">
            <h1 className="text-[26px] font-bold leading-8 tracking-tight sm:text-[30px] sm:leading-9">
              {funded ? "Fund your trading account" : "Make your first deposit"}
            </h1>
            <div className="mt-5 flex gap-2">
              <span className="h-1.5 w-16 rounded-full bg-mint" />
              <span className={`h-1.5 w-16 rounded-full ${funded ? "bg-mint" : "bg-white/20"}`} />
            </div>
            <button
              onClick={() => setSheet(true)}
              className="tap mt-5 rounded-full bg-coral px-7 py-3.5 text-[17px] font-bold text-white shadow-[0_10px_26px_rgba(255,68,79,0.35)] hover:bg-coral-hover"
            >
              Deposit now
            </button>
          </div>
          <svg viewBox="0 0 140 120" className="h-28 w-32 shrink-0 sm:h-32 sm:w-40">
            <path d="M18 18v78h104" stroke="#C9CED6" strokeWidth="7" strokeLinecap="round" fill="none" />
            <rect x="46" y="24" width="16" height="52" rx="8" fill="#FF444F" />
            <rect x="74" y="14" width="16" height="62" rx="8" fill="#FF444F" />
            <rect x="102" y="38" width="16" height="38" rx="8" fill="#FF444F" />
          </svg>
        </div>
      </Hero>

      <section className="rounded-t-3xl bg-white px-4 pt-6 lg:mt-6 lg:rounded-3xl lg:px-6">
        <SectionTitle
          action={
            <Link href="/portfolio" className="flex items-center gap-0.5 text-sm font-semibold text-coral">
              Portfolio <ChevronRight width={15} height={15} />
            </Link>
          }
        >
          My trading accounts
        </SectionTitle>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <AccountCard account={accounts[0]} href="/cfds" />
          <AccountCard account={accounts[1]} href="/options" />
        </div>

        <div className="mt-7">
          <PromoRail />
        </div>

        <div className="mt-7">
          <SectionTitle>Explore Deriv</SectionTitle>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {EXPLORE.map(({ href, label, body, Icon }) => (
              <Link key={label} href={href} className="tap rounded-2xl bg-mist-100 p-4 hover:bg-mist-200">
                <Icon width={22} height={22} className="text-coral" />
                <p className="mt-3 text-[15px] font-semibold">{label}</p>
                <p className="mt-0.5 text-xs leading-4 text-mist-500">{body}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-7 pb-8">
          <SectionTitle
            action={<span className="text-xs text-mist-500">Updated {updatedAt ? timeAgo(updatedAt, Date.now()) : "—"}</span>}
          >
            Recent activity
          </SectionTitle>
          <ul className="divide-y divide-mist-200 overflow-hidden rounded-2xl bg-mist-100">
            {txns.slice(0, 4).map((t) => (
              <li key={t.id} className="flex items-center justify-between gap-3 px-4 py-3.5">
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-semibold">{t.label}</p>
                  <p className="truncate text-xs text-mist-500">{t.method}</p>
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
      </section>

      <MoneySheet kind="deposit" open={sheet} onClose={() => setSheet(false)} />
    </>
  );
}
