"use server";
import MembersWrapper from "./membersWrapper";
import { getDictionary } from "../../../../../dictionaries";

export default async function Members({
  params,
}: {
  params: { lang: Lang; chatId: string };
}) {
  const dict = await getDictionary(`/${params.lang}/chat/menu/members`);

  return <MembersWrapper dict={dict} chatId={params.chatId} />;
}
