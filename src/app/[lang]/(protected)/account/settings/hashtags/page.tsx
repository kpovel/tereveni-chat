import { getDictionary } from "@/app/[lang]/dictionaries";
import { env } from "@/env.mjs";
import Image from "next/image";
import Link from "next/link";
import ChevronRight from "public/account/chevron-right.svg";
import { getJwtAccessToken } from "../../../regenerateAccessToken";
import { UserCategories } from "./UserCategories";

export default async function Page({ params }: { params: { lang: Lang } }) {
  const dict = await getDictionary(`/${params.lang}/account/settings/hashtags`);
  const hashtags = await userHashtags();

  return (
    <main className="flex w-full grow flex-col gap-10 px-6 py-10">
      <div className="flex flex-col justify-between gap-5">
        <div className="flex flex-row justify-between">
          <Link href={`/${params.lang}/account/settings`} className="min-w-fit">
            <Image
              src={ChevronRight}
              alt="Chevron left"
              className="rotate-180"
            />
          </Link>
          <h1 className="text-balance text-center text-lg font-medium">
            {dict.title}
          </h1>
          <div></div>
        </div>
        <h2 className="text-balance text-center">{dict.subtitle}</h2>
      </div>
      <UserCategories hashtags={hashtags} lang={params.lang} dict={dict} />
    </main>
  );
}

async function userHashtags() {
  const jwtAccessToken = await getJwtAccessToken();

  const res = await fetch(`${env.SERVER_URL}/api/user/hashtags`, {
    headers: {
      Authorization: `Bearer ${jwtAccessToken}`,
    },
  });

  const json = (await res.json()) as UserHashtags[];
  json[json.length - 1].name = undefined;

  return json;
}

export type UserHashtags = {
  name: string | undefined;
  hashtags: { id: number; name: string; selected: boolean }[];
};
