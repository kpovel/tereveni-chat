import Image from "next/image";
import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import Edit from "public/chat/edit.svg";
import { ExitMenuButton } from "./exitMenuButton";

export default function ChatMenuHeader({
  dict,
  setEditModeActive,
}: {
  dict: Awaited<DictionaryReturnTypes["/en/chat/menu"]>;
  setEditModeActive: () => void;
}) {
  function setActive() {
    setEditModeActive();
  }
  return (
    <div className="mx-auto flex max-w-[70%] justify-between py-10">
      <div>
        <ExitMenuButton />
      </div>
      <div>
        <h3 className="text-[18px] font-medium text-white">Libraries</h3>
        <p className="mt-[8px]text-center text-[12px] font-normal text-stone-300">
          144 {dict.members}
        </p>
      </div>
      <div>
        <button onClick={setActive}>
          <Image src={Edit} alt="edit" />
        </button>
      </div>
    </div>
  );
}
