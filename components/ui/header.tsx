"use client";

import Image from "next/image";
import { MainNav } from "@/components/ui/nav";
import Aside from "@/components/ui/aside";
import { useState } from "react";

export default function Header() {
  const [expand, setExpand] = useState(false);
  const toggleAside = () => setExpand((e) => !e);

  return (
    <header className="relative flex items-center justify-between p-6 md:p-0 md:pl-10 lg:mt-10 lg:pl-[55px]">
      <div className="relative aspect-square w-10 lg:w-12">
        <Image alt="logo" src={"/assets/shared/logo.svg"} fill />
      </div>
      <div className="z-10 ml-[30px] hidden h-px grow translate-x-8 bg-white/25 xl:block" />

      <div className="md:hidden">
        <button onClick={toggleAside}>
          <Image
            alt="menu"
            src={"/assets/shared/icon-hamburger.svg"}
            width={24}
            height={21}
          />
        </button>
        <Aside expand={expand} toggleAside={toggleAside} />
      </div>
      <div className="hidden h-24 bg-white/5 backdrop-blur-3xl md:flex md:w-[450px] md:justify-center lg:w-auto lg:justify-start lg:pl-24 lg:max-xl:pr-[10%] xl:w-[830px] xl:pl-[123px]">
        <MainNav />
      </div>
    </header>
  );
}
