"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import ChangeTagsDescription from "./change-tags-description/changeTagsDescription";
import ChevronRight from "public/account/chevron-right.svg";
import ChangeChatAvatar from "./change-chat-avatar/changeChatAvatar";
import XClose from "public/chat/x-close.svg";

export default function EditChatMenuInfo({disableEditMode, description, name}:{disableEditMode: ()=> void; description: string; name:string}) {

    const [ chatName, setChatName ] = useState<string>("");

    useEffect(() => {
        setChatName(name)
    })

    function handleChatName(e: any) {
        e.preventDefault()
        setChatName(e.currentTarget.value)
    }

    function clearChatName(){
        setChatName('');
    }

    return (
        <div>
            <div className="flex justify-between py-10">
                <button className="rotate-180" onClick={disableEditMode}>
                    <Image src={ChevronRight} alt="exit from edit mode"/>
                </button>
                <h3>Chat editing</h3>
                <div></div>
            </div>
            <div className="mx-auto">
                {/* <form action=""> */}
                    <div className="mb-8 w-full self-stretch h-12 px-5 bg-stone-900 rounded-3xl border border-neutral-700 justify-center items-center gap-3 inline-flex">
                        <input className="w-full bg-transparent outline-none" 
                            value={"chatName"} 
                            onChange={handleChatName}
                            type="text"/>
                        <button onClick={clearChatName} className="border-none bg-transparent">
                            <Image src={XClose} alt="delete"/>
                        </button>
                    </div>
                {/* </form> */}
            </div>
            <ChangeChatAvatar />
            <ChangeTagsDescription />
            <button className="mt-10 w-full h-12 bg-purple-600 rounded-full">
                Save changes
            </button>
        </div>
    )
}