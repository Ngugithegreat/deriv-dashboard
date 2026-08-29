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

/* Solid variants — the reference app fills the active tab icon. */
export const HomeSolidIcon = (p: P) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M3.5 10.4 12 3.8l8.5 6.6V19a1.4 1.4 0 0 1-1.4 1.4h-3.6v-5.1h-7v5.1H4.9A1.4 1.4 0 0 1 3.5 19z" />
  </svg>
);

export const CandlesSolidIcon = (p: P) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...p}>
    <rect x="4.6" y="6.7" width="4.8" height="10.6" rx="1.2" />
    <rect x="14.6" y="6.7" width="4.8" height="10.6" rx="1.2" />
    <rect x="6.2" y="4" width="1.6" height="3.4" rx=".8" />
    <rect x="6.2" y="16.6" width="1.6" height="3.4" rx=".8" />
    <rect x="16.2" y="4" width="1.6" height="3.4" rx=".8" />
    <rect x="16.2" y="16.6" width="1.6" height="3.4" rx=".8" />
  </svg>
);

export const WalletSolidIcon = (p: P) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...p}>
    <rect x="3.2" y="5.6" width="17.6" height="12.8" rx="2.6" fill="currentColor" />
    <rect x="14.4" y="9.9" width="6.4" height="4.4" rx="2.2" fill="#fff" />
    <circle cx="16.9" cy="12.1" r="1.1" fill="currentColor" />
  </svg>
);

/** Small asset glyph shown on market cards, as in the reference app. */
export const AssetCandlesIcon = (p: P) => (
  <svg width={30} height={30} viewBox="0 0 30 30" fill="none" {...p}>
    <rect x="3.4" y="9" width="3.6" height="12" rx="1.2" fill="#0B2A4A" />
    <path d="M5.2 6v3.4M5.2 20.6V24" stroke="#0B2A4A" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="9.6" y="12.4" width="3.6" height="8.6" rx="1.2" fill="#00B8A9" />
    <path d="M11.4 9.4v3M11.4 20.6v3" stroke="#00B8A9" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="15.8" y="7.2" width="3.6" height="10.6" rx="1.2" fill="#00B8A9" />
    <path d="M17.6 4.6v2.6M17.6 17.4V20" stroke="#00B8A9" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="22" y="11" width="3.6" height="11" rx="1.2" fill="#0B2A4A" />
    <path d="M23.8 8v3M23.8 21.6V25" stroke="#0B2A4A" strokeWidth="1.5" strokeLinecap="round" />
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

/* ---------- Asset and platform marks used across the app ---------- */

export const FlagUSIcon = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
    <defs>
      <clipPath id="flag-clip">
        <circle cx="16" cy="16" r="15" />
      </clipPath>
    </defs>
    <g clipPath="url(#flag-clip)">
      <rect width="32" height="32" fill="#fff" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} y={i * 4.6} width="32" height="2.3" fill="#D8232A" />
      ))}
      <rect width="15" height="14" fill="#2A3C8F" />
      {[...Array(4)].map((_, r) =>
        [...Array(5)].map((_, c) => (
          <circle key={`${r}-${c}`} cx={2 + c * 3} cy={2.4 + r * 3.2} r="0.8" fill="#fff" />
        )),
      )}
    </g>
    <circle cx="16" cy="16" r="15" fill="none" stroke="rgb(var(--line))" />
  </svg>
);

export const UsdcIcon = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
    <circle cx="16" cy="16" r="15" fill="#2775CA" />
    <circle cx="16" cy="16" r="10.5" fill="none" stroke="#fff" strokeWidth="1.6" />
    <path
      d="M18.4 13.4a2.6 2.6 0 0 0-2.5-1.5c-1.6 0-2.5.8-2.5 1.9s.9 1.6 2.6 1.9 2.9.9 2.9 2.2-1.2 2.2-2.9 2.2a2.9 2.9 0 0 1-2.7-1.5M16 10.2v11.6"
      stroke="#fff"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const MT5_TONES: Record<string, { top: string; tag: string }> = {
  FIN: { top: "#1D6FE0", tag: "#0FA958" },
  STD: { top: "#1D6FE0", tag: "#12305C" },
  SWF: { top: "#1D6FE0", tag: "#12B2B2" },
  GOLD: { top: "#1D6FE0", tag: "#D8A521" },
};

