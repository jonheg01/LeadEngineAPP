import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";
import HotLeadNudge from "@/components/HotLeadNudge";
import AnalyticsShell from "@/components/AnalyticsShell";
import Providers from "@/components/Providers";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#133029",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://realtyclientengine.app"),
  title: {
    default: "LeadEngine Real Estate | Phoenix Metro Homes for Sale",
    template: "%s | LeadEngine Real Estate",
  },
  description:
    "Search live MLS listings across Phoenix, Scottsdale, Cave Creek, and the entire Valley. Get instant home valuations, neighborhood guides, and expert real estate guidance.",
  keywords: [
    "Phoenix homes for sale",
    "Scottsdale real estate",
    "Cave Creek homes",
    "Arizona MLS listings",
    "home valuation",
    "real estate agent Phoenix",
    "buy home Arizona",
    "sell home Phoenix",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://realtyclientengine.app",
    siteName: "LeadEngine Real Estate",
    title: "LeadEngine Real Estate | Phoenix Metro Homes for Sale",
    description:
      "Search live MLS listings across Phoenix, Scottsdale, Cave Creek, and the entire Valley.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LeadEngine Real Estate | Phoenix Metro Homes for Sale",
    description:
      "Search live MLS listings across Phoenix, Scottsdale, Cave Creek, and the entire Valley.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={dmSans.variable}
        style={{
          fontFamily:
            "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
        }}
      >
        <Providers>
          <AnalyticsShell>
            {children}
            <ChatWidget />
            <HotLeadNudge />
          </AnalyticsShell>
        </Providers>
      </body>
    </html>
  );
}
