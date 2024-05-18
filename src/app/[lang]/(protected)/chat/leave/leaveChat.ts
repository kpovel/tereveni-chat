"use server";

import { env } from "@/env.mjs";
import { getJwtAccessToken } from "../../regenerateAccessToken";

export async function leaveChat(chatRoomUuid: string) {
  const jwtAccessToken = await getJwtAccessToken();

  const res = await fetch(
    `${env.SERVER_URL}/api/exit/public-chat/${chatRoomUuid}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jwtAccessToken}`,
      },
    },
  );

  console.log(res)

  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
}
