import { env } from "@/env.mjs";
import { redirect } from "next/navigation";
import { getJwtAccessToken } from "../../regenerateAccessToken";

export type Hashtag = {
  name: string;
  hashtags: { id: number; name: string }[];
};

export async function onboardingHashtags(lang: Lang): Promise<Hashtag[]> {
  const jwtAccessToken = await getJwtAccessToken();

  const res = await fetch(
    `${env.SERVER_URL}/api/hashtags-group/all-hashtags-locale?lang=${lang}`,
    {
      headers: {
        Authorization: `Bearer ${jwtAccessToken}`,
      },
    },
  );

  if (!res.ok) {
    redirect(`/${lang}`);
  }
  const json = (await res.json()) as Hashtag[];

  return json.map((category) => {
    return {
      name: category.name,
      hashtags: category.hashtags.sort((a, b) => a.name.localeCompare(b.name)),
    };
  });
}
