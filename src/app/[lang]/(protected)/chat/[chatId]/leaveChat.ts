"use server";

import { env } from "@/env.mjs";
import { getJwtAccessToken } from "../../regenerateAccessToken";

export async function leaveChat(chatUuid: string) {
  const jwtAccessToken = await getJwtAccessToken();

  const res = await fetch(
    `${env.SERVER_URL}/api/exit/public-chat/${chatUuid}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jwtAccessToken}`
      }
    },
  );

  return res.status === 200;
}
