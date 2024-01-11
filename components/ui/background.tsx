"use client";

import { usePathname } from "next/navigation";
import path from "path";

export default function Background({
  fallbackDir,
  srcsets,
}: {
  fallbackDir: string;
  srcsets: { [dir: string]: string };
}) {
  const dir = usePathname().split(path.sep)[1]?.toLowerCase();
  return (
    <div
      className={`fixed -z-10 h-full w-full bg-cover ${
        srcsets[dir] ?? srcsets[fallbackDir]
      }`}
    />
  );
}
