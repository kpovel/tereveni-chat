import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } from "./util/cookiesName";
import { env } from "./env.mjs";
import { SuccessAccessTokenRegeneration } from "./app/[lang]/(protected)/regenerateAccessToken";

export async function middleware(request: NextRequest) {
  const jwtRefreshToken = request.cookies.get(JWT_REFRESH_TOKEN);

  if (!jwtRefreshToken) {
    return redirectToMainPage(request);
  }

  const refererPath = new URL(request.headers.get("referer")!).pathname;
  if (refererPath.startsWith("/") && refererPath.endsWith("/login")) {
    return NextResponse.next();
  }

  const accessTokenResponse = await fetch(
    `${env.SERVER_URL}/api/refresh/access-token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ jwtRefreshToken: jwtRefreshToken.value }),
    },
  );

  if (!accessTokenResponse.ok) {
    return redirectToMainPage(request);
  }

  const json =
    (await accessTokenResponse.json()) as SuccessAccessTokenRegeneration;

  const response = NextResponse.next();
  response.cookies.set({
    name: JWT_ACCESS_TOKEN,
    value: json.jwtAccessToken,
    maxAge: 60 * 15, // 15m
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "strict",
    priority: "high",
  });

  return response;
}

function redirectToMainPage(request: NextRequest) {
  const lang = (request.cookies.get("lang")?.value ?? "en") as "en" | "uk";

  return NextResponse.redirect(new URL(`/${lang}`, request.url));
}

export const config = {
  matcher: [
    "/:lang/chat/",
    "/:lang/onboarding/pick-avatar",
    "/:lang/onboarding/categories",
    "/:lang/onboarding/final",
    "/:lang/onboarding/introduce-yourself",
  ],
};
