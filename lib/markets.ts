"use client";

import { useEffect, useRef, useState } from "react";

export type Market = {
  id: string;
  name: string;
  short: string;
  badge: string;
  tick: string;
  price: number;
  vol: number;
  digits: number;
  group: "derived" | "forex" | "crypto";
};

/** Deterministic PRNG so the server and the first client render agree. */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFrom(id: string) {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export const MARKETS: Market[] = [
  { id: "1HZ100V", name: "Volatility 100 (1s) Index", short: "V100", badge: "100", tick: "1s", price: 832.19, vol: 0.0016, digits: 2, group: "derived" },
  { id: "1HZ50V", name: "Volatility 50 (1s) Index", short: "V50", badge: "50", tick: "1s", price: 215589.49, vol: 0.0009, digits: 2, group: "derived" },
  { id: "1HZ25V", name: "Volatility 25 (1s) Index", short: "V25", badge: "25", tick: "1s", price: 801294.73, vol: 0.0006, digits: 2, group: "derived" },
  { id: "1HZ10V", name: "Volatility 10 (1s) Index", short: "V10", badge: "10", tick: "1s", price: 9860.73, vol: 0.0004, digits: 2, group: "derived" },
  { id: "1HZ75V", name: "Volatility 75 (1s) Index", short: "V75", badge: "75", tick: "1s", price: 6605.54, vol: 0.0013, digits: 2, group: "derived" },
  { id: "BOOM1000", name: "Boom 1000 Index", short: "BOOM", badge: "B", tick: "2s", price: 12184.61, vol: 0.0011, digits: 2, group: "derived" },
  { id: "CRASH500", name: "Crash 500 Index", short: "CRASH", badge: "C", tick: "2s", price: 4881.9, vol: 0.0012, digits: 2, group: "derived" },
  { id: "frxEURUSD", name: "EUR/USD", short: "EURUSD", badge: "€", tick: "fx", price: 1.0842, vol: 0.0002, digits: 5, group: "forex" },
  { id: "frxGBPUSD", name: "GBP/USD", short: "GBPUSD", badge: "£", tick: "fx", price: 1.2714, vol: 0.00022, digits: 5, group: "forex" },
  { id: "cryBTCUSD", name: "BTC/USD", short: "BTCUSD", badge: "₿", tick: "24/7", price: 63241.5, vol: 0.0008, digits: 2, group: "crypto" },
  { id: "cryETHUSD", name: "ETH/USD", short: "ETHUSD", badge: "Ξ", tick: "24/7", price: 3124.18, vol: 0.001, digits: 2, group: "crypto" },
];

export const SERIES_LEN = 48;

/** Stable starting series — identical on server and client. */
export function seedSeries(market: Market, length = SERIES_LEN) {
  const rand = mulberry32(seedFrom(market.id));
  const out: number[] = [];
  let p = market.price * (1 - market.vol * 6);
  for (let i = 0; i < length; i++) {
    p = p * (1 + (rand() - 0.5) * market.vol * 2.2);
    out.push(p);
  }
  out[length - 1] = market.price;
  return out;
}

export type Quote = { price: number; series: number[]; change: number };

export function initialQuotes(): Record<string, Quote> {
  const out: Record<string, Quote> = {};
  for (const m of MARKETS) {
    const series = seedSeries(m);
    out[m.id] = {
      price: series[series.length - 1],
      series,
      change: ((series[series.length - 1] - series[0]) / series[0]) * 100,
    };
  }
  return out;
}

/**
 * Live-ish feed. Starts from the deterministic seed, then walks every `ms`
 * once mounted on the client, so hydration never mismatches.
 */
export function useQuotes(ms = 1200) {
  const [quotes, setQuotes] = useState<Record<string, Quote>>(initialQuotes);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setQuotes((prev) => {
        const next: Record<string, Quote> = {};
        for (const m of MARKETS) {
          const cur = prev[m.id];
          const drift = (Math.random() - 0.5) * m.vol * 2.4;
          const price = Math.max(cur.price * (1 + drift), 0.00001);
          const series = [...cur.series.slice(1), price];
          next[m.id] = {
            price,
            series,
            change: ((price - series[0]) / series[0]) * 100,
          };
        }
        return next;
      });
    }, ms);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [ms]);

  return quotes;
}

export function sparkPath(series: number[], w: number, h: number, pad = 2) {
  const min = Math.min(...series);
  const max = Math.max(...series);
  const span = max - min || 1;
  const step = (w - pad * 2) / (series.length - 1);
  return series
    .map((v, i) => {
      const x = pad + i * step;
      const y = pad + (h - pad * 2) * (1 - (v - min) / span);
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}
