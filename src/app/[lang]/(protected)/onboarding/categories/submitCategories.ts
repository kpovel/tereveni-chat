"use server";

import { env } from "@/env.mjs";
import { redirect } from "next/navigation";
import { getJwtAccessToken } from "../../regenerateAccessToken";

export async function submitCategories(
  lang: Lang,
  categories: { id: number }[],
) {
  const jwtAccessToken = await getJwtAccessToken();

  const res = await fetch(
    `${env.SERVER_URL}/api/user/hashtags-with-onboarding/save?lang=${lang}`,
    {
      method: "PUT",
      body: JSON.stringify(categories),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtAccessToken}`,
      },
    },
  );

  if (!res.ok) {
    redirect(`/${lang}`);
  }

  redirect(`/${lang}/onboarding/final`);
}
