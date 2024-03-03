import { getDictionary } from "../dictionaries";
import { ForgotPasswordForm } from "./forgotPasswordForm";

export default async function ForgotPassPage({
  params,
}: {
  params: { lang: "en" | "uk" };
}) {
  const dict = await getDictionary(`/${params.lang}/forgot-password`);

  return (
    <div className="mx-auto flex min-h-dvh flex-col items-center gap-10 px-6 pb-10 pt-[78px]">
      <div className="space-y-5">
        <h2 className="text-center text-lg font-medium text-neutral-50">
          {dict.restoreYourPass}
        </h2>
        <p className="mt-5 text-balance text-center text-sm text-neutral-50">
          {dict.description}
        </p>
      </div>
      <ForgotPasswordForm dict={dict} />
    </div>
  );
}
