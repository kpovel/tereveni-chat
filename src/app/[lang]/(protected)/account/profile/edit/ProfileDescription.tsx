import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import { UserToEdit } from "./userData";
import { ChangeEvent, useState } from "react";

const DESCRIPTION_MAX_LENGTH = 300;

export function ProfileDescription(props: {
  dict: Awaited<DictionaryReturnTypes["/en/account/profile/edit"]>;
  userData: UserToEdit;
}) {
  const [description, setDescription] = useState(props.userData.user.about);

  function onChangeDescription(e: ChangeEvent<HTMLTextAreaElement>) {
    const description = e.target.value;
    if (description.length <= DESCRIPTION_MAX_LENGTH) {
      setDescription(e.target.value);
    }
  }

  return (
    <div>
      <textarea
        max-length={DESCRIPTION_MAX_LENGTH}
        className="h-[192px] w-full resize-none rounded-3xl border border-neutral-700
        bg-[#1F1F1F] px-5 py-3 text-sm font-normal leading-tight text-neutral-50
        outline-none focus:border-violet-700"
        value={description}
        onChange={onChangeDescription}
        name="description"
        id="introduce"
      ></textarea>
      <div className="px-2 text-right">
        <span className="text-xs font-normal leading-none text-stone-300">
          {description.length} / {DESCRIPTION_MAX_LENGTH}
        </span>
      </div>
    </div>
  );
}
