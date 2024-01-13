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
    <main className="mb-[57px] grid justify-items-center gap-y-8 px-6 md:mb-[62px] md:mt-10 md:gap-y-[60px] md:px-[38.5px]">
      <h1 className="flex gap-x-[18px] pr-1 text-base uppercase tracking-[2.70px] text-white before:font-bold before:tracking-[2.70px] before:opacity-25 before:content-['01'] md:gap-x-[22px] md:justify-self-start">
        Pick your destination
      </h1>
      <div className="grid justify-items-center gap-y-[26px] md:gap-y-[53px] md:px-[61.5px]">
        <Image alt={planet} src={images.png} width={170} height={170} />
        <div className="grid justify-items-center gap-y-5 md:gap-y-[46px]">
          <Nav
            links={data.destination.map(({ name: planet }) => ({
              label: planet,
              paths: [planet],
              scroll: false,
            }))}
            style={{
              nav: "flex md:w-[285.5px] uppercase md:justify-between md:text-xs md:leading-none md:pt-[4.7px] md:h-[34px] h-7 gap-7 text-sm tracking-widest text-indigo-200",
              active: "border-b-[3px] border-white text-white",
            }}
          />
          <section className="grid justify-items-center gap-y-8 md:gap-y-[33.09px]">
            <div className="border-b border-gray-700 pb-8 md:pb-[53.8px]">
              <h2
                className={clsx(
                  bellefair.className,
                  "text-center text-[56px] uppercase text-white md:mb-[36.43px] md:text-[58.24px] md:leading-none",
                )}
              >
                {planet}
              </h2>
              <p
                className={clsx(
                  barlow.className,
                  "text-center text-[15px] leading-[25px] text-white md:px-[10px] md:text-indigo-200",
                )}
              >
                {description}
              </p>
            </div>
            <dl className="grid justify-items-center gap-y-8 md:w-full md:grid-flow-col md:justify-evenly">
              {[
                { title: "AVG. DISTANCE", content: distance },
                { title: "Est. travel time", content: travel },
              ].map(({ title, content }) => (
                <div key={title} className="grid justify-items-center gap-y-3">
                  <dt className="text-center text-sm uppercase tracking-widest text-indigo-200">
                    {title}
                  </dt>
                  <dd
                    className={clsx(
                      bellefair.className,
                      "text-center text-[28px] uppercase text-white",
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
