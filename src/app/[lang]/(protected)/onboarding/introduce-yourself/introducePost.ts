"use server";

import { redirect } from "next/navigation";
import { env } from "@/env.mjs";
import { getJwtAccessToken } from "../../regenerateAccessToken";

type SignUpResponseError = {
  fieldName: string;
  fieldMessage: string;
};

export async function introducePost(introduce: string, lang: Lang) {
  const jwtAccessToken = await getJwtAccessToken();

  const res = await fetch(
    `${env.SERVER_URL}/api/user/user-about-with-onboarding/save?lang=${lang}`,
    {
      method: "PUT",
      body: JSON.stringify({ onboardingFieldStr: introduce }),
      headers: {
        Authorization: `Bearer ${jwtAccessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (res.ok) {
    redirect(`/${lang}/onboarding/categories`);
  }

  const body = (await res.json()) as SignUpResponseError;

  return body.fieldMessage;
}
