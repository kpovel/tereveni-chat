import { getJwtAccessToken } from "@/app/[lang]/(protected)/regenerateAccessToken";
import { env } from "@/env.mjs";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: Lang; chat_uuid: string };
}) {
  const validChat = await isValidChat(params.chat_uuid);
  if (!validChat) {
    redirect(`/${params.lang}/chat/all`);
  }

  return <>{children}</>;
}

async function isValidChat(chatUUID: string) {
  const jwtAccessToken = await getJwtAccessToken();
  const res = await fetch(`${env.SERVER_URL}/api/get-chat-room/${chatUUID}`, {
    headers: {
      Authorization: `Bearer ${jwtAccessToken}`,
    },
  });

  if (res.status === 200) {
    return true;
  }

  return false;
}
