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
    <div className="container mx-auto flex max-w-md flex-col items-center gap-10 px-6 py-10">
      <h2 className="text-center text-lg font-medium text-neutral-50">
        {dict.welcomeBack}
      </h2>
      <LoginForm lang={params.lang} dict={dict} />
      <CookiePopup lang={params.lang} />
    </div>
  );
}
