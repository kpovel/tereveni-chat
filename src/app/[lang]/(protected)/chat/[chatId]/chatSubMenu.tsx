import Image from "next/image";

import trashIcon from "public/trash_icon.svg";
import copyIcon from "public/copy_icon.svg";
import searchIcon from "public/search_icon.svg";

export default function ChatSubMenu({searchActiveHandler, }: {searchActiveHandler: () => void}){
    return (
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
    )
}