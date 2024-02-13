import { ChatListHeader } from "@/components/chat/ChatListHeader";
import { ChatNavigation } from "@/components/chat/ChatNavigation";
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
      <ChatNavigation lang={params.lang} />
      <main className="pb-10">{children}</main>
    </>
  );
}
