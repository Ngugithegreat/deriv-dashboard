"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { TopBar } from "@/components/TopBar";
import { Amount, SectionTitle, Segmented } from "@/components/ui";
import { ChevronLeft } from "@/components/icons";
import { useStore } from "../providers";
import { timeAgo } from "@/lib/format";

type Filter = "all" | "deposit" | "withdrawal" | "transfer";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "deposit", label: "Deposits" },
  { value: "withdrawal", label: "Withdrawals" },
  { value: "transfer", label: "Transfers" },
];

function kindOf(label: string): Filter {
  const l = label.toLowerCase();
  if (l.includes("deposit")) return "deposit";
  if (l.includes("withdraw")) return "withdrawal";
  return "transfer";
}

export default function TransactionsPage() {
  const { txns } = useStore();
  const [filter, setFilter] = useState<Filter>("all");

  const list = useMemo(
    () => (filter === "all" ? txns : txns.filter((t) => kindOf(t.label) === filter)),
    [txns, filter],
  );

  const totals = useMemo(() => {
    const inflow = txns.filter((t) => kindOf(t.label) === "deposit" && t.status === "completed");
    const outflow = txns.filter((t) => kindOf(t.label) === "withdrawal");
    return {
      in: inflow.reduce((s, t) => s + t.amount, 0),
      out: outflow.reduce((s, t) => s + t.amount, 0),
      pending: txns.filter((t) => t.status === "pending").length,
    };
  }, [txns]);

  return (
    <>
      <Hero>
        <TopBar
          left={
            <Link
              href="/portfolio"
              className="tap flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
            >
              <ChevronLeft width={20} height={20} />
            </Link>
          }
          center={<span className="text-[15px] font-bold">Transactions</span>}
        />
        <div className="mt-6 grid grid-cols-3 gap-3">
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
        <div className="no-bar -mx-4 mt-5 overflow-x-auto px-4 lg:mx-0 lg:px-0">
          <Segmented value={filter} onChange={setFilter} options={FILTERS} />
        </div>
      </Hero>

      <section className="rounded-t-3xl bg-surface px-4 pt-6 lg:mt-6 lg:rounded-3xl lg:px-6">
        <SectionTitle action={<span className="text-xs text-muted">{list.length} records</span>}>
          Statement
        </SectionTitle>
        <ul className="space-y-2 pb-8">
          {list.map((t) => {
            const kind = kindOf(t.label);
            return (
              <li
                key={t.id}
                className="flex items-center gap-3 rounded-2xl bg-surface-2 px-4 py-3.5"
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold ${
                    kind === "deposit"
                      ? "bg-mint/15 text-mint"
                      : kind === "withdrawal"
                        ? "bg-coral/10 text-coral"
                        : "bg-surface-3 text-muted"
                  }`}
                >
                  {kind === "deposit" ? "+" : kind === "withdrawal" ? "−" : "⇄"}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-semibold">{t.label}</p>
                  <p className="truncate text-xs text-muted">{t.method}</p>
                  <p className="mt-0.5 text-[11px] text-muted">
                    {timeAgo(Date.now() - t.minutesAgo * 60000, Date.now())}
                  </p>
                </div>
                <div className="text-right">
                  <Amount value={t.amount} currency={t.currency} size="sm" />
                  <p
                    className={`text-xs font-semibold capitalize ${
                      t.status === "completed"
                        ? "text-mint"
                        : t.status === "pending"
                          ? "text-amber-500"
                          : "text-coral"
                    }`}
                  >
                    {t.status}
                  </p>
                </div>
              </li>
            );
          })}
          {!list.length && (
            <li className="rounded-2xl bg-surface-2 p-8 text-center text-sm text-muted">
              No {filter === "all" ? "" : filter} transactions yet.
            </li>
          )}
        </ul>
      </section>
    </>
  );
}
