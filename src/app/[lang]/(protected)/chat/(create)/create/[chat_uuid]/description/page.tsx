import { getDictionary } from "@/app/[lang]/dictionaries";
import { ProgressStep } from "@/components/progress/ProgressStep";
import { DescriptionForm } from "./DescriptionForm";

export default async function ChatDescription({
  params,
}: {
  params: { lang: Lang; chat_uuid: string };
}) {
  const dict = await getDictionary(`/${params.lang}/chat/create/description`);

  return (
    <>
      <ProgressStep currentStep={3} totalSteps={3} lang={params.lang} />
      <div className="space-y-5 text-pretty text-center text-neutral-50">
        <h1 className="text-lg font-medium">{dict.title}</h1>
        <h2>{dict.subtitle}</h2>
      </div>
      <DescriptionForm
        dict={dict}
        lang={params.lang}
        chatUUID={params.chat_uuid}
      />
    </>
  );
}
