"use client";

import Link from "next/link";
import type { Account } from "@/app/providers";
import { useStore } from "@/app/providers";
import { Amount } from "./ui";
import { FlagUSIcon, Mt5Badge, OptionsBadge, UsdcIcon } from "./icons";

export function AccountMark({ account, size = 40 }: { account: Account; size?: number }) {
  if (account.kind === "mt5") return <Mt5Badge tag={account.badge ?? "STD"} size={size} />;
  if (account.kind === "options") return <OptionsBadge size={size} />;
  if (account.kind === "crypto") return <UsdcIcon size={size - 6} />;
  return <FlagUSIcon size={size - 6} />;
}

export function AccountTitle({ account }: { account: Account }) {
  return (
    <>
      {account.title}
      {account.split && (
        <>
          <span className="mx-1.5 font-light text-line">|</span>
          {account.split}
        </>
      )}
    </>
  );
}

/** Tile used on Home and the CFDs screen. */
export function AccountCard({ account, href }: { account: Account; href?: string }) {
  const { balanceOf } = useStore();
  const body = (
    <>
      <AccountMark account={account} />
      <p className="mt-4 text-[16px] font-semibold">
        <AccountTitle account={account} />
      </p>
      <div className="mt-1">
        <Amount value={balanceOf(account)} currency={account.currency} size="md" />
      </div>
    </>
  );

  const cls = "tap block rounded-2xl bg-surface-2 p-4 hover:bg-surface-3";
  return href ? (
    <Link href={href} className={cls}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

/** Row used in the Portfolio lists. */
export function AccountRow({ account, href }: { account: Account; href?: string }) {
  const { balanceOf, usdOf } = useStore();
  const body = (
    <>
      <AccountMark account={account} size={38} />
      <span className="min-w-0 flex-1 truncate text-[16px] font-semibold">
        <AccountTitle account={account} />
      </span>
      <span className="text-right">
        <Amount value={balanceOf(account)} currency={account.currency} size="sm" />
        {account.usdRate && (
          <span className="mt-0.5 block text-xs text-muted">
            {usdOf(account).toFixed(2)} USD
          </span>
        )}
      </span>
    </>
  );
  const cls =
    "tap flex w-full items-center gap-3 border-b border-line py-3.5 text-left last:border-0";
  return href ? (
    <Link href={href} className={cls}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}
