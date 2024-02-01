import { ChatListHeader } from "@/components/ChatListHeader";
import { ReactNode } from "react";

export default function Layout({
  params,
  children,
}: {
  params: { lang: "en" | "uk" };
  children: ReactNode;
}) {
  return (
    <>
      <ChatListHeader lang={params.lang} />
      <main>{children}</main>
    </>
  );
}
