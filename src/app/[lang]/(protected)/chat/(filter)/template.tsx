import { ChatListHeader } from "@/components/chat/ChatListHeader";
import { ChatNavigation } from "@/components/chat/ChatNavigation";
import { langUnwrapOrDefault } from "@/util/lang";
import { cookies } from "next/headers";
import { ReactNode } from "react";

export default async function Template({ children }: { children: ReactNode }) {
  const lang = await langUnwrapOrDefault(cookies().get("lang")?.value ?? "en");

  return (
    <>
      <ChatListHeader lang={lang} />
      <div className="relative">
        <ChatNavigation lang={lang} />
        <main className="pb-10">{children}</main>
      </div>
    </>
  );
}
