import { Description } from "@/app/page";
import Nav from "@/components/ui/nav";
import data from "@/public/data.json";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import { Metadata } from "next";
import { Bellefair } from "next/font/google";

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

  const linkVariants = cva(
    "h-full aspect-square rounded-full [counter-increment:count_1] before:content-[counter(count,decimal)] flex justify-center items-center",
    {
      variants: {
        variant: {
          default: "border border-white opacity-25",
          active: "bg-white before:text-gray-950",
        },
      },
      defaultVariants: { variant: "default" },
    },
  );

  // const dimension = DIMENSIONS[name];

  return (
    <div className="relative flex h-[570px] flex-col gap-y-[34px] md:h-auto">
      <picture className="relative flex h-[170px]">
        <img
          alt={name}
          className="h-full object-cover"
          src={images.landscape}
        />
      </picture>
      <div className="flex flex-col gap-y-[26px] px-6">
        <Nav
          linkProps={data.technology.map(({ name: technology }) => ({
            label: "",
            segments: [encodeURI(technology)],
            scroll: false,
          }))}
          styles={{
            nav: clsx(
              bellefair.className,
              "h-10 flex gap-4 justify-center [counter-reset:count_-1]",
            ),
            link: linkVariants(),
            active: linkVariants({ variant: "active" }),
          }}
        />
        <div className="flex flex-col gap-4 text-center">
          <div className="flex flex-col gap-[9px]">
            <div className="text-sm tracking-widest text-indigo-200">
              THE TERMINOLOGY…
            </div>
            <div className={clsx(bellefair.className, "text-2xl uppercase")}>
              {name.replace('-', ' ')}
            </div>
          </div>
          <Description content={description} />
        </div>
      </div>
    </div>
  );
};

export default Page;
