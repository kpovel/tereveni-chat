import InviteMembersWrapper from "./inviteMembersWrapper"

export default async function InviteMembers({
    params,
  }: {
    params: { lang: Lang; chatId: string };
  }) {
    return (
        <InviteMembersWrapper chatId={params.chatId} />
    )
}