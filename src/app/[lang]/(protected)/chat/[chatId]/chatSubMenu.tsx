import { ReactNode } from "react";
import DotsMenu from "./dotsMenu";
import { useClickOutside } from "@/util/useClickOutside";

export default function ChatSubMenu({
  closeSubMenu,
  openModal,
  isMenuActive,
  activeMenuHandler,
  searchActiveHandler,
}: {
  closeSubMenu: () => void;
  openModal: (content: null | "InvitationLink" | "ConfirmationDeleting") => void;
  isMenuActive: boolean;
  activeMenuHandler: () => void;
  searchActiveHandler: () => void;
}) {
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
            openModal={openModal}
            searchActiveHandler={searchActiveHandler}
          />
        </div>
      )}
    </div>
  );
}
