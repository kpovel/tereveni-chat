import { env } from "@/env.mjs";
import { JWT_ACCESS_TOKEN } from "@/util/cookiesName";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type OnboardingUserData = {
  name: string;
  userLogin: string;
  onboardingEnd: boolean;
  image: { name: string };
};

export async function onboardingUserData() {
  const jwtAccessToken = cookies().get(JWT_ACCESS_TOKEN);
  const lang = cookies().get("lang");
  const langValue = (lang?.value ?? "en") as "en" | "uk";

  if (!jwtAccessToken) {
    redirect(`/${langValue}`);
  }

  const res = await fetch(`${env.SERVER_URL}/api/user/onboarding/get-user`, {
    headers: {
      Authorization: `Bearer ${jwtAccessToken?.value}`,
    },
  });

  if (!res.ok) {
    redirect(`/${langValue}`);
  }

  return (await res.json()) as OnboardingUserData;
}
