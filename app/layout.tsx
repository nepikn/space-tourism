import "./globals.css";
import type { Metadata } from "next";
import { Barlow_Condensed, Bellefair } from "next/font/google";
import Background from "@/components/ui/background";
import Header from "../components/ui/header";

export const metadata: Metadata = {
  title: { template: "%s - Space Tourism", default: "Space Tourism" },
  generator: "Next.js",
  // applicationName: "Kaminari",
  referrer: "origin-when-cross-origin",
  authors: [{ name: "PCH", url: "https://github.com/nepikn" }],
  colorScheme: "dark light",
  creator: "PCH",
  publisher: "PCH",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://nepikn.vercel.app"),
  alternates: {},
  robots: {
    index: true,
  },
};

const barlowCondensed = Barlow_Condensed({ subsets: ["latin"], weight: "400" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={barlowCondensed.className}>
      <body className="text-white">
        <div className="relative flex flex-col justify-between md:h-[1024px] lg:grid lg:h-[900px] lg:justify-start">
          <Background />
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
