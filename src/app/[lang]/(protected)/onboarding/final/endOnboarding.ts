"use server";

import { env } from "@/env.mjs";
import { JWT_ACCESS_TOKEN } from "@/util/cookiesName";
import { cookies } from "next/headers";

export async function endOnboarding() {
  const jwtAccessToken = cookies().get(JWT_ACCESS_TOKEN);

  await fetch(`${env.SERVER_URL}/api/user/onboarding/end`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtAccessToken?.value}`,
    },
    body: JSON.stringify({
      onboardingEnd: true,
    }),
  });
}
