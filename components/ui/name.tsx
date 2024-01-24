import clsx from "clsx";
import { Bellefair } from "next/font/google";

export const bellefair = Bellefair({ subsets: ["latin"], weight: "400" });

export function Name({ name }: { name: string }) {
  return (
    <p
      className={clsx(
        bellefair.className,
        "text-2xl uppercase md:text-[40px] md:leading-[1.15] lg:text-[56px] lg:leading-[4rem]",
      )}
    >
      {name.replace("-", " ")}
    </p>
  );
}
