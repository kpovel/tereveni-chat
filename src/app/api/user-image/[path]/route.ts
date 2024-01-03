import { env } from "@/env.mjs";
import { JWT_ACCESS_TOKEN } from "@/util/cookiesName";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(
  _request: Request,
  { params }: { params: { path: string } },
) {
  const jwtAccess = cookies().get(JWT_ACCESS_TOKEN);

  if (!jwtAccess) {
    redirect("/en");
  }

   const res = await fetch(`${env.SERVER_URL}/api/user-image/${params.path}`, {
     headers: {
       Authorization: `Bearer ${jwtAccess.value}`
     }
   });

   return new Response(res.body);
}
