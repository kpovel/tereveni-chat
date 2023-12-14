import AvatarPicker from "./avatarPicker";

export default function PickAvatar() {
  return (
    <div className="container mx-auto px-6">
      <h2 className="mt-20 text-center text-lg font-medium text-neutral-50 ">
        Choose a profile picture
      </h2>
      <p className="mt-5 text-center font-main text-sm font-normal leading-tight text-neutral-50">
        Use the photo from your gallery
      </p>
      <AvatarPicker />
    </div>
  );
}
