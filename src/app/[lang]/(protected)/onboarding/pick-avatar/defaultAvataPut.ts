"use server";

import { redirect } from "next/navigation";
import { env } from "@/env.mjs";
import { getJwtAccessToken } from "../../regenerateAccessToken";

export async function defaultAvatarPut(formData: string, lang: Lang) {
  const accessToken = await getJwtAccessToken();

  const res = await fetch(
    `${env.SERVER_URL}/api/user/default-avatar-with-onboarding/save?lang=${lang}`,
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

  return await res.text();
}
