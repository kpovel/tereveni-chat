import Image from "next/image";

export function ChatAvatar({
  imageName,
  chatName,
}: {
  imageName: string | undefined;
  chatName: string;
}) {
  return (
    <Image
      src={`/api/user-image/${imageName ?? "no-image.svg"}`}
      alt={`Image of ${chatName} chat`}
      width={52}
      height={52}
      className="h-[52px] w-[52px] rounded-full object-cover my-auto"
      unoptimized
    />
  );
}
