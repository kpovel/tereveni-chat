"use server"

import { env } from "@/env.mjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { langUnwrapOrDefault } from "@/util/lang";
import { getJwtAccessToken } from "../../regenerateAccessToken";
import { ModalContentType } from "@/components/chat/ModalContainer/ModalContainer";

export async function deleteChat(chatRoomUuid: string | null){
    console.log(`deleteChat - ${chatRoomUuid}`)
    const jwtAccessToken = await getJwtAccessToken();

    const res = await fetch(`${env.SERVER_URL}/api/public-chat-room/${chatRoomUuid}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${jwtAccessToken}`
        }
    })

    if(res.status === 200) {
        console.log(`Success deleting chat - ${chatRoomUuid}`)
        const cookieLang = cookies().get("lang")?.value ?? "en";
        const lang = await langUnwrapOrDefault(cookieLang);
        redirect(`/${lang}/chat/all`);
    }
}

  
