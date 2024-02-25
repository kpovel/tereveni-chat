"use server";

import { redirect } from "next/navigation";
import { env } from "@/env.mjs";
import { getJwtAccessToken } from "../../regenerateAccessToken";

export async function avatarPost(formData: FormData, lang: Lang) {
  const accessToken = await getJwtAccessToken();

  const res = await fetch(
    `${env.SERVER_URL}/api/user/avatar/upload?lang=${lang}`,
    {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (res.ok) {
    redirect(`/${lang}/onboarding/introduce-yourself`);
  }

  return await res.text();
}
