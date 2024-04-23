import { getDictionary } from "@/app/[lang]/dictionaries";
import { ProfileHeader } from "./ProfileHeader";
import { EditProfileForm } from "./EditProfileForm";
import { env } from "@/env.mjs";
import { getJwtAccessToken } from "../../../regenerateAccessToken";

export default async function EditProfile(props: { params: { lang: Lang } }) {
  const dict = await getDictionary(
    `/${props.params.lang}/account/profile/edit`,
  );
  const userData = await fetchUserData();

  return (
    <main className="flex w-full flex-col gap-10 px-6 py-10">
      <ProfileHeader lang={props.params.lang} dict={dict} />
      <EditProfileForm dict={dict} />
    </main>
  );
}

export async function fetchUserData() {
  const jwtAccessToken = await getJwtAccessToken();

  const res = await fetch(`${env.SERVER_URL}/api/user/to-edit`, {
    headers: {
      Authorization: `Bearer ${jwtAccessToken}`,
    },
  });

  return (await res.json()) as UserToEdit;
}

type UserToEdit = {
  user: {
    uuid: string;
    name: string;
    userLogin: string;
    about: string;
    email: string;
    image: { name: string };
    dateLastVisit: null;
    dateOfCreated: string;
  };
  avatars: string[];
};
