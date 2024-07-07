import Image from "next/image";
import BlockIcon from "/public/chat/block-icon.svg";
import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";

export function MemberContext({
  dict,
  openContext,
  openModal,
}: {
  dict: Awaited<DictionaryReturnTypes["/en/chat/menu/members"]>;
  openContext: boolean;
  openModal: (arg: string) => void;
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
        <Image src={BlockIcon} alt="block" />
        {dict.buttons.block}
      </button>
    </div>
  );
}
