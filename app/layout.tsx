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
  applicationName: "Deriv Dashboard",
  openGraph: {
    title: "Deriv Dashboard — UI clone",
    description:
      "Accounts, live derived-index quotes, cashier flows and portfolio — a front-end demo, no real money.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#181C25" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0B0D" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plex.variable} suppressHydrationWarning>
      <head>
        {/* Paint the saved theme before first paint so there is no flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem("deriv-dashboard:v1");var t=s?(JSON.parse(s).theme||"system"):"system";if(t==="dark"||(t==="system"&&matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="font-sans">
        <Providers>
          <div className="mx-auto flex w-full max-w-[1180px] bg-surface lg:gap-6 lg:bg-transparent">
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
