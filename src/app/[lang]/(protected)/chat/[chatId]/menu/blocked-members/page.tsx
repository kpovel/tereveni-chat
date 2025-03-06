"use server";

import BlockedMembersWrapper from "./blockedMembersWrapper";
import { getDictionary } from "../../../../../dictionaries";

export default async function BlockedMembers({
  params,
}: {
  params: { lang: Lang; chatId: string };
}) {
  const dict = await getDictionary(`/${params.lang}/chat/menu/blocked-members`);

  return <BlockedMembersWrapper dict={dict} chatId={params.chatId} />;
}
