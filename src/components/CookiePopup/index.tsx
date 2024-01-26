"use server";

import { cookies } from "next/headers";
import { CookiePopupDialog } from "./CookiePopupDialog";

const ACCEPTED_COOKIE_POLICY = "accepted_cookie_policy";

async function isAcceptedCookiePolicy() {
  const acceptedCookies = cookies().get(ACCEPTED_COOKIE_POLICY);

  if (acceptedCookies?.value === "true") {
    return true;
  }

  return false;
}

export async function acceptCookiePolicy() {
  cookies().set(ACCEPTED_COOKIE_POLICY, "true");
}

export async function CookiePopup() {
  const acceptedPolicy = await isAcceptedCookiePolicy();

  return <CookiePopupDialog opennedDialog={acceptedPolicy} />;
}
