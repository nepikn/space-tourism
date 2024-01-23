import Nav from "@/components/ui/nav";
import data from "@/public/data.json";
import clsx from "clsx";
import { Metadata } from "next";
import { Barlow, Bellefair } from "next/font/google";
import Image from "next/image";

interface Page {
  params: {
    planet: string;
  };
}

export const dynamicParams = false;
export async function generateStaticParams() {
  return data.destination.map(
    (d) =>
      ({
        planet: d.name,
      }) satisfies Page["params"],
  );
}

export async function generateMetadata({ params }: Page) {
  return {
    title: params.planet,
  } satisfies Metadata;
}

const barlow = Barlow({ subsets: ["latin"], weight: "400" });
const bellefair = Bellefair({ subsets: ["latin"], weight: "400" });

const Page = ({ params: { planet } }: Page) => {
  const { images, description, distance, travel } = data.destination.find(
    (d) => d.name == planet,
  )!;

  return (
    <div className="mb-[58px] grid justify-items-center gap-y-[26px] px-6 md:mb-0 md:gap-y-[53px] md:px-24 lg:w-full lg:grid-cols-[repeat(2,400px)] lg:items-end lg:justify-end lg:gap-[calc(50%-400px)] lg:px-0 xl:grid-cols-[repeat(2,445px)] xl:justify-between xl:pl-16">
      <div className="relative grid aspect-square w-[170px] md:w-[300px] lg:w-full">
        <Image alt={planet} src={images.png} fill />
      </div>
      <div className="grid justify-items-center gap-y-5 md:gap-y-[46px] lg:justify-items-start lg:gap-y-9">
        <Nav
          linkProps={data.destination.map(({ name: planet }) => ({
            label: planet,
            segments: [planet],
            scroll: false,
          }))}
          styles={{
            nav: "flex h-7 gap-7 text-sm uppercase tracking-widest text-indigo-200 md:h-[34px] md:w-[285.5px] md:justify-between md:text-xs lg:text-base lg:tracking-[2.70px]",
            active: "border-b-[3px] border-white text-white",
          }}
        />
        <section className="grid gap-y-8 text-center md:gap-y-[33.09px] lg:gap-y-7 lg:text-left">
          <div className="border-b border-gray-700 pb-8 md:pb-[53.8px] lg:pb-[54px]">
            <h2
              className={clsx(
                bellefair.className,
                "text-[56px] uppercase md:mb-[36.43px] md:text-[58.24px] md:leading-none lg:mb-[14px] lg:text-[100px] lg:leading-[1.15]",
              )}
            >
              {planet}
            </h2>
            <p
              className={clsx(
                barlow.className,
                "text-[15px] leading-[25px] md:text-indigo-200 md:max-lg:px-[12.75px] lg:text-lg lg:leading-8",
              )}
            >
              {description}
            </p>
          </div>
          <dl className="grid gap-y-8 uppercase md:w-full md:grid-flow-col md:justify-evenly lg:justify-between lg:max-xl:after:content-[''] xl:justify-start xl:gap-x-20">
            {[
              { title: "AVG. DISTANCE", content: distance },
              { title: "Est. travel time", content: travel },
            ].map(({ title, content }) => (
              <div key={title} className="grid gap-y-3">
                <dt className="text-sm leading-[1.2] tracking-widest text-indigo-200">
                  {title}
                </dt>
                <dd
                  className={clsx(
                    bellefair.className,
                    "text-[28px] leading-[1.14]",
                  )}
                >
                  {content}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
};

export default Page;
