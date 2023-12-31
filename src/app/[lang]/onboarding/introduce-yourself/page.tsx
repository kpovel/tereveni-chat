import { getDictionary } from "../../dictionaries";
import Introduce from "./introduce";

export default async function IntroduceYourself({
  params,
}: {
  params: { lang: "uk" | "en" };
}) {
  const dict = await getDictionary(
    `/${params.lang}/onboarding/introduce-yourself`,
  );

  return (
    <div className="container mx-auto max-w-md px-6">
      <h2 className="mt-20 text-center text-lg font-medium text-neutral-50 ">
        {dict.title}
      </h2>
      <p className="mt-5 text-center font-main text-sm font-normal leading-tight text-neutral-50">
        {dict.subtitle}
      </p>
      <Introduce dict={dict} />
    </div>
  );
}
