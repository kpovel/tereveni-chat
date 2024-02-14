import "../globals.css";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Mulish } from "next/font/google";
import { Metadata } from "next";

const mulish = Mulish({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Tereveni – Not Found",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body
        className={`${mulish.className} min-h-dvh bg-black text-sm text-white`}
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(124, 1, 246, 0.15), rgba(124, 1, 246, 0))",
        }}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
