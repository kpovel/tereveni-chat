"use client";

import { useState, ChangeEvent } from "react";
import ChatSubMenu from "./chatSubMenu";
import ChatSearch from "./chatSearch";
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

  return (
    <div>
      {!isSearchActive ? (
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex">
            <div className="h-[46px] w-[46px]">
              <Image src={avatar} alt={`chatAvatar`} width={46} height={46} />
            </div>
            <div className="ml-4">
              <p className="text-base font-medium text-white">Name</p>
              <div className="flex items-center">
                <div
                  className={`h-2 w-2 rounded-full border ${
                    isOnline
                      ? "border-green-900 bg-green-500"
                      : "border-stone-900 bg-zinc-500"
                  }`}
                ></div>
                <span
                  className={`ml-[5px] text-center text-xs font-normal ${
                    isOnline ? "text-green-500" : "text-zinc-500"
                  }`}
                >
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          </div>
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
            {isMenuActive && <ChatSubMenu searchActiveHandler={searchActiveHandler} />}
          </div>
        </div>
      ) : <ChatSearch 
            searchValue={searchValue}
            searchValueHandler={searchValueHandler}
            isClearBtnActive={isClearBtnActive}
            clearSearch={clearSearch}
            searchDisableHandler={searchDisableHandler}
          />
      }
    </div>
  );
}
