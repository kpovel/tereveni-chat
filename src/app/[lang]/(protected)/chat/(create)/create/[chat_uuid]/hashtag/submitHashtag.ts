"use server";

import { getJwtAccessToken } from "@/app/[lang]/(protected)/regenerateAccessToken";
import { env } from "@/env.mjs";
import { redirect } from "next/navigation";

export async function submitHashtag(
  lang: Lang,
  chatUUID: string,
  hashtagId: number,
) {
  const jwtAccessToken = await getJwtAccessToken();

  const res = await fetch(
    `${env.SERVER_URL}/api/public-chat-room/edit-hashtag?lang=${lang}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jwtAccessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        uuid: chatUUID,
        hashtag: {
          id: hashtagId,
        },
      }),
    },
  );

  if (res.status === 200) {
    redirect(`/${lang}/chat/create/${chatUUID}/description`);
  }
}
