import { Description } from "@/app/page";
import data from "@/public/data.json";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import { Metadata } from "next";
import { Barlow, Bellefair } from "next/font/google";
import Image from "next/image";
import { SubNav } from "@/components/ui/nav";

interface Page {
  params: {
    crew: string;
  };
}

export const dynamicParams = false;
export async function generateStaticParams() {
  return data.crew.map(
    (d) =>
      ({
        crew: encodeURI(d.name),
      }) satisfies Page["params"],
  );
}

export async function generateMetadata({ params }: Page) {
  return {
    title: decodeURI(params.crew),
  } satisfies Metadata;
}

const barlow = Barlow({ subsets: ["latin"], weight: "400" });
const bellefair = Bellefair({ subsets: ["latin"], weight: "400" });

// const DIMENSIONS: {
//   [k: (typeof data)["crew"][number]["name"]]: { width: number; height: number };
// } = {
//   "Douglas Hurley": { width: 514, height: 700 },
//   "Mark Shuttleworth": { width: 433, height: 640 },
// };

const Page = ({ params: { crew } }: Page) => {
  const { name, images, role, bio } = data.crew.find(
    (d) => d.name == decodeURI(crew),
  )!;

  // const dimension = DIMENSIONS[name];

  return (
    <div className="mb-[104px] flex flex-col justify-center gap-y-8 px-6 md:mb-0 md:gap-y-10 md:px-[88px] md:max-lg:grow lg:absolute lg:bottom-0 lg:h-full lg:w-full lg:flex-row lg:items-end lg:justify-between lg:gap-x-2 lg:px-0 lg:pr-16 xl:pr-[167px]">
      <picture className="relative flex h-[223px] justify-center border-b border-gray-700 md:order-1 md:border-0 md:max-lg:grow lg:h-full lg:grow lg:items-end lg:justify-end">
        <img
          alt={name}
          src={images.png}
          className="absolute h-full lg:h-auto xl:max-h-full"
        />
      </picture>
      <div className="grid justify-items-center gap-y-8 md:gap-y-10 lg:mb-[94px] lg:max-w-[50%] lg:justify-items-start lg:gap-y-[120px]">
        <SubNav
          navStyle="flex h-[10px] gap-4 md:order-1"
          linkStyles={{
            base: "aspect-square h-full rounded-full bg-white",
            variant: { idle: "opacity-20" },
          }}
        />
        <section className="grid gap-4 text-center lg:gap-[27px] lg:text-left">
          <div
            className={clsx(
              bellefair.className,
              "grid gap-2 uppercase lg:gap-[15px]",
            )}
          >
            <div className="opacity-50 md:text-2xl lg:text-[32px] lg:leading-[1.15]">
              {role}
            </div>
            <Name name={name} />
          </div>
          <Description content={bio} style="lg:text-white" />
        </section>
      </div>
    </div>
  );
};

export default Page;

export function Name({ name }: { name: string }) {
  return (
    <div
      className={clsx(
        bellefair.className,
        "text-2xl uppercase md:text-[40px] md:leading-[1.15] lg:text-[56px] lg:leading-[4rem]",
      )}
    >
      {name.replace("-", " ")}
    </div>
  );
}
