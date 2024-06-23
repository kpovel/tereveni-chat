import Image from "next/image";
import { DictionaryReturnTypes } from "../../../dictionaries";
import trashIcon from "public/trash_icon.svg";
import copyIcon from "public/copy_icon.svg";
import searchIcon from "public/search_icon.svg";
import leaveChat from "public/chat/leave_chat.svg";
import { useContext } from "react";
import { ModalContext } from "./privateChatHeader";

export function DotsMenu({
  searchActiveHandler,
  dict,
  admin,
}: {
  searchActiveHandler: () => void;
  dict: Awaited<DictionaryReturnTypes["/en/chat"]>;
  admin: boolean;
}) {
  const { setModalContent } = useContext(ModalContext);

  return (
    <div className="absolute -left-[128px] top-9 flex w-40 flex-col items-start justify-start gap-1 rounded-lg bg-stone-900 px-4 py-2 shadow">
      <div className="flex flex-col items-start justify-start gap-1">
        <button
          onClick={searchActiveHandler}
          className="flex w-full justify-start bg-none py-[7px]"
        >
          <Image src={searchIcon} alt="search" />
          <p className="ml-2 text-sm font-normal text-white">
            {dict.headerMenu.search}
          </p>
        </button>
        <button
          onClick={() => {
            setModalContent("InvitationLink");
          }}
          className="flex w-full justify-start bg-none py-[7px]"
        >
          <Image src={copyIcon} alt="copy" />
          <p className="ml-2 text-sm font-normal text-white">
            {dict.headerMenu.invitationLink}
          </p>
        </button>
        {admin ? (
          <button
            onClick={() => setModalContent("ConfirmationDeleting")}
            className="flex w-full justify-start bg-none py-[7px]"
          >
            <Image src={trashIcon} alt="trash" />
            <p className="ml-2 text-sm font-normal text-white">
              {dict.headerMenu.delete}
            </p>
          </button>
        ) : (
          <button
            onClick={() => setModalContent("LeaveChat")}
            className="flex w-full justify-start bg-none py-[7px]"
          >
            <Image src={leaveChat} alt="Leave chat" />
            <p className="ml-2 text-sm font-normal text-white">
              {dict.headerMenu.leaveChat}
            </p>
          </button>
        )}
      </div>
    </div>
  );
}
