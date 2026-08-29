import type { ReactNode } from "react";

/** Flat dark panel with rounded bottom corners, exactly as in the Deriv app. */
export function Hero({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-b-2xl bg-ink-800 px-4 pb-7 pt-2 text-white lg:rounded-3xl lg:px-7 lg:pb-8">
      {children}
    </div>
  );
}
