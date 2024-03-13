"use client";

import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import { SubmitButton } from "@/components/form/SubmitButton";
import { Input } from "@/components/input/Input";
import { useFormState } from "react-dom";
import { createChat } from "./createChat";
import { SelectChatImage } from "./SelectChatImage";

export type FormState = {
  image: string,
  input: string,
}

const initialState: FormState = {
  image: "",
  input: "",
};

export function CreateChatForm({
  dict,
}: {
  dict: Awaited<DictionaryReturnTypes["/en/chat/create"]>;
}) {
  const [state, formAction] = useFormState(createChat, initialState);

  return (
    <form
      action={formAction}
      className="flex grow flex-col justify-between gap-10"
    >
      <div className="flex flex-col gap-10">
        <SelectChatImage dict={dict} />
        <Input placeholder={dict.chatName} errorMessage={[state.input]} />
      </div>
      <SubmitButton buttonTitle={dict.nextStep} />
    </form>
  );
}
