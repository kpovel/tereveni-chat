"use server";

import { redirect } from "next/navigation";
import { env } from "@/env.mjs";
import { cookies, headers } from "next/headers";
import { z } from "zod";
import { getDictionary } from "../dictionaries";

export async function sendMailPutData(
  _prevState: { email: string },
  formData: FormData,
): Promise<{ email: string }> {
  const lang = (cookies().get("lang")?.value ?? "en") as Lang;
  const dict = await getDictionary(`/${lang}/forgot-password`);

  const schema = z.object({
    email: z.string().email(),
  });

  const parse = schema.safeParse({
    email: formData.get("email"),
  });

  if (!parse.success) {
    return {
      email: dict.errorStatus.invalidEmail,
    };
  }

  const data = parse.data;
  const response = await fetch(
    `${env.SERVER_URL}/api/forgot-password?lang=${lang}`,
    {
      body: JSON.stringify({ userEmail: data.email }),
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Originating-Host": headers().get("Origin") ?? "",
      },
      cache: "no-store",
    },
  );

  if (response.ok) {
    redirect(`/${lang}/restore-password-mail`);
  }

  return {
    email: await response.text(),
  };
}
