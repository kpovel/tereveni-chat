import MembersWrapper from "./membersWrapper";

export default async function Members({
    params,
  }: {
    params: { lang: Lang; chatId: string };
  }) {
    return (
        <MembersWrapper chatId={params.chatId} />
    )
}