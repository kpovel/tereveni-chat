"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ToggleLang() {
  const pathname = usePathname();

  function isActive(lang: "uk" | "en") {
    return pathname.startsWith(`/${lang}`);
  }

  function navigateTo(lang: "uk" | "en") {
    const newPath = pathname.split("/");
    newPath.shift();
    newPath.shift();
    newPath.unshift(lang);

    return "/" + newPath.join("/");
  }

  return (
    <div className="pt-5 flex items-center justify-end">
      <Image src="/lang.svg" alt="lang logo" width={18} height={18} />
      <Link
        href={navigateTo("en")}
        className={`ml-2 mr-1 text-sm ${
          isActive("en") ? "text-white" : "text-zinc-500"
        }`}
      >
        en
      </Link>
      <div className="h-3.5 w-0.5 bg-zinc-500"></div>
      <Link
        href={navigateTo("uk")}
        className={`ml-1 text-sm ${
          isActive("uk") ? "text-white" : "text-zinc-500"
        }`}
      >
        ua
      </Link>
    </div>
  );
}
