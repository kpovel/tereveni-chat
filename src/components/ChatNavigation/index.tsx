import Link from "next/link";
import { SearchIcon } from "./searchIcon";
import { PlusIcon } from "./plusIcon";
import { DropDownMenu } from "./DropDownMenu";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { Lang } from "@/util/allowedLang";

const routes = [
  {
    href: (lang: Lang) => {
      return `/${lang}/chat/all`;
    },
    title: async (lang: Lang) => {
      const dict = await getDictionary(`components/${lang}/ChatNavigation`);
      return dict.allChats;
    },
  },
  {
    href: (lang: Lang) => {
      return `/${lang}/chat/private-messages`;
    },
    title: async (lang: Lang) => {
      const dict = await getDictionary(`components/${lang}/ChatNavigation`);
      return dict.privateMessages;
    },
  },
  {
    href: (lang: Lang) => {
      return `/${lang}/chat/public-chat-rooms`;
    },
    title: async (lang: Lang) => {
      const dict = await getDictionary(`components/${lang}/ChatNavigation`);
      return dict.publicChatRooms;
    },
  },
];

export type Route = {
  href: string;
  title: string;
};

export async function ChatNavigation({ lang }: { lang: Lang }) {
  const computedRoutes = (await Promise.all(
    routes.map(async (r) => {
      return {
        href: r.href(lang),
        title: await r.title(lang),
      };
    }),
  )) satisfies Route[];

  return (
    <nav className="mx-auto flex max-w-[390px] items-center justify-between px-6 py-[30px]">
      <Link
        href={`/${lang}/chat/search`}
        className="flex h-8 w-8 items-center justify-center rounded active:bg-[rgba(255,255,255,0.05)]"
      >
        <SearchIcon />
      </Link>
      <DropDownMenu routes={computedRoutes} />
      <Link
        href={`/${lang}/chat/create`}
        className="flex h-8 w-8 items-center justify-center rounded active:bg-[rgba(255,255,255,0.05)]"
      >
        <PlusIcon />
      </Link>
    </nav>
  );
}
