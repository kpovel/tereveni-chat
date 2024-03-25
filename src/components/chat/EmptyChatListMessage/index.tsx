import { getDictionary } from "@/app/[lang]/dictionaries";

export async function EmptyChatListMessage({ lang }: { lang: Lang }) {
  const dict = await getDictionary(`/components/${lang}/EmptyChatListMessage`);

  return (
    <h3 className="whitespace-pre-line text-balance text-center text-[rgba(255,_255,_255,_0.50)]">
      {dict.message}
    </h3>
  );
}
