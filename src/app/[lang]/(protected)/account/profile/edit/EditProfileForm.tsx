import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";

export function EditProfileForm(props: {
  dict: Awaited<DictionaryReturnTypes["/en/account/profile/edit"]>;
}) {
  return (
    <form>
    </form>
  );
}
