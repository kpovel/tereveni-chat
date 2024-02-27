import { getDictionary } from "@/app/[lang]/dictionaries";
import { ChooseCategories } from "./categories";
import { onboardingHashtags } from "./onboardingHashtags";
import { ProgressStep } from "@/components/progress/ProgressStep";

export default async function OnboardingCategories({
  params,
}: {
  params: { lang: Lang };
}) {
  const dict = await getDictionary(`/${params.lang}/onboarding/categories`);
  const hashtags = await onboardingHashtags(params.lang);

  return (
    <>
      <div className="flex flex-col gap-10">
        <ProgressStep currentStep={4} totalSteps={4} lang={params.lang} />
        <div className="grid gap-5 text-pretty text-center text-[#FAFAFA]">
          <h2 className="text-lg font-medium">{dict.title}</h2>
          <p className="leading-tight">{dict.subtitle}</p>
        </div>
      </div>
      <ChooseCategories hashtags={hashtags} lang={params.lang} dict={dict} />
    </>
  );
}
