"use client";

import Image from "next/image";
import { Bellefair, Barlow_Condensed, Barlow } from "next/font/google";
import clsx from "clsx";
import Link from "next/link";
import Nav from "@/components/ui/nav";

const bellefair = Bellefair({ subsets: ["latin"], weight: "400" });
const barlow = Barlow({ subsets: ["latin"], weight: "400" });
const barlowCondensed = Barlow_Condensed({ subsets: ["latin"], weight: "400" });

export default function Home() {
  return (
    <main className="relative grid h-[667px] grid-rows-[auto_auto_1fr] gap-6 bg-[url('/assets/home/background-home-mobile.jpg')] bg-cover md:h-[1024px] md:w-[768px] md:gap-[106px] md:bg-[url('/assets/home/background-home-tablet.jpg')]">
      <header className="flex items-center justify-between p-6 md:p-0 md:pl-10">
        <Image
          alt="logo"
          src={"/assets/shared/logo.svg"}
          width={40}
          height={40}
        />
        <button className="md:hidden">
          <Image
            alt="menu"
            src={"/assets/shared/icon-hamburger.svg"}
            width={21}
            height={24}
          />
        </button>
        <div className="hidden h-24 w-[450px] justify-center bg-white bg-opacity-5 backdrop-blur-3xl md:grid">
          <Nav />
        </div>
      </header>
      <div className="top-6 grid items-center justify-center gap-4 px-6 md:gap-6">
        <p
          className={clsx(
            barlowCondensed.className,
            "text-center text-base font-normal tracking-[2.70px] text-indigo-200",
          )}
        >
          SO, YOU WANT TO TRAVEL TO
        </p>
        <p
          className={clsx(
            bellefair.className,
            "text-center text-[80px] font-normal leading-[100px] text-white md:text-[150px] md:leading-[150px]",
          )}
        >
          SPACE
        </p>
        <p
          className={clsx(
            barlow.className,
            "max-w-[444px] text-center text-[15px] leading-[25px] text-indigo-200 md:text-base md:leading-[28px]",
          )}
        >
          Let’s face it; if you want to go to space, you might as well genuinely
          go to outer space and not hover kind of on the edge of it. Well sit
          back, and relax because we’ll give you a truly out of this world
          experience!
        </p>
      </div>
      <div className="grid place-content-center">
        <div
          className={clsx(
            bellefair.className,
            "grid h-[150px] w-[150px] place-content-center rounded-full bg-white align-middle text-xl font-normal tracking-wider text-gray-950 md:h-[242px] md:w-[242px] md:text-[32px] md:tracking-[2px]",
          )}
        >
          <span>EXPLORE</span>
        </div>
      </div>
    </main>
  );
}
