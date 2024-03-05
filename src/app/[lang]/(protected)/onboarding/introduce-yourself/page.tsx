import { getDictionary } from "@/app/[lang]/dictionaries";
import Introduce from "./introduce";
import { ProgressStep } from "@/components/progress/ProgressStep";

export default async function IntroduceYourself({
  params,
}: {
  params: { lang: "uk" | "en" };
}) {
  const dict = await getDictionary(
    `/${params.lang}/onboarding/introduce-yourself`,
  );

  return (
    <>
      <div className="flex flex-col gap-10">
        <ProgressStep totalSteps={4} currentStep={3} lang={params.lang} />
        <div className="grid gap-5 text-pretty text-center text-[#FAFAFA]">
          <h2 className="text-lg font-medium">{dict.title}</h2>
          <p className="text-sm leading-tight text-neutral-50">
            {dict.subtitle}
          </p>
        </div>
      </div>
      <Introduce lang={params.lang} dict={dict} />
    </>
  );
}
