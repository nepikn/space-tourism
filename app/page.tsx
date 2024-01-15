"use client";

import { Bellefair, Barlow } from "next/font/google";
import clsx from "clsx";

const barlow = Barlow({ subsets: ["latin"], weight: "400" });
const bellefair = Bellefair({ subsets: ["latin"], weight: "400" });

export default function Home() {
  return (
    <main className="relative m-6 mb-12 grid gap-20 md:mb-[90px] md:mt-[106px] md:gap-[156px] lg:mx-auto lg:mb-[131px] lg:mt-[251px] lg:grid-flow-col lg:items-end lg:justify-between xl:mx-[165px]">
      <div className="grid items-center justify-center gap-4 text-center md:gap-6 lg:text-left">
        <p
          className={clsx(
            "font-normal tracking-[2.70px] text-indigo-200 md:text-xl md:tracking-[3.38px] lg:text-[28px] lg:leading-[34px] lg:tracking-[4.72px]",
          )}
        >
          SO, YOU WANT TO TRAVEL TO
        </p>
        <p
          className={clsx(
            bellefair.className,
            "text-[80px] font-normal leading-[100px] text-white md:text-[150px] md:leading-[150px] lg:leading-[172px]",
          )}
        >
          SPACE
        </p>
        <p
          className={clsx(
            barlow.className,
            "max-w-[444px] text-[15px] leading-[25px] text-indigo-200 md:text-base md:leading-7 lg:text-[18px] lg:leading-8",
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
            "grid h-[150px] w-[150px] place-content-center rounded-full bg-white align-middle text-xl font-normal tracking-wider text-gray-950 md:h-[242px] md:w-[242px] md:text-[32px] md:tracking-[2px] lg:h-[274px] lg:w-[274px]",
          )}
        >
          <span>EXPLORE</span>
        </div>
      </div>
    </main>
  );
}
