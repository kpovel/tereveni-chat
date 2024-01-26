"use server";

import { cookies } from "next/headers";
import { CookiePopupDialog } from "./CookiePopupDialog";
import { getDictionary } from "@/app/[lang]/dictionaries";

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

export async function CookiePopup({ lang }: { lang: "en" | "uk" }) {
  const acceptedPolicy = await isAcceptedCookiePolicy();
  const dict = await getDictionary(`components/${lang}/CookiePopup`);

  return <CookiePopupDialog openedDialog={acceptedPolicy} dict={dict} />;
}
