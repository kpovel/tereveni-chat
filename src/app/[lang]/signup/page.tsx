import { getDictionary } from "../dictionaries";
import SignUpForm from "./signUpForm";

export default async function SignUp({
  params,
}: {
  params: { lang: "uk" | "en" };
}) {
  const dict = await getDictionary(`/${params.lang}/signup`);

  return (
    <div className="container mx-auto px-6">
      <h2 className="mt-20 text-center text-lg font-medium text-neutral-50">
        {dict.hiThere}
      </h2>
      <div className="mx-auto mt-10 max-w-md">
        <SignUpForm lang={params.lang} dict={dict} />
      </div>
    </div>
  );
}
