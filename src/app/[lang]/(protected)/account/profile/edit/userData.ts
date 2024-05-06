import { env } from "@/env.mjs";
import { getJwtAccessToken } from "../../../regenerateAccessToken";

export async function fetchUserData() {
  const jwtAccessToken = await getJwtAccessToken();

  const res = await fetch(`${env.SERVER_URL}/api/user/to-edit`, {
    headers: {
      Authorization: `Bearer ${jwtAccessToken}`,
    },
  });

  return (await res.json()) as UserToEdit;
}

export type UserToEdit = {
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
