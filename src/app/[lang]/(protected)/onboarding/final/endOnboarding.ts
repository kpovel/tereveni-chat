"use server";

import { env } from "@/env.mjs";
import { getJwtAccessToken } from "../../regenerateAccessToken";

export async function endOnboarding() {
  const jwtAccessToken = await getJwtAccessToken();

  await fetch(`${env.SERVER_URL}/api/user/onboarding/end`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtAccessToken}`,
    },
    body: JSON.stringify({
      onboardingEnd: true,
    }),
  });
}
