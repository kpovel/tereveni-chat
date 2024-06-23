"use client";

import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import { joinChatReq } from "./joinChatReq";
import { useRouter } from "next/navigation";
import { SubmitButton } from "@/components/form/SubmitButton";
import { useFormState } from "react-dom";
import { useEffect } from "react";

export function JoinChatButton(props: {
  dict: Awaited<DictionaryReturnTypes["/en/chat"]>;
  chatUUID: string;
}) {
  const router = useRouter();
  const [state, formAction] = useFormState(joinChatReq, { joined: false });

  useEffect(() => {
    if (state.joined) {
      router.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.joined]);

  return (
    <form className="px-6 py-10" action={formAction}>
      <input
        className="hidden"
        name="chatUUID"
        value={props.chatUUID}
        readOnly
      />
      <SubmitButton buttonTitle={props.dict.buttons.join} />
    </form>
  );
}
