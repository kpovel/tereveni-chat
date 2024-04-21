import Image from "next/image";
import { UserData } from "./page";

export function ProfileImage(props: { userData: UserData }) {
  return (
    <Image
      src={`/api/user-image/${props.userData.image.name}`}
      alt="User image"
      width={200}
      height={200}
      priority={true}
      className="mx-auto"
    />
  );
}
