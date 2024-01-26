import { ReactNode } from "react";
import {
  redirectUnauthorized,
  regenerateAccessToken,
} from "./regenerateAccessToken";
import { cookies } from "next/headers";
import { JWT_REFRESH_TOKEN } from "@/util/cookiesName";
import { SetAccessToken } from "./SetAccessToken";

export default async function Template({ children }: { children: ReactNode }) {
  const accessToken = await newAccessToken();

  return (
    <>
      {children}
      <SetAccessToken accessToken={accessToken} />
    </>
  );
}

async function newAccessToken(): Promise<string> {
  const refreshToken = cookies().get(JWT_REFRESH_TOKEN);
  if (!refreshToken) {
    throw redirectUnauthorized();
  }

  return await regenerateAccessToken(refreshToken.value);
}
