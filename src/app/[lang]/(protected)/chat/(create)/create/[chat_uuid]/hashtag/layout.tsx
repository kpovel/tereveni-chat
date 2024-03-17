import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { isValidChat } from "../isValidChat";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: Lang; chat_uuid: string };
}) {
  const validChat = await isValidChat(params.chat_uuid);
  if (!validChat) {
    redirect(`/${params.lang}/chat/all`);
  }

  return <>{children}</>;
}

