import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Deriv Dashboard — UI clone",
    short_name: "Deriv UI",
    description:
      "Accounts, live derived-index quotes, cashier flows and portfolio — a front-end demo.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0B0D",
    theme_color: "#181C25",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
