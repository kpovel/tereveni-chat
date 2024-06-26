import { getDictionary } from "../../../dictionaries";
import { getJwtAccessToken } from "../../regenerateAccessToken";
import { env } from "@/env.mjs";
import { PrivateChatHeader } from "./privateChatHeader";
import { Chat } from "./Chat";
import { ChatInput } from "./ChatInput";
import { JoinChatButton } from "./JoinChatButton";

export type Message = {
  id: number;
  uuid: string;
  content: string;
  edited: boolean;
  dateOfCreated: string;
  user: { uuid: string };
  chatRoom: { uuid: string };
};

export type ChatRoom = {
  uuid: string;
  description: string | null;
  messages: Message[];
  image: { name: string };
  currentChatUserUUID: string;
  dateOfCreated: string;
  admin: boolean;
  join: boolean;
};

export default async function ChatID({
  params,
}: {
  params: { lang: Lang; chatId: string };
}) {
  const dict = await getDictionary(`/${params.lang}/chat`);
  const jwtAccessToken = await getJwtAccessToken();

  const res = await fetch(
    `${env.SERVER_URL}/api/get-chat-room/${params.chatId}`,
    {
      headers: {
        Authorization: `Bearer ${jwtAccessToken}`,
      },
    },
  );
  const chatRoom = (await res.json()) as ChatRoom;

  if (!chatRoom.join) {
    return (
      <div className="relative flex h-dvh w-full flex-col">
        <PrivateChatHeader dict={dict} admin={chatRoom.admin} />
        <Chat chatRoom={chatRoom} pagination={false} />
        <JoinChatButton dict={dict} chatUUID={params.chatId} />
      </div>
    );
  }

  return (
    <div className="relative flex h-dvh w-full flex-col">
      <PrivateChatHeader dict={dict} admin={chatRoom.admin} />
      <Chat chatRoom={chatRoom} pagination={true} />
      <ChatInput
        dict={dict}
        jwtAccessToken={jwtAccessToken}
        chatRoom={chatRoom}
      />
    </div>
  );
}
