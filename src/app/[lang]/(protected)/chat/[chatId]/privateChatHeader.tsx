"use client";

import { useState, ChangeEvent } from "react";
import ChatSubMenu from "./chatSubMenu";
import ChatSearch from "./chatSearch";
import OnlineStatus from "./onlineStatus";
import avatar from "public/Avatar.svg";
import Image from "next/image";

export default function PrivateChatHeader() {
  const [isOnline, setIsOnline] = useState(true);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isClearBtnActive, setIsClearBtnActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const activeMenuHandler = () => {
    setIsMenuActive(!isMenuActive);
  };

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
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex">
          <div className="h-[46px] w-[46px]">
            <Image src={avatar} alt={`chatAvatar`} width={46} height={46} />
          </div>
          <div className="ml-4">
            <p className="text-base font-medium text-white">Name</p>
            <OnlineStatus isOnline={isOnline} />
          </div>
        </div>
        <ChatSubMenu
          isMenuActive={isMenuActive}
          activeMenuHandler={activeMenuHandler}
          searchActiveHandler={searchActiveHandler}
        />
      </div>
    </div>
  );
}
