"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/env.mjs";

type SignUpResponseError = {
  fieldName: string;
  fieldMessage: string;
};

export async function defaultAvatarPut(formData: string, lang: "en" | "uk") {
  const accessToken = cookies().get("jwtAccessToken");

  if (!accessToken) {
    redirect(`/en`);
  }

  const res = await fetch(
    `${env.SERVER_URL}/api/user/default-avatar-with-onboarding/save`,
    {
      method: "PUT",
      body: JSON.stringify({
        onboardingFieldStr: formData,
        onboardingEnd: true,
      }),
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  console.log(res);

  if (res.ok) {
    redirect(`/${lang}/onboarding/introduce-yourself`);
  }

  const body = (await res.json()) as SignUpResponseError;

  return body.fieldMessage;
}
