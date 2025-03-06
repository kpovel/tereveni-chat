import Image from "next/image";
import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import UnBlockIcon from "/public/chat/unblock.svg";

export function BlockedMemberContext({
  dict,
  openContext,
}: {
  dict: Awaited<DictionaryReturnTypes["/en/chat/menu/blocked-members"]>;
  openContext: boolean;
}) {
  return (
    <div
      className={
        "absolute right-0 top-[38px] z-10 flex " +
        (openContext ? "block" : "hidden")
      }
    >
      <button
        className="flex w-[164px] gap-2 rounded-lg
        bg-[#1F1F1F] px-4 py-[15px] shadow-[0px_8px_10px_1px_rgba(0,_0,_0,_0.12)]"
      >
        <Image src={UnBlockIcon} alt="block" />
        {dict.buttons.unblock}
      </button>
    </div>
  );
}
