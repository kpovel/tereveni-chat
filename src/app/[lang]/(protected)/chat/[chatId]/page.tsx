import ChatWrapper from "./chatWrapper";
import { getJwtAccessToken } from "../../regenerateAccessToken";
import { env } from "@/env.mjs";

export type Message = {
  uuid: string;
  content: string;
  user: {
    uiid: string;
    name: string;
    image: {
      name: string;
    };
    dateOfCreated: string;
  };
  dateOfCreated: string;
};

export type ChatRoom = {
  uuid: string;
  description: string | null;
  messages: Message[];
  image: { name: string };
  currentChatUserUUID: string;
};

export default async function ChatID({
  params,
}: {
  params: { lang: Lang; chatId: string };
}) {
  const jwtAccessToken = await getJwtAccessToken();

  const res = await fetch(
    `${env.SERVER_URL}/api/get-chat-room/${params.chatId}`,
    {
      headers: {
        Authorization: `Bearer ${jwtAccessToken}`,
      },
    },
  );

  const json = (await res.json()) as ChatRoom;

  return (
    <ChatWrapper
      chatId={params.chatId}
      messagesInit={json.messages}
      currentChatUserUUID={json.currentChatUserUUID}
      jwtAccessToken={jwtAccessToken}
    />
  );
}
