"use server";

import { getJwtAccessToken } from "../../regenerateAccessToken";

export async function leaveChat(chatUuid: string) {
  const jwtAccessToken = getJwtAccessToken();
  return false;
}
