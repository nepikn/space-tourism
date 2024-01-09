"use client";

import data from "@/public/data.json";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MainNav() {
  const links = [
    { href: "/", label: "HOME" },
    ...Object.keys(data).map((pathname) => ({
      href: "/" + pathname,
      label: pathname.toUpperCase(),
    })),
  ];
  const style = {
    nav: "flex h-full w-[356px] text-sm font-normal text-white md:justify-between md:tracking-widest lg:w-auto lg:gap-12 lg:tracking-[2.70px]",
    link: "flex h-full items-center lg:gap-3",
    active: "border-b-[3px] border-white",
  };
  const option = {
    Prefix: ({ index }: { index: string }) => (
      <span className="hidden lg:inline">{index.padStart(2, "0")}</span>
    ),
  };

  return <Nav {...{ links, style, option }} />;
}

interface NavLinks {
  links: (Parameters<typeof Link>[0] & {
    label: string;
  })[];
  style: {
    nav?: string;
    link?: string;
    active?: string;
  };
  option?: {
    Prefix?: ({ index }: { index: string }) => JSX.Element;
  };
}

export default function Nav({ links, style, option }: NavLinks) {
  const pathname = usePathname();

  return (
    <nav className={clsx(style.nav)}>
      {links.map((link, index) => {
        const href = link.href.toString();
        return (
          <Link
            {...link}
            key={href}
            className={clsx(style.link, pathname == href && style.active)}
          >
            {option?.Prefix && <option.Prefix index={index.toString()} />}
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
