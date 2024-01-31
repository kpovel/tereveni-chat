"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/env.mjs";

type SignUpResponseError = {
  fieldName: string;
  fieldMessage: string;
};

export async function newPassPut(
  data: string,
  lang: "en" | "uk",
): Promise<string> {
  const jwtAccessToken = cookies().get("jwtAccessToken");

  if (!jwtAccessToken) {
    redirect(`/${lang}`);
  }

  const response = await fetch(`${env.SERVER_URL}/api/user/new-password/save`, {
    body: JSON.stringify({ userPassword: data }),
    method: "PUT",
    headers: {
      Authorization: `Bearer ${jwtAccessToken.value}`,
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    redirect(`/${lang}/chat`);
  }

  const body = (await response.json()) as SignUpResponseError;

  return body.fieldMessage;
}
