"use client";

import { getSubSegment } from "@/lib/generator";
import data from "@/public/data.json";
import Image from "next/image";
import { usePathname } from "next/navigation";

const maxWidthByScreen = { mobile: "767", tablet: "1023", desktop: "" };
const dirs = [...Object.keys(data)];
const defaultDir = "home";

const getSrc = (dir: string, screen: string) => {
  return `/assets/${dir}/background-${dir}-${screen}.jpg`;
};

export default function Background() {
  const pathname = usePathname();
  const subSegment = getSubSegment(pathname);
  const dir = dirs.includes(subSegment) ? subSegment : defaultDir;

  return (
    <picture className={"absolute -z-10 block h-full w-full"}>
      {Object.entries(maxWidthByScreen).map(([screen, maxWidth], i) => {
        const src = getSrc(dir, screen);
        return maxWidth ? (
          <source key={i} srcSet={src} media={`(max-width: ${maxWidth}px)`} />
        ) : (
          <Image
            key={i}
            src={src}
            alt=""
            fill
            className="h-full w-full object-cover"
          />
        );
      })}
    </picture>
  );
}
