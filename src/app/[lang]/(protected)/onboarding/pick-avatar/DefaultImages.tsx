import Image, { ImageLoader } from "next/image";

const imageLoader: ImageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export function DefaultImages({
  imagePaths,
  predefinedAvatarClick,
}: {
  imagePaths: string[];
  predefinedAvatarClick: (val: string) => void;
}) {
  return (
    <div className="mt-10 grid grid-cols-4 justify-center gap-4 md:max-w-md md:grid-cols-6">
      {imagePaths.map((avatar) => {
        return (
          <div key={avatar}>
            <Image
              loader={imageLoader}
              src={avatar}
              alt={`Avatar ${avatar}`}
              width={60}
              height={60}
              onClick={() => predefinedAvatarClick(avatar)}
            />
          </div>
        );
      })}
    </div>
  );
}
