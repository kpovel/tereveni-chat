import Image from "next/image";
import { getDictionary } from "../dictionaries";

export default async function TermsConditions({
  params,
}: {
  params: { lang: "uk" | "en" };
}) {
  const dict = await getDictionary(`/${params.lang}/terms-conditions`);

  return (
    <div className="container mx-auto px-6">
      <h2 className="mt-20 text-center text-lg font-medium text-neutral-50">
        {dict.title}
      </h2>
      <p className="mt-20 text-center font-main text-sm font-normal leading-tight text-neutral-50"></p>
    </div>
  );
}
