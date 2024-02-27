import { getDictionary } from "@/app/[lang]/dictionaries";

export async function ProgressStep({
  currentStep,
  totalSteps,
  lang,
}: {
  currentStep: number;
  totalSteps: number;
  lang: Lang;
}) {
  const dict = await getDictionary(`components/${lang}/ProgressStep`);

  return (
    <div className="text-right text-[#C2C2C2]">
      {dict.step} {currentStep}/{totalSteps}
    </div>
  );
}
