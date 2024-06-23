"use client";

import {
  useState,
  useRef,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  MouseEvent,
} from "react";
import AvatarEditor from "react-avatar-editor";
import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import { PlusSign } from "@/icons/PlusSign";
import { ScaleImage } from "../../../../onboarding/pick-avatar/ScaleImage";
import { DefaultImage } from "../../../(create)/create/DefaultImage";

export default function ChangeChatAvatar({
//   dict,
}: {
//   dict: Awaited<DictionaryReturnTypes["/en/chat/create"]>;
}) {
  const [customAvatar, setCustomAvatar] = useState<File | null>(null);
  const [scale, setScale] = useState(1);
  const editorRef = useRef<AvatarEditor | null>(null);

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

    fileInput.value = "";
  }

  return (
    <>
      <div className="mx-auto mt-8">
        <input
          className="hidden"
          type="file"
          id="your_avatar"
          accept="image/jpeg, image/png, image/webp, image/jpg"
          name="picture"
          onChange={handleAvatarChange}
        />
        <div className="relative h-[200px] w-[200px] mx-auto ">
          <LoadImageIcon
            uploadedImage={!!customAvatar}
            setCustomAvatar={setCustomAvatar}
          />
          <div className="h-[200px] w-[200px] mx-auto relative overflow-hidden rounded-lg">
            {customAvatar ? (
              <AvatarEditor
                className="-translate-x-7 -translate-y-7 object-cover"
                ref={editorRef}
                image={customAvatar}
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
      {customAvatar && <div className="mt-8"><ScaleImage scale={scale} setScale={setScale} /></div>}
    </>
  );
}

function LoadImageIcon({
  uploadedImage,
  setCustomAvatar,
}: {
  uploadedImage: boolean;
  setCustomAvatar: Dispatch<SetStateAction<File | null>>;
}) {
  function removeImage(e: MouseEvent<HTMLInputElement>) {
    e.preventDefault();
    setCustomAvatar(null);
  }

  return (
    <div className="absolute right-[-23px] top-[-23px] z-10">
      <div
        className={
          "absolute h-[45px] w-[45px] cursor-pointer rounded-full " +
          (uploadedImage && "z-20")
        }
        onClick={removeImage}
      ></div>
      <label htmlFor="your_avatar" className="relative z-10">
        <div
          className={
            "flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-full " +
            "bg-gradient-to-r transition duration-300 " +
            (uploadedImage
              ? "from-[#E700B9_0%] via-[#CB0085_51.5%] to-[#B10057_100%]"
              : "from-[#BA35F2_0%] via-[#B535F0_49.67%] to-[#6135C6_100%]")
          }
        >
          <div className={"transition " + (uploadedImage && "rotate-45")}>
            <PlusSign />
          </div>
        </div>
      </label>
    </div>
  );
}