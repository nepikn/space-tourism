"use client";

import data from "@/public/data.json";
import { usePathname } from "next/navigation";
import path from "path";

export type SubSegments = keyof typeof data;

const titles = {
  destination: "Pick your destination",
  crew: "Meet your crew",
  technology: "Space launch 101",
} as { [k in SubSegments]: string };

export default function SubLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <main className="flex flex-col justify-items-center gap-y-8 px-6 md:mt-10 md:gap-y-[60px] md:px-0 md:max-lg:grow lg:mt-[76px] lg:gap-y-16 lg:justify-self-center lg:px-16 xl:px-[167px]">
      <div className="flex gap-x-4 text-base uppercase tracking-[2.70px] md:gap-x-[22px] md:justify-self-start md:px-[38.5px] md:text-xl lg:gap-x-7 lg:px-0 lg:text-[28px]">
        <span className="font-bold opacity-25">
          {(Object.keys(titles).findIndex((key) => key == useSubSegment()) + 1)
            .toString()
            .padStart(2, "0")}
        </span>
        <h1>{titles[useSubSegment()]}</h1>
      </div>
      {children}
    </main>
  );
}

export const useSubSegment = (href?: string) => {
  return (href ?? usePathname()).split(path.sep)[1] as SubSegments;
};
