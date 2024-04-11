import { getDictionary } from "@/app/[lang]/dictionaries";
import Image from "next/image";
import Link from "next/link";
import ChevronRight from "public/account/chevron-right.svg";
import { ChangeLanguageForm } from "./ChangeLanguageForm";

export default async function Language({ params }: { params: { lang: Lang } }) {
  const dict = await getDictionary(`/${params.lang}/account/settings/language`);

  return (
    <main className="flex w-full grow flex-col gap-10 px-6 py-10">
      <div className="flex flex-col justify-between gap-5">
        <div className="flex flex-row justify-between">
          <Link href={`/${params.lang}/account/settings`}>
            <Image
              src={ChevronRight}
              alt="Chevron left"
              className="rotate-180"
            />
          </Link>
          <h1 className="text-lg font-medium">{dict.title}</h1>
          <div></div>
        </div>
        <h2 className="text-center">{dict.subtitle}</h2>
      </div>
      <ChangeLanguageForm dict={dict} lang={params.lang} />
    </main>
  );
}
