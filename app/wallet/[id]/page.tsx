"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AccountMark } from "@/components/AccountCard";
import { MoneySheet, type MoneyKind } from "@/components/MoneySheet";
import { Amount, CircleAction } from "@/components/ui";
import {
  ChevronLeft,
  EyeIcon,
  EyeOffIcon,
  MinusIcon,
  PlusIcon,
  TransferIcon,
} from "@/components/icons";
import { dayLabel, useStore, type TxnKind } from "@/app/providers";

const FILTERS: { value: "all" | TxnKind; label: string }[] = [
  { value: "all", label: "All" },
  { value: "deposit", label: "Deposit" },
  { value: "transfer", label: "Transfer" },
  { value: "withdrawal", label: "Withdraw" },
];

export default function WalletPage() {
  const params = useParams<{ id: string }>();
  const { accounts, balanceOf, txns, hidden, toggleHidden } = useStore();
  const [filter, setFilter] = useState<"all" | TxnKind>("all");
  const [sheet, setSheet] = useState<MoneyKind | null>(null);

  const wallet = accounts.find((a) => a.id === params.id);

  const groups = useMemo(() => {
    if (!wallet) return [];
    const rows = txns
      .filter((t) => t.walletId === wallet.id)
      .filter((t) => (filter === "all" ? true : t.kind === filter));
    const byDay = new Map<string, typeof rows>();
    for (const r of rows) {
      const list = byDay.get(r.date) ?? [];
      list.push(r);
      byDay.set(r.date, list);
    }
    return [...byDay.entries()].sort((a, b) => (a[0] < b[0] ? 1 : -1));
  }, [wallet, txns, filter]);

  if (!wallet) {
    return (
      <div className="p-8">
        <p className="text-lg font-semibold">Wallet not found.</p>
        <Link href="/portfolio" className="mt-3 inline-block font-semibold text-coral">
          Back to portfolio
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-b-2xl bg-surface-2 px-4 pb-6 pt-3 lg:rounded-3xl lg:px-7">
        <div className="flex items-center justify-between">
          <Link
            href="/portfolio"
            aria-label="Back"
            className="tap flex h-10 w-10 items-center justify-center rounded-full bg-surface hover:bg-surface-3"
          >
            <ChevronLeft width={19} height={19} />
          </Link>
          <button
            onClick={toggleHidden}
            aria-label={hidden ? "Show balances" : "Hide balances"}
            className="tap flex h-10 w-10 items-center justify-center rounded-full bg-surface hover:bg-surface-3"
          >
            {hidden ? <EyeOffIcon width={19} height={19} /> : <EyeIcon width={19} height={19} />}
          </button>
        </div>

        <div className="mt-1 flex flex-col items-center">
          <AccountMark account={wallet} size={64} />
          <p className="mt-3 text-[15px] text-muted">Est. balance</p>
          <Amount value={balanceOf(wallet)} currency={wallet.currency} size="xl" />
          <p className="mt-1 text-[15px] text-muted">Wallet</p>
        </div>

        <div className="mt-6 flex justify-center gap-6">
          <CircleAction tone="light" icon={<PlusIcon width={24} height={24} />} label="Deposit" primary onClick={() => setSheet("deposit")} />
          <CircleAction tone="light" icon={<TransferIcon width={22} height={22} />} label="Transfer" onClick={() => setSheet("transfer")} />
          <CircleAction tone="light" icon={<MinusIcon width={24} height={24} />} label="Withdraw" onClick={() => setSheet("withdraw")} />
        </div>
      </div>

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
                  <li
                    key={t.id}
                    className="flex items-center gap-4 border-t border-line py-4 first:border-t-0"
                  >
                    <span className="w-5 text-center text-xl leading-none text-fg">
                      {t.kind === "deposit" ? "+" : t.kind === "withdrawal" ? "−" : "⇄"}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[17px]">{t.label}</span>
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
              No {filter === "all" ? "" : filter} transactions on this wallet yet.
            </p>
          )}
        </div>
      </section>

      <MoneySheet kind={sheet ?? "deposit"} open={sheet !== null} onClose={() => setSheet(null)} />
    </>
  );
}
