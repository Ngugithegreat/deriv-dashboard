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
  const { hidden, toggleHidden, mode, setMode, say } = useStore();

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

      <section className="rounded-t-3xl bg-white px-4 pt-6 lg:mt-6 lg:rounded-3xl lg:px-6">
        <SectionTitle>Preferences</SectionTitle>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-2xl bg-mist-100 p-4">
            <div>
              <p className="text-[15px] font-semibold">Hide balances</p>
              <p className="text-xs text-mist-500">Blur every amount across the app</p>
            </div>
            <button
              onClick={toggleHidden}
              role="switch"
              aria-checked={hidden}
              className={`tap h-7 w-12 rounded-full p-1 transition-colors ${hidden ? "bg-coral" : "bg-mist-300"}`}
            >
              <span
                className={`block h-5 w-5 rounded-full bg-white transition-transform ${hidden ? "translate-x-5" : ""}`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-mist-100 p-4">
            <div>
              <p className="text-[15px] font-semibold">Default account</p>
              <p className="text-xs text-mist-500">Open the app on this account type</p>
            </div>
            <div className="flex rounded-full bg-white p-1">
              {(["real", "demo"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`tap rounded-full px-4 py-1.5 text-sm font-bold capitalize ${
                    mode === m ? "bg-ink-900 text-white" : "text-mist-500"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-7">
          <SectionTitle>Account settings</SectionTitle>
          <ul className="divide-y divide-mist-200 overflow-hidden rounded-2xl bg-mist-100">
            {ROWS.map((r) => (
              <li key={r.t}>
                <button
                  onClick={() => say(`${r.t} — not part of this UI demo`)}
                  className="tap flex w-full items-center gap-3 px-4 py-3.5 text-left hover:bg-mist-200"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-semibold">{r.t}</span>
                    <span className="block text-xs text-mist-500">{r.d}</span>
                  </span>
                  <ChevronRight width={18} height={18} className="text-mist-500" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-7 pb-8">
          <Link
            href="/"
            className="tap flex items-center justify-center rounded-full border border-mist-200 py-3.5 text-[15px] font-bold text-ink hover:border-ink"
          >
            Back to dashboard
          </Link>
        </div>
      </section>
    </>
  );
}
