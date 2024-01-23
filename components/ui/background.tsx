"use client";

import { SubSegments, useSubSegment } from "@/app/(sub)/layout";
import data from "@/public/data.json";
import clsx from "clsx";
import { ClassNameValue } from "tailwind-merge";

const maxWidthByScreen = { mobile: "767", tablet: "1023", desktop: "" };
const dirs = [...Object.keys(data)];
const styles: { [k in SubSegments | "home"]?: ClassNameValue } = {
  // destination: "opacity-25",
  // crew: "opacity-25",
};

const getSrc = (dir: string, screen: string) => {
  return `/assets/${dir}/background-${dir}-${screen}.jpg`;
};

export default function Background() {
  const subPath = useSubSegment();
  const dir = dirs.includes(subPath) ? subPath : "home";

  return (
    <picture
      className={clsx("absolute -z-10 block h-full w-full", styles[dir])}
    >
      {Object.entries(maxWidthByScreen).map(([screen, maxWidth], i) => {
        const src = getSrc(dir, screen);
        return maxWidth ? (
          <source key={i} srcSet={src} media={`(max-width: ${maxWidth}px)`} />
        ) : (
          <img key={i} src={src} className="h-full w-full object-cover" />
        );
      })}
    </picture>
  );
}
