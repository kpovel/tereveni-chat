import { onboardingHashtags } from "@/app/[lang]/(protected)/onboarding/categories/onboardingHashtags";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { ProgressStep } from "@/components/progress/ProgressStep";
import { ChooseHashtag } from "./Hashtags";

export default async function ChatHashtag({
  params,
}: {
  params: { lang: Lang; chat_uuid: string };
}) {
  // todo: chat with such id may not exists

  const dict = await getDictionary(`/${params.lang}/chat/create/hashtag`);
  const hashtags = await onboardingHashtags(params.lang);

  return (
    <>
      <ProgressStep currentStep={2} totalSteps={3} lang={params.lang} />
      <h2 className="text-pretty text-center text-lg font-medium text-[#FAFAFA]">
        {dict.title}
      </h2>
      <ChooseHashtag
        dict={dict}
        lang={params.lang}
        hashtags={hashtags}
        chatUUID={params.chat_uuid}
      />
    </>
  );
}
