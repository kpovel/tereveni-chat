import { getDictionary } from "@/app/[lang]/dictionaries";
import { env } from "@/env.mjs";
import AvatarPicker from "./avatarPicker";
import { getJwtAccessToken } from "../../regenerateAccessToken";

export default async function PickAvatar({
  params,
}: {
  params: { lang: Lang };
}) {
  const dict = await getDictionary(`/${params.lang}/onboarding/pick-avatar`);
  const defaultImages = await fetchDefaultImages();

  return (
    <div className="container mx-auto px-6">
      <div className="mt-5 text-right text-sm font-normal text-stone-300">
        <p>Step 2/4</p>
      </div>
      <h2 className="mt-10 text-center text-lg font-medium text-neutral-50 ">
        {dict.title}
      </h2>
      <p className="mt-5 text-center text-sm font-normal leading-tight text-neutral-50">
        {dict.subtitle}
      </p>
      <AvatarPicker
        lang={params.lang}
        dict={dict}
        defaultImages={defaultImages}
      />
    </div>
  );
}

async function fetchDefaultImages() {
  const accessToken = await getJwtAccessToken();

  const res = await fetch(`${env.SERVER_URL}/api/default-avatars`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const json = (await res.json()) as string[];

  return json.map((img) => `/api/user-image/${img}`);
}
