import ChatMenuWrapper from "./chatMenuWrapper";
import { getDictionary } from "../../../../dictionaries";
import { getJwtAccessToken } from "../../../regenerateAccessToken";
import { env } from "@/env.mjs";

export default async function ChatMenu({
  params,
}: {
  params: { lang: Lang; chatId: string };
}) {
  const dict = await getDictionary(`/${params.lang}/chat/menu`);

  const jwtAccessToken = await getJwtAccessToken();

  const res = await fetch(
    `${env.SERVER_URL}/api/get-chat-room/${params.chatId}`,
    {
      headers: {
        Authorization: `Bearer ${jwtAccessToken}`,
      },
    },
  );
  const chatRoom = (await res.json()) as any;

  return (
    <div className="mx-auto w-full max-w-[1440px] px-3.5">
      <ChatMenuWrapper dict={dict} chatId={params.chatId} chatRoom={chatRoom} />
    </div>
  );
}
