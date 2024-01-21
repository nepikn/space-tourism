"use client";

import { useSubSegment } from "@/app/(sub)/layout";
import data from "@/public/data.json";

const maxWidthByScreen = { mobile: "767", tablet: "1023", desktop: "" };
const dirs = [...Object.keys(data)];
const getSrc = (dir: string, screen: string) => {
  return `/assets/${dir}/background-${dir}-${screen}.jpg`;
};

export default function Background() {
  const subPath = useSubSegment();
  const dir = dirs.includes(subPath) ? subPath : "home";

  return (
    <picture className="absolute -z-10 block h-full w-screen">
      {Object.entries(maxWidthByScreen).map(([screen, maxWidth], i) => {
        const src = getSrc(dir, screen);
        return maxWidth ? (
          <source srcSet={src} media={`(max-width: ${maxWidth}px)`} />
        ) : (
          <img src={src} alt="" className="h-full w-full object-cover" />
        );
      })}
    </picture>
  );
}
