"use server";

import { redirect } from "next/navigation";
import { env } from "@/env.mjs";

export async function sendMailPutData(
  data: string,
  origin: string,
  lang: Lang,
): Promise<string> {
  const response = await fetch(
    `${env.SERVER_URL}/api/forgot-password?lang=${lang}`,
    {
      body: JSON.stringify({ userEmail: data }),
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Originating-Host": origin,
      },
      cache: "no-store",
    },
  );

  if (response.ok) {
    redirect(`/${lang}/restore-password-mail`);
  }

  const body = (await response.text()) as string;

  return body;
}
