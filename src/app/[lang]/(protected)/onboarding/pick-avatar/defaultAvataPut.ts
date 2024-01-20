"use server";

import { redirect } from "next/navigation";
import { env } from "@/env.mjs";
import { getJwtAccessToken } from "../../regenerateAccessToken";

type SignUpResponseError = {
  fieldName: string;
  fieldMessage: string;
};

export async function defaultAvatarPut(formData: string, lang: "en" | "uk") {
  const accessToken = await getJwtAccessToken();

  const res = await fetch(
    `${env.SERVER_URL}/api/user/default-avatar-with-onboarding/save`,
    {
      method: "PUT",
      body: JSON.stringify({
        onboardingFieldStr: formData,
        onboardingEnd: true,
      }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (res.ok) {
    redirect(`/${lang}/onboarding/introduce-yourself`);
  }

  const body = (await res.json()) as SignUpResponseError;

  return body.fieldMessage;
}
