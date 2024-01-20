import { env } from "@/env.mjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getJwtAccessToken } from "../../regenerateAccessToken";

export type OnboardingUserData = {
  name: string;
  userLogin: string;
  onboardingEnd: boolean;
  image: { name: string };
};

export async function onboardingUserData() {
  const jwtAccessToken = await getJwtAccessToken();

  const res = await fetch(`${env.SERVER_URL}/api/user/onboarding/get-user`, {
    headers: {
      Authorization: `Bearer ${jwtAccessToken}`,
    },
  });

  if (!res.ok) {
    const lang = cookies().get("lang");
    const langValue = (lang?.value ?? "en") as "en" | "uk";
    redirect(`/${langValue}`);
  }

  return (await res.json()) as OnboardingUserData;
}
