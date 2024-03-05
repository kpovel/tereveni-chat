import { env } from "@/env.mjs";
import { redirect } from "next/navigation";
import { getJwtAccessToken } from "../../regenerateAccessToken";

export type Hashtag = {
  name: string | undefined;
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

  const sortedHashtags = json.map((h) => {
    return {
      name: h.name,
      hashtags: h.hashtags.sort((a, b) => a.name.localeCompare(b.name)),
    };
  });

  sortedHashtags[sortedHashtags.length - 1].name = undefined;

  return sortedHashtags;
}
