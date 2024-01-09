"use client";

import data from "@/public/data.json";
import clsx from "clsx";
import { Barlow_Condensed } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

const barlowCondensed = Barlow_Condensed({ subsets: ["latin"], weight: "400" });

export default function Nav() {
  const pathname = usePathname();
  const links = [
    { path: "/", label: "HOME" },
    ...Object.keys(data).map((path) => ({
      path: "/" + path,
      label: path.toUpperCase(),
    })),
  ];

  return (
    <nav
      className={clsx(
        barlowCondensed.className,
        "flex h-full w-[356px] text-sm font-normal text-white md:justify-between md:tracking-widest lg:w-auto lg:gap-12 lg:tracking-[2.70px]",
      )}
    >
      {links.map(({ path, label }, index) => (
        <Link
          key={path}
          href={path}
          className={clsx(
            "flex h-full items-center lg:gap-3",
            pathname == path && "border-b-[3px] border-white",
          )}
        >
          <span className="hidden lg:inline">
            {index.toString().padStart(2, "0")}
          </span>
          {label}
        </Link>
      ))}
    </nav>
  );
}
