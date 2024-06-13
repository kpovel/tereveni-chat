"use client";

import { useState, createContext, useEffect } from "react";
import { DictionaryReturnTypes } from "../../../dictionaries";
import { ChatSubMenu } from "./chatSubMenu";
import ChatSearch from "./chatSearch";
import OnlineStatus from "./onlineStatus";
import avatar from "public/Avatar.svg";
import Image from "next/image";
import { ExitChatButton } from "./ExitChatButton";
import { ModalContentType } from "@/components/chat/ModalContainer/ModalContainer";
import InvitationLink from "@/components/chat/ModalContainer/ModalContent/InvitationLink";

export const ModalContext = createContext<{
  modalContent: ModalContentType;
  setModalContent: (content: ModalContentType) => void;
}>({
  modalContent: null,
  setModalContent: () => {},
});

export function PrivateChatHeader({
  dict,
}: {
  dict: Awaited<DictionaryReturnTypes["/en/chat"]>;
}) {
  const [isOnline, setIsOnline] = useState(true);
  const [activeSearch, setActiveSearch] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContentType>(null);
  const [openSubMenu, setOpenSubMenu] = useState(false);

  useEffect(() => {
    if (modalContent || activeSearch) {
      setOpenSubMenu(false);
    }
  }, [modalContent, activeSearch]);

  const searchActiveHandler = () => {
    setActiveSearch(true);
  };

  if (activeSearch) {
    return (
      <ChatSearch dict={dict} disableSearch={() => setActiveSearch(false)} />
    );
  }

  return (
    <div className="flex items-center justify-between gap-4 px-6 py-3">
      <ExitChatButton />
      <div className="flex grow">
        <div className="h-[46px] w-[46px]">
          <Image src={avatar} alt="chat avatar" width={46} height={46} />
        </div>
        <div className="ml-4">
          <p className="text-base font-medium text-white">Name</p>
          <OnlineStatus isOnline={isOnline} />
        </div>
      </div>
      <ModalContext.Provider value={{ modalContent, setModalContent }}>
        <ChatSubMenu
          searchActiveHandler={searchActiveHandler}
          dict={dict}
          openSubMenu={openSubMenu}
          setOpenSubMenu={setOpenSubMenu}
        />
      </ModalContext.Provider>
      <Modal
        modalContent={modalContent}
        setModalContent={setModalContent}
        dict={dict}
      />
    </div>
  );
}

function Modal({
  modalContent,
  setModalContent,
  dict,
}: {
  modalContent: ModalContentType;
  setModalContent: (content: ModalContentType) => void;
  dict: Awaited<DictionaryReturnTypes["/en/chat"]>;
}) {
  if (modalContent === "InvitationLink") {
    navigator.clipboard.writeText(window.location.href);

    setTimeout(() => setModalContent(null), 1500);
    return (
      <div className="absolute left-0 top-0 flex h-dvh w-dvw flex-col items-center justify-center backdrop-blur-[3px]">
        <InvitationLink>{dict.modal.invitationLink}</InvitationLink>
      </div>
    );
  }
}
