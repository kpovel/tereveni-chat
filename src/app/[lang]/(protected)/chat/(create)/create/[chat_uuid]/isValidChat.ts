import { getJwtAccessToken } from "@/app/[lang]/(protected)/regenerateAccessToken";
import { env } from "@/env.mjs";

export async function isValidChat(chatUUID: string) {
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
