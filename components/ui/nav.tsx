"use client";

import { cn } from "@/lib/utils";
import data from "@/public/data.json";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import path from "path";
import React from "react";

interface Style {
  nav?: string;
  link?: string;
  active?: string;
}

export function MainNav({ variant }: { variant?: "horizontal" | "vertical" }) {
  const links = [
    { href: path.sep, label: "HOME" },
    ...Object.entries(data).map(([dir, pages]) => ({
      href: path.join(path.sep, dir, pages[0].name),
      label: dir,
    })),
  ];

  const navVariants = cva("uppercase text-white", {
    variants: {
      variant: {
        horizontal:
          "flex h-full w-[356px] text-sm md:justify-between md:tracking-widest lg:w-auto lg:gap-12 lg:tracking-[2.70px] lg:text-base",
        vertical: "grid gap-5 tracking-[2.70px]",
      },
    },
    defaultVariants: { variant: "horizontal" },
  });
  const linkVariants = cva(
    "flex h-full py-[6px] items-center gap-3 md:max-lg:gap-0 border-white border-0",
    {
      variants: {
        active: {
          horizontal: "border-b-[3px]",
          vertical: "border-r-4",
        },
      },
    },
  );

  const option = {
    main: true,
    Prefix: ({ index }: { index: string }) => (
      <span className="font-bold md:hidden lg:inline">
        {index.padStart(2, "0")}
      </span>
    ),
  };

  return (
    <Nav
      {...{
        links,
        option,
        variant,
        style: {
          nav: navVariants({ variant }),
          link: linkVariants(),
          active: linkVariants({ active: variant }),
        },
      }}
    />
  );
}

interface NavLinks {
  links: (Partial<LinkProps> & {
    paths?: string[];
    label: string;
  })[];
  style: Style;
  // variant?: string;
  option?: {
    main?: boolean;
    Prefix?: ({ index }: { index: string }) => JSX.Element;
  };
}

export default function Nav({ links, style, option }: NavLinks) {
  const pathname = usePathname();

  return (
    <nav className={style.nav}>
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
            className={isActive ? style.active : style.link}
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
