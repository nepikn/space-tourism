import clsx from "clsx";
import { Barlow_Condensed } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

const barlowCondensed = Barlow_Condensed({ subsets: ["latin"], weight: "400" });

export default function Nav() {
  return (
    <nav
      className={clsx(
        barlowCondensed.className,
        "flex h-full w-[356px] justify-between text-sm font-normal tracking-widest text-white",
      )}
    >
      <NavLink link={"/"} label="HOME" />
      <NavLink link={"destinations"} label="DESTINATION" />
      <NavLink link={"crew"} label="CREW" />
      <NavLink link={"technology"} label="TECHNOLOGY" />
    </nav>
  );
}

function NavLink({ link, label }: { link: string; label: string }) {
  return (
    <Link
      href={link}
      className={clsx(
        "grid h-full items-center",
        usePathname() == link && "border-b-[3px] border-white",
      )}
    >
      {label}
    </Link>
  );
}
