import { ReactNode } from "react";
import EnCookiePolicy from "./en.mdx";

export default function CookiesPolicy({
  params,
}: {
  params: { lang: "en" | "uk" };
}) {
  return (
    <InfoLayout>
      <EnCookiePolicy />
    </InfoLayout>
  );
}

function InfoLayout({ children }: { children: ReactNode }) {
  return (
    <main className="w-full px-6 pb-10 pt-[78px]">
      <div className="prose mx-auto items-stretch text-white">
        {children}
      </div>
    </main>
  );
}
