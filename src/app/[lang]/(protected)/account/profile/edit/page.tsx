import { getDictionary } from "@/app/[lang]/dictionaries";
import { ProfileHeader } from "./ProfileHeader";
import { EditProfileForm } from "./EditProfileForm";
import { fetchUserData } from "./userData";

export default async function EditProfile(props: { params: { lang: Lang } }) {
  const dict = await getDictionary(
    `/${props.params.lang}/account/profile/edit`,
  );
  const userData = await fetchUserData();

  return (
    <main className="flex w-full flex-col gap-10 px-6 py-10">
      <ProfileHeader lang={props.params.lang} dict={dict} />
      <EditProfileForm dict={dict} userData={userData} />
    </main>
  );
}
