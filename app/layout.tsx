import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { BottomNav, SideNav } from "@/components/Nav";
import { Toast } from "@/components/ui";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Deriv Dashboard — UI clone",
  description:
    "A responsive trading-dashboard interface inspired by the Deriv app: accounts, live derived-index quotes, cashier flows and portfolio.",
};

export const viewport: Viewport = {
  themeColor: "#181C25",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plex.variable}>
      <body className="font-sans">
        <Providers>
          <div className="mx-auto flex w-full max-w-[1180px] bg-white lg:gap-6 lg:bg-transparent">
            <SideNav />
            <main className="min-w-0 flex-1 pb-24 lg:py-6 lg:pb-10">{children}</main>
          </div>
          <BottomNav />
          <Toast />
        </Providers>
      </body>
    </html>
  );
}
