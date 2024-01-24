import clsx from "clsx";
import { Barlow } from "next/font/google";
import { ClassNameValue } from "tailwind-merge";

export const barlow = Barlow({ subsets: ["latin"], weight: "400" });

interface Description {
  content: string;
  style?: ClassNameValue;
}

export function Description({ content, style }: Description) {
  return (
    <p
      className={clsx(
        barlow.className,
        "max-w-[444px] text-[15px] leading-[25px] text-indigo-200 md:text-base md:leading-7 lg:text-[18px] lg:leading-8",
        style,
      )}
    >
      {content}
    </p>
  );
}
