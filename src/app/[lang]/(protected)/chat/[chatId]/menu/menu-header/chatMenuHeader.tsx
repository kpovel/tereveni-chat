import Image from "next/image";
import Arrow from "public/account/chevron-right.svg"
import Edit from "public/chat/edit.svg"
import { ExitMenuButton } from "./exitMenuButton";

export default function ChatMenuHeader({setEditModeActive}: any) {
    function setActive() {
        setEditModeActive()
    }
    return (
        <div className="flex justify-between py-10 max-w-[70%] mx-auto">
            <div>
                <ExitMenuButton />
            </div>
            <div>
                <h3 className="text-white text-[18px] font-medium">Libraries</h3>
                <p className="mt-[8px]text-center text-stone-300 text-[12px] font-normal">144 members</p>
            </div>
            <div>
                <button onClick={setActive}>
                    <Image src={Edit} alt="edit"/>
                </button>
            </div>
        </div>
    )
}