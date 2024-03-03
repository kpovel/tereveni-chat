import { CookiePopup } from "@/components/CookiePopup";
import { getDictionary } from "../dictionaries";
import SignUpForm from "./signUpForm";
import { ProgressStep } from "@/components/progress/ProgressStep";

export default async function SignUp({
  params,
}: {
  params: { lang: "uk" | "en" };
}) {
  const dict = await getDictionary(`/${params.lang}/signup`);

  return (
    <div className="container mx-auto flex min-h-screen max-w-md flex-col items-center gap-10 px-6 py-10">
      <div className="w-full">
        <ProgressStep currentStep={1} totalSteps={4} lang={params.lang} />
      </div>
      <h2 className="text-center text-lg font-medium text-neutral-50">
        {dict.hiThere}
      </h2>
      <SignUpForm lang={params.lang} dict={dict} />
      <CookiePopup lang={params.lang} />
    </div>
  );
}
