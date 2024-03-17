import Image from "next/image";
import ImagePlaceholder from "public/chat/image_placeholder.jpeg";

export function DefaultImage() {
  return (
    <label htmlFor="your_avatar" className="relative">
      <div
        className="absolute h-[200px] w-[200px] cursor-pointer"
        style={{
          background:
            "linear-gradient(0deg, rgba(36, 0, 83, 0.70) 0%, rgba(36, 0, 83, 0.70) 100%)",
        }}
      />
      <Image
        className="h-[200px] w-[200px] cursor-pointer rounded-lg object-cover"
        src={ImagePlaceholder}
        alt="Default chat image"
        priority
      />
    </label>
  );
}
