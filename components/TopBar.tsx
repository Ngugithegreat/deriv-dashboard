"use client";

import { useState, type ReactNode } from "react";
import { useStore, USER } from "@/app/providers";
import { BellIcon, EyeIcon, EyeOffIcon, SparkleIcon } from "./icons";
import { Sheet } from "./Sheet";
import { timeAgo } from "@/lib/format";
import { ProfileDrawer } from "./ProfileDrawer";

export function AmyPill({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="tap amy-ring rounded-full p-[1.5px]">
      <span className="flex items-center gap-1.5 rounded-full bg-ink-800 px-4 py-2 text-[15px] font-bold">
        <SparkleIcon width={17} height={17} className="text-fuchsia-300" />
        <span className="bg-gradient-to-r from-fuchsia-300 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
          Ask Amy
        </span>
      </span>
    </button>
  );
}

export function TopBar({ left, center }: { left?: ReactNode; center?: ReactNode }) {
  const { hidden, toggleHidden, unread, notices, markAllRead } = useStore();
  const [panel, setPanel] = useState<null | "amy" | "bell">(null);

  return (
    <>
      <div className="flex items-center justify-between gap-2 pt-2">
        <div className="min-w-[44px]">{left}</div>
        <div className="flex flex-1 justify-center">{center ?? <AmyPill onClick={() => setPanel("amy")} />}</div>
        <div className="flex min-w-[44px] items-center justify-end gap-2">
          <button
            onClick={toggleHidden}
            aria-label={hidden ? "Show balances" : "Hide balances"}
            className="tap flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            {hidden ? <EyeOffIcon width={19} height={19} /> : <EyeIcon width={19} height={19} />}
          </button>
          <button
            onClick={() => setPanel("bell")}
            aria-label="Notifications"
            className="tap relative flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <BellIcon width={19} height={19} />
            {unread > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-coral px-1 text-[11px] font-bold text-white">
                {unread}
              </span>
            )}
          </button>
        </div>
      </div>

      <Sheet open={panel === "bell"} onClose={() => setPanel(null)} title="Notifications" side="right">
        <button
          onClick={markAllRead}
          className="tap mb-3 text-sm font-semibold text-coral hover:underline"
        >
          Mark all as read
        </button>
        <ul className="space-y-2">
          {notices.map((n) => (
            <li
              key={n.id}
              className={`rounded-2xl p-4 ${n.unread ? "bg-coral/[0.06] ring-1 ring-coral/20" : "bg-surface-2"}`}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-semibold">{n.title}</p>
                {n.unread && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-coral" />}
              </div>
              <p className="mt-1 text-sm text-muted">{n.body}</p>
              <p className="mt-2 text-xs text-muted">{timeAgo(Date.now() - n.minutesAgo * 60000, Date.now())}</p>
            </li>
          ))}
        </ul>
      </Sheet>

      <AmySheet open={panel === "amy"} onClose={() => setPanel(null)} />
    </>
  );
}

const SUGGESTIONS = [
  "What's my total balance?",
  "How do I deposit with a payment agent?",
  "Which market moved most today?",
  "Explain Volatility 75 (1s) Index",
];

function AmySheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { estTotal, walletTotal, cfdTotal, mode } = useStore();
  const [thread, setThread] = useState<{ role: "you" | "amy"; text: string }[]>([
    { role: "amy", text: "Hi! I'm Amy. Ask me about your accounts, deposits, or any market on the platform." },
  ]);
  const [draft, setDraft] = useState("");

  function reply(q: string) {
    const lower = q.toLowerCase();
    if (lower.includes("balance") || lower.includes("total"))
      return `Your ${mode} portfolio is ${estTotal.toFixed(2)} USD — ${walletTotal.toFixed(2)} in your wallet and ${cfdTotal.toFixed(2)} in CFDs.`;
    if (lower.includes("deposit") || lower.includes("agent"))
      return "Open Portfolio → Payment agent, pick a verified local agent, enter an amount and they credit your wallet in your local currency — usually under 10 minutes.";
    if (lower.includes("moved") || lower.includes("market"))
      return "Derived indices are synthetic and move 24/7. Check the Options tab — each card shows a 5-minute change so you can spot the biggest mover live.";
    if (lower.includes("volatility"))
      return "Volatility 75 (1s) Index simulates a market with 75% constant volatility and produces one tick every second. Higher number = bigger swings.";
    return "This is a UI demo, so I answer from the mock account data on screen — try asking about your balance, deposits or the markets list.";
  }

  function send(q: string) {
    if (!q.trim()) return;
    setThread((t) => [...t, { role: "you", text: q }, { role: "amy", text: reply(q) }]);
    setDraft("");
  }

  return (
    <Sheet open={open} onClose={onClose} title="Ask Amy">
      <div className="max-h-[46vh] space-y-3 overflow-y-auto pr-1">
        {thread.map((m, i) => (
          <div key={i} className={m.role === "you" ? "flex justify-end" : "flex justify-start"}>
            <p
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                m.role === "you" ? "bg-ink-900 text-white" : "bg-surface-2"
              }`}
            >
              {m.text}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => send(s)}
            className="tap rounded-full border border-line px-3 py-1.5 text-xs font-medium text-muted hover:border-fg hover:text-fg"
          >
            {s}
          </button>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(draft);
        }}
        className="mt-4 flex gap-2"
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask anything…"
          className="flex-1 rounded-full bg-surface-2 px-4 py-3 text-sm outline-none ring-coral/40 focus:ring-2"
        />
        <button className="tap rounded-full bg-coral px-5 text-sm font-bold text-white">Send</button>
      </form>
    </Sheet>
  );
}

export function Avatar({ initials = USER.initials }: { initials?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Account menu"
        className="tap flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-sm font-bold text-white hover:bg-white/25"
      >
        {initials}
      </button>
      <ProfileDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
