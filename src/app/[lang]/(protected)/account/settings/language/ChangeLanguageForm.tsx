"use client";

import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import { SubmitButton } from "@/components/form/SubmitButton";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { RadioButtonEmpty, RadioButtonFilled } from "./RadioButtons";

export function ChangeLanguageForm({
  dict,
  lang,
}: {
  dict: Awaited<DictionaryReturnTypes["/en/account/settings/language"]>;
  lang: Lang;
}) {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState<Lang>(lang);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(location.pathname.replace(lang, selectedLang));
  }

  return (
    <form className="flex grow flex-col" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <button
          className={
            "flex items-center justify-between rounded-[32px] border py-[18px] pl-[22px] pr-4 " +
            (selectedLang === "en" ? "border-[#7C01F6]" : "border-[#3E205D]")
          }
          onClick={(e) => {
            e.preventDefault();
            setSelectedLang("en");
          }}
        >
          {dict.lang.en}
          {selectedLang === "en" ? <RadioButtonFilled /> : <RadioButtonEmpty />}
        </button>
        <button
          className={
            "flex items-center justify-between rounded-[32px] border py-[18px] pl-[22px] pr-4 " +
            (selectedLang === "uk" ? "border-[#7C01F6]" : "border-[#3E205D]")
          }
          onClick={(e) => {
            e.preventDefault();
            setSelectedLang("uk");
          }}
        >
          {dict.lang.uk}
          {selectedLang === "uk" ? <RadioButtonFilled /> : <RadioButtonEmpty />}
        </button>
      </div>

      <div className="flex grow flex-col justify-end">
        <SubmitButton buttonTitle={dict.saveChanges} />
      </div>
    </form>
  );
}
