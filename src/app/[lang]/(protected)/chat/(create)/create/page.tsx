import { getDictionary } from "@/app/[lang]/dictionaries";
import { ProgressStep } from "@/components/progress/ProgressStep";
import { CreateChatForm } from "./createChatForm";

export default async function CreateChat({
  params,
}: {
  params: { lang: Lang };
}) {
  const dict = await getDictionary(`/${params.lang}/chat/create`);

  return (
    <div className="flex flex-col gap-10">
      <ProgressStep currentStep={1} totalSteps={3} lang={params.lang} />
      <div className="space-y-[55px]">
        <h1 className="text-center text-lg font-medium text-neutral-50">
          {dict.createChat}
        </h1>
        <CreateChatForm dict={dict} />
      </div>
    </div>
  );
}
