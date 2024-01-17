import { getDictionary } from "@/app/[lang]/dictionaries";
import { env } from "@/env.mjs";
import AvatarPicker from "./avatarPicker";
import { cookies } from "next/headers";
import { JWT_ACCESS_TOKEN } from "@/util/cookiesName";
import { redirect } from "next/navigation";

export default async function PickAvatar({
  params,
}: {
  params: { lang: "uk" | "en" };
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
      <p className="mt-5 text-center font-main text-sm font-normal leading-tight text-neutral-50">
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
  const jwtaccess = cookies().get(JWT_ACCESS_TOKEN);
  if (!jwtaccess) {
    const lang = cookies().get("lang")?.value ?? "en";
    redirect(`/${lang}`);
  }

  const res = await fetch(`${env.SERVER_URL}/api/default-avatars`, {
    headers: {
      Authorization: `Bearer ${jwtaccess.value}`,
    },
  });

  const json = (await res.json()) as string[];

  return json.map((img) => `/api/user-image/${img}`);
}
