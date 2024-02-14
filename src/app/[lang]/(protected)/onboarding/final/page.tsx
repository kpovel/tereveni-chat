import { getDictionary } from "@/app/[lang]/dictionaries";
import { onboardingUserData } from "../onboardingUserData";
import { FinishOnboarding } from "./FinishOnboarding";
import { UserImage } from "./FinalUserImage";
import { handleUnsupportedLang } from "@/util/handleUnsupportedLang";

export default async function OnboardingFinal({
  params,
}: {
  params: { lang: Lang };
}) {
  handleUnsupportedLang(params.lang);

  const dict = await getDictionary(`/${params.lang}/onboarding/final`);
  const userData = await onboardingUserData();

  return (
    <main className="container mx-auto flex h-screen max-w-md flex-col justify-between gap-10 px-6 py-10">
      <div className="flex flex-col items-center gap-[3.75rem]">
        <h2 className="text-center text-[1.75rem] font-medium text-neutral-50">
          {dict.welcome}, {userData.name}!
        </h2>
        <UserImage imageName={userData.image.name} />
      </div>
      <FinishOnboarding dict={dict} lang={params.lang} />
    </main>
  );
}
