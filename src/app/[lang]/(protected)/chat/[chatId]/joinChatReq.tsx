"use server";

import { env } from "@/env.mjs";
import { getJwtAccessToken } from "../../regenerateAccessToken";

export async function joinChatReq(chatUUID: string) {
  const jwtAccessToken = await getJwtAccessToken();
  const req = await fetch(
    `${env.SERVER_URL}/api/join/public-chat/${chatUUID}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jwtAccessToken}`,
      },
    },
  );

  return req.status === 200;
}
