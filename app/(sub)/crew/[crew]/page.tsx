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

const Page = ({ params: { crew } }: Page) => {
  const { name, images, role, bio } = data.crew.find(
    (d) => d.name == decodeURI(crew),
  )!;

  const linkVariants = cva("aspect-square h-full rounded-full bg-white", {
    variants: { variant: { "non-active": "opacity-20" } },
  });

  return (
    <div className="mb-[104px] flex flex-col justify-center gap-y-8 md:mb-0 md:gap-y-10 md:px-[88px] md:max-lg:grow">
      <div className="h-[223px] border-b border-gray-700 md:order-1 md:border-0 md:max-lg:grow">
        <img alt={name} className="m-auto h-full" src={images.png} />
      </div>
      <div className="grid justify-items-center gap-y-8 md:gap-y-10">
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
        <section className="grid gap-4 text-center">
          <div className={clsx(bellefair.className, "grid gap-2 uppercase")}>
            <div className="opacity-50 md:text-2xl">{role}</div>
            <div className="text-2xl md:text-[40px]">{name}</div>
          </div>
          <div
            className={clsx(
              barlow.className,
              "text-[15px] leading-[25px] text-indigo-200 md:text-base md:leading-7",
            )}
          >
            {bio}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
