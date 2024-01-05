"use server";

import { env } from "@/env.mjs";
import { JWT_ACCESS_TOKEN } from "@/util/cookiesName";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function submitCategories(
  lang: "en" | "uk",
  categories: { id: number }[],
) {
  const jwtAccessToken = cookies().get(JWT_ACCESS_TOKEN);
  if (!jwtAccessToken) {
    redirect(`/${lang}`);
  }

  const res = await fetch(
    `${env.SERVER_URL}/api/user/hashtags-with-onboarding/save`,
    {
      method: "PUT",
      body: JSON.stringify(categories),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtAccessToken.value}`,
      },
    },
  );

  if (!res.ok) {
    redirect(`/${lang}`);
  }

  redirect(`/${lang}/onboarding/final`);
}
