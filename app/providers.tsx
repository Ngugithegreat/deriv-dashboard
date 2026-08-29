"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Mode = "real" | "demo";
export type Theme = "light" | "dark" | "system";
export type TxnKind = "deposit" | "withdrawal" | "transfer";

export const STORAGE_KEY = "deriv-dashboard:v2";

export const USER = {
  name: "Biliah Somanga",
  initials: "BS",
  id: "019e....0b61",
  email: "biliah.somanga@example.com",
};

export type Account = {
  id: string;
  kind: "wallet" | "crypto" | "mt5" | "options";
  title: string;
  /** Second half of a "CFDs | Standard" style title. */
  split?: string;
  badge?: "FIN" | "STD" | "SWF" | "GOLD";
  currency: string;
  /** USD value of one unit — only crypto wallets need it. */
  usdRate?: number;
  real: number;
  demo: number;
};

export type Txn = {
  id: string;
  kind: TxnKind;
  label: string;
  method: string;
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed";
  /** ISO date, grouped by day in the statement views. */
  date: string;
  walletId: string;
};

export type Notice = {
  id: string;
  title: string;
  body: string;
  minutesAgo: number;
  unread: boolean;
};

type Store = {
  mode: Mode;
  setMode: (m: Mode) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  resetDemo: () => void;
  hidden: boolean;
  toggleHidden: () => void;
  accounts: Account[];
  wallets: Account[];
  trading: Account[];
  balanceOf: (a: Account) => number;
  usdOf: (a: Account) => number;
  cfdTotal: number;
  optionsTotal: number;
  walletTotal: number;
  estTotal: number;
  txns: Txn[];
  notices: Notice[];
  markAllRead: () => void;
  unread: number;
  deposit: (accountId: string, amount: number) => void;
  withdraw: (accountId: string, amount: number) => void;
  transfer: (fromId: string, toId: string, amount: number) => void;
  updatedAt: number;
  refresh: () => void;
  toast: string | null;
  say: (msg: string) => void;
};

const ACCOUNTS: Account[] = [
  { id: "wallet-usd", kind: "wallet", title: "US Dollar", currency: "USD", real: 41.6, demo: 10000 },
  { id: "wallet-usdc", kind: "crypto", title: "USDC (Ethereum)", currency: "USDC", usdRate: 0.99, real: 1, demo: 0 },
  { id: "mt5-fin", kind: "mt5", title: "Financial", badge: "FIN", currency: "USD", real: 1, demo: 10000 },
  { id: "mt5-std", kind: "mt5", title: "CFDs", split: "Standard", badge: "STD", currency: "USD", real: 1, demo: 10000 },
  { id: "mt5-swf", kind: "mt5", title: "Swap-Free", badge: "SWF", currency: "USD", real: 1, demo: 10000 },
  { id: "options", kind: "options", title: "Options", currency: "USD", real: 0, demo: 10000 },
];

const TXNS: Txn[] = [
  { id: "t1", kind: "withdrawal", label: "Withdrawal", method: "P2P · Sell order #48211", amount: 1, currency: "USD", status: "completed", date: "2026-08-24", walletId: "wallet-usd" },
  { id: "t2", kind: "deposit", label: "Deposit", method: "Payment agent · AbePay", amount: 17.74, currency: "USD", status: "completed", date: "2026-08-24", walletId: "wallet-usd" },
  { id: "t3", kind: "deposit", label: "Deposit", method: "Card · Visa ••4242", amount: 1, currency: "USD", status: "completed", date: "2026-08-24", walletId: "wallet-usd" },
  { id: "t4", kind: "deposit", label: "Deposit", method: "Crypto · USDC (Ethereum)", amount: 2.01, currency: "USD", status: "completed", date: "2026-08-24", walletId: "wallet-usd" },
  { id: "t5", kind: "deposit", label: "Deposit", method: "Payment agent · AbePay", amount: 17.96, currency: "USD", status: "completed", date: "2026-08-24", walletId: "wallet-usd" },
  { id: "t6", kind: "deposit", label: "Deposit", method: "P2P · Buy order #47980", amount: 2, currency: "USD", status: "completed", date: "2026-08-23", walletId: "wallet-usd" },
  { id: "t7", kind: "transfer", label: "Transfer", method: "US Dollar → CFDs | Standard", amount: 1, currency: "USD", status: "completed", date: "2026-08-23", walletId: "wallet-usd" },
  { id: "t8", kind: "deposit", label: "Deposit", method: "Crypto · USDC (Ethereum)", amount: 1, currency: "USDC", status: "completed", date: "2026-08-22", walletId: "wallet-usdc" },
  { id: "t9", kind: "withdrawal", label: "Withdrawal", method: "Payment agent · AbePay", amount: 5.4, currency: "USD", status: "pending", date: "2026-08-22", walletId: "wallet-usd" },
];

