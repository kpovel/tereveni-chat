import Image from "next/image";

import DoneIcon from "public/done_icon.svg"

export default function InvitationLink(){
    return (
        <div className="flex flex-col items-center">
            <div className="mb-5">
                <Image src={DoneIcon} width={60} height={60} />
            </div>
            <p className="text-center text-[#050404] text-base font-semibold">Invitation link has been copied</p>
        </div>
    )
}