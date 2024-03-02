import Image, { ImageLoader } from "next/image";

export const imageLoader: ImageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export function DefaultImages({
  imagePaths,
  predefinedAvatarClick,
  selectedDefaultAvatar,
}: {
  imagePaths: string[];
  predefinedAvatarClick: (val: string) => void;
  selectedDefaultAvatar: string;
}) {
  return (
    <div className="relative mx-auto grid grid-cols-4 justify-center gap-4 md:max-w-md md:grid-cols-6">
      {imagePaths.map((avatar) => {
        return (
          <div
            key={avatar}
            onClick={() => predefinedAvatarClick(avatar)}
            className="cursor-pointer"
          >
            <ImageBackground
              avatar={avatar}
              selectedAvatar={selectedDefaultAvatar}
            />
            <Image
              loader={imageLoader}
              src={avatar}
              alt={`Avatar ${avatar}`}
              width={60}
              height={60}
            />
          </div>
        );
      })}
    </div>
  );
}

function ImageBackground({
  avatar,
  selectedAvatar,
}: {
  avatar: string;
  selectedAvatar: string;
}) {
  const displayBackground =
    !!selectedAvatar.trim() && avatar.endsWith(selectedAvatar);

  return (
    <>
      {displayBackground && (
        <div
          className="absolute h-[60px] w-[60px] rounded-full"
          style={{
            background:
              "linear-gradient(0deg, rgba(157, 131, 249, 0.30) 0%, rgba(157, 131, 249, 0.30) 100%)",
          }}
        ></div>
      )}
    </>
  );
}
