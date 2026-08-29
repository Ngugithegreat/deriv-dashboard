"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore, USER } from "@/app/providers";
import { Sheet } from "./Sheet";
import { AccountMark, AccountTitle } from "./AccountCard";
import { Amount, Segmented } from "./ui";
import {
  AgentIcon,
  ChevronRight,
  DollarIcon,
  ShieldIcon,
  SparkleIcon,
  TransferIcon,
  TrendIcon,
} from "./icons";

const LINKS = [
  { id: "settings", label: "Account settings", hint: "Personal details, verification", href: "/account", Icon: ShieldIcon },
  { id: "cashier", label: "Cashier", hint: "Deposit, withdraw, transfer", href: "/portfolio", Icon: DollarIcon },
  { id: "statement", label: "Statement", hint: "Every transaction on your account", href: "/transactions", Icon: TransferIcon },
  { id: "markets", label: "Markets", hint: "Live prices across all instruments", href: "/markets", Icon: TrendIcon },
  { id: "agents", label: "Payment agents", hint: "Fund in your local currency", href: "/portfolio", Icon: AgentIcon },
];

export function ProfileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const { mode, setMode, accounts, balanceOf, estTotal, theme, setTheme, say } = useStore();
  const [dark, setDark] = useState(theme === "dark");

  function go(href: string) {
    onClose();
    router.push(href);
  }

  return (
    <Sheet open={open} onClose={onClose} title="Account" side="right">
      <div className="rounded-2xl bg-ink-800 p-4 text-white">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-base font-bold">
            {USER.initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[17px] font-bold leading-6">{USER.name}</p>
            <p className="truncate text-xs text-white/60">{USER.id} · {USER.email}</p>
          </div>
        </div>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs text-white/55">Total assets</p>
            <Amount value={estTotal} size="md" />
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-mint/20 px-2.5 py-1 text-[11px] font-bold text-mint">
            <ShieldIcon width={12} height={12} /> Verified
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-sm font-bold">Accounts</p>
        <Segmented
          tone="light"
          value={mode}
          onChange={setMode}
          options={[
            { value: "real", label: "Real" },
            { value: "demo", label: "Demo" },
          ]}
        />
      </div>
      <ul className="mt-3 space-y-2">
        {accounts.map((a) => (
          <li key={a.id} className="flex items-center gap-3 rounded-2xl bg-surface-2 px-3 py-2.5">
            <AccountMark account={a} size={34} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[15px] font-semibold">
                <AccountTitle account={a} />
              </span>
              <span className="block text-xs capitalize text-muted">{mode} · {a.currency}</span>
            </span>
            <Amount value={balanceOf(a)} currency={a.currency} size="sm" />
          </li>
        ))}
      </ul>

      <ul className="mt-4 divide-y divide-line overflow-hidden rounded-2xl bg-surface-2">
        {LINKS.map(({ id, label, hint, href, Icon }) => (
          <li key={id}>
            <button
              onClick={() => go(href)}
              className="tap flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-surface-3"
            >
              <Icon width={20} height={20} className="shrink-0 text-muted" />
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold">{label}</span>
                <span className="block text-xs text-muted">{hint}</span>
              </span>
              <ChevronRight width={17} height={17} className="shrink-0 text-muted" />
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between rounded-2xl bg-surface-2 px-4 py-3">
          <span className="text-[15px] font-semibold">Dark mode</span>
          <button
            role="switch"
            aria-checked={dark}
            onClick={() => {
              const next = !dark;
              setDark(next);
              setTheme(next ? "dark" : "light");
            }}
            className={`tap h-7 w-12 rounded-full p-1 transition-colors ${dark ? "bg-coral" : "bg-line"}`}
          >
            <span className={`block h-5 w-5 rounded-full bg-white transition-transform ${dark ? "translate-x-5" : ""}`} />
          </button>
        </div>
        <button
          onClick={() => say("Language picker is not part of this UI demo")}
          className="tap flex w-full items-center justify-between rounded-2xl bg-surface-2 px-4 py-3"
        >
          <span className="text-[15px] font-semibold">Language</span>
          <span className="flex items-center gap-1 text-sm text-muted">
            English <ChevronRight width={16} height={16} />
          </span>
        </button>
        <button
          onClick={() => say("Amy is available from the top bar of any screen")}
          className="tap flex w-full items-center justify-between rounded-2xl bg-surface-2 px-4 py-3"
        >
          <span className="flex items-center gap-2 text-[15px] font-semibold">
            <SparkleIcon width={17} height={17} className="text-coral" /> Help centre
          </span>
          <ChevronRight width={16} height={16} className="text-muted" />
        </button>
      </div>

      <button
        onClick={() => {
          onClose();
          say("Signed out of the demo session");
        }}
        className="tap mt-4 w-full rounded-full border border-line py-3 text-[15px] font-bold text-coral hover:border-coral"
      >
        Log out
      </button>
    </Sheet>
  );
}
