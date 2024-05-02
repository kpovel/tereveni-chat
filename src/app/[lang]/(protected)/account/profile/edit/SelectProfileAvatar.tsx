import { ChangeEvent, useEffect, useRef, useState, MouseEvent } from "react";
import { UserToEdit } from "./userData";
import AvatarEditor from "react-avatar-editor";
import { DefaultImage } from "../../../chat/(create)/create/DefaultImage";
import { ScaleImage } from "../../../onboarding/pick-avatar/ScaleImage";
import { PlusSign } from "@/icons/PlusSign";

export function SelectProfileAvatar(props: { userData: UserToEdit }) {
  const [customAvatar, setCustomAvatar] = useState<File | string | null>(null);
  const [defaultAvatarName, setDefaultAvatarName] = useState<string | null>(
    null,
  );
  const [scale, setScale] = useState(1);
  const editorRef = useRef<AvatarEditor>(null);
  const uploadedAvatar = customAvatar || defaultAvatarName;

  useEffect(() => {
    // fix: use this image path as the initial state data
    setCustomAvatar(`/api/user-image/${props.userData.user.image.name}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const fileInput = e.target;
    const file = fileInput.files?.[0];
    const maxSizeInBytes = 3 * 1024 * 1024; // 3mb

    if (!file) {
      return;
    }

    if (file.size > maxSizeInBytes) {
      fileInput.value = "";
      return;
    }

    setScale(1);
    setCustomAvatar(file);
    setDefaultAvatarName(null);
  }

  function resetAvatar() {
    setCustomAvatar(null);
    setDefaultAvatarName(null);
  }

  function setDefaultAvatar(name: string) {
    setDefaultAvatarName(name);
    setCustomAvatar(null);
  }

  return (
    <>
      <div className="mx-auto">
        <input
          className="hidden"
          type="file"
          id="your_avatar"
          accept="image/jpeg, image/png, image/webp, image/jpg"
          name="picture"
          onChange={handleAvatarChange}
        />
        <input
          name="defaultAvatar"
          value={defaultAvatarName ?? ""}
          type="hidden"
          className="hidden"
        />
        <div className="relative">
          <LoadImageIcon
            uploadedImage={!!uploadedAvatar}
            resetAvatar={resetAvatar}
          />
          <div className="h-[200px] w-[200px] overflow-hidden rounded-full">
            {!!uploadedAvatar ? (
              <AvatarEditor
                className="-translate-x-7 -translate-y-7 object-cover"
                ref={editorRef}
                image={uploadedAvatar}
                width={205}
                height={205}
                scale={scale}
                borderRadius={8}
              />
            ) : (
              <DefaultImage />
            )}
          </div>
        </div>
      </div>
      {customAvatar && typeof customAvatar !== "string" && (
        <ScaleImage scale={scale} setScale={setScale} />
      )}
      <DefaultImages
        defaultAvatars={props.userData.avatars}
        setDefaultAvatarName={setDefaultAvatar}
        defaultAvatarName={defaultAvatarName}
      />
    </>
  );
}

function LoadImageIcon(props: {
  uploadedImage: boolean;
  resetAvatar: () => void;
}) {
  function removeImage(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    props.resetAvatar();
  }

  return (
    <div className="absolute right-0 z-10">
      <div
        className={
          "absolute h-[45px] w-[45px] cursor-pointer rounded-full " +
          (props.uploadedImage && "z-20")
        }
        onClick={removeImage}
      ></div>
      <label htmlFor="your_avatar" className="relative z-10">
        <div
          className={
            "flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-full " +
            "bg-gradient-to-r transition duration-300 " +
            (props.uploadedImage
              ? "from-[#E700B9_0%] via-[#CB0085_51.5%] to-[#B10057_100%]"
              : "from-[#BA35F2_0%] via-[#B535F0_49.67%] to-[#6135C6_100%]")
          }
        >
          <div className={"transition " + (props.uploadedImage && "rotate-45")}>
            <PlusSign />
          </div>
        </div>
      </label>
    </div>
  );
}

function DefaultImages(props: {
  defaultAvatars: string[];
  setDefaultAvatarName: (name: string) => void;
  defaultAvatarName: string | null;
}) {
  return (
    <div className="flex w-[calc(100%+24px)] flex-nowrap gap-[18px] overflow-scroll">
      {props.defaultAvatars.map((a) => {
        return (
          <div
            key={a}
            className="shrink-0"
            onClick={() => {
              props.setDefaultAvatarName(`/api/user-image/${a}`);
            }}
          >
            <div
              className="h-[60px] w-[60px] rounded-full bg-cover"
              style={{
                backgroundImage: `${props.defaultAvatarName === a ? "linear-gradient(0deg, rgba(157, 131, 249, 0.30) 0%, rgba(157, 131, 249, 0.30) 100%)," : ""} url('/api/user-image/${a}')`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
