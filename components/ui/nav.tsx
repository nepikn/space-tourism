"use client";

import data from "@/public/data.json";
import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import path from "path";
import React from "react";

export function MainNav() {
  const links = [
    { href: path.sep, label: "HOME" },
    ...Object.entries(data).map(([dir, pages]) => ({
      href: path.join(path.sep, dir, pages[0].name),
      label: dir.toUpperCase(),
    })),
  ];

  const style = {
    nav: "flex h-full w-[356px] text-sm font-normal text-white md:justify-between md:tracking-widest lg:w-auto lg:gap-12 lg:tracking-[2.70px]",
    link: "flex h-full items-center lg:gap-3",
    active: "border-b-[3px] border-white",
  };
  const option = {
    main: true,
    Prefix: ({ index }: { index: string }) => (
      <span className="hidden lg:inline">{index.padStart(2, "0")}</span>
    ),
  };

  return <Nav {...{ links, style, option }} />;
}

interface NavLinks {
  links: (Partial<LinkProps> & {
    paths?: string[];
    label: string;
  })[];
  style: {
    nav?: string;
    link?: string;
    active?: string;
  };
  option?: {
    main?: boolean;
    Prefix?: ({ index }: { index: string }) => JSX.Element;
  };
}

export default function Nav({ links, style, option }: NavLinks) {
  const pathname = usePathname();

  return (
    <nav className={clsx(style.nav)}>
      {links.map((link, index) => {
        const href =
          link.href ?? path.join(path.dirname(pathname), ...link.paths!);
        const isActive = option?.main
          ? pathname.split(path.sep)[1] == href.toString().split(path.sep)[1]
          : pathname == href;

        return (
          <Link
            {...link}
            key={link.label}
            href={href}
            className={clsx(style.link, isActive && style.active)}
          >
            {option?.Prefix && (
              <option.Prefix key={link.label} index={index.toString()} />
            )}
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
