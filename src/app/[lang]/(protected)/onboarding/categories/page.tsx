import { getDictionary } from "@/app/[lang]/dictionaries";
import { ChooseCategories } from "./categories";
import { onboardingHashtags } from "./onboardingHashtags";
import { handleUnsupportedLang } from "@/util/handleUnsupportedLang";

export default async function OnboardingCategories({
  params,
}: {
  params: { lang: Lang };
}) {
  handleUnsupportedLang(params.lang);

  const dict = await getDictionary(`/${params.lang}/onboarding/categories`);
  const hashtags = await onboardingHashtags(params.lang);

  return (
    <main className="container mx-auto flex max-w-md flex-col gap-10 px-6 py-10">
      <div>
        <h2 className="text-center text-lg font-medium text-neutral-50">
          {dict.title}
        </h2>
        <h3 className="mt-5 text-center text-sm font-normal leading-tight text-neutral-50">
          {dict.subtitle}
        </h3>
      </div>
      <ChooseCategories hashtags={hashtags} lang={params.lang} dict={dict} />
    </main>
  );
}
