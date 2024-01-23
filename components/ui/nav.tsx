"use client";

import { useSubSegment } from "@/app/(sub)/layout";
import data from "@/public/data.json";
import { cva } from "class-variance-authority";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import path from "path";

export function MainNav({
  variant = "horizontal",
}: {
  variant?: "horizontal" | "vertical";
}) {
  const linkProps = [
    { href: path.sep, label: "HOME" },
    ...Object.entries(data).map(([dir, pages]) => ({
      href: path.join(path.sep, dir, pages[0].name),
      label: dir,
    })),
  ];

  const variants = {
    nav: cva("uppercase text-white [counter-reset:count_-1]", {
      variants: {
        variant: {
          horizontal:
            "flex h-full w-[356px] text-sm md:justify-between md:tracking-widest lg:w-auto lg:gap-12 lg:tracking-[2.70px] lg:text-base",
          vertical: "grid gap-5 tracking-[2.70px]",
        },
      },
    }),
    link: cva(
      "flex h-full items-center gap-3 border-0 border-white border-t-transparent py-[6px] [counter-increment:count_1] before:font-bold before:content-[counter(count,decimal-leading-zero)] md:max-lg:before:content-none",
      {
        variants: {
          active: {
            horizontal: "border-y-[3px]",
            vertical: "border-r-4",
          },
        },
      },
    ),
  };

  const option = {
    main: true,
    // Prefix: ({ index }: { index: string }) => (
    //   <span className="font-bold md:hidden lg:inline">
    //     {index.padStart(2, "0")}
    //   </span>
    // ),
  };

  return (
    <Nav
      linkProps={linkProps}
      option={option}
      styles={{
        nav: variants.nav({ variant }),
        link: variants.link(),
        active: variants.link({ active: variant }),
      }}
    />
  );
}

interface Styles {
  nav?: string;
  link?: string;
  active?: string;
}

interface Nav {
  linkProps: (Partial<LinkProps> & {
    segments?: string[];
    label: string;
  })[];
  styles: Styles;
  // variant?: string;
  option?: {
    main?: boolean;
    // Prefix?: ({ index }: { index: string }) => JSX.Element;
  };
}

export default function Nav({ linkProps, styles, option }: Nav) {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      {linkProps.map((linkProp) => {
        const href =
          linkProp.href ??
          path.join(path.dirname(pathname), ...linkProp.segments!);
        const isActive = option?.main
          ? useSubSegment() == useSubSegment(href.toString())
          : pathname == href;

        return (
          <Link
            {...linkProp}
            key={href.toString()}
            href={href}
            className={isActive ? styles.active : styles.link}
          >
            {linkProp.label}
          </Link>
        );
      })}
    </nav>
  );
}
