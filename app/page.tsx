"use client";

import Image from "next/image";
import { Bellefair, Barlow_Condensed, Barlow } from "next/font/google";
import clsx from "clsx";
import Link from "next/link";

const bellefair = Bellefair({ subsets: ["latin"], weight: "400" });
const barlow = Barlow({ subsets: ["latin"], weight: "400" });
const barlowCondensed = Barlow_Condensed({ subsets: ["latin"], weight: "400" });

export default function Home() {
  return (
    <div className="relative grid h-[667px] w-[375px] grid-rows-[auto_auto_1fr] justify-center gap-6 bg-gray-950 bg-[url('/assets/home/background-home-mobile.jpg')]">
      <nav className="flex justify-between p-6">
        <Link href={"/"}>
          <Image
            alt="logo"
            src={"/assets/shared/logo.svg"}
            width={40}
            height={40}
          />
        </Link>
        <button>
          <Image
            alt="menu"
            src={"/assets/shared/icon-hamburger.svg"}
            width={21}
            height={24}
          />
        </button>
      </nav>
      <div className="top-6 grid items-center justify-center gap-4 px-6">
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
            "w-[327px] text-center text-[80px] font-normal leading-[100px] text-white",
          )}
        >
          SPACE
        </p>
        <p
          className={clsx(
            barlow.className,
            "w-[327px] text-center text-[15px] font-normal leading-[25px] text-indigo-200",
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
            "grid h-[150px] w-[150px] place-content-center rounded-full bg-white align-middle text-xl font-normal tracking-wider text-gray-950",
          )}
        >
          <span>EXPLORE</span>
        </div>
      </div>
    </div>
  );
}
