"use client";

import { getSubSegment } from "@/lib/generator";
import { mainNavLinks } from "@/lib/generator";
import data from "@/public/data.json";
import { cva } from "class-variance-authority";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import path from "path";

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
    "flex h-full items-center gap-3 border-white py-[6px] [counter-increment:count_1] before:font-bold before:content-[counter(count,decimal-leading-zero)] md:max-lg:before:content-none",
    {
      variants: {
        idle: {
          horizontal:
            "border-t-transparent hover:border-y-[3px] hover:border-opacity-50",
          vertical: "hover:border-r-4 hover:border-opacity-50",
        },
        active: {
          horizontal: "border-y-[3px] border-t-transparent",
          vertical: "border-r-4",
        },
      },
    },
  ),
};

export function MainNav({
  variant = "horizontal",
}: {
  variant?: "horizontal" | "vertical";
}) {
  const pathname = usePathname();
  const subSegment = getSubSegment(pathname);

  return (
    <Nav
      links={mainNavLinks.map((link) => ({
        ...link,
        get active() {
          return subSegment == getSubSegment(this.href);
        },
      }))}
      styles={{
        nav: variants.nav({ variant }),
        link: variants.link({ idle: variant }),
        active: variants.link({ active: variant }),
      }}
    />
  );
}

interface SubNav {
  showLabel?: boolean;
  navStyle: NavProps["styles"]["nav"];
  linkStyles: {
    base?: string;
    variant: {
      idle?: string;
      hover?: string;
      active?: string;
    };
  };
}

export function SubNav({ showLabel = false, navStyle, linkStyles }: SubNav) {
  const pathname = usePathname();

  const linkVariants = cva(linkStyles.base, {
    variants: { variant: linkStyles.variant },
  });

  return (
    <Nav
      links={data[getSubSegment(pathname)].map(({ name }) => {
        return {
          href: path.join(path.dirname(pathname), encodeURI(name)),
          label: showLabel ? name : "",
          get active() {
            return this.href == pathname;
          },
        };
      })}
      styles={{
        nav: navStyle,
        link: linkVariants({ variant: "idle" }),
        active: linkVariants({ variant: "active" }),
      }}
      options={{ scroll: false }}
    />
  );
}

interface NavProps {
  links: {
    href: string;
    label: string;
    active: boolean;
  }[];
  styles: {
    nav?: string;
    link?: string;
    active?: string;
  };
  options?: Partial<LinkProps>;
}

export default function Nav({
  links,
  styles,
  options = { scroll: true },
}: NavProps) {
  return (
    <nav className={styles.nav}>
      {links.map(({ href, label, active }) => {
        return (
          <Link
            {...options}
            key={href}
            href={href}
            className={active ? styles.active : styles.link}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
