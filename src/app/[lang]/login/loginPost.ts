"use server";

import { cookies } from "next/headers";
import { loginDataInterface } from "./loginForm";
import { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } from "../../../util/cookiesName";
import { redirect } from "next/navigation";

export type SuccessLoginResponse = {
  type: "Bearer";
  jwtAccessToken: string;
  jwtRefreshToken: string;
};

export async function loginPostData(
  data: loginDataInterface,
): Promise<string | void> {
  const response = await fetch(`${process.env.SERVER_HOST}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return "Login error";
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
