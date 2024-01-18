"use client";

import data from "@/public/data.json";
import { usePathname } from "next/navigation";
import path from "path";

const maxWidthByScreen = { mobile: "767", tablet: "1023", desktop: "" };
const dirs = [...Object.keys(data)];
const getSrc = (dir: string, screen: string) => {
  return `/assets/${dir}/background-${dir}-${screen}.jpg`;
};

export default function Background() {
  const pathname = usePathname().split(path.sep)[1]?.toLowerCase();
  const dir = dirs.includes(pathname) ? pathname : "home";

  return (
    <picture className="absolute -z-10 block h-full w-full">
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

// export default function Background({
//   fallbackDir,
//   srcsets,
// }: {
//   fallbackDir: string;
//   srcsets: { [dir: string]: string };
// }) {
//   const dir = usePathname().split(path.sep)[1]?.toLowerCase();
//   return (
//     <div
//       className={clsx(
//         srcsets[dir] ?? srcsets[fallbackDir],
//         "fixed -z-10 h-full w-full bg-cover",
//       )}
//     />
//   );
// }
