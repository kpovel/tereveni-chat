import Image from "next/image";
import Link from "next/link";
import Arrow from "public/account/chevron-right.svg"

export default function InviteHeader({chatId}: {chatId: string}) {
    return (
        <div className="w-[70%] mx-auto flex justify-between">
            <button className="rotate-180">
                <Link href={`/en/chat/${chatId}/menu`}>
                    <Image src={Arrow} />
                </Link>
            </button>
            <div>
                <h3>Invite members</h3>
            </div>
            <div></div>
        </div>
    )
}