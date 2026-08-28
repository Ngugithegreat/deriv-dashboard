import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (p: P) => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...p,
});

export const HomeIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M3.5 10.4 12 3.8l8.5 6.6V19a1.4 1.4 0 0 1-1.4 1.4h-3.6v-5.1h-7v5.1H4.9A1.4 1.4 0 0 1 3.5 19z" />
  </svg>
);

export const CandlesIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M7 4.5v2.2M7 17.3v2.2M17 4.5v2.2M17 17.3v2.2" />
    <rect x="4.6" y="6.7" width="4.8" height="10.6" rx="1.2" />
    <rect x="14.6" y="6.7" width="4.8" height="10.6" rx="1.2" />
  </svg>
);

export const OptionsIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M14.2 4.6h5.2v5.2M19.4 4.6 13 11M9.8 19.4H4.6v-5.2M4.6 19.4 11 13" />
  </svg>
);

export const WalletIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="3.2" y="5.6" width="17.6" height="12.8" rx="2.6" />
    <path d="M15.4 12.1h5.4" />
    <circle cx="15.9" cy="12.1" r=".9" fill="currentColor" stroke="none" />
  </svg>
);

export const BellIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M18 15.2V10a6 6 0 1 0-12 0v5.2L4.6 17.4h14.8z" />
    <path d="M10 20.2a2.2 2.2 0 0 0 4 0" />
  </svg>
);

export const EyeIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M2.6 12S6.4 5.9 12 5.9 21.4 12 21.4 12 17.6 18.1 12 18.1 2.6 12 2.6 12" />
    <circle cx="12" cy="12" r="3.1" />
  </svg>
);

export const EyeOffIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 4.4 20 20.4" />
    <path d="M9.7 6.4A9.6 9.6 0 0 1 12 6.1c5.6 0 9.4 6 9.4 6a17 17 0 0 1-3.3 3.9M6.4 8.2A17 17 0 0 0 2.6 12s3.8 6.1 9.4 6.1a9.4 9.4 0 0 0 3.2-.6" />
    <path d="M10 10.1a3.1 3.1 0 0 0 4.2 4.3" />
  </svg>
);

export const PlusIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 5.4v13.2M5.4 12h13.2" strokeWidth={2.1} />
  </svg>
);

export const MinusIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M5.4 12h13.2" strokeWidth={2.1} />
  </svg>
);

export const TransferIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4.4 9h13.4l-3.1-3.2M19.6 15H6.2l3.1 3.2" strokeWidth={1.9} />
  </svg>
);

export const RefreshIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M19.6 12a7.6 7.6 0 1 1-2.3-5.4" />
    <path d="M19.9 4.6v4.1h-4.1" />
  </svg>
);

export const SparkleIcon = (p: P) => (
  <svg {...base({ ...p, fill: "currentColor", stroke: "none" })}>
    <path d="m12 3.4 1.7 4.6 4.6 1.7-4.6 1.7L12 16l-1.7-4.6-4.6-1.7 4.6-1.7z" />
    <path d="m18.6 15.2.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" opacity=".85" />
  </svg>
);

export const CloseIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="m6.4 6.4 11.2 11.2M17.6 6.4 6.4 17.6" strokeWidth={1.9} />
  </svg>
);

export const ChevronRight = (p: P) => (
  <svg {...base(p)}>
    <path d="m9.6 5.6 6.4 6.4-6.4 6.4" />
  </svg>
);

export const ChevronLeft = (p: P) => (
  <svg {...base(p)}>
    <path d="M14.4 5.6 8 12l6.4 6.4" />
  </svg>
);

export const DollarIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M14.6 9.3a2.8 2.8 0 0 0-2.6-1.5c-1.6 0-2.6.8-2.6 2s1 1.8 2.6 2.1 2.8.8 2.8 2.1-1.2 2.2-2.8 2.2a3 3 0 0 1-2.8-1.6M12 6.3v11.4" />
  </svg>
);

export const AgentIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="9.2" cy="8.4" r="3.1" />
    <path d="M3.6 19.2a5.8 5.8 0 0 1 11.2 0" />
    <path d="M17.4 7.2v7.2M19.7 9.1a2 2 0 0 0-1.9-1.1c-1.1 0-1.9.6-1.9 1.5s.7 1.3 1.9 1.5 2 .6 2 1.5-.8 1.6-2 1.6a2.1 2.1 0 0 1-2-1.1" />
  </svg>
);

export const P2PIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="3.4" y="4.6" width="17.2" height="14.8" rx="3" />
    <path d="M7.6 10.4h6.2l-1.6-1.7M16.4 13.6h-6.2l1.6 1.7" />
  </svg>
);

export const CryptoIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M9.8 8h3.4a2 2 0 0 1 0 4H9.8zm0 4h3.8a2 2 0 0 1 0 4H9.8zm.6-6.4v1.6m0 8.8v1.6m3-10.4v1.6m0 8.8v1.6" />
  </svg>
);

export const ShieldIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3.4 5 6v5.5c0 4 3 7.6 7 9.1 4-1.5 7-5.1 7-9.1V6z" />
    <path d="m9 12 2.2 2.2L15.2 10" />
  </svg>
);

export const TrendIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="m3.6 15.4 4.8-4.8 3.2 3.2 6-6" />
    <path d="M13.6 7.8h4v4" />
  </svg>
);

export const SearchIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="6.4" />
    <path d="m16 16 4 4" />
  </svg>
);

export const LogoMark = (p: P) => (
  <svg width={28} height={28} viewBox="0 0 32 32" fill="none" {...p}>
    <rect width="32" height="32" rx="9" fill="#FF444F" />
    <path
      d="M10 22V10h4.6c3.7 0 6.2 2.3 6.2 6s-2.5 6-6.2 6zm3.2-2.7h1.3c2 0 3.2-1.3 3.2-3.3s-1.2-3.3-3.2-3.3h-1.3z"
      fill="#fff"
    />
  </svg>
);
