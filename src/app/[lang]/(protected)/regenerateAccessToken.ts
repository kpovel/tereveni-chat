"use server";
import { env } from "@/env.mjs";
import { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } from "@/util/cookiesName";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { setJwtAccessToken } from "./setTokens";

type SuccessAccessTokenRegeneration = {
  type: "Bearer";
  jwtAccessToken: string;
  jwtRefreshToken: null;
};

export async function regenerateAccessToken() {
  const refreshToken = cookies().get(JWT_REFRESH_TOKEN);

  if (!refreshToken) {
    return redirectUnauthorized();
  }

  const response = await fetch(`${env.SERVER_URL}/api/refresh/access-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ jwtRefreshToken: refreshToken.value }),
  });

  if (!response.ok) {
    return redirectUnauthorized();
  }

  const json = (await response.json()) as SuccessAccessTokenRegeneration;
  setJwtAccessToken(json.jwtAccessToken);
}

function redirectUnauthorized() {
  cookies().delete(JWT_REFRESH_TOKEN);
  cookies().delete(JWT_ACCESS_TOKEN);
  redirect("/en");
}
