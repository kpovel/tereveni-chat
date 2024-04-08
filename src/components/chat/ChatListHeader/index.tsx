import { getDictionary } from "@/app/[lang]/dictionaries";
import { NavLinks } from "./NavLinks";

const routes = [
  {
    path: (lang: "en" | "uk") => `/${lang}/chat/all`,
    title: async (lang: "en" | "uk") => {
      const routeTitles = await getDictionary(
        `components/${lang}/ChatListHeader`,
      );
      return routeTitles.chats;
    },
  },
  {
    path: (lang: "en" | "uk") => `/${lang}/discovery`,
    title: async (lang: "en" | "uk") => {
      const routeTitles = await getDictionary(
        `components/${lang}/ChatListHeader`,
      );
      return routeTitles.discovery;
    },
  },
  {
    path: (lang: "en" | "uk") => `/${lang}/account`,
    title: async (lang: "en" | "uk") => {
      const routeTitles = await getDictionary(
        `components/${lang}/ChatListHeader`,
      );
      return routeTitles.account;
    },
  },
];

export async function ChatListHeader({ lang }: { lang: "en" | "uk" }) {
  const computedRoutes = await Promise.all(
    routes.map(async (r) => {
      return {
        path: r.path(lang),
        title: await r.title(lang),
      };
    }),
  );

  return (
    <header className="bg-[#08040A]">
      <nav className="flex items-center justify-center pt-[26px] text-base font-medium">
        <NavLinks routes={computedRoutes} />
      </nav>
    </header>
  );
}
