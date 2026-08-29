# Deriv Dashboard — UI clone

A responsive trading-dashboard interface modelled on the Deriv mobile app, rebuilt from
scratch in Next.js. Every balance, quote and transaction is **simulated in the browser** —
there is no backend, no real account and no real money.

![tabs](https://img.shields.io/badge/Next.js-15-black) ![tabs](https://img.shields.io/badge/Tailwind-3.4-38bdf8) ![tabs](https://img.shields.io/badge/TypeScript-5.7-3178c6)

## What's in it

| Route | Screen |
| --- | --- |
| `/` | Home — total value + Deposit, trading accounts, promo rail, Explore Deriv grid, What's new, Highlights |
| `/cfds` | CFDs — Real/Demo, total trading value, MT5 accounts, Featured (Gold, Swap-Free), Available accounts |
| `/options` | Options — most traded markets, Featured trade types, Platforms, the full trade-type grid |
| `/portfolio` | Portfolio — Overview / Wallet / Partners / Trading / P2P tabs, wallet and trading lists |
| `/wallet/[id]` | Wallet — balance, deposit/transfer/withdraw, filtered statement grouped by day |
| `/transactions` | Every transaction across wallets, same statement layout |
| `/markets` | Searchable instrument list (derived, forex, crypto) with a live feed |
| `/markets/[id]` | Market detail — full-width live chart and a Rise/Fall trade ticket |
| `/account` | Deriv-style settings: About you, Verification, Assessment, Security, API, Preferences, Support |

## Interactions that actually work

- **Deposit / Withdraw / Transfer** bottom sheets that move money between the mock accounts and write a transaction row.
- **Real / Demo** switch — every balance on every screen swaps to the other set.
- **Hide balances** (the eye button) blurs every amount app-wide.
- **Notifications** panel with unread counts and mark-all-as-read.
- **Ask Amy** assistant sheet that answers from the on-screen account data.
- **Live quotes** — a deterministic seeded random walk starts the series (so SSR and hydration match) and then ticks in the browser.
- **Responsive** — bottom tab bar on mobile, persistent sidebar and multi-column grids from `lg` up.
- **Light / dark / system theme**, chosen in Account → Appearance, applied before first paint so there is no flash.
- **Session persistence** — balances, transactions, notifications, mode and theme survive a reload via `localStorage` (Account → Reset demo data puts it back).
- **Installable** — web manifest with icon, name and theme colour.

## Run it

```bash
npm install
npm run dev      # http://localhost:3210
```

```bash
npm run build && npm start
```

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · IBM Plex Sans · hand-drawn inline SVG icons — no UI or charting library.

## Structure

```
app/
  layout.tsx        shell: sidebar + main + bottom nav + toast
  providers.tsx     accounts, balances, mode, notifications, cashier actions
  page.tsx          home
  cfds/ options/ portfolio/ markets/ account/
components/
  Hero, TopBar, Nav, Sheet, MoneySheet, AccountCard, MarketCard, Sparkline, Promos, ui, icons
lib/
  markets.ts        instrument list, seeded feed, sparkline path builder
  format.ts         money / percent / relative-time helpers
```

## Disclaimer

Not affiliated with, endorsed by, or connected to Deriv. Built as a UI/UX exercise;
the Deriv name and any resemblance to its product belong to Deriv.
