"use server";

import { redirect } from "next/navigation";
import { env } from "@/env.mjs";
import {
  setJwtAccessToken,
  setJwtRefreshToken,
} from "../(protected)/setTokens";
import { cookies } from "next/headers";

type SuccessLoginResponse = {
  type: "Bearer";
  jwtAccessToken: string;
  jwtRefreshToken: string;
};

type UnauthorizedLoginResponse = {
  fieldName: string;
  fieldMessage: string;
};

export async function loginPostData(
  data: {
    login: string;
    password: string;
  },
  lang: "en" | "uk",
): Promise<string> {
  const response = await fetch(`${env.SERVER_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  if (response.status == 200) {
    const tokens = (await response.json()) as SuccessLoginResponse;

    setJwtAccessToken(tokens.jwtAccessToken);
    setJwtRefreshToken(tokens.jwtRefreshToken);

    redirect(`/${lang}/chat`);
  }

  if (response.status === 401 || response.status === 403) {
    const loginError = (await response.json()) as UnauthorizedLoginResponse;
    return loginError.fieldMessage;
  }

  return "Server error";
}
