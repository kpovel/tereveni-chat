"use server";

import { redirect } from "next/navigation";
import { env } from "@/env.mjs";

interface SendMailDataInterface {
  email: string;
}

type SignUpResponseError = {
  fieldName: string;
  fieldMessage: string;
};

export async function sendMailPutData(
  data: string,
  origin: string,
  lang: "en" | "uk",
): Promise<string> {
  const response = await fetch(
    `${env.SERVER_URL}/api/${lang}/forgot-password`,
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
    redirect(`/${lang}/send-mail-restore-pass`);
  }

  const body = (await response.json()) as SignUpResponseError;

  return body.fieldMessage;
}
