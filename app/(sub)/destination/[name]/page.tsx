import { SubNav } from "@/components/ui/nav";
import { Generator, PageProps } from "@/lib/generator";
import data from "@/public/data.json";
import clsx from "clsx";
import { Barlow, Bellefair } from "next/font/google";
import Image from "next/image";

const generator = new Generator("destination");
export const dynamicParams = false;
export const generateStaticParams = async () => generator.getStaticParams();
export const generateMetadata = async (props: PageProps) => {
  return generator.getMetaData(props);
};

const barlow = Barlow({ subsets: ["latin"], weight: "400" });
const bellefair = Bellefair({ subsets: ["latin"], weight: "400" });

const Page = ({ params: { name } }: PageProps) => {
  const { images, description, distance, travel } = data.destination.find(
    (d) => d.name == name,
  )!;

  return (
    <div className="mb-[58px] grid justify-items-center gap-y-[26px] px-6 md:mb-0 md:gap-y-[53px] md:px-24 lg:mt-16 lg:w-full lg:grid-cols-[repeat(2,400px)] lg:items-end lg:justify-end lg:gap-[calc(50%-400px)] lg:px-0 lg:pr-16 xl:grid-cols-[repeat(2,445px)] xl:justify-between xl:pl-16 xl:pr-[167px]">
      <div className="relative grid aspect-square w-[170px] md:w-[300px] lg:w-full">
        <Image alt={name} src={images.png} fill />
      </div>
      <div className="grid justify-items-center gap-y-5 md:gap-y-[46px] lg:justify-items-start lg:gap-y-9">
        <SubNav
          showLabel={true}
          navStyle="flex h-7 gap-7 text-sm uppercase tracking-widest md:h-[34px] md:w-[285.5px] md:justify-between md:text-xs lg:text-base lg:tracking-[2.70px]"
          linkStyles={{
            base: "border-white",
            variant: {
              idle: "text-indigo-200 hover:border-b-[3px] hover:border-opacity-50",
              active: "border-b-[3px]",
            },
          }}
        />
        <section className="grid gap-y-8 text-center md:gap-y-[33.09px] lg:gap-y-7 lg:text-left">
          <div className="border-b border-gray-700 pb-8 md:pb-[53.8px] lg:pb-[54px]">
            <h1
              className={clsx(
                bellefair.className,
                "text-[56px] uppercase md:mb-[36.43px] md:text-[58.24px] md:leading-none lg:mb-[14px] lg:text-[100px] lg:leading-[1.15]",
              )}
            >
              {name}
            </h1>
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
