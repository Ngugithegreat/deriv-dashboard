"use client";

import { useMemo, useState } from "react";
import { Hero } from "@/components/Hero";
import { TopBar } from "@/components/TopBar";
import { MarketRow } from "@/components/MarketCard";
import { SectionTitle, Segmented } from "@/components/ui";
import { SearchIcon } from "@/components/icons";
import { MARKETS, useQuotes } from "@/lib/markets";

type Group = "all" | "derived" | "forex" | "crypto";

export default function MarketsPage() {
  const quotes = useQuotes(900);
  const [group, setGroup] = useState<Group>("all");
  const [q, setQ] = useState("");

  const list = useMemo(
    () =>
      MARKETS.filter((m) => (group === "all" ? true : m.group === group)).filter((m) =>
        `${m.name} ${m.short}`.toLowerCase().includes(q.toLowerCase()),
      ),
    [group, q],
  );

  return (
    <>
      <Hero>
        <TopBar />
        <div className="mt-6">
          <h1 className="text-[28px] font-bold tracking-tight">Markets</h1>
          <p className="mt-1 text-sm text-white/60">
            Simulated feed — {MARKETS.length} instruments updating live in your browser.
          </p>
          <div className="mt-5 flex items-center gap-2 rounded-full bg-white/10 px-4 py-3">
            <SearchIcon width={18} height={18} className="text-white/60" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search markets"
              className="w-full bg-transparent text-[15px] text-white placeholder:text-white/40 focus:outline-none"
            />
          </div>
          <div className="no-bar -mx-4 mt-4 overflow-x-auto px-4 lg:mx-0 lg:px-0">
            <Segmented
              value={group}
              onChange={setGroup}
              options={[
                { value: "all", label: "All" },
                { value: "derived", label: "Derived" },
                { value: "forex", label: "Forex" },
                { value: "crypto", label: "Crypto" },
              ]}
            />
          </div>
        </div>
      </Hero>

      <section className="rounded-t-3xl bg-surface px-4 pt-6 lg:mt-6 lg:rounded-3xl lg:px-6">
        <SectionTitle action={<span className="text-xs text-muted">{list.length} shown</span>}>
          Instruments
        </SectionTitle>
        <ul className="space-y-2 pb-8">
          {list.map((m) => (
            <li key={m.id}>
              <MarketRow market={m} quote={quotes[m.id]} />
            </li>
          ))}
          {!list.length && (
            <li className="rounded-2xl bg-surface-2 p-8 text-center text-sm text-muted">
              No market matches “{q}”.
            </li>
          )}
        </ul>
      </section>
    </>
  );
}
