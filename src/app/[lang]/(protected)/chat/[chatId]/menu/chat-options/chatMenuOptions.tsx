import { useContext } from "react";
import Image from "next/image";
import BtnOptions from "./btnOptions";
import { ModalContext } from "../../privateChatHeader";
import BlockedMembers from "public/chat/blocked-members.svg";
import Arrow from "public/account/chevron-right.svg";
import Members from "public/chat/members.svg";
import Trash from "public/chat/trash.svg";

export default function ChatMenuOptions({ chatId, dict }: any) {
  const { setModalContent } = useContext(ModalContext);

  return (
    <div className="mx-auto mt-10 max-w-[70%]">
      <BtnOptions
        img={Members}
        text={dict.buttons.members}
        href={`/en/chat/${chatId}/menu/members`}
      />
      <BtnOptions
        img={BlockedMembers}
        text={dict.buttons.blockedMmembers}
        href={`/en/chat/${chatId}/menu/blocked-members`}
      />
      <button
        onClick={() => setModalContent("ConfirmationDeleting")}
        className="mb-3 flex inline-flex w-full items-center justify-between gap-3 rounded-3xl border border-[#3E205D] p-4 outline-none"
      >
        <div className="flex">
          <div>
            <Image src={Trash} alt="options-btn" />
          </div>
          <p className="ml-3 text-[14px] font-normal text-white">
            {dict.buttons.deleteChat}
          </p>
        </div>
        <div>
          <Image src={Arrow} alt="arrow" />
        </div>
      </button>
    </div>
  );
}
