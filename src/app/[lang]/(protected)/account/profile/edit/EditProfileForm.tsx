"use client";

import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import { UserToEdit } from "./userData";
import { Input } from "@/components/input/Input";
import UserProfile from "public/account/user-profile-02.svg";
import Image from "next/image";
import { ProfileDescription } from "./ProfileDescription";
import { SubmitButton } from "@/components/form/SubmitButton";
import { useFormState } from "react-dom";
import { updateProfile } from "./editProfile";
import { SelectProfileAvatar } from "./SelectProfileAvatar";

const initialState = {
  profilePicture: "",
  nickname: "",
  description: "",
};

export function EditProfileForm(props: {
  dict: Awaited<DictionaryReturnTypes["/en/account/profile/edit"]>;
  userData: UserToEdit;
}) {
  const [_state, formAction] = useFormState(updateProfile, initialState);

  return (
    <form className="flex flex-col gap-10" action={formAction}>
      <SelectProfileAvatar userData={props.userData} />
      <Input
        placeholder={props.dict.placeholder.nickname}
        errorMessage={[""]}
        defaultValue={props.userData.user.name}
        name="username"
        inputIcon={
          <Image
            src={UserProfile}
            alt="User profile icon"
            height={20}
            width={20}
          />
        }
        hint={props.dict.hint.nickname}
      />
      <ProfileDescription dict={props.dict} userData={props.userData} />
      <SubmitButton buttonTitle={props.dict.saveChanges} />
    </form>
  );
}
