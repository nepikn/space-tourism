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
  const pathname = usePathname();
  const subSegment = getSubSegment(pathname);

  return (
    <main className="relative flex flex-col items-center gap-y-8 md:mt-10 md:grow md:gap-y-[60px] md:px-0 lg:mx-16 lg:mr-0 lg:mt-[76px] lg:gap-y-0 xl:ml-[167px]">
      <header className="flex gap-x-4 px-6 text-base uppercase tracking-[2.70px] md:gap-x-[22px] md:self-start md:px-[38.5px] md:text-xl lg:gap-x-7 lg:px-0 lg:text-[28px]">
        <span className="font-bold opacity-25">
          {(Object.keys(titles).findIndex((key) => key == subSegment) + 1)
            .toString()
            .padStart(2, "0")}
        </span>
        <h1>{titles[subSegment]}</h1>
      </header>
      {children}
    </main>
  );
}

export const getSubSegment = (pathname: string) => {
  return pathname.split(path.sep)[1] as SubSegments;
};
