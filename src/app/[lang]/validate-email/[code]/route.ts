import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env.mjs";
import { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } from "@/util/cookiesName";

type ValidateResponse = {
  type: string;
  jwtAccessToken: string;
  jwtRefreshToken: string;
};

export async function GET(
  _request: NextRequest,
  context: { params: { lang: string; code: string } },
) {
  const { lang, code } = context.params;
  const response = await fetch(`${env.SERVER_URL}/api/validate-email/${code}`, {
    method: "PUT",
    cache: "no-store",
  });

  if (response.ok) {
    const json = (await response.json()) as ValidateResponse;

    cookies().set({
      name: JWT_ACCESS_TOKEN,
      value: json.jwtAccessToken,
      path: "/",
      maxAge: 60 * 15, // 15m
    });
    cookies().set({
      name: JWT_REFRESH_TOKEN,
      value: json.jwtRefreshToken,
      path: "/",
      maxAge: 60 * 60 * 24 * 150, // 150d
    });
    redirect(`/${lang}/onboarding/pick-avatar`);
  }

  const error = await response.text();
  return NextResponse.json(error);
}
