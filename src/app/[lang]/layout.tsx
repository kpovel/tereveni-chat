import { ReactNode } from "react";
import { SetPreferredLanguage } from "./setPreferredLang";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "uk" }];
}

export default function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) {
  return (
    <>
      <SetPreferredLanguage lang={params.lang} />
      {children}
    </>
  );
}
