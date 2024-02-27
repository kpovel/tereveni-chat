import { getDictionary } from "@/app/[lang]/dictionaries";
import { env } from "@/env.mjs";
import AvatarPicker from "./avatarPicker";
import { getJwtAccessToken } from "../../regenerateAccessToken";
import { OnboardingProgress } from "../OnboardingProgress";

export default async function PickAvatar({
  params,
}: {
  params: { lang: Lang };
}) {
  const dict = await getDictionary(`/${params.lang}/onboarding/pick-avatar`);
  const defaultImages = await fetchDefaultImages();

  return (
    <>
      <div className="flex flex-col gap-10">
        <OnboardingProgress currentStep={2} totalSteps={4} lang={params.lang} />
        <div className="grid gap-5 text-pretty text-center text-[#FAFAFA]">
          <h2 className="text-lg font-medium">{dict.title}</h2>
          <p className="text-sm leading-tight">{dict.subtitle}</p>
        </div>
      </div>
      <AvatarPicker
        lang={params.lang}
        dict={dict}
        defaultImages={defaultImages}
      />
    </>
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
