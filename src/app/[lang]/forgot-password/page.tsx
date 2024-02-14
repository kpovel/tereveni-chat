import { handleUnsupportedLang } from "@/util/handleUnsupportedLang";
import { getDictionary } from "../dictionaries";
import ForgotPassword from "./forgotPassword";

export default async function ForgotPassPage({
  params,
}: {
  params: { lang: "en" | "uk" };
}) {
  handleUnsupportedLang(params.lang);

  const dict = await getDictionary(`/${params.lang}/forgot-password`);

  return (
    <div className="container mx-auto px-6">
      <h2 className="mt-20 text-center text-lg font-medium text-neutral-50">
        {dict.restoreYourPass}
      </h2>
      <p className="mt-10 text-center text-sm text-neutral-50">
        {dict.description}
      </p>
      <div className="mx-auto mt-10 max-w-md">
        <ForgotPassword lang={params.lang} dict={dict} />
      </div>
    </div>
  );
}
