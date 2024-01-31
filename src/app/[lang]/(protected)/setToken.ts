"use server";

import { setJwtAccessToken } from "./setTokens";

export async function setAccessToken(accessToken: string) {
  setJwtAccessToken(accessToken);
}
