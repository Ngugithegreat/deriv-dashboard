"use client";

import { useMemo, useState } from "react";
import { useStore } from "@/app/providers";
import { Sheet } from "./Sheet";
import { AgentIcon, CryptoIcon, DollarIcon, P2PIcon } from "./icons";

export type MoneyKind = "deposit" | "withdraw" | "transfer";

const METHODS = [
  { id: "card", label: "Card", hint: "Visa ••4242 · instant", Icon: DollarIcon },
  { id: "agent", label: "Payment agent", hint: "Local currency · ~10 min", Icon: AgentIcon },
  { id: "p2p", label: "P2P", hint: "Buy USD from traders", Icon: P2PIcon },
  { id: "crypto", label: "Crypto", hint: "USDT, BTC, ETH", Icon: CryptoIcon },
];

const CHIPS = [50, 100, 250, 500];

export function MoneySheet({
  kind,
  open,
  onClose,
}: {
  kind: MoneyKind;
  open: boolean;
  onClose: () => void;
}) {
  const { accounts, balanceOf, deposit, withdraw, transfer } = useStore();
  const [amount, setAmount] = useState("100");
  const [method, setMethod] = useState(METHODS[0].id);
  const [from, setFrom] = useState("wallet-usd");
  const [to, setTo] = useState("mt5-std");

  const value = Number(amount) || 0;
  const source = accounts.find((a) => a.id === from);
  const insufficient = kind !== "deposit" && source ? value > balanceOf(source) : false;

  const title = useMemo(
    () => ({ deposit: "Deposit", withdraw: "Withdraw", transfer: "Transfer" })[kind],
    [kind],
  );

  function submit() {
    if (value <= 0 || insufficient) return;
    if (kind === "deposit") deposit("wallet-usd", value);
    if (kind === "withdraw") withdraw("wallet-usd", value);
    if (kind === "transfer") transfer(from, to, value);
    onClose();
  }

  return (
    <Sheet open={open} onClose={onClose} title={title}>
      {kind === "transfer" ? (
        <div className="mb-4 grid gap-3">
          <Select label="From" value={from} onChange={setFrom} exclude={to} />
          <Select label="To" value={to} onChange={setTo} exclude={from} />
        </div>
      ) : (
        <div className="mb-4 grid grid-cols-2 gap-2">
          {METHODS.map(({ id, label, hint, Icon }) => (
            <button
              key={id}
              onClick={() => setMethod(id)}
              className={`tap rounded-2xl border p-3 text-left ${
                method === id ? "border-coral bg-coral/5" : "border-mist-200 hover:border-mist-300"
              }`}
            >
              <Icon width={20} height={20} className={method === id ? "text-coral" : "text-mist-500"} />
              <p className="mt-2 text-sm font-semibold">{label}</p>
              <p className="text-[11px] leading-4 text-mist-500">{hint}</p>
            </button>
          ))}
        </div>
      )}

      <label className="mb-1 block text-sm font-medium text-mist-500">Amount (USD)</label>
      <input
        inputMode="decimal"
        value={amount}
        onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
        className="w-full rounded-2xl bg-mist-100 px-4 py-3.5 text-2xl font-bold tabular-nums outline-none ring-coral/40 focus:ring-2"
      />
      <div className="mt-3 flex gap-2">
        {CHIPS.map((c) => (
          <button
            key={c}
            onClick={() => setAmount(String(c))}
            className="tap flex-1 rounded-full border border-mist-200 py-2 text-sm font-semibold hover:border-ink"
          >
            {c}
          </button>
        ))}
      </div>

      {insufficient && (
        <p className="mt-3 text-sm font-medium text-coral">
          Not enough funds in {source?.title}
          {source?.subtitle ? ` ${source.subtitle}` : ""}.
        </p>
      )}

      <button
        onClick={submit}
        disabled={value <= 0 || insufficient}
        className="tap mt-5 w-full rounded-full bg-coral py-3.5 text-base font-bold text-white disabled:opacity-40"
      >
        {title} {value > 0 ? `${value.toFixed(2)} USD` : ""}
      </button>
      <p className="mt-3 text-center text-xs text-mist-500">
        Simulated only — no real money moves in this demo.
      </p>
    </Sheet>
  );
}

function Select({
  label,
  value,
  onChange,
  exclude,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  exclude?: string;
}) {
  const { accounts, balanceOf } = useStore();
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-mist-500">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl bg-mist-100 px-4 py-3 text-[15px] font-semibold outline-none ring-coral/40 focus:ring-2"
      >
        {accounts
          .filter((a) => a.id !== exclude)
          .map((a) => (
            <option key={a.id} value={a.id}>
              {a.title}
              {a.subtitle && a.kind === "mt5" ? ` ${a.subtitle}` : ""} — {balanceOf(a).toFixed(2)} USD
            </option>
          ))}
      </select>
    </label>
  );
}
