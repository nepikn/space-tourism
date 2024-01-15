import "./globals.css";
import type { Metadata } from "next";
import { Provider } from "@/components/provider";
import { Barlow_Condensed, Bellefair } from "next/font/google";
import Image from "next/image";
import { MainNav } from "@/components/ui/nav";
import Background from "@/components/ui/background";

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
          <header className="relative flex items-center justify-between p-6 md:p-0 md:pl-10 lg:mt-10 lg:pl-[55px]">
            <Image
              alt="logo"
              src={"/assets/shared/logo.svg"}
              width={40}
              height={40}
              className="lg:h-12 lg:w-12"
            />
            <div className="hidden w-[30px] lg:block"></div>
            <div className="z-10 hidden h-px grow-[2] translate-x-8 bg-white opacity-25 lg:block" />
            <button className="md:hidden">
              <Image
                alt="menu"
                src={"/assets/shared/icon-hamburger.svg"}
                width={24}
                height={21}
              />
            </button>
            <div className="hidden h-24 bg-white bg-opacity-5 backdrop-blur-3xl md:flex md:w-[450px] md:justify-center lg:w-[765px] lg:justify-end lg:pr-[165px]">
              <MainNav />
            </div>
          </header>
          {children}
        </div>
        {/* </Provider> */}
      </body>
    </html>
  );
}
