"use client";

import Link from "next/link";
import type { Account } from "@/app/providers";
import { useStore } from "@/app/providers";
import { Amount } from "./ui";
import { OptionsIcon, WalletIcon } from "./icons";

export function AccountBadge({ kind }: { kind: Account["kind"] }) {
  if (kind === "mt5")
    return (
      <span className="flex h-11 w-11 flex-col items-center justify-center rounded-xl bg-[#0F5FCB] text-white shadow-sm">
        <span className="text-[11px] font-black leading-none tracking-tight">MT5</span>
        <span className="mt-0.5 rounded-sm bg-white/25 px-1 text-[7px] font-bold leading-[10px]">STD</span>
      </span>
    );
  if (kind === "options")
    return (
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-coral text-white shadow-sm">
        <OptionsIcon width={22} height={22} strokeWidth={2.2} />
      </span>
    );
  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-900 text-white shadow-sm">
      <WalletIcon width={22} height={22} />
    </span>
  );
}

export function AccountCard({ account, href }: { account: Account; href?: string }) {
  const { balanceOf } = useStore();
  const body = (
    <>
      <AccountBadge kind={account.kind} />
      <p className="mt-4 text-[17px] font-semibold">
        {account.title}
        {account.subtitle && account.kind === "mt5" && (
          <>
            <span className="mx-1.5 font-light text-mist-300">|</span>
            {account.subtitle}
          </>
        )}
      </p>
      <div className="mt-1">
        <Amount value={balanceOf(account)} currency={account.currency} size="md" />
      </div>
    </>
  );

  const cls = "tap block rounded-2xl bg-mist-100 p-4 hover:bg-mist-200";
  return href ? (
    <Link href={href} className={cls}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}
