import Image from "next/image";

import trashIcon from "public/trash_icon.svg";
import copyIcon from "public/copy_icon.svg";
import searchIcon from "public/search_icon.svg";

export default function DotsMenu({
  openModal,
  searchActiveHandler,
}: {
  openModal: () => void,
  searchActiveHandler: () => void;
}) {
  return (
    <div className="flex flex-col items-start justify-start gap-1">
      <button
        onClick={searchActiveHandler}
        className="flex w-full justify-start bg-none py-[7px] transition-all delay-150 ease-in hover:bg-neutral-900"
      >
        <Image src={searchIcon} alt="search" />
        <p className="ml-2 text-sm font-normal text-white">Search</p>
      </button>
      <button onClick={openModal} className="flex w-full justify-start bg-none py-[7px] transition-all delay-150 ease-in hover:bg-neutral-900">
        <Image src={copyIcon} alt="copy" />
        <p className="ml-2 text-sm font-normal text-white">Invitation link</p>
      </button>
      <button className="flex w-full justify-start bg-none py-[7px] transition-all delay-150 ease-in hover:bg-neutral-900">
        <Image src={trashIcon} alt="trash" />
        <p className="ml-2 text-sm font-normal text-white">Delete chat</p>
      </button>
    </div>
  );
}
