"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "./chevronDown";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Route } from ".";

export function DropDownMenu({ routes }: { routes: Route[] }) {
  const pathname = usePathname();
  const currentFilter = routes.find((c) => c.href === pathname);

  return (
    <div className="flex items-center gap-2">
      {currentFilter?.title}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className="rounded outline-none active:bg-[rgba(255,255,255,0.05)]"
            aria-label="Chat list drop down"
          >
            <ChevronDownIcon />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownContent routes={routes} />
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}

function DropdownContent({ routes }: { routes: Route[] }) {
  const pathname = usePathname();

  function isActivePath(routePath: string): boolean {
    const routeSkipLang = routePath.split("/").slice(2).join("/");
    const locationSkipLang = pathname.split("/").slice(2).join("/");

    return routeSkipLang.startsWith(locationSkipLang);
  }

  return (
    <DropdownMenu.Content className="flex flex-col gap-1 rounded-lg bg-[#1F1F1F] py-2 shadow-[0_8px_10px_1px_rgba(0,0,0,0.12)]">
      {routes.map((c) => {
        return (
          <DropdownMenu.Item
            key={c.href}
            className={`flex items-center leading-none outline-none data-[highlighted]:bg-[#252525] ${
              isActivePath(c.href) ? "bg-[#252525]" : ""
            }`}
          >
            <Link href={c.href} className="w-full py-[7px] pl-4 pr-12">
              {c.title}
            </Link>
          </DropdownMenu.Item>
        );
      })}
    </DropdownMenu.Content>
  );
}
