import { cookies } from "next/headers";
import { onboardingUserData } from "./final/onboardingUserData";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  const userData = await onboardingUserData();
  if (userData.onboardingEnd) {
    const lang = cookies().get("lang")?.value ?? "en";
    redirect(`/${lang}/chat`);
  }

  return <>{children}</>;
}
