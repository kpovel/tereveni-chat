"use server";

import { cookies } from "next/headers";
import { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } from "../../../util/cookiesName";
import { redirect } from "next/navigation";
import { env } from "@/env.mjs";

type SuccessLoginResponse = {
  type: "Bearer";
  jwtAccessToken: string;
  jwtRefreshToken: string;
};

type UnauthorizedLoginResponse = {
  fieldName: string;
  fieldMessage: string;
};

export async function loginPostData(data: {
  login: string;
  password: string;
}): Promise<string | void> {
  const response = await fetch(`${env.SERVER_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.status == 401) {
    const loginError = (await response.json()) as UnauthorizedLoginResponse;
    return loginError.fieldMessage;
  }

  const tokens = (await response.json()) as SuccessLoginResponse;

  cookies().set({
    name: JWT_ACCESS_TOKEN,
    value: tokens.jwtAccessToken,
    maxAge: 60 * 15, // 15m
    httpOnly: true,
    path: "/",
  });
  cookies().set({
    name: JWT_REFRESH_TOKEN,
    value: tokens.jwtRefreshToken,
    maxAge: 60 * 60 * 24 * 150, // 150d
    httpOnly: true,
    path: "/",
  });

  redirect("/chat");
}
