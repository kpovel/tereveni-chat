import { ChatListHeader } from "@/components/chat/ChatListHeader";
import { ChatNavigation } from "@/components/chat/ChatNavigation";
import { langUnwrapOrDefault } from "@/util/lang";
import { cookies } from "next/headers";
import { ReactNode } from "react";

export default async function Template({ children }: { children: ReactNode }) {
  const lang = await langUnwrapOrDefault(cookies().get("lang")?.value ?? "en");

  return (
    <div className="flex w-full grow flex-col ">
      <div className="w-full">
        <ChatListHeader lang={lang} />
      </div>
      <div className="flex grow flex-col pb-20 relative">
        <ChatNavigation lang={lang} />
        <main className="flex grow flex-col">{children}</main>
      </div>
    </div> 
  );
}