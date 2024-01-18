import { MainNav } from "./nav";

interface Props {}
export default function Aside({}: Props) {
  return (
    <div className="fixed right-0 top-0 z-10 h-screen w-[254px] bg-white bg-opacity-5 backdrop-blur-[81.55px] md:hidden">
      <div className="py-[34px] mr-[26.5px] flex justify-end"><button><img src="/assets/shared/icon-close.svg" alt="" /></button></div>
      <div className="mt-[31px] pl-8">
        <MainNav variant="vertical" />
      </div>
    </div>
  );
}
