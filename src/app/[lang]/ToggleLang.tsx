"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import lang from "public/lang.svg";

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
    <div className="flex items-center justify-end pt-5">
      <Image src={lang} alt="lang logo" />
      <Link
        href={navigateTo("en")}
        className={`ml-2 mr-1 font-medium ${
          isActive("en") ? "text-white" : "text-[#79767A]"
        }`}
      >
        en
      </Link>
      <div className="text-[#79767A]">|</div>
      <Link
        href={navigateTo("uk")}
        className={`ml-1 font-medium ${
          isActive("uk") ? "text-white" : "text-[#79767A]"
        }`}
      >
        ua
      </Link>
    </div>
  );
}
