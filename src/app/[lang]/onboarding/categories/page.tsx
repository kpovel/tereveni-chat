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
      <ChooseCategories hashtags={hashtags} lang={params.lang} dict={dict} />
    </main>
  );
}
