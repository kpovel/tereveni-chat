import Link from "next/link";
import { getDictionary } from "../../dictionaries";
import { ChooseCategories } from "./categories";
import { onboardingHashtags } from "./onboardingHashtags";

export default async function OnboardingCategories({
  params,
}: {
  params: { lang: "uk" | "en" };
}) {
  const dict = await getDictionary(`/${params.lang}/onboarding/categories`);
  const hashtags = await onboardingHashtags();

  return (
    <main className="container mx-auto flex max-w-md flex-col gap-10 px-6 py-10">
      <div>
        <h2 className="text-center text-lg font-medium text-neutral-50">
          {dict.title}
        </h2>
        <h3 className="mt-5 text-center font-main text-sm font-normal leading-tight text-neutral-50">
          {dict.subtitle}
        </h3>
      </div>
      <ChooseCategories hashtags={hashtags} />
      <div className="flex flex-col gap-5">
        <Link
          className="main__link main__btn text-center"
          href={`/${params.lang}/onboarding/final`}
        >
          {dict.nextStep}
        </Link>
        <Link
          className="mx-auto px-5 text-center text-sm text-[#C2C2C2]"
          href={`/${params.lang}/onboarding/final`}
        >
          {dict.skip}
        </Link>
      </div>
    </main>
  );
}
