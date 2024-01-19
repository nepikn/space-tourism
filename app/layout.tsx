import "./globals.css";
import type { Metadata } from "next";
import { Provider } from "@/components/provider";
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
      <body className="">
        {/* <Provider attribute="class"> */}
        <div className="relative grid content-between">
          <Background />
          <Header />
          {children}
        </div>
        {/* </Provider> */}
      </body>
    </html>
  );
}
