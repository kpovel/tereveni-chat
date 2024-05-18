import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { ModalContentType } from "@/components/chat/ModalContainer/ModalContainer";
import { DictionaryReturnTypes } from "../../../dictionaries";
import ChatSubMenu from "./chatSubMenu";
import ChatSearch from "./chatSearch";
import OnlineStatus from "./onlineStatus";
import avatar from "public/Avatar.svg";
import Image from "next/image";
import arrowLeft from "public/arrow-left.svg";

// router.push(`/${lang}/chat/all`);
//         router.refresh();

export default function PrivateChatHeader({
  openModal,
  dict,
  isAdmin,
  lang
}: {
  openModal: (content: ModalContentType) => void;
  dict: Awaited<DictionaryReturnTypes["/en/chat"]>;
  isAdmin: boolean;
  lang: string
}) {
  const [isOnline, setIsOnline] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isClearBtnActive, setIsClearBtnActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const router = useRouter();

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

  const goToChatList = () => {
    router.push(`/${lang}/chat/all`);
    router.refresh();
  }

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

  // console.log(isAdmin)

  return (
    <div>
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center">
        <button onClick={goToChatList} className="w-8 h-8 mr-4 border-none bg-none">
          <Image src={arrowLeft} alt={`arrow`} width={32} height={32} />
        </button>
          <div className="h-[46px] w-[46px]">
            <Image src={avatar} alt={`chatAvatar`} width={46} height={46} />
          </div>
          <div className="ml-4">
            <p className="text-base font-medium text-white">Name</p>
            <OnlineStatus isOnline={isOnline} />
          </div>
        </div>
        <ChatSubMenu
          openModal={openModal}
          searchActiveHandler={searchActiveHandler}
          dict={dict}
          isAdmin={isAdmin}
        />
      </div>
    </div>
  );
}
