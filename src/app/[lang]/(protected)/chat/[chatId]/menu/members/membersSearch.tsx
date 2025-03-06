import Image from "next/image";
import Search from "public/search_icon.svg";
import Close from "public/chat/x-close.svg";
import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";

export default function MembersSearch({
  dict,
  searchMember,
  searchQuery,
}: {
  dict: Awaited<DictionaryReturnTypes["/en/chat/menu/members"]>;
  searchMember: (val: string) => void;
  searchQuery: string;
}) {
  return (
    <div className="mx-auto mt-10 flex w-[70%] justify-between">
      <div className="mr-3 inline-flex h-11 w-full items-center justify-start gap-3 rounded-3xl border border-neutral-700 bg-stone-900 p-3">
        <div>
          <Image src={Search} alt="search" />
        </div>
        <form action="" className="flex w-full items-center">
          <span>@</span>
          <input
            className="w-full border-none bg-transparent outline-none"
            type="text"
            value={searchQuery}
            onChange={(e) => searchMember(e.target.value)}
            placeholder=""
          />
        </form>
        <button onClick={() => searchMember("")}>
          <Image src={Close} alt="close" />
        </button>
      </div>
      <button onClick={() => searchMember("")}>{dict.buttons.cancel}</button>
    </div>
  );
}
