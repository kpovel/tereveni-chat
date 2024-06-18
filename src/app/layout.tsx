import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tereveni",
  description:
    "The Web Chat Application is designed to facilitate real-time communication between users over the Internet",
  keywords: ["chat", "blog"],
  applicationName: "Tereveni",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
