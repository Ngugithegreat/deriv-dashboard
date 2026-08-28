"use client";

import type { ReactNode } from "react";
import { useStore } from "@/app/providers";

export function Amount({
  value,
  currency = "USD",
  size = "lg",
  digits = 2,
}: {
  value: number;
  currency?: string;
  size?: "sm" | "md" | "lg" | "xl";
  digits?: number;
}) {
  const { hidden } = useStore();
  const sizes = {
    sm: "text-[15px] font-semibold",
    md: "text-xl font-bold",
    lg: "text-[28px] leading-9 font-bold",
    xl: "text-[34px] leading-10 font-bold tracking-tight",
  } as const;
  return (
    <span className={sizes[size]}>
      <span className={hidden ? "masked-value" : ""}>
        {value.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })}
      </span>{" "}
      <span className="text-[0.62em] font-medium opacity-60">{currency}</span>
    </span>
  );
}

export function Segmented<T extends string>({
  value,
  onChange,
  options,
  tone = "dark",
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  tone?: "dark" | "light";
}) {
  return (
    <div
      className={`inline-flex w-max shrink-0 rounded-full p-1 ${
        tone === "dark" ? "bg-white/10" : "bg-surface-2"
      }`}
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className={`tap whitespace-nowrap rounded-full px-5 py-1.5 text-sm font-bold ${
              active
                ? tone === "dark"
                  ? "bg-white/20 text-white"
                  : "bg-surface text-fg shadow-sm"
                : tone === "dark"
                  ? "text-white/60"
                  : "text-muted"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function CircleAction({
  icon,
  label,
  onClick,
  primary,
  disabled,
}: {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  primary?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="tap group flex w-20 flex-col items-center gap-2 disabled:opacity-40"
    >
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-full ${
          primary
            ? "bg-coral text-white shadow-[0_8px_20px_rgba(255,68,79,0.35)] group-hover:bg-coral-hover"
            : "border border-white/35 text-white group-hover:bg-white/10"
        }`}
      >
        {icon}
      </span>
      <span className="text-[13px] font-medium text-white/90">{label}</span>
    </button>
  );
}

export function SectionTitle({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-end justify-between px-1">
      <h2 className="text-[19px] font-bold tracking-tight">{children}</h2>
      {action}
    </div>
  );
}

export function Card({
  children,
  className = "",
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const Tag: "button" | "div" = onClick ? "button" : "div";
  return (
    <Tag
      onClick={onClick}
      className={`tap w-full rounded-2xl bg-surface-2 p-4 text-left ${
        onClick ? "hover:bg-surface-3" : ""
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

export function Badge({ children, tone = "coral" }: { children: ReactNode; tone?: "coral" | "ink" | "mint" }) {
  const tones = {
    coral: "bg-coral text-white",
    ink: "bg-ink-900 text-white",
    mint: "bg-mint/15 text-mint",
  } as const;
  return (
    <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold leading-4 ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function Toast() {
  const { toast } = useStore();
  if (!toast) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex justify-center px-4 lg:bottom-8">
      <div className="animate-fade-up rounded-full bg-ink-900 px-5 py-3 text-sm font-medium text-white shadow-pop">
        {toast}
      </div>
    </div>
  );
}
