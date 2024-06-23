import BlockedMembersWrapper from "./blockedMembersWrapper"

export default async function BlockedMembers({
    params,
  }: {
    params: { lang: Lang; chatId: string };
  }) {
    return (
        <BlockedMembersWrapper chatId={params.chatId} />
    )
}