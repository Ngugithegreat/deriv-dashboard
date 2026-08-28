"use client";

import Link from "next/link";
import { Hero } from "@/components/Hero";
import { TopBar } from "@/components/TopBar";
import { SectionTitle } from "@/components/ui";
import { ChevronRight, ShieldIcon } from "@/components/icons";
import { useStore } from "../providers";

const ROWS = [
  { t: "Personal details", d: "Name, date of birth, address" },
  { t: "Proof of identity", d: "Verified · expires in 11 months" },
  { t: "Proof of address", d: "Verified" },
  { t: "Two-factor authentication", d: "Off — recommended" },
  { t: "Login history", d: "3 devices active" },
  { t: "API tokens", d: "1 read-only token" },
];

export default function AccountPage() {
  const { hidden, toggleHidden, mode, setMode, say, theme, setTheme, resetDemo } = useStore();

  return (
    <>
      <Hero>
        <TopBar />
        <div className="mt-6 flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-xl font-bold">
            SM
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Sam Mwangi</h1>
            <p className="text-sm text-white/60">CR9184472 · Kenya · USD</p>
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-mint/20 px-3 py-1 text-xs font-bold text-mint">
              <ShieldIcon width={13} height={13} /> Verified
            </span>
          </div>
        </div>
      </Hero>

      <section className="rounded-t-3xl bg-surface px-4 pt-6 lg:mt-6 lg:rounded-3xl lg:px-6">
        <SectionTitle>Preferences</SectionTitle>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-2xl bg-surface-2 p-4">
            <div>
              <p className="text-[15px] font-semibold">Hide balances</p>
              <p className="text-xs text-muted">Blur every amount across the app</p>
            </div>
            <button
              onClick={toggleHidden}
              role="switch"
              aria-checked={hidden}
              className={`tap h-7 w-12 rounded-full p-1 transition-colors ${hidden ? "bg-coral" : "bg-line"}`}
            >
              <span
                className={`block h-5 w-5 rounded-full bg-surface transition-transform ${hidden ? "translate-x-5" : ""}`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-surface-2 p-4">
            <div>
              <p className="text-[15px] font-semibold">Default account</p>
              <p className="text-xs text-muted">Open the app on this account type</p>
            </div>
            <div className="flex rounded-full bg-surface p-1">
              {(["real", "demo"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`tap rounded-full px-4 py-1.5 text-sm font-bold capitalize ${
                    mode === m ? "bg-ink-900 text-white" : "text-muted"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 space-y-3">
          <div className="flex items-center justify-between gap-3 rounded-2xl bg-surface-2 p-4">
            <div>
              <p className="text-[15px] font-semibold">Appearance</p>
              <p className="text-xs text-muted">Follows your device unless you pick one</p>
            </div>
            <div className="flex rounded-full bg-surface p-1">
              {(["light", "dark", "system"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`tap rounded-full px-3 py-1.5 text-xs font-bold capitalize ${
                    theme === t ? "bg-ink-900 text-white" : "text-muted"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 rounded-2xl bg-surface-2 p-4">
            <div>
              <p className="text-[15px] font-semibold">Reset demo data</p>
              <p className="text-xs text-muted">Restore the starting balances and transactions</p>
            </div>
            <button
              onClick={resetDemo}
              className="tap shrink-0 rounded-full border border-line px-4 py-2 text-sm font-bold hover:border-coral hover:text-coral"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="mt-7">
          <SectionTitle>Account settings</SectionTitle>
          <ul className="divide-y divide-line overflow-hidden rounded-2xl bg-surface-2">
            {ROWS.map((r) => (
              <li key={r.t}>
                <button
                  onClick={() => say(`${r.t} — not part of this UI demo`)}
                  className="tap flex w-full items-center gap-3 px-4 py-3.5 text-left hover:bg-surface-3"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-semibold">{r.t}</span>
                    <span className="block text-xs text-muted">{r.d}</span>
                  </span>
                  <ChevronRight width={18} height={18} className="text-muted" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-7 pb-8">
          <Link
            href="/"
            className="tap flex items-center justify-center rounded-full border border-line py-3.5 text-[15px] font-bold text-fg hover:border-fg"
          >
            Back to dashboard
          </Link>
        </div>
      </section>
    </>
  );
}
