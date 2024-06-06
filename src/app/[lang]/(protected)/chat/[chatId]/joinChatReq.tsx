"use server";

import { env } from "@/env.mjs";
import { getJwtAccessToken } from "../../regenerateAccessToken";

export async function joinChatReq(_: any, formData: FormData) {
  const chatUUID = formData.get("chatUUID");
  if (!chatUUID) {
    return { joined: false };
  }

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

  return { joined: req.status === 200 };
}
