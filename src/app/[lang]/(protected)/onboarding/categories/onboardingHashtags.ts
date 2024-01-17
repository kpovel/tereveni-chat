import { env } from "@/env.mjs";
import { JWT_ACCESS_TOKEN } from "@/util/cookiesName";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Hashtag = {
  name: string;
  hashtags: { id: number; name: string }[];
};

export async function onboardingHashtags() {
  const jwtAccessToken = cookies().get(JWT_ACCESS_TOKEN);
  if (!jwtAccessToken) {
    redirect("/en");
  }

  const res = await fetch(
    `${env.SERVER_URL}/api/user-onboarding/hashtags-group`,
    {
      headers: {
        Authorization: `Bearer ${jwtAccessToken.value}`,
      },
    },
  );

  if (!res.ok) {
    redirect("/en");
  }

  return (await res.json()) as Hashtag[];
}
