import { ChangeEvent } from "react";
import { DictionaryReturnTypes } from "../../../dictionaries";
import Image from "next/image";
import searchIcon from "public/search_icon.svg";
import cancelIcon from "public/cancel_icon.svg";

export default function ChatSearch({
  searchValue,
  searchValueHandler,
  isClearBtnActive,
  clearSearch,
  searchDisableHandler,
  dict
}: {
  searchValue: string;
  searchValueHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  isClearBtnActive: boolean;
  clearSearch: () => void;
  searchDisableHandler: () => void;
  dict: Awaited<DictionaryReturnTypes["/en/chat"]>;
}) {
  return (
    <div className="flex w-full items-center justify-between px-6 py-3">
      <div className="mr-4 flex w-full items-center justify-between rounded-3xl border border-neutral-700 bg-[#545454] p-3">
        <button className="h-4 w-4">
          <Image src={searchIcon} alt="search" />
        </button>
        <form className="mx-3 w-full" action="">
          <input
            value={searchValue}
            onChange={searchValueHandler}
            className="w-full border-transparent bg-transparent text-sm font-normal text-white outline-none"
            placeholder={dict.placeholder.chatSearch}
            type="text"
          />
        </form>
        {isClearBtnActive && (
          <button onClick={clearSearch} className="h-4 w-4">
            <Image src={cancelIcon} alt="cancel" />
          </button>
        )}
      </div>
        <button onClick={searchDisableHandler}>{dict.buttons.cancel}</button>
    </div>
  );
}
