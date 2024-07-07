"use client";

import { useState, useEffect } from "react";
import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import Image from "next/image";
import ChangeTagsDescription from "./change-tags-description/changeTagsDescription";
import ChevronRight from "public/account/chevron-right.svg";
import ChangeChatAvatar from "./change-chat-avatar/changeChatAvatar";
import XClose from "public/chat/x-close.svg";

export default function EditChatMenuInfo({
  dict,
  disableEditMode,
  description,
  name,
}: {
  dict: Awaited<DictionaryReturnTypes["/en/chat/menu"]>;
  disableEditMode: () => void;
  description: string;
  name: string;
}) {
  const [chatName, setChatName] = useState<string>("");

  useEffect(() => {
    setChatName(name);
  });

  function handleChatName(e: any) {
    e.preventDefault();
    setChatName(e.currentTarget.value);
  }

  function clearChatName() {
    setChatName("");
  }

  return (
    <div>
      <div className="flex justify-between py-10">
        <button className="rotate-180" onClick={disableEditMode}>
          <Image src={ChevronRight} alt="exit from edit mode" />
        </button>
        <h3>{dict.chatEditing}</h3>
        <div></div>
      </div>
      <div className="mx-auto">
        <form>
          <div className="mb-8 inline-flex h-12 w-full items-center justify-center gap-3 self-stretch rounded-3xl border border-neutral-700 bg-stone-900 px-5">
            <input
              className="w-full bg-transparent outline-none"
              value={"chatName"}
              onChange={handleChatName}
              type="text"
            />
            <button
              onClick={clearChatName}
              className="border-none bg-transparent"
            >
              <Image src={XClose} alt="delete" />
            </button>
          </div>
        </form>
      </div>
      <ChangeChatAvatar />
      <ChangeTagsDescription />
      <button className="mt-10 h-12 w-full rounded-full bg-purple-600">
        {dict.saveChanges}
      </button>
    </div>
  );
}