const NOTICES: Notice[] = [
  { id: "n1", title: "Reverification needed", body: "Your proof of identity needs to be resubmitted to keep withdrawals open.", minutesAgo: 14, unread: true },
  { id: "n2", title: "AI market analysis is live", body: "Get AI-powered insights on Gold, BTC, Silver, ETH, and more.", minutesAgo: 95, unread: true },
  { id: "n3", title: "Deposit received", body: "17.96 USD was credited to your US Dollar wallet.", minutesAgo: 260, unread: true },
  { id: "n4", title: "Weekly market recap", body: "Volatility 75 (1s) moved 3.4% over the last 7 days.", minutesAgo: 900, unread: false },
  { id: "n5", title: "Statement ready", body: "Your monthly account statement is available to download.", minutesAgo: 2880, unread: false },
];

const Ctx = createContext<Store | null>(null);

export function Providers({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("real");
  const [hidden, setHidden] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>(ACCOUNTS);
  const [notices, setNotices] = useState<Notice[]>(NOTICES);
  const [txns, setTxns] = useState<Txn[]>(TXNS);
  const [updatedAt, setUpdatedAt] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>("light");
  const [loaded, setLoaded] = useState(false);

  /* Restore the saved session after mount so SSR and hydration agree. */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.mode === "real" || saved.mode === "demo") setMode(saved.mode);
        if (typeof saved.hidden === "boolean") setHidden(saved.hidden);
        if (Array.isArray(saved.accounts) && saved.accounts.length) setAccounts(saved.accounts);
        if (Array.isArray(saved.txns)) setTxns(saved.txns);
        if (Array.isArray(saved.notices)) setNotices(saved.notices);
        if (saved.theme) setTheme(saved.theme);
      }
    } catch {
      /* corrupt or unavailable storage — fall back to defaults */
    }
    setLoaded(true);
    setUpdatedAt(Date.now());
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ mode, hidden, accounts, txns, notices, theme }),
      );
    } catch {
      /* private mode / quota — persistence is best-effort */
    }
  }, [loaded, mode, hidden, accounts, txns, notices, theme]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () =>
      document.documentElement.classList.toggle(
        "dark",
        theme === "dark" || (theme === "system" && mq.matches),
      );
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [theme]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const say = useCallback((msg: string) => setToast(msg), []);

  const balanceOf = useCallback((a: Account) => (mode === "real" ? a.real : a.demo), [mode]);
  const usdOf = useCallback(
    (a: Account) => (mode === "real" ? a.real : a.demo) * (a.usdRate ?? 1),
    [mode],
  );

  const patch = useCallback(
    (id: string, delta: number) =>
      setAccounts((prev) =>
        prev.map((a) =>
          a.id === id
            ? {
                ...a,
                [mode === "real" ? "real" : "demo"]: Math.max(
                  0,
                  (mode === "real" ? a.real : a.demo) + delta,
                ),
              }
            : a,
        ),
      ),
    [mode],
  );

  const today = "2026-08-24";

  const pushTxn = useCallback(
    (t: Omit<Txn, "id" | "date"> & { date?: string }) => {
      setTxns((prev) => [
        { ...t, date: t.date ?? today, id: `t${prev.length + 1}-${Math.round(t.amount * 100)}` },
        ...prev,
      ]);
    },
    [],
  );

  const deposit = useCallback(
    (accountId: string, amount: number) => {
      patch(accountId, amount);
      pushTxn({
        kind: "deposit",
        label: "Deposit",
        method: "Card · Visa ••4242",
        amount,
        currency: "USD",
        status: "completed",
        walletId: accountId,
      });
      setUpdatedAt(Date.now());
      say(`Deposited ${amount.toFixed(2)} USD`);
    },
    [patch, pushTxn, say],
  );

  const withdraw = useCallback(
    (accountId: string, amount: number) => {
      patch(accountId, -amount);
      pushTxn({
        kind: "withdrawal",
        label: "Withdrawal",
        method: "Payment agent · AbePay",
        amount,
        currency: "USD",
        status: "pending",
        walletId: accountId,
      });
      setUpdatedAt(Date.now());
      say(`Withdrawal of ${amount.toFixed(2)} USD requested`);
    },
    [patch, pushTxn, say],
  );

  const transfer = useCallback(
    (fromId: string, toId: string, amount: number) => {
      patch(fromId, -amount);
      patch(toId, amount);
      pushTxn({
        kind: "transfer",
        label: "Transfer",
        method: "Between your accounts",
        amount,
        currency: "USD",
        status: "completed",
        walletId: fromId,
      });
      setUpdatedAt(Date.now());
      say(`Transferred ${amount.toFixed(2)} USD`);
    },
    [patch, pushTxn, say],
  );

  const markAllRead = useCallback(
    () => setNotices((prev) => prev.map((n) => ({ ...n, unread: false }))),
    [],
  );

  const resetDemo = useCallback(() => {
    setAccounts(ACCOUNTS);
    setTxns(TXNS);
    setNotices(NOTICES);
    setMode("real");
    setHidden(false);
    setUpdatedAt(Date.now());
    setToast("Demo data reset");
  }, []);

  const value = useMemo<Store>(() => {
    const wallets = accounts.filter((a) => a.kind === "wallet" || a.kind === "crypto");
    const trading = accounts.filter((a) => a.kind === "mt5" || a.kind === "options");
    const cfdTotal = accounts.filter((a) => a.kind === "mt5").reduce((s, a) => s + usdOf(a), 0);
    const optionsTotal = accounts.filter((a) => a.kind === "options").reduce((s, a) => s + usdOf(a), 0);
    const walletTotal = wallets.reduce((s, a) => s + usdOf(a), 0);
    return {
      mode,
      setMode,
      theme,
      setTheme,
      resetDemo,
      hidden,
      toggleHidden: () => setHidden((h) => !h),
      accounts,
      wallets,
      trading,
      balanceOf,
      usdOf,
      cfdTotal,
      optionsTotal,
      walletTotal,
      estTotal: cfdTotal + optionsTotal + walletTotal,
      txns,
      notices,
      markAllRead,
      unread: notices.filter((n) => n.unread).length,
      deposit,
      withdraw,
      transfer,
      updatedAt,
      refresh: () => {
        setUpdatedAt(Date.now());
        say("Balances updated");
      },
      toast,
      say,
    };
  }, [
    mode,
    theme,
    resetDemo,
    hidden,
    accounts,
    balanceOf,
    usdOf,
    txns,
    notices,
    markAllRead,
    deposit,
    withdraw,
    transfer,
    updatedAt,
    toast,
    say,
  ]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used inside <Providers>");
  return ctx;
}

/** "August 24, 2026" — the date headers used in the statement views. */
export function dayLabel(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${months[m - 1]} ${d}, ${y}`;
}
