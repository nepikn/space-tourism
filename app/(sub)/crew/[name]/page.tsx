import { Description } from "@/components/ui/description";
import data from "@/public/data.json";
import clsx from "clsx";
import { Bellefair } from "next/font/google";
import { SubNav } from "@/components/ui/nav";
import { type PageProps, Generator } from "@/lib/generator";
import { Name } from "@/components/ui/name";

const generator = new Generator("crew");
export const dynamicParams = false;
export const generateStaticParams = async () => generator.getStaticParams();
export const generateMetadata = async (props: PageProps) => {
  return generator.getMetaData(props);
};

const bellefair = Bellefair({ subsets: ["latin"], weight: "400" });

const Page = ({ params: { name } }: PageProps) => {
  const { images, role, bio } = data.crew.find((d) => d.name == name)!;

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
            variant: { idle: "opacity-20 hover:opacity-50" },
          }}
        />
        <section className="grid gap-4 text-center lg:gap-[27px] lg:text-left">
          <h1
            className={clsx(
              bellefair.className,
              "grid gap-2 uppercase lg:gap-[15px]",
            )}
          >
            <p className="opacity-50 md:text-2xl lg:text-[32px] lg:leading-[1.15]">
              {role}
            </p>
            <Name name={name} />
          </h1>
          <Description content={bio} style="lg:text-white" />
        </section>
      </div>
    </div>
  );
};

export default Page;
