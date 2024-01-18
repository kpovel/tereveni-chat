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

/**
 * regenerateAccessToken - Regenerates a new access token and sets it in cookies
 *
 * This function generates a new access token, sets it in cookies,
 * and returns the new access token to the consumer.
 *
 * @returns {Promise<string | void>} The new access token
 */
export async function regenerateAccessToken(): Promise<string | void> {
  const lang = (cookies().get("lang")?.value ?? "en") as "en" | "uk";

  const refreshToken = cookies().get(JWT_REFRESH_TOKEN);

  if (!refreshToken) {
    return redirectUnauthorized(lang);
  }

  const response = await fetch(`${env.SERVER_URL}/api/refresh/access-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ jwtRefreshToken: refreshToken.value }),
  });

  if (!response.ok) {
    return redirectUnauthorized(lang);
  }

  const json = (await response.json()) as SuccessAccessTokenRegeneration;
  setJwtAccessToken(json.jwtAccessToken);

  return json.jwtAccessToken;
}

function redirectUnauthorized(homePage: "en" | "uk") {
  cookies().delete(JWT_REFRESH_TOKEN);
  cookies().delete(JWT_ACCESS_TOKEN);
  redirect(`/${homePage}`);
}
