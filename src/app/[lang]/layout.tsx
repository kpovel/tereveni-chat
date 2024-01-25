import { ReactNode } from "react";
import { Poppins } from "next/font/google";
import { SetPreferredLanguage } from "./setPreferredLang";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
        <div className="left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4"></div>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
