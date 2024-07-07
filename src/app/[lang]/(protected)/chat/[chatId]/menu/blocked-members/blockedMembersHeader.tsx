import Image from "next/image";
import Link from "next/link";
import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import Arrow from "public/account/chevron-right.svg";

export default function BlockedMembersHeader({
  dict,
  chatId,
}: {
  dict: Awaited<DictionaryReturnTypes["/en/chat/menu/blocked-members"]>;
  chatId: string;
}) {
  return (
    <div className="mx-auto flex w-[70%] justify-between">
      <button className="rotate-180">
        <Link href={`/en/chat/${chatId}/menu`}>
          <Image src={Arrow} alt="back" />
        </Link>
      </button>
      <div>
        <h3 className="text-[18px]">{dict.blockedMembers}</h3>
      </div>
      <div></div>
    </div>
  );
}
