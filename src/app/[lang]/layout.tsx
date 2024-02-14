import "../globals.css";
import { ReactNode } from "react";
import { SetPreferredLanguage } from "./setPreferredLang";
import { handleUnsupportedLang } from "@/util/handleUnsupportedLang";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Mulish } from "next/font/google";
import { Metadata } from "next";

const mulish = Mulish({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Tereveni",
};

export const dynamicParams = false;
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
    <html lang={params.lang}>
      <body
        className={`${mulish.className} min-h-dvh bg-black text-sm text-white`}
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(124, 1, 246, 0.15), rgba(124, 1, 246, 0))",
        }}
      >
        {children}
        <SetPreferredLanguage lang={params.lang} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
