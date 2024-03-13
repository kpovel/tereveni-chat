"use client";

import { useState, useRef, ChangeEvent } from "react";
import AvatarEditor from "react-avatar-editor";
import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import { PlusSign } from "@/icons/PlusSign";
import { ScaleImage } from "../../../onboarding/pick-avatar/ScaleImage";
import { DefaultImage } from "./DefaultImage";

export function SelectChatImage({
  dict,
}: {
  dict: Awaited<DictionaryReturnTypes["/en/chat/create"]>;
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
        <div className="relative">
          <LoadImageIcon />
          <div className="h-[200px] w-[200px] overflow-hidden rounded-lg">
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
      {customAvatar && <ScaleImage scale={scale} setScale={setScale} />}
    </>
  );
}

function LoadImageIcon() {
  return (
    <div className="absolute right-[-23px] top-[-23px] z-10">
      <label htmlFor="your_avatar">
        <div
          className="flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-full"
          style={{
            background:
              "linear-gradient(90deg, #BA35F2 0%, #B535F0 49.67%, #6135C6 100%)",
          }}
        >
          <PlusSign />
        </div>
      </label>
    </div>
  );
}
