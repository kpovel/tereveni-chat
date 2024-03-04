"use client";

import { useState } from "react";
import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import { introducePost } from "./introducePost";
import { Button } from "@/components/Button";
import { SkipLink } from "@/components/Link";

export default function Introduce({
  lang,
  dict,
}: {
  lang: Lang;
  dict: Awaited<DictionaryReturnTypes["/en/onboarding/introduce-yourself"]>;
}) {
  const [introduce, setIntroduce] = useState("");

  const maxCharacters = 300;

  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textValue = e.currentTarget.value.slice(0, maxCharacters);
    setIntroduce(textValue);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await introducePost(introduce, lang);
  };

  return (
    <form className="flex grow flex-col justify-between">
      <div>
        <textarea
          value={introduce}
          max-length={maxCharacters}
          onChange={handleText}
          className="h-[192px] w-full resize-none rounded-3xl border border-neutral-700 bg-stone-900 px-5 py-3 text-sm font-normal leading-tight text-neutral-50 outline-none focus:border-violet-700"
          name="introduce"
          id="introduce"
          placeholder={dict.typeHere}
        ></textarea>
        <div className="px-2 text-right">
          <span className="text-xs font-normal leading-none text-stone-300">
            {introduce.length} / {maxCharacters}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <Button
          disabled={introduce.trim() === ""}
          aria-disabled={introduce.trim() === ""}
          onClick={handleSubmit}
        >
          {dict.nextStep}
        </Button>
        <SkipLink href={`/${lang}/onboarding/categories`}>{dict.skip}</SkipLink>
      </div>
    </form>
  );
}