export const Mt5Badge = ({ tag = "STD", size = 40 }: { tag?: string; size?: number }) => {
  const tone = MT5_TONES[tag] ?? MT5_TONES.STD;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden>
      <rect x="2" y="6" width="36" height="28" rx="8" fill={tone.tag} />
      <rect x="2" y="4" width="36" height="24" rx="7" fill={tone.top} />
      <text
        x="20"
        y="19.5"
        textAnchor="middle"
        fontSize="11.5"
        fontWeight="700"
        fill="#fff"
        fontFamily="var(--font-plex), sans-serif"
      >
        MT5
      </text>
      <text
        x="20"
        y="32"
        textAnchor="middle"
        fontSize="7"
        fontWeight="700"
        fill="#fff"
        fontFamily="var(--font-plex), sans-serif"
      >
        {tag}
      </text>
    </svg>
  );
};

export const OptionsBadge = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden>
    <rect x="4" y="4" width="32" height="32" rx="9" fill="#FF444F" />
    <path
      d="M22.5 14h4v4M26.5 14 21 19.5M17.5 26h-4v-4M13.5 26 19 20.5"
      stroke="#fff"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PlatformBadge = ({
  label,
  color,
  size = 40,
}: {
  label: string;
  color: string;
  size?: number;
}) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden>
    <rect x="3" y="3" width="34" height="34" rx="10" fill={color} />
    <text
      x="20"
      y="25"
      textAnchor="middle"
      fontSize="14"
      fontWeight="700"
      fill="#fff"
      fontFamily="var(--font-plex), sans-serif"
    >
      {label}
    </text>
  </svg>
);

export const TradingViewBadge = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden>
    <rect x="3" y="3" width="34" height="34" rx="10" fill="#131722" />
    <path d="M10 25V15h4.6M17 25l4-10 4 10" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="27.5" cy="16" r="2.4" fill="#2962FF" />
  </svg>
);

export const P2PBadge = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden>
    <rect x="3" y="3" width="34" height="34" rx="10" fill="#FF444F" />
    <text x="20" y="24.5" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff" fontFamily="var(--font-plex), sans-serif">
      P2P
    </text>
  </svg>
);

export const MoreBadge = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden>
    <rect x="3" y="3" width="34" height="34" rx="10" fill="#fff" stroke="rgb(var(--line))" />
    {[0, 1, 2].map((r) =>
      [0, 1, 2].map((c) => (
        <circle key={`${r}-${c}`} cx={13 + c * 7} cy={13 + r * 7} r="2.2" fill="#FF444F" />
      )),
    )}
  </svg>
);

/** Paired coral arrows used on the trade-type grid. */
export const TradeTypeGlyph = ({ variant }: { variant: number }) => {
  const paths: string[][] = [
    ["M4 16 12 6", "M14 16l8 10"],
    ["M4 18l8-8 4 4", "M14 8h8v8"],
    ["M13 4v18M4 13h18", "M7 7l12 12M19 7 7 19"],
    ["M6 8h6v6H6z", "M18 14l4 6h-8z"],
    ["M3 18c4-10 8 4 12-6s4 6 6 2", ""],
    ["M4 10h16l-4-4", "M20 16H4l4 4"],
    ["M4 18 12 8l4 5 6-9", "M18 4h4v4"],
    ["M4 20 14 6", "M14 6h6M20 6v6"],
    ["M5 18 11 8l5 6 4-8", ""],
    ["M4 14c5 0 5-8 10-8s6 12 6 12", ""],
  ];
  const [a, b] = paths[variant % paths.length];
  return (
    <svg width={30} height={30} viewBox="0 0 26 26" fill="none" aria-hidden>
      <path d={a} stroke="#FF444F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {b && <path d={b} stroke="#FF444F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity=".65" />}
    </svg>
  );
};

