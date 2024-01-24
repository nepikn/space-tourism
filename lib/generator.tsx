import data from "@/public/data.json";
import { Metadata } from "next";
import path from "path";

export type SubSegments = keyof typeof data;
export const getSubSegment = (pathname: string) => {
  return pathname.split(path.sep)[1] as SubSegments;
};

export const mainNavLinks = [
  { href: path.sep, label: "HOME" },
  ...Object.entries(data).map(([dir, pages]) => ({
    href: path.join(path.sep, dir, pages[0].name),
    label: dir,
  })),
];

export interface PageProps {
  params: {
    name: string;
  };
}

export class Generator {
  subSegment: SubSegments;

  constructor(subSegment: SubSegments) {
    this.subSegment = subSegment;
  }

  getStaticParams(): PageProps["params"][] {
    return data[this.subSegment].map(({ name }) => ({ name }));
  }

  getMetaData(props: PageProps): Metadata {
    return { title: props.params.name.replace("-", " ") };
  }
}
