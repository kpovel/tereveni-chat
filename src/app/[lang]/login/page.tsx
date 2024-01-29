import { CookiePopup } from "@/components/CookiePopup";
import { getDictionary } from "../dictionaries";
import LoginForm from "./loginForm";

export default async function LoginPage({
  params,
}: {
  params: { lang: "en" | "uk" };
}) {
  const dict = await getDictionary(`/${params.lang}/login`);

  return (
    <div className="container mx-auto px-6">
      <h2 className="mt-20 text-center text-lg font-medium text-neutral-50">
        {dict.welcomeBack}
      </h2>
      <div className="mx-auto mt-10 max-w-md">
        <LoginForm lang={params.lang} dict={dict} />
      </div>
      <CookiePopup lang={params.lang} />
    </div>
  );
}
