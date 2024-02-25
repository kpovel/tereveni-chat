"use client";

import { useState, ChangeEvent } from "react";
import avatar from "../../../../../../public/Avatar.svg";
import trashIcon from "../../../../../../public/trash_icon.svg";
import copyIcon from "../../../../../../public/copy_icon.svg";
import searchIcon from "../../../../../../public/search_icon.svg";
import cancelIcon from "../../../../../../public/cancel_icon.svg";
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
            {isMenuActive ? (
              <div className="absolute -left-[128px] top-9 z-10 inline-flex w-40 flex-col items-start justify-start gap-1 rounded-lg bg-stone-900 px-4 py-2 shadow">
                <button
                  onClick={searchActiveHandler}
                  className="mb-1 flex w-full justify-start bg-none py-[7px] transition-all delay-150 ease-in hover:bg-neutral-900"
                >
                  <Image src={searchIcon} alt="search" />
                  <p className="ml-2 text-sm font-normal text-white">Search</p>
                </button>
                <button className="mb-1 flex w-full justify-start bg-none py-[7px] transition-all delay-150 ease-in hover:bg-neutral-900">
                  <Image src={copyIcon} alt="copy" />
                  <p className="ml-2 text-sm font-normal text-white">
                    Invitation link
                  </p>
                </button>
                <button className="flex w-full justify-start bg-none py-[7px] transition-all delay-150 ease-in hover:bg-neutral-900">
                  <Image src={trashIcon} alt="trash" />
                  <p className="ml-2 text-sm font-normal text-white">
                    Delete chat
                  </p>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="flex w-full items-center justify-between px-6 py-3">
          <div className="mr-4 flex inline-flex w-full items-center items-center justify-start justify-between rounded-3xl border border-neutral-700 bg-neutral-600 p-3">
            <button className="h-4 w-4">
              <Image src={searchIcon} alt="search" />
            </button>
            <form className="mx-3 w-full" action="">
              <input
                value={searchValue}
                onChange={searchValueHandler}
                className="border-transparent bg-transparent text-sm font-normal text-white outline-none"
                placeholder="Сhat search"
                type="text"
              />
            </form>
            {isClearBtnActive && (
              <button onClick={clearSearch} className="h-4 w-4">
                <Image src={cancelIcon} alt="cancel" />
              </button>
            )}
          </div>
          <button onClick={searchDisableHandler}>Cancel</button>
        </div>
      )}
    </div>
  );
}
