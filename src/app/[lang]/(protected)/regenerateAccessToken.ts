"use server";
import { env } from "@/env.mjs";
import { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } from "@/util/cookiesName";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type SuccessAccessTokenRegeneration = {
  type: "Bearer";
  jwtAccessToken: string;
  jwtRefreshToken: null;
};

export async function getJwtAccessToken(): Promise<string> {
  const accessToken = cookies().get(JWT_ACCESS_TOKEN);
  if (accessToken && accessToken.value) {
    return accessToken.value;
  }

  const refreshToken = cookies().get(JWT_REFRESH_TOKEN);
  if (!refreshToken) {
    throw await redirectUnauthorized();
  }

  return (await regenerateAccessToken(refreshToken.value)) as string;
}

export async function regenerateAccessToken(
  refreshToken: string,
): Promise<string> {
  const response = await fetch(`${env.SERVER_URL}/api/refresh/access-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ jwtRefreshToken: refreshToken }),
  });

  if (!response.ok) {
    throw await redirectUnauthorized();
  }

  const json = (await response.json()) as SuccessAccessTokenRegeneration;
  return json.jwtAccessToken;
}

export async function redirectUnauthorized() {
  const lang = (cookies().get("lang")?.value ?? "en") as "en" | "uk";
  redirect(`/${lang}`);
}
