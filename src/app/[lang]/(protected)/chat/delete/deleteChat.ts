"use server";

import { env } from "@/env.mjs";
import { getJwtAccessToken } from "../../regenerateAccessToken";

export async function deleteChat(chatRoomUuid: string) {
  const jwtAccessToken = await getJwtAccessToken();

  const res = await fetch(
    `${env.SERVER_URL}/api/public-chat-room/${chatRoomUuid}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwtAccessToken}`,
      },
    },
  );

  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
}
