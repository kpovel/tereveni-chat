"use client";
import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import { Button } from "@/components/Button";
import { joinChatReq } from "./joinChatReq";
import { useRouter } from "next/navigation";

export function JoinChatButton(props: {
  dict: Awaited<DictionaryReturnTypes["/en/chat"]>;
  chatUUID: string;
}) {
  const router = useRouter();

  async function joinChat() {
    const joined = await joinChatReq(props.chatUUID);
    if (joined) {
      router.refresh();
    }
  }

  return (
    <div className="px-6 py-10">
      <Button onClick={joinChat}>{props.dict.buttons.join}</Button>
    </div>
  );
}
