"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks({
  routes,
}: {
  routes: {
    path: string;
    title: string;
  }[];
}) {
  const pathname = usePathname();

  function isActivePath(routePath: string): boolean {
    const routeSkipLang = routePath.split("/").slice(2).join("/");
    const locationSkipLang = pathname.split("/").slice(2, 3).join("/");

    return routeSkipLang.startsWith(locationSkipLang);
  }

  return (
    <>
      {routes.map((r) => {
        return (
          <Link
            href={r.path}
            key={r.path}
            className={`min-w-[130px] px-6 py-3 text-center ${isActivePath(r.path) ? "border-b border-b-[#7C01F6]" : ""}`}
          >
            {r.title}
          </Link>
        );
      })}
    </>
  );
}
