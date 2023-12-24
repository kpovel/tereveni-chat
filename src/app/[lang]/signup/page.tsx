import { getDictionary } from "../dictionaries";
import SignUpForm from "./signUpForm";

export default async function SignUp({
  params,
}: {
  params: { lang: "uk" | "en" };
}) {
  const dict = await getDictionary(`/${params.lang}/signup`);

  return (
    <div className="container mx-auto flex min-h-screen max-w-md flex-col items-center gap-10 px-6 py-10">
      <h2 className="text-center text-lg font-medium text-neutral-50">
        {dict.hiThere}
      </h2>
      <SignUpForm lang={params.lang} dict={dict} />
    </div>
  );
}
