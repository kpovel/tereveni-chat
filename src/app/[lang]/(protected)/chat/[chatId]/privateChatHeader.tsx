"use client";

import { useState, ChangeEvent } from "react";
import { ModalContentType } from "@/components/chat/ModalContainer/ModalContainer";
import { DictionaryReturnTypes } from "../../../dictionaries";
import ChatSubMenu from "./chatSubMenu";
import ChatSearch from "./chatSearch";
import OnlineStatus from "./onlineStatus";
import avatar from "public/Avatar.svg";
import Image from "next/image";
import { ExitChatButton } from "./ExitChatButton";

export function PrivateChatHeader({
  dict,
}: {
  dict: Awaited<DictionaryReturnTypes["/en/chat"]>;
}) {
  const [isOnline, setIsOnline] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isClearBtnActive, setIsClearBtnActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [modalContent, setModalContent] = useState<ModalContentType>(null);

  const searchValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim().length > 0) {
      setIsClearBtnActive(true);
      setSearchValue(event.target.value);
    } else {
      setIsClearBtnActive(false);
    }
  };

  const clearSearch = () => {
    setSearchValue("");
    setIsClearBtnActive(false);
  };

  const searchActiveHandler = () => {
    setIsSearchActive(true);
  };
  const searchDisableHandler = () => {
    setIsSearchActive(false);
  };

  if (isSearchActive) {
    return (
      <ChatSearch
        searchValue={searchValue}
        searchValueHandler={searchValueHandler}
        isClearBtnActive={isClearBtnActive}
        clearSearch={clearSearch}
        searchDisableHandler={searchDisableHandler}
        dict={dict}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 px-6 py-3">
        <ExitChatButton />
        <div className="flex grow">
          <div className="h-[46px] w-[46px]">
            <Image src={avatar} alt={`chatAvatar`} width={46} height={46} />
          </div>
          <div className="ml-4">
            <p className="text-base font-medium text-white">Name</p>
            <OnlineStatus isOnline={isOnline} />
          </div>
        </div>
        <ChatSubMenu
          openModal={setModalContent}
          searchActiveHandler={searchActiveHandler}
          dict={dict}
        />
      </div>
    </div>
  );
}
