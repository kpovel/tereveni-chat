import Image from "next/image";
import { ModalContentType } from "@/components/chat/ModalContainer/ModalContainer";
import { DictionaryReturnTypes } from "../../../dictionaries";
import trashIcon from "public/trash_icon.svg";
import copyIcon from "public/copy_icon.svg";
import searchIcon from "public/search_icon.svg";
import leaveChat from "public/leaveChat.svg";

export default function DotsMenu({
  closeSubMenu,
  openModal,
  searchActiveHandler,
  dict,
  isAdmin
}: {
  closeSubMenu: () => void;
  openModal: (content: ModalContentType) => void;
  searchActiveHandler: () => void;
  dict: Awaited<DictionaryReturnTypes["/en/chat"]>;
  isAdmin: boolean
}) {

  return (
    <div
      onClick={closeSubMenu}
      className="dotsMenu flex flex-col items-start justify-start gap-1"
    >
      <button
        onClick={searchActiveHandler}
        className="flex w-full justify-start bg-none py-[7px] transition-all delay-150 ease-in hover:bg-neutral-900"
      >
        <Image src={searchIcon} alt="search" />
        <p className="ml-2 text-sm font-normal text-white">{dict.headerMenu.search}</p>
      </button>
      <button
        onClick={() => openModal("InvitationLink")}
        className="flex w-full justify-start bg-none py-[7px] transition-all delay-150 ease-in hover:bg-neutral-900"
      >
        <Image src={copyIcon} alt="copy" />
  <p className="ml-2 text-sm font-normal text-white">{dict.headerMenu.invitationLink}</p>
      </button>
      {
        !isAdmin ? 
        <button
          onClick={() => openModal("ConfirmationLeaving")}
          className="flex w-full justify-start bg-none py-[7px] transition-all delay-150 ease-in hover:bg-neutral-900"
        >
          <Image src={leaveChat} alt="trash" />
          <p className="ml-2 text-sm font-normal text-white">{dict.headerMenu.leaveChat}</p>
        </button> : <button
          onClick={() => openModal("ConfirmationDeleting")}
          className="flex w-full justify-start bg-none py-[7px] transition-all delay-150 ease-in hover:bg-neutral-900"
        >
          <Image src={trashIcon} alt="trash" />
          <p className="ml-2 text-sm font-normal text-white">{dict.headerMenu.delete}</p>
        </button>
      }
      

    </div>
  );
}
