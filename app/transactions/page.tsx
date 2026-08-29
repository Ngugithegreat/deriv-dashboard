"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { Hero } from "@/components/Hero";
import { Amount } from "@/components/ui";
import { ChevronLeft } from "@/components/icons";
import { dayLabel, useStore, type TxnKind } from "../providers";

const FILTERS: { value: "all" | TxnKind; label: string }[] = [
  { value: "all", label: "All" },
  { value: "deposit", label: "Deposit" },
  { value: "transfer", label: "Transfer" },
  { value: "withdrawal", label: "Withdraw" },
];

export default function TransactionsPage() {
  const { txns, accounts, hidden } = useStore();
  const [filter, setFilter] = useState<"all" | TxnKind>("all");

  const groups = useMemo(() => {
    const rows = filter === "all" ? txns : txns.filter((t) => t.kind === filter);
    const byDay = new Map<string, typeof rows>();
    for (const r of rows) {
      const list = byDay.get(r.date) ?? [];
      list.push(r);
      byDay.set(r.date, list);
    }
    return [...byDay.entries()].sort((a, b) => (a[0] < b[0] ? 1 : -1));
  }, [txns, filter]);

  const totals = useMemo(
    () => ({
      in: txns.filter((t) => t.kind === "deposit").reduce((s, t) => s + t.amount, 0),
      out: txns.filter((t) => t.kind === "withdrawal").reduce((s, t) => s + t.amount, 0),
      pending: txns.filter((t) => t.status === "pending").length,
    }),
    [txns],
  );

  const walletName = (id: string) => accounts.find((a) => a.id === id)?.title ?? "Wallet";

  return (
    <>
      <Hero>
        <TopBar
          left={
            <Link
              href="/portfolio"
              aria-label="Back"
              className="tap flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronLeft width={20} height={20} />
            </Link>
          }
          center={<span className="text-[15px] font-bold">Transactions</span>}
        />
        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-white/[0.07] p-3">
            <p className="text-xs text-white/55">Deposited</p>
            <div className="mt-1 text-mint">
              <Amount value={totals.in} size="sm" />
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.07] p-3">
            <p className="text-xs text-white/55">Withdrawn</p>
            <div className="mt-1 text-coral">
              <Amount value={totals.out} size="sm" />
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.07] p-3">
            <p className="text-xs text-white/55">Pending</p>
            <p className="mt-1 text-[15px] font-semibold">{totals.pending}</p>
          </div>
        </div>
      </Hero>

      <section className="bg-surface px-4 pt-5 lg:mt-6 lg:rounded-3xl lg:px-6">
        <div className="no-bar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:px-0">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`tap shrink-0 rounded-full border px-4 py-1.5 text-[15px] ${
                filter === f.value ? "border-fg font-semibold text-fg" : "border-line text-muted hover:border-fg/40"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="pb-8 pt-4">
          {groups.map(([date, rows]) => (
            <div key={date}>
              <p className="py-3 text-[15px] text-muted">{dayLabel(date)}</p>
              <ul>
                {rows.map((t) => (
                  <li key={t.id} className="flex items-center gap-4 border-t border-line py-4 first:border-t-0">
                    <span className="w-5 text-center text-xl leading-none">
                      {t.kind === "deposit" ? "+" : t.kind === "withdrawal" ? "−" : "⇄"}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[17px]">{t.label}</span>
                      <span className="block truncate text-xs text-muted">
                        {walletName(t.walletId)} · {t.method}
                      </span>
                      {t.status === "pending" && (
                        <span className="text-xs font-semibold text-amber-500">Pending</span>
                      )}
                    </span>
                    <span
                      className={`text-[17px] font-semibold tabular-nums ${
                        t.kind === "deposit" ? "text-mint" : t.kind === "withdrawal" ? "text-coral" : "text-fg"
                      }`}
                    >
                      <span className={hidden ? "masked-value" : ""}>{t.amount.toFixed(2)}</span> {t.currency}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {!groups.length && (
            <p className="rounded-2xl bg-surface-2 p-8 text-center text-sm text-muted">
              No {filter === "all" ? "" : filter} transactions yet.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
