import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDictionary } from "../../dictionaries";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env.mjs";

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
  const response = await fetch(
    `${env.SERVER_URL}/api/validate-email/${code}`,
    {
      method: "PUT",
      cache: "no-store",
    },
  );

  if (response.ok) {
    const json = (await response.json()) as ValidateResponse;
    cookies().set("jwtAccessToken", json.jwtAccessToken, {
      path: "/",
      maxAge: 60 * 60 * 24 * 150, // 150d
    });
    cookies().set("jwtRefreshToken", json.jwtRefreshToken, {
      path: "/",
      maxAge: 60 * 15, // 15m
    });
    redirect(`/${lang}/onboarding/pick-avatar`);
  }

  const error = await response.text();
  return NextResponse.json(error);
}
