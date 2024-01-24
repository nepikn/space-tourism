import { Description } from "@/app/page";
import { SubNav } from "@/components/ui/nav";
import data from "@/public/data.json";
import clsx from "clsx";
import { Metadata } from "next";
import { Bellefair } from "next/font/google";
import { Name } from "../../crew/[crew]/page";

interface Page {
  params: {
    technology: string;
  };
}

export const dynamicParams = false;
export async function generateStaticParams() {
  return data.technology.map(
    (d) =>
      ({
        technology: encodeURI(d.name),
      }) satisfies Page["params"],
  );
}
export async function generateMetadata({ params }: Page) {
  return {
    title: decodeURI(params.technology),
  } satisfies Metadata;
}

const bellefair = Bellefair({ subsets: ["latin"], weight: "400" });

const Page = ({ params: { technology } }: Page) => {
  const { name, images, description } = data.technology.find(
    (d) => d.name == decodeURI(technology),
  )!;

  // const dimension = DIMENSIONS[name];

  return (
    <div className="relative flex h-[570px] flex-col gap-y-[34px] md:h-auto md:gap-y-[57px] lg:mt-[26px] lg:w-full lg:flex-row-reverse lg:justify-between lg:gap-x-8">
      <picture className="relative flex h-[170px] md:h-[310px] lg:h-[515px] lg:w-[527px]">
        <source srcSet={images.landscape} media={"(max-width: 1023px)"} />
        <img
          alt={name}
          className="h-full object-cover lg:h-auto lg:w-full"
          src={images.portrait}
        />
      </picture>
      <div className="flex flex-col gap-y-[26px] px-6 md:gap-y-[45px] lg:mt-[111px] lg:flex-row lg:gap-x-8 lg:px-0 xl:gap-x-20">
        <SubNav
          linkStyles={{
            base: "flex aspect-square h-10 items-center justify-center rounded-full [counter-increment:count_1] before:content-[counter(count,decimal)] md:h-[60px] md:text-2xl lg:h-auto lg:w-20",
            variant: {
              idle: "border border-white border-opacity-25",
              active: "bg-white before:text-gray-950",
            },
          }}
          navStyle={clsx(
            bellefair.className,
            "flex shrink-0 justify-center gap-4 [counter-reset:count_-1] lg:flex-col lg:justify-start lg:gap-8",
          )}
        />
        <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
          <div className="flex flex-col gap-[9px] md:gap-4 lg:gap-[11px]">
            <div className="text-sm tracking-widest text-indigo-200 md:tracking-[2.70px]">
              THE TERMINOLOGY…
            </div>
            <Name name={name} />
          </div>
          <Description content={description} style="md:max-lg:max-w-[458px]" />
        </div>
      </div>
    </div>
  );
};

export default Page;
