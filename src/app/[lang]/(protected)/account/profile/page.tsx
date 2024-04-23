import { getDictionary } from "@/app/[lang]/dictionaries";
import { AccountHeader } from "./AccountHeader";
import { env } from "@/env.mjs";
import { getJwtAccessToken } from "../../regenerateAccessToken";
import { ProfileImage } from "./ProfileImage";

export default async function Profile(props: { params: { lang: Lang } }) {
  const dict = await getDictionary(`/${props.params.lang}/account/profile`);
  const userData = await getUserData();

  return (
    <main className="flex w-full flex-col gap-10 px-6 py-10">
      <AccountHeader lang={props.params.lang} dict={dict} />
      <ProfileImage userData={userData} />
      <div className="flex flex-col gap-5">
        <p className="text-center text-base font-medium text-[#9D83F9]">
          @{userData.userLogin}
        </p>
        <p>{userData.about}</p>
      </div>
    </main>
  );
}

async function getUserData() {
  const jwtAccessToken = await getJwtAccessToken();

  const res = await fetch(`${env.SERVER_URL}/api/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwtAccessToken}`,
    },
  });

  const json = (await res.json()) as UserData;
  return json;
}

export type UserData = {
  uuid: string;
  name: string;
  userLogin: string;
  about: string;
  email: string;
  image: { name: string };
  dateLastVisit: null;
  dateOfCreated: string;
};
