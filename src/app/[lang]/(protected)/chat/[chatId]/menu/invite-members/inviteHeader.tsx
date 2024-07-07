import Image from "next/image";
import Link from "next/link";
import Arrow from "public/account/chevron-right.svg";
import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";

export default function InviteHeader({
  dict,
  chatId,
}: {
  dict: Awaited<DictionaryReturnTypes["/en/chat/menu/invite-members"]>;
  chatId: string;
}) {
  console.log(dict);
  return (
    <div className="mx-auto flex w-[70%] justify-between">
      <button className="rotate-180">
        <Link href={`/en/chat/${chatId}/menu`}>
          <Image src={Arrow} alt="back" />
        </Link>
      </button>
      <div>
        <h3>{dict.inviteMembers}</h3>
      </div>
      <div></div>
    </div>
  );
}
