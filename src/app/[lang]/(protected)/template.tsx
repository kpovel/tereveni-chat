import { ReactNode } from "react";
import { RegenerateAccessToken } from "./updateAccessToken";
import { cookies } from "next/headers";
import { JWT_REFRESH_TOKEN } from "@/util/cookiesName";
import { redirect } from "next/navigation";

export default async function Template({ children }: { children: ReactNode }) {
  redirectUnauthorizedUser();

  return (
    <>
      <RegenerateAccessToken />
      {children}
    </>
  );
}

function redirectUnauthorizedUser() {
  const refreshToken = cookies().get(JWT_REFRESH_TOKEN);
  if (!refreshToken) {
    const lang = cookies().get("lang");
    const langValue = (lang?.value ?? "en") as "en" | "uk";
    redirect(`/${langValue}`);
  }
}
