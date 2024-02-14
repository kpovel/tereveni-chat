import "../globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Mulish } from "next/font/google";
import { SetPreferredLanguage } from "./setPreferredLang";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NotFound from "./not-found";

export const metadata: Metadata = {
  title: "Create Next App",
};

const poppins = Mulish({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin", "cyrillic"],
});

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
  if (params.lang !== "en" && params.lang !== "uk") {
    return (
      <html>
        <body
          className={`${poppins.className} min-h-dvh bg-black text-sm text-white`}
          style={{
            backgroundImage:
              "linear-gradient(to top, rgba(124, 1, 246, 0.15), rgba(124, 1, 246, 0))",
          }}
        >
          <NotFound params={params}/>
        </body>
      </html>
    );
  }

  return (
    <html lang={params.lang}>
      <body
        className={`${poppins.className} min-h-dvh bg-black text-sm text-white`}
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(124, 1, 246, 0.15), rgba(124, 1, 246, 0))",
        }}
      >
        <SetPreferredLanguage lang={params.lang} />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
