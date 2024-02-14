import { handleUnsupportedLang } from "@/util/handleUnsupportedLang";
import { getDictionary } from "../../dictionaries";
import CreatePassForm from "./createPassForm";

export default async function CreateNewPassword({
  params,
}: {
  params: { lang: "en" | "uk" };
}) {
  handleUnsupportedLang(params.lang);

  const dict = await getDictionary(`/${params.lang}/create-new-password`);

  return (
    <div className="container mx-auto flex min-h-screen max-w-md flex-col items-center gap-10 px-6 py-10">
      <h2 className="mt-[78px] text-center text-lg font-medium text-neutral-50">
        {dict.title}
      </h2>
      <CreatePassForm lang={params.lang} dict={dict} />
    </div>
  );
}
