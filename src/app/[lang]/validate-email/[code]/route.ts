import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env.mjs";
import { setJwtAccessToken, setJwtRefreshToken } from "../../(protected)/setTokens";

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

    setJwtAccessToken(json.jwtAccessToken);
    setJwtRefreshToken(json.jwtRefreshToken);

    redirect(`/${lang}/onboarding/pick-avatar`);
  }

  const error = await response.text();
  return NextResponse.json(error);
}
