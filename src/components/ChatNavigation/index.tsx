import Link from "next/link";
import { SearchIcon } from "./searchIcon";
import { PlusIcon } from "./plusIcon";
import { DropDownMenu } from "./DropDownMenu";

export function ChatNavigation({ lang }: { lang: "en" | "uk" }) {
  return (
    <nav className="flex items-center justify-between px-6 py-[30px]">
      <Link
        href={`/${lang}/chat/search`}
        className="flex h-8 w-8 items-center justify-center rounded active:bg-[rgba(255,255,255,0.05)]"
      >
        <SearchIcon />
      </Link>
      <div className="flex flex-row items-center">
        All chats
        <DropDownMenu lang={lang} />
      </div>
      <Link
        href={`/${lang}/chat/create`}
        className="flex h-8 w-8 items-center justify-center rounded active:bg-[rgba(255,255,255,0.05)]"
      >
        <PlusIcon />
      </Link>
    </nav>
  );
}
