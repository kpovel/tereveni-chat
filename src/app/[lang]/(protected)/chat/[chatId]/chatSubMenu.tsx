import DotsMenu from "./dotsMenu";
import { useClickOutside } from "@/util/useClickOutside";
import { DictionaryReturnTypes } from "../../../dictionaries";
import { ModalContentType } from "@/components/chat/ModalContainer/ModalContainer";
import { useState } from "react";

export default function ChatSubMenu({
  openModal,
  searchActiveHandler,
  dict
}: {
  openModal: (content: ModalContentType) => void;
  searchActiveHandler: () => void;
  dict: Awaited<DictionaryReturnTypes["/en/chat"]>;
}) {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const activeMenuHandler = () => {
    setIsMenuActive(!isMenuActive);
  };

  const closeSubMenu = () => {
    if (isMenuActive) {
      setIsMenuActive(false);
    }
  };


  const elemRef = useClickOutside<HTMLDivElement>(closeSubMenu);
  return (
    <div className="relative">
      <button
        className={`h-8 w-8 rounded ${
          !isMenuActive ? "bg-none" : "bg-neutral-900"
        }`}
        onClick={activeMenuHandler}
      >
        <div className="mx-auto mb-[3px] mt-[3px] h-[3px] w-[3px] rounded-full bg-white"></div>
        <div className="mx-auto mb-[3px] h-[3px] w-[3px] rounded-full bg-white"></div>
        <div className="mx-auto mb-[3px] h-[3px] w-[3px] rounded-full bg-white"></div>
      </button>
      {isMenuActive && (
        <div
          ref={elemRef}
          className="absolute -left-[128px] top-9 z-10 inline-flex w-40 flex-col items-start justify-start gap-1 rounded-lg bg-stone-900 px-4 py-2 shadow"
        >
          <DotsMenu
            closeSubMenu={closeSubMenu}
            openModal={openModal}
            searchActiveHandler={searchActiveHandler}
            dict={dict}
          />
        </div>
      )}
    </div>
  );
}
