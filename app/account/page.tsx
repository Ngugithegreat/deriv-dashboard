"use client";

import { useState, type ReactElement } from "react";
import Link from "next/link";
import { useStore, USER } from "../providers";
import {
  BellIcon,
  ChatIcon,
  ChevronLeft,
  ChevronRight,
  CloseIcon,
  CopyIcon,
  DocIcon,
  ExternalIcon,
  GlobeIcon,
  GridIcon,
  HouseIcon,
  IdIcon,
  KeyIcon,
  LifebuoyIcon,
  LockIcon,
  MailIcon,
  PersonIcon,
  PhoneIcon,
  ShieldIcon,
  WarnIcon,
} from "@/components/icons";

type Row = {
  label: string;
  Icon: (p: { width?: number; height?: number; className?: string }) => ReactElement;
  note?: string;
  warn?: boolean;
  external?: boolean;
};

const SECTIONS: { title: string; rows: Row[] }[] = [
  {
    title: "About you",
    rows: [
      { label: "Personal details", Icon: PersonIcon },
      { label: "Home address", Icon: HouseIcon },
      { label: "Additional information", Icon: DocIcon },
      { label: "Tax information", Icon: DocIcon },
    ],
  },
  {
    title: "Verification",
    rows: [
      { label: "Proof of identity", Icon: IdIcon, note: "Reverification needed", warn: true },
      { label: "Proof of address", Icon: HouseIcon, note: "Reverification needed", warn: true },
    ],
  },
  {
    title: "Assessment",
    rows: [{ label: "Financial assessment", Icon: ShieldIcon, note: "Incomplete" }],
  },
  {
    title: "Security",
    rows: [
      { label: "Change password", Icon: LockIcon },
      { label: "Change email address", Icon: MailIcon, note: USER.email },
      { label: "Phone number", Icon: PhoneIcon, note: "Not added" },
      { label: "Passkeys", Icon: KeyIcon },
      { label: "Two-factor authentication", Icon: LockIcon },
      { label: "Close account", Icon: WarnIcon },
    ],
  },
  {
    title: "API management",
    rows: [
      { label: "Connected apps", Icon: GridIcon },
      { label: "API Token", Icon: KeyIcon },
      { label: "Explore Deriv API", Icon: DocIcon, external: true },
    ],
  },
  {
    title: "Support",
    rows: [
      { label: "Help centre", Icon: LifebuoyIcon, external: true },
      { label: "Live chat", Icon: ChatIcon, external: true },
    ],
  },
];

