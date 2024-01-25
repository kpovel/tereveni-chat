import { getJwtAccessToken } from "@/app/[lang]/(protected)/regenerateAccessToken";
import { env } from "@/env.mjs";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string } },
) {
  const jwtAccess = await getJwtAccessToken();

  if (!jwtAccess) {
    const lang = request.cookies.get("lang")?.value ?? "en";
    redirect(`/${lang}`);
  }

  const res = await fetch(`${env.SERVER_URL}/api/user-image/${params.path}`, {
    headers: {
      Authorization: `Bearer ${jwtAccess}`,
    },
  });

  if (params.path.endsWith(".svg")) {
    return new Response(await res.text(), {
      headers: {
        "Content-Type": "image/svg+xml"
      }
    });
  }

  return new Response(res.body);
}
