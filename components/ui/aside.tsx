import Image from "next/image";
import { MainNav } from "./nav";
import { forwardRef } from "react";
import clsx from "clsx";

interface Props {
  expand: boolean;
  toggleAside: () => void;
}

export default function Aside({ expand, toggleAside }: Props) {
  const handleNavClick = (e: any) => {
    if (e.target instanceof HTMLAnchorElement) {
      toggleAside();
    }
  };

  return (
    <div
      className={clsx(
        expand || "translate-x-full",
        "fixed left-0 top-0 z-10 flex h-screen w-screen transition-transform",
      )}
    >
      <div onClick={toggleAside} className="grow" />
      <aside className="h-full w-[254px] bg-white bg-opacity-5 backdrop-blur-[81.55px]">
        <div className="mr-[26.5px] flex justify-end py-[34px]">
          <button
            onClick={toggleAside}
            className="relative aspect-square w-[19px]"
          >
            <Image src="/assets/shared/icon-close.svg" alt="close" fill />
          </button>
        </div>
        <div className="mt-[31px] pl-8" onClick={handleNavClick}>
          <MainNav variant="vertical" />
        </div>
      </aside>
    </div>
  );
}
