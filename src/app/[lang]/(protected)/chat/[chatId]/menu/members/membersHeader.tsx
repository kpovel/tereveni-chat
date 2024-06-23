import Image from "next/image";
import Link from "next/link";
import Arrow from "public/account/chevron-right.svg"
import Plus from "public/chat/Plus.svg"

export default function MembersHeader({chatId}:{chatId: string}) {
    return (
        <div className="w-[70%] mx-auto flex justify-between">
            <button className="rotate-180">
                <Link href={`/en/chat/${chatId}/menu`}>
                <Image src={Arrow} />
                </Link>
            </button>
            <div>
                <h3>144 members</h3>
            </div>
            <button>
                <Link href={`/en/chat/${chatId}/menu/invite-members`}>
                <Image src={Plus} />
                </Link>
            </button>
        </div>
    )
}