export default function AccountPage() {
  const { say, unread, theme, setTheme, hidden, toggleHidden, resetDemo } = useStore();
  const [banner, setBanner] = useState(true);

  return (
    <>
      <div className="rounded-b-2xl bg-ink-800 px-4 pb-8 pt-3 text-white lg:rounded-3xl lg:px-7">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Back" className="tap p-1.5 text-white">
            <ChevronLeft width={22} height={22} />
          </Link>
          <button
            onClick={() => say(`${unread} unread notifications`)}
            aria-label="Notifications"
            className="tap relative p-1.5 text-white"
          >
            <BellIcon width={21} height={21} />
            {unread > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-coral px-1 text-[11px] font-bold text-white">
                {unread}
              </span>
            )}
          </button>
        </div>
        <div className="mt-2 flex flex-col items-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15">
            <PersonIcon width={30} height={30} />
          </span>
          <h1 className="mt-3 text-xl font-bold tracking-tight">{USER.name}</h1>
          <button
            onClick={() => say("Account ID copied")}
            className="tap mt-2 flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white/80 hover:bg-white/20"
          >
            {USER.id}
            <CopyIcon width={14} height={14} />
          </button>
        </div>
      </div>

      <section className="bg-surface px-4 pt-5 lg:mt-6 lg:rounded-3xl lg:px-6">
        {banner && (
          <div className="relative mb-6 flex items-center gap-3 overflow-hidden rounded-2xl bg-surface-2 p-4 pr-10">
            <div className="min-w-0 flex-1">
              <p className="text-[16px] font-bold">Deriv is on mobile</p>
              <button
                onClick={() => say("App store links are not part of this UI demo")}
                className="tap mt-1 flex items-center gap-1 text-sm font-semibold text-muted hover:text-fg"
              >
                Get the Deriv app <ChevronRight width={14} height={14} />
              </button>
            </div>
            <svg viewBox="0 0 80 56" className="h-14 w-20 shrink-0" aria-hidden>
              <rect x="26" y="6" width="34" height="52" rx="6" fill="#1b1d22" transform="rotate(-12 43 32)" />
              <rect x="30" y="11" width="26" height="42" rx="4" fill="#FF444F" transform="rotate(-12 43 32)" />
            </svg>
            <button
              onClick={() => setBanner(false)}
              aria-label="Dismiss"
              className="tap absolute right-3 top-3 text-muted hover:text-fg"
            >
              <CloseIcon width={16} height={16} />
            </button>
          </div>
        )}

        {SECTIONS.map((section) => (
          <div key={section.title} className="mb-6">
            <h2 className="mb-1 text-[17px] font-bold tracking-tight">{section.title}</h2>
            <ul>
              {section.rows.map((r) => (
                <li key={r.label}>
                  <button
                    onClick={() => say(`${r.label} — not part of this UI demo`)}
                    className="tap flex w-full items-center gap-3 border-b border-line py-3.5 text-left last:border-0"
                  >
                    <r.Icon width={21} height={21} className="shrink-0 text-fg/80" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[16px]">{r.label}</span>
                      {r.note && (
                        <span className={`block text-xs ${r.warn ? "text-amber-500" : "text-muted"}`}>
                          {r.note}
                        </span>
                      )}
                    </span>
                    {r.warn && <WarnIcon width={17} height={17} className="shrink-0 text-amber-500" />}
                    {r.external ? (
                      <ExternalIcon width={16} height={16} className="shrink-0 text-muted" />
                    ) : (
                      <ChevronRight width={17} height={17} className="shrink-0 text-muted" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="mb-6">
          <h2 className="mb-1 text-[17px] font-bold tracking-tight">Preferences</h2>
          <ul>
            <li className="flex items-center gap-3 border-b border-line py-3.5">
              <GlobeIcon width={21} height={21} className="shrink-0 text-fg/80" />
              <span className="flex-1 text-[16px]">Language</span>
              <span className="text-sm text-muted">English</span>
              <ChevronRight width={17} height={17} className="text-muted" />
            </li>
            <li className="flex items-center gap-3 border-b border-line py-3.5">
              <span className="flex-1 text-[16px]">Appearance</span>
              <span className="flex rounded-full bg-surface-2 p-1">
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
              </span>
            </li>
            <li className="flex items-center gap-3 border-b border-line py-3.5">
              <span className="flex-1 text-[16px]">Hide balances</span>
              <button
                onClick={toggleHidden}
                role="switch"
                aria-checked={hidden}
                className={`tap h-7 w-12 rounded-full p-1 transition-colors ${hidden ? "bg-coral" : "bg-line"}`}
              >
                <span className={`block h-5 w-5 rounded-full bg-white transition-transform ${hidden ? "translate-x-5" : ""}`} />
              </button>
            </li>
            <li className="flex items-center gap-3 py-3.5">
              <span className="flex-1 text-[16px]">Reset demo data</span>
              <button
                onClick={resetDemo}
                className="tap rounded-full border border-line px-4 py-1.5 text-sm font-bold hover:border-coral hover:text-coral"
              >
                Reset
              </button>
            </li>
          </ul>
        </div>

        <button
          onClick={() => say("Signed out of the demo session")}
          className="tap mb-8 w-full rounded-full border border-fg/25 py-3.5 text-[16px] font-semibold hover:bg-surface-2"
        >
          Log out
        </button>
      </section>
    </>
  );
}
