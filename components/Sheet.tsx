"use client";

import { useEffect, type ReactNode } from "react";
import { CloseIcon } from "./icons";

export function Sheet({
  open,
  onClose,
  title,
  children,
  side = "bottom",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  side?: "bottom" | "right";
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex" role="dialog" aria-modal="true">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-ink/45 backdrop-blur-[2px]"
      />
      <div
        className={
          side === "bottom"
            ? "relative mt-auto w-full animate-sheet-up rounded-t-3xl bg-surface p-5 pb-8 text-fg shadow-pop sm:mx-auto sm:mb-8 sm:max-w-md sm:rounded-3xl"
            : "relative ml-auto h-full w-full max-w-sm animate-fade-up overflow-y-auto bg-surface p-5 text-fg shadow-pop"
        }
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold tracking-tight">{title}</h3>
          <button onClick={onClose} className="tap rounded-full p-1.5 text-muted hover:bg-surface-2">
            <CloseIcon width={20} height={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
