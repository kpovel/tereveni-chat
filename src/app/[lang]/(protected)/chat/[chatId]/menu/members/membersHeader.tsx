import Image from "next/image";
import Link from "next/link";
import Arrow from "public/account/chevron-right.svg";
import Plus from "public/chat/Plus.svg";
import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";

export default function MembersHeader({
  dict,
  chatId,
}: {
  dict: Awaited<DictionaryReturnTypes["/en/chat/menu/members"]>;
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
        <h3>144 {dict.members}</h3>
      </div>
      <button>
        <Link href={`/en/chat/${chatId}/menu/invite-members`}>
          <Image src={Plus} alt="plus" />
        </Link>
      </button>
    </div>
  );
}
