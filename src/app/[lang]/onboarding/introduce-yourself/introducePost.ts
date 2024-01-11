"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/env.mjs";

type SignUpResponseError = {
  fieldName: string;
  fieldMessage: string;
};

export async function IntroducePost(introduce: string, lang: "en" | "uk") {
  const jwtAccessTokenCookie = cookies().get("jwtAccessToken");

  if (!jwtAccessTokenCookie) {
    redirect("/en");
  }

  const accessToken = jwtAccessTokenCookie!.value;

  const res = await fetch(
    `${env.SERVER_URL}/api/user/user-about-with-onboarding/save`,
    {
      method: "PUT",
      body: JSON.stringify({ onboardingFieldStr: introduce }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
