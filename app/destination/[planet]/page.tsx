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
    <main className="mb-[57px] grid justify-items-center gap-y-8 px-6 md:mb-[62px] md:mt-10 md:gap-y-[60px] md:px-0 lg:mt-[76px] lg:gap-y-16 lg:justify-self-center lg:px-16 xl:px-[167px] xl:mb-[112px]">
      <h1 className="flex gap-x-[18px] pr-1 text-base uppercase tracking-[2.70px] text-white before:font-bold before:tracking-[2.70px] before:opacity-25 before:content-['01'] md:gap-x-[22px] md:justify-self-start md:px-[38.5px] lg:gap-x-7 lg:px-0 lg:text-[28px]">
        Pick your destination
      </h1>
      <div className="grid justify-items-center gap-y-[26px] md:gap-y-[53px] md:px-24 lg:grid-cols-2 lg:items-end lg:gap-x-[calc(100%/7)] lg:px-0 lg:pl-16">
        <div className="relative grid aspect-square w-[170px] md:w-[300px] lg:w-full">
          <Image alt={planet} src={images.png} fill />
        </div>
        <div className="grid justify-items-center gap-y-5 md:gap-y-[46px] lg:justify-items-start lg:gap-y-9">
          <Nav
            links={data.destination.map(({ name: planet }) => ({
              label: planet,
              paths: [planet],
              scroll: false,
            }))}
            style={{
              nav: "flex h-7 gap-7 text-sm uppercase tracking-widest text-indigo-200 md:h-[34px] md:w-[285.5px] md:justify-between md:text-xs lg:text-base lg:tracking-[2.70px]",
              active: "border-b-[3px] border-white text-white",
            }}
          />
          <section className="grid gap-y-8 text-center md:gap-y-[33.09px] lg:gap-y-7 lg:text-left">
            <div className="border-b border-gray-700 pb-8 md:pb-[53.8px] lg:pb-[54px]">
              <h2
                className={clsx(
                  bellefair.className,
                  "text-[56px] uppercase text-white md:mb-[36.43px] md:text-[58.24px] md:leading-none lg:mb-[14px] lg:text-[100px]",
                )}
              >
                {planet}
              </h2>
              <p
                className={clsx(
                  barlow.className,
                  "text-[15px] leading-[25px] text-white md:px-[12.75px] md:text-indigo-200 lg:text-lg lg:leading-loose",
                )}
              >
                {description}
              </p>
            </div>
            <dl className="grid gap-y-8 uppercase md:w-full md:grid-flow-col md:justify-evenly lg:justify-start lg:gap-x-20">
              {[
                { title: "AVG. DISTANCE", content: distance },
                { title: "Est. travel time", content: travel },
              ].map(({ title, content }) => (
                <div key={title} className="grid gap-y-3">
                  <dt className="text-sm tracking-widest text-indigo-200">
                    {title}
                  </dt>
                  <dd
                    className={clsx(
                      bellefair.className,
                      "text-[28px] text-white",
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
    </main>
  );
};

export default Page;
