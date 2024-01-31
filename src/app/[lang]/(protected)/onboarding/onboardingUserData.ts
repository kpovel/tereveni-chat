import { env } from "@/env.mjs";
import { getJwtAccessToken, redirectUnauthorized } from "../regenerateAccessToken";

export type OnboardingUserData = {
  name: string;
  userLogin: string;
  onboardingEnd: boolean;
  image: { name: string };
};

export async function onboardingUserData() {
  const jwtAccessToken = await getJwtAccessToken();
  const res = await fetchOnboardingData(jwtAccessToken);

  if (res.status === 401) {
    const jwtAccessToken = await getJwtAccessToken();
    const res = await fetchOnboardingData(jwtAccessToken);

    if (res.status === 200) {
      return (await res.json()) as OnboardingUserData;
    }

    throw redirectUnauthorized();
  }

  if (res.status === 200) {
    return (await res.json()) as OnboardingUserData;
  }

  throw redirectUnauthorized();
}

async function fetchOnboardingData(jwtAccessToken: string) {
  return await fetch(`${env.SERVER_URL}/api/user/onboarding/get-user`, {
    headers: {
      Authorization: `Bearer ${jwtAccessToken}`,
    },
  });
}
