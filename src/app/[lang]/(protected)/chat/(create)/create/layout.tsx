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
    <div className="flex flex-col min-h-dvh">
      <ChatListHeader lang={params.lang} />
      <main className="flex h-full flex-col gap-10 px-6 pb-10 pt-5 grow">
        {children}
      </main>
    </div>
  );
}
