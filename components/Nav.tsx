"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CandlesIcon, HomeIcon, LogoMark, OptionsIcon, WalletIcon, TrendIcon, ShieldIcon } from "./icons";

const TABS = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/cfds", label: "CFDs", Icon: CandlesIcon },
  { href: "/options", label: "Options", Icon: OptionsIcon },
  { href: "/portfolio", label: "Portfolio", Icon: WalletIcon },
];

const EXTRA = [
  { href: "/markets", label: "Markets", Icon: TrendIcon },
  { href: "/account", label: "Account", Icon: ShieldIcon },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-mist-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <ul className="mx-auto flex max-w-lg">
        {TABS.map(({ href, label, Icon }) => {
          const active = isActive(pathname, href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={`tap flex flex-col items-center gap-1 py-2.5 ${active ? "text-coral" : "text-ink/70"}`}
              >
                <Icon width={23} height={23} strokeWidth={active ? 2 : 1.7} />
                <span className={`text-[11px] ${active ? "font-bold" : "font-medium"}`}>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function SideNav() {
  const pathname = usePathname();
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col gap-1 border-r border-mist-200 bg-white px-4 py-6 lg:flex">
      <Link href="/" className="mb-6 flex items-center gap-2.5 px-2">
        <LogoMark />
        <span className="text-lg font-bold tracking-tight">Deriv</span>
        <span className="rounded-md bg-mist-100 px-1.5 py-0.5 text-[10px] font-bold text-mist-500">CLONE</span>
      </Link>
      {[...TABS, ...EXTRA].map(({ href, label, Icon }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            className={`tap flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-semibold ${
              active ? "bg-coral/10 text-coral" : "text-ink/75 hover:bg-mist-100"
            }`}
          >
            <Icon width={21} height={21} />
            {label}
          </Link>
        );
      })}
      <div className="mt-auto rounded-2xl bg-ink-800 p-4 text-white">
        <p className="text-sm font-bold">Demo interface</p>
        <p className="mt-1 text-xs text-white/60">
          Every balance, quote and transaction here is simulated in the browser.
        </p>
      </div>
    </aside>
  );
}
