"use server";

import { redirect } from "next/navigation";
import { env } from "@/env.mjs";
import {
  setJwtAccessToken,
  setJwtRefreshToken,
} from "../(protected)/setTokens";

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

  console.log(response.status);
  if (response.status == 200) {
    const tokens = (await response.json()) as SuccessLoginResponse;
    console.log("tokens:", tokens);

    setJwtAccessToken(tokens.jwtAccessToken);
    setJwtRefreshToken(tokens.jwtRefreshToken);

    redirect(`/${lang}/chat`);
  }

  if (response.status === 401) {
    const loginError = (await response.json()) as UnauthorizedLoginResponse;
    console.log("Error:", loginError);
    return loginError.fieldMessage;
  } else if (response.status === 403) {
    const loginError = (await response.json()) as UnauthorizedLoginResponse;
    console.log("Error:", loginError);
    return loginError.fieldMessage;
  }

  console.log("something really bad:", await response.text());
  return "Server error";
}
