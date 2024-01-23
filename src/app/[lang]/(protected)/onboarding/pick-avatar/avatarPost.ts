"use server";

import { redirect } from "next/navigation";
import { env } from "@/env.mjs";
import { getJwtAccessToken } from "../../regenerateAccessToken";

type SignUpResponseError = {
  fieldName: string;
  fieldMessage: string;
};

export async function avatarPost(formData: FormData, lang: "en" | "uk") {
  const accessToken = await getJwtAccessToken();

  const res = await fetch(`${env.SERVER_URL}/api/user/avatar/upload`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.ok) {
    redirect(`/${lang}/onboarding/introduce-yourself`);
  }

  const body = (await res.json()) as SignUpResponseError;

  return body.fieldMessage;
}
