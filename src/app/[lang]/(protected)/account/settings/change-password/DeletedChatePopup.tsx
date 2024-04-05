import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Done from "public/done_icon.svg";
import { useEffect } from "react";

export function DeletedChatPopup({
  dict,
  lang,
}: {
  dict: Awaited<DictionaryReturnTypes["/en/account/settings/change-password"]>;
  lang: Lang;
}) {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push(`/${lang}/account/settings`);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center text-[#050404] backdrop-blur-[3px]">
      <div className="flex w-[280px] flex-col items-center gap-5 rounded-lg bg-white px-6 py-[35px]">
        <Image src={Done} alt="Done" />
        <h2 className="text-center text-base font-semibold">
          {dict.popup.changedPassword}
        </h2>
      </div>
    </div>
  );
}
