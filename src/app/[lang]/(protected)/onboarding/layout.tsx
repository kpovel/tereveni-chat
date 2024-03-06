import { onboardingUserData } from "./onboardingUserData";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function OnboardingLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: Lang };
}) {
  const userData = await onboardingUserData();
  if (userData.onboardingEnd) {
    redirect(`/${params.lang}/chat/all`);
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-10 px-6 pb-10 pt-5">
      {children}
    </main>
  );
}
