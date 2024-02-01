import { ReactNode } from "react";
import { Mulish } from "next/font/google";
import { SetPreferredLanguage } from "./setPreferredLang";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const poppins = Mulish({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

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
      <body className={`${poppins.className} min-h-dvh text-sm text-white`}>
        <SetPreferredLanguage lang={params.lang} />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
