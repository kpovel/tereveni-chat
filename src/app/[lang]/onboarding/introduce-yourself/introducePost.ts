'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/env.mjs";

type SignUpResponseError = {
    fieldName: string
    fieldMessage: string
  };

export async function IntroducePost(
    introduce: any,
    lang: "en" | "uk"
) {
    const accessToken = cookies().get("jwtAccessToken").value;

    if(!accessToken) {
        console.log('no access token') 
    }

    const res = await fetch(`${env.SERVER_URL}/api/user/user-about-with-onboarding/save`, {
        method: "PUT",
        body: JSON.stringify(introduce),
        headers: {
            "Authorization": `Bearer ${accessToken}`
          }
      });   

      console.log(res)

      if (res.ok) {
        console.log(res)
        alert(res)
      }
    
      const body = await res.json() as SignUpResponseError;
    
      return body.fieldMessage;
}