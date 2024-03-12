import { ChatListHeader } from "@/components/chat/ChatListHeader";
import { ReactNode } from "react";

export default function Layout({
  params,
  children,
}: {
  params: { lang: Lang };
  children: ReactNode;
}) {
  return (
    <>
      <ChatListHeader lang={params.lang} />
      <main className="px-6 pb-10 pt-5">{children}</main>
    </>
  );
}
