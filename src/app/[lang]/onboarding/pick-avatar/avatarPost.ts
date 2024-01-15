"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/env.mjs";

type SignUpResponseError = {
  fieldName: string;
  fieldMessage: string;
};

export async function avatarPost(formData: FormData, lang: "en" | "uk") {
  const accessToken = cookies().get("jwtAccessToken");

  if (!accessToken) {
    redirect(`/en`);
  }

  const res = await fetch(`${env.SERVER_URL}/api/user/avatar/upload`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
    },
  });

  if (res.ok) {
    redirect(`/${lang}/onboarding/introduce-yourself`);
  }

  const body = (await res.json()) as SignUpResponseError;

  return body.fieldMessage;
}
