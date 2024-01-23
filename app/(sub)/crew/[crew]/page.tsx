import { Description } from "@/app/page";
import Nav from "@/components/ui/nav";
import data from "@/public/data.json";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import { Metadata } from "next";
import { Barlow, Bellefair } from "next/font/google";
import Image from "next/image";

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

  const linkVariants = cva("aspect-square h-full rounded-full bg-white", {
    variants: { variant: { "non-active": "opacity-20" } },
  });

  // const dimension = DIMENSIONS[name];

  return (
    <div className="mb-[104px] px-6 flex flex-col justify-center gap-y-8 md:mb-0 md:gap-y-10 md:px-[88px] md:max-lg:grow lg:absolute lg:bottom-0 lg:h-full lg:w-full lg:flex-row lg:items-end lg:justify-between lg:gap-x-2 lg:px-0">
      <picture className="relative flex h-[223px] justify-center border-b border-gray-700 md:order-1 md:border-0 md:max-lg:grow lg:h-full lg:grow lg:items-end lg:justify-end">
        <img
          alt={name}
          src={images.png}
          className="absolute h-full lg:h-auto"
        />
      </picture>
      <div className="grid justify-items-center gap-y-8 md:gap-y-10 lg:mb-[94px] lg:max-w-[50%] lg:justify-items-start lg:gap-y-[120px]">
        <Nav
          linkProps={data.crew.map(({ name: crew }) => ({
            label: "",
            segments: [encodeURI(crew)],
            scroll: false,
          }))}
          styles={{
            nav: "flex h-[10px] gap-4 md:order-1",
            link: linkVariants({ variant: "non-active" }),
            active: linkVariants(),
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
            <div className="text-2xl md:text-[40px] lg:text-[56px] lg:leading-[4rem]">
              {name.replace('-', ' ')}
            </div>
          </div>
          <Description content={bio} style="lg:text-white" />
        </section>
      </div>
    </div>
  );
};

export default Page;
