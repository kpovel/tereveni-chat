"use client";

import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import { SkipLink } from "@/components/Link";
import { SubmitButton } from "@/components/form/SubmitButton";
import { ChangeEvent, useState } from "react";
import { sumbitDescription } from "./submitDescription";
import { useFormState } from "react-dom";

const MAX_LENGTH = 300;

const initialState: FormState = {
  description: "",
};

export type FormState = {
  description: string;
};

export function DescriptionForm({
  dict,
  lang,
  chatUUID,
}: {
  dict: Awaited<DictionaryReturnTypes["/en/chat/create/description"]>;
  lang: Lang;
  chatUUID: string;
}) {
  const [_state, formAction] = useFormState(sumbitDescription, initialState);
  const [description, setDescription] = useState("");

  function onChangeDescription(e: ChangeEvent<HTMLTextAreaElement>) {
    const textValue = e.currentTarget.value.slice(0, MAX_LENGTH);
    setDescription(textValue);
  }

  return (
    <form className="flex grow flex-col justify-between" action={formAction}>
      <input name="chatUUID" value={chatUUID} className="hidden" />
      <input name="lang" value={lang} className="hidden" />
      <div>
        <textarea
          max-length={MAX_LENGTH}
          value={description}
          onChange={onChangeDescription}
          className="h-[192px] w-full resize-none rounded-3xl border border-neutral-700 bg-stone-900 px-5 py-3 text-sm font-normal leading-tight text-neutral-50 outline-none focus:border-violet-700"
          name="description"
          placeholder={dict.typeHere}
        ></textarea>
        <div className="px-2 text-right">
          <span className="text-xs font-normal leading-none text-stone-300">
            {description.length} / {MAX_LENGTH}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <SubmitButton buttonTitle={dict.nextStep} />
        <SkipLink href={`/${lang}/chat/${chatUUID}`}>{dict.skip}</SkipLink>
      </div>
    </form>
  );
}
