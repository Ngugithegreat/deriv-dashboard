import type { ReactNode } from "react";

export function Hero({ children }: { children: ReactNode }) {
  return (
    <div className="grain relative overflow-hidden bg-ink-800 px-4 pb-7 pt-2 text-white lg:rounded-3xl lg:px-7 lg:pb-8">
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-coral/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-10 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="relative">{children}</div>
    </div>
  );
}
