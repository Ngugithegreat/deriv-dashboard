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

export const STORAGE_KEY = "deriv-dashboard:v1";

export type Account = {
  id: string;
  kind: "mt5" | "options" | "wallet";
  title: string;
  subtitle?: string;
  currency: string;
  real: number;
  demo: number;
};

export type Txn = {
  id: string;
  label: string;
  method: string;
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed";
  minutesAgo: number;
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
  theme: Theme;
  setTheme: (t: Theme) => void;
  resetDemo: () => void;
  setMode: (m: Mode) => void;
  hidden: boolean;
  toggleHidden: () => void;
  accounts: Account[];
  balanceOf: (a: Account) => number;
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
  { id: "mt5-std", kind: "mt5", title: "CFDs", subtitle: "Standard", currency: "USD", real: 0, demo: 10000 },
  { id: "options", kind: "options", title: "Options", currency: "USD", real: 0, demo: 10000 },
  { id: "wallet-usd", kind: "wallet", title: "USD Wallet", subtitle: "Bank, card, e-wallet, crypto", currency: "USD", real: 504.78, demo: 0 },
];

const TXNS: Txn[] = [
  { id: "t1", label: "Deposit", method: "Payment agent · AbePay", amount: 250, currency: "USD", status: "completed", minutesAgo: 42 },
  { id: "t2", label: "Transfer to CFDs", method: "USD Wallet → MT5 Standard", amount: 120, currency: "USD", status: "completed", minutesAgo: 190 },
  { id: "t3", label: "Withdrawal", method: "P2P · Sell order #48211", amount: 75.5, currency: "USD", status: "pending", minutesAgo: 320 },
  { id: "t4", label: "Deposit", method: "Crypto · USDT (TRC20)", amount: 400, currency: "USD", status: "completed", minutesAgo: 1440 },
];

const NOTICES: Notice[] = [
  { id: "n1", title: "Verify your identity", body: "Upload a document to unlock withdrawals over 1,000 USD.", minutesAgo: 12, unread: true },
  { id: "n2", title: "New: TradingView charts", body: "Advanced charts and tools for 24/7 Derived Indices.", minutesAgo: 90, unread: true },
  { id: "n3", title: "Deposit received", body: "250.00 USD was credited to your USD Wallet.", minutesAgo: 42, unread: true },
  { id: "n4", title: "Weekly market recap", body: "Volatility 75 (1s) moved 3.4% over the last 7 days.", minutesAgo: 600, unread: true },
  { id: "n5", title: "Boom 1000 spike", body: "Boom 1000 Index printed a 1.8% spike in the last hour.", minutesAgo: 55, unread: true },
  { id: "n6", title: "P2P order matched", body: "Order #48211 was matched with a verified buyer.", minutesAgo: 140, unread: true },
  { id: "n7", title: "Two-factor authentication", body: "Turn on 2FA to protect withdrawals from your wallet.", minutesAgo: 320, unread: true },
  { id: "n8", title: "New payment agent", body: "AbePay now settles KES deposits in under 5 minutes.", minutesAgo: 720, unread: true },
  { id: "n9", title: "Statement ready", body: "Your monthly account statement is available to download.", minutesAgo: 2880, unread: false },
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
  const [theme, setTheme] = useState<Theme>("system");
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

  const patch = useCallback(
    (id: string, delta: number) =>
      setAccounts((prev) =>
        prev.map((a) =>
          a.id === id
            ? { ...a, [mode === "real" ? "real" : "demo"]: Math.max(0, (mode === "real" ? a.real : a.demo) + delta) }
            : a,
        ),
      ),
    [mode],
  );

  const pushTxn = useCallback((t: Omit<Txn, "id" | "minutesAgo">) => {
    setTxns((prev) => [{ ...t, id: `t${prev.length + 1}-${prev.length}`, minutesAgo: 0 }, ...prev]);
  }, []);

  const deposit = useCallback(
    (accountId: string, amount: number) => {
      patch(accountId, amount);
      pushTxn({ label: "Deposit", method: "Card · Visa ••4242", amount, currency: "USD", status: "completed" });
      setUpdatedAt(Date.now());
      say(`Deposited ${amount.toFixed(2)} USD`);
    },
    [patch, pushTxn, say],
  );

  const withdraw = useCallback(
    (accountId: string, amount: number) => {
      patch(accountId, -amount);
      pushTxn({ label: "Withdrawal", method: "Payment agent · AbePay", amount, currency: "USD", status: "pending" });
      setUpdatedAt(Date.now());
      say(`Withdrawal of ${amount.toFixed(2)} USD requested`);
    },
    [patch, pushTxn, say],
  );

  const transfer = useCallback(
    (fromId: string, toId: string, amount: number) => {
      patch(fromId, -amount);
      patch(toId, amount);
      pushTxn({ label: "Transfer", method: "Between your accounts", amount, currency: "USD", status: "completed" });
      setUpdatedAt(Date.now());
      say(`Transferred ${amount.toFixed(2)} USD`);
    },
    [patch, pushTxn, say],
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

  const markAllRead = useCallback(
    () => setNotices((prev) => prev.map((n) => ({ ...n, unread: false }))),
    [],
  );

  const value = useMemo<Store>(() => {
    const cfdTotal = accounts.filter((a) => a.kind === "mt5").reduce((s, a) => s + balanceOf(a), 0);
    const optionsTotal = accounts.filter((a) => a.kind === "options").reduce((s, a) => s + balanceOf(a), 0);
    const walletTotal = accounts.filter((a) => a.kind === "wallet").reduce((s, a) => s + balanceOf(a), 0);
    return {
      mode,
      setMode,
      theme,
      setTheme,
      resetDemo,
      hidden,
      toggleHidden: () => setHidden((h) => !h),
      accounts,
      balanceOf,
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