export const PersonIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="8.6" r="3.6" />
    <path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" />
  </svg>
);

export const CopyIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="9" y="9" width="11" height="11" rx="2.4" />
    <path d="M15 6.6A2.6 2.6 0 0 0 12.4 4H6.6A2.6 2.6 0 0 0 4 6.6v5.8A2.6 2.6 0 0 0 6.6 15" />
  </svg>
);

export const ExternalIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M14 5h5v5M19 5l-8 8" />
    <path d="M18.4 14.6v3.8A1.6 1.6 0 0 1 16.8 20H5.6A1.6 1.6 0 0 1 4 18.4V7.2a1.6 1.6 0 0 1 1.6-1.6h3.8" />
  </svg>
);

export const ArrowRightIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4.6 12h14M13.4 6.6 18.8 12l-5.4 5.4" />
  </svg>
);

export const LockIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="4.6" y="10.4" width="14.8" height="9.6" rx="2.4" />
    <path d="M8.4 10.4V8a3.6 3.6 0 0 1 7.2 0v2.4" />
  </svg>
);

export const MailIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="3.4" y="5.6" width="17.2" height="12.8" rx="2.4" />
    <path d="m4.6 7.4 7.4 5.4 7.4-5.4" />
  </svg>
);

export const PhoneIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="7" y="3" width="10" height="18" rx="2.6" />
    <path d="M11 18h2" />
  </svg>
);

export const DocIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 3.6h7.6L18.6 8.6V20.4H6z" />
    <path d="M13.4 3.8v5h5M9 13h6M9 16.6h4.4" />
  </svg>
);

export const HouseIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 10.6 12 4.6l8 6V19a1.4 1.4 0 0 1-1.4 1.4H5.4A1.4 1.4 0 0 1 4 19z" />
  </svg>
);

export const IdIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="3.2" y="5.4" width="17.6" height="13.2" rx="2.6" />
    <circle cx="9" cy="11.4" r="2.1" />
    <path d="M5.8 16.4a3.4 3.4 0 0 1 6.4 0M14.4 10.4h4M14.4 13.6h4" />
  </svg>
);

export const GridIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="4" y="4" width="6.4" height="6.4" rx="1.8" />
    <rect x="13.6" y="4" width="6.4" height="6.4" rx="1.8" />
    <rect x="4" y="13.6" width="6.4" height="6.4" rx="1.8" />
    <rect x="13.6" y="13.6" width="6.4" height="6.4" rx="1.8" />
  </svg>
);

export const KeyIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="8.4" cy="12" r="3.8" />
    <path d="M12.2 12H20M17.4 12v3.2M20 12v2.4" />
  </svg>
);

export const GlobeIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M3.4 12h17.2M12 3.4c2.2 2.4 3.4 5.4 3.4 8.6s-1.2 6.2-3.4 8.6c-2.2-2.4-3.4-5.4-3.4-8.6S9.8 5.8 12 3.4" />
  </svg>
);

export const LifebuoyIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.6" />
    <circle cx="12" cy="12" r="3.6" />
    <path d="m6 6 3.5 3.5M18 6l-3.5 3.5M6 18l3.5-3.5M18 18l-3.5-3.5" />
  </svg>
);

export const ChatIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M20.4 11.6c0 3.8-3.8 6.9-8.4 6.9a10 10 0 0 1-2.6-.3L4.6 20l1.2-3.4a6.4 6.4 0 0 1-2.2-5c0-3.8 3.8-6.9 8.4-6.9s8.4 3.1 8.4 6.9" />
  </svg>
);

export const WarnIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 7.6v5M12 15.9v.2" />
  </svg>
);
