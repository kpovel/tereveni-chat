import Image from "next/image";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { onboardingUserData } from "./onboardingUserData";
import { FinishOnboarding } from "./FinishOnboarding";

export default async function OnboardingFinal({
  params,
}: {
  params: { lang: "uk" | "en" };
}) {
  const dict = await getDictionary(`/${params.lang}/onboarding/final`);
  const userData = await onboardingUserData();

  return (
    <main className="container mx-auto flex h-screen max-w-md flex-col justify-between gap-10 px-6 py-10">
      <div className="flex flex-col items-center gap-[3.75rem]">
        <h2 className="text-center text-[1.75rem] font-medium text-neutral-50">
          {dict.welcome}, {userData.name}!
        </h2>
        <Image
          src={`/api/user-image/${userData.image.name}`}
          className="h-[200px] w-[200px] overflow-hidden rounded-full"
          width={200}
          height={200}
          alt="User avatar"
          priority={true}
        />
      </div>
      <FinishOnboarding dict={dict} lang={params.lang} />
    </main>
  );
}
