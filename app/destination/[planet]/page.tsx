"use client";

import Nav from "@/components/ui/nav";
import data from "@/public/data.json";
import clsx from "clsx";
import { Barlow, Bellefair } from "next/font/google";
import Image from "next/image";
import { usePathname } from "next/navigation";
import path from "path";

export const dynamicParams = false;

const barlow = Barlow({ subsets: ["latin"], weight: "400" });
const bellefair = Bellefair({ subsets: ["latin"], weight: "400" });

const Page = ({ params: { planet } }: { params: { planet: string } }) => {
  const pathname = usePathname();
  const destination = data.destination.find((d) => d.name == planet)!;
  const { images, description, distance, travel } = destination;

  return (
    <div className="mb-[57px] grid justify-items-center gap-y-8 px-6">
      <div className="inline-flex items-start justify-start gap-[18px] pr-1">
        <div className="text-base font-bold tracking-[2.70px] text-white opacity-25">
          01
        </div>
        <div className="text-base uppercase tracking-[2.70px] text-white">
          Pick your destination
        </div>
      </div>
      <div className="grid justify-items-center gap-y-[26px]">
        <Image alt={planet} src={images.png} width={170} height={170} />
        <div className="grid justify-items-center gap-y-5">
          <Nav
            links={data.destination.map(({ name }) => ({
              label: name.toUpperCase(),
              href: path.join(path.dirname(pathname), name),
              scroll: false,
            }))}
            style={{
              nav: "flex h-7 gap-7 text-sm tracking-widest text-indigo-200",
              active: "border-b-[3px] border-white text-white",
            }}
          />
          <div className="grid justify-items-center gap-y-8">
            <div className="border-b border-gray-700 pb-8">
              <div
                className={clsx(
                  bellefair.className,
                  "text-center text-[56px] text-white",
                )}
              >
                {planet.toUpperCase()}
              </div>
              <div
                className={clsx(
                  barlow.className,
                  "text-center text-[15px] leading-[25px] text-white",
                )}
              >
                {description}
              </div>
            </div>
            <div className="grid justify-items-center gap-y-8">
              {[
                { title: "AVG. DISTANCE", content: distance },
                { title: "Est. travel time", content: travel },
              ].map(({ title, content }) => (
                <div key={title} className="grid justify-items-center gap-y-3">
                  <div className="text-center text-sm uppercase tracking-widest text-indigo-200">
                    {title}
                  </div>
                  <div
                    className={clsx(
                      bellefair.className,
                      "text-center text-[28px] uppercase text-white",
                    )}
                  >
                    {content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
