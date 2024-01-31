import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env.mjs";
import {
  setJwtAccessToken,
  setJwtRefreshToken,
} from "../../(protected)/setTokens";

type ResetPassResponse = {
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
    `${env.SERVER_URL}/api/${lang}/forgot-password/${code}`,
    {
      method: "PUT",
      cache: "no-store",
    },
  );

  if (response.ok) {
    const json = (await response.json()) as ResetPassResponse;

    setJwtAccessToken(json.jwtAccessToken);
    setJwtRefreshToken(json.jwtRefreshToken);

    redirect(`/${lang}/create-new-password`);
  }

  const error = await response.text();
  return NextResponse.json(error);
}
