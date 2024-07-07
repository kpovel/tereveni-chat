import InviteMembersWrapper from "./inviteMembersWrapper";
import { getDictionary } from "../../../../../dictionaries";

export default async function InviteMembers({
  params,
}: {
  params: { lang: Lang; chatId: string };
}) {
  const dict = await getDictionary(`/${params.lang}/chat/menu/invite-members`);

  return <InviteMembersWrapper dict={dict} chatId={params.chatId} />;
}
