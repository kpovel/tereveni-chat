import { env } from "@/env.mjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getJwtAccessToken } from "../../regenerateAccessToken";

export type Hashtag = {
  name: string;
  hashtags: { id: number; name: string }[];
};

export async function onboardingHashtags() {
  const jwtAccessToken = await getJwtAccessToken();
  const lang = cookies().get("lang")?.value ?? "en";

  const res = await fetch(
    `${env.SERVER_URL}/api/user-onboarding/hashtags-group`,
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
