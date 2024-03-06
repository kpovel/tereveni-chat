import { env } from "@/env.mjs";
import {
  getJwtAccessToken,
  redirectUnauthorized,
} from "../regenerateAccessToken";
import { retryAsync } from "@/util/retry";

export type OnboardingUserData = {
  name: string;
  userLogin: string;
  onboardingEnd: boolean;
  image: { name: string };
};

export async function onboardingUserData() {
  const userData = await retryAsync(2)(getOnboardingUserData);

  if (!userData) {
    throw await redirectUnauthorized();
  }

  return userData;
}

async function getOnboardingUserData() {
  const jwtAccessToken = await getJwtAccessToken();
  try {
    const res = await fetch(`${env.SERVER_URL}/api/user/onboarding/get-user`, {
      headers: {
        Authorization: `Bearer ${jwtAccessToken}`,
      },
    });

    if (res.status === 200) {
      return (await res.json()) as OnboardingUserData;
    }
  } catch (e) {
    console.log(e);
  }
}
