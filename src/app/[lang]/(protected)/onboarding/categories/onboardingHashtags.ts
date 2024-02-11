import { env } from "@/env.mjs";
import { redirect } from "next/navigation";
import { getJwtAccessToken } from "../../regenerateAccessToken";

export type Hashtag = {
  name: string;
  hashtags: { id: number; name: string }[];
};

export async function onboardingHashtags(lang: Lang) {
  const jwtAccessToken = await getJwtAccessToken();

  const res = await fetch(
    `${env.SERVER_URL}/api/user-onboarding/hashtags-group?lang=${lang}`,
    {
      headers: {
        Authorization: `Bearer ${jwtAccessToken}`,
      },
    },
  );

  if (!res.ok) {
    redirect(`/${lang}`);
  }

  return (await res.json()) as Hashtag[];
}
