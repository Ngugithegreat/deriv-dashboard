import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-6xl font-bold tracking-tight text-coral">404</p>
      <h1 className="mt-3 text-2xl font-bold">This page isn&apos;t part of the dashboard</h1>
      <p className="mt-2 max-w-sm text-sm text-muted">
        Try the Home, CFDs, Options or Portfolio tabs.
      </p>
      <Link href="/" className="tap mt-6 rounded-full bg-coral px-7 py-3.5 font-bold text-white">
        Go home
      </Link>
    </div>
  );
}
