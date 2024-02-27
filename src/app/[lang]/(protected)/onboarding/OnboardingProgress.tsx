export function OnboardingProgress({
  currentStep,
  totalSteps,
  lang,
}: {
  currentStep: number;
  totalSteps: number;
  lang: Lang;
}) {
  // todo: update translation
  return (
    <div className="text-[#C2C2C2] text-right">
      Step {currentStep}/{totalSteps}
    </div>
  );
}
