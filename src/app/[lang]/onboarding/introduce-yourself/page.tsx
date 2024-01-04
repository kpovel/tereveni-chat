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
      <div className="text-right text-stone-300 text-sm font-normal mt-5">
        <p>Step 3/4</p>
      </div>
      <h2 className="mt-10 text-center text-lg font-medium text-neutral-50 ">
        {dict.title}
      </h2>
      <p className="mt-5 text-center font-main text-sm font-normal leading-tight text-neutral-50">
        {dict.subtitle}
      </p>
      <Introduce lang={params.lang} dict={dict} />
    </div>
  );
}
