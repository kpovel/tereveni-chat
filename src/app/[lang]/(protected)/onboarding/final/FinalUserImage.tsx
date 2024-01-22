"use client";

import Image from "next/image";
import { imageLoader } from "../pick-avatar/DefaultImages";

export function UserImage({imageName}: {imageName: string}) {
  return (
    <Image
      loader={imageLoader}
      src={`/api/user-image/${imageName}`}
      className="h-[200px] w-[200px] overflow-hidden rounded-full"
      width={200}
      height={200}
      alt="User avatar"
      priority={true}
    />
  );
}
