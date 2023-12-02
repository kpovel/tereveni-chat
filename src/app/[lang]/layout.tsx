import { ReactNode } from "react";
import { Poppins } from "next/font/google";
import { SetPreferredLanguage } from "./setPreferredLang";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "uk" }];
}

export const dynamicParams = false;

export default function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: "uk" | "en" };
}) {
  return (
    <html lang={params.lang}>
      <body className={poppins.className}>
        <SetPreferredLanguage lang={params.lang} />
        {children}
      </body>
    </html>
  );
}
