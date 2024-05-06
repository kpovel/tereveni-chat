"use server";

import { env } from "@/env.mjs";
import { getJwtAccessToken } from "../../../regenerateAccessToken";

export async function updateProfile(_prevState: any, formData: FormData) {
  const jwtAccessToken = await getJwtAccessToken();

  const submitFormData = new FormData();
  const picture = formData.get("picture") as File | null;
  if (picture && picture.size > 0) {
    const blob = new Blob([picture], { type: picture.type });
    submitFormData.append("image", blob);
  }

  submitFormData.append(
    "user",
    new Blob(
      [
        JSON.stringify({
          name: formData.get("username"),
          about: formData.get("description"),
          defaultAvatar: removeDefaultAvatarPath(
            formData.get("defaultAvatar") as string | null,
          ),
        }),
      ],
      {
        type: "application/json",
      },
    ),
  );

  const res = await fetch(`${env.SERVER_URL}/api/user`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${jwtAccessToken}`,
    },
    body: submitFormData,
  });

  const text = await res.text();
  console.log(res.status, text);

  return {
    profilePicture: "",
    nickname: "",
    description: "",
  };
}

function removeDefaultAvatarPath(avatarName: string | null) {
  if (!avatarName) {
    return "";
  }

  return avatarName.replace("/api/user-image/", "");
}
