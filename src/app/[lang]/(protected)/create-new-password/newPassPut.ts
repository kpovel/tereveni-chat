"use server";

import { redirect } from "next/navigation";
import { env } from "@/env.mjs";
import { getJwtAccessToken } from "../regenerateAccessToken";

export async function newPassPut(data: string, lang: Lang): Promise<string> {
  const jwtAccessToken = await getJwtAccessToken();

  const response = await fetch(
    `${env.SERVER_URL}/api/user/new-password/save?lang=${lang}`,
    {
      body: JSON.stringify({ userPassword: data }),
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jwtAccessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (response.ok) {
    redirect(`/${lang}/chat/all`);
  }

  const body = (await response.text()) as string;

  return body;
}
