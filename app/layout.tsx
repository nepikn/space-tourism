import "./globals.css";
import type { Metadata } from "next";
import { Provider } from "@/components/provider";

export const metadata: Metadata = {
  title: { template: "Space - %s", default: "Space" },
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="bg-stone-100 text-[15px] text-stone-900 dark:bg-neutral-800 dark:text-neutral-200 dark:selection:bg-blue-300">
        <Provider attribute="class">{children}</Provider>
      </body>
    </html>
  );
}
