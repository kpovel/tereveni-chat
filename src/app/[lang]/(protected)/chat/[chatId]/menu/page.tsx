import ChatMenuWrapper from "./chatMenuWrapper";
import { getDictionary } from "../../../../dictionaries";
import { getJwtAccessToken } from "../../../regenerateAccessToken";
import { env } from "@/env.mjs";

export default async function ChatMenu({
    params,
  }: {
    params: { lang: Lang; chatId: string };
  }) {

    // const dict = await getDictionary(`/${params.lang}/chat/${params.chatId}/menu`);

    const jwtAccessToken = await getJwtAccessToken();
console.log(params.chatId)

    const res = await fetch(
        `${env.SERVER_URL}/api/get-chat-room/${params.chatId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtAccessToken}`,
          },
        },
      );
      const chatRoom = (await res.json()) as any;

      console.log(chatRoom)

    return (
        <div className="max-w-[1440px] w-full mx-auto px-3.5">
            <ChatMenuWrapper chatId={params.chatId} chatRoom={chatRoom}/>
        </div>
    )
}