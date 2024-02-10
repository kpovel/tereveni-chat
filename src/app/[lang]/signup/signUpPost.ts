"use server";

import { redirect } from "next/navigation";
import { env } from "@/env.mjs";

interface SignUpDataInterface {
  login: string;
  email: string;
  password: string;
}

type SignUpResponseError = {
  fieldName: string;
  fieldMessage: string;
};

export async function signUpPostData(
  data: SignUpDataInterface,
  origin: string,
  lang: Lang,
): Promise<string> {
  const response = await fetch(`${env.SERVER_URL}/api/signup?lang=${lang}`, {
    body: JSON.stringify(data),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Originating-Host": origin,
    },
    cache: "no-store",
  });

  if (response.ok) {
    redirect(`/${lang}/send-mail`);
  }

  const body = (await response.json()) as SignUpResponseError;

  return body.fieldMessage;
}
