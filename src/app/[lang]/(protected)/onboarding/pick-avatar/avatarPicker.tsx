"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import AvatarEditor from "react-avatar-editor";
import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import { avatarPost } from "./avatarPost";
import { defaultAvatarPut } from "./defaultAvataPut";
import "./page.css";
import { DefaultImages } from "./DefaultImages";
import { ScaleImage } from "./ScaleImage";
import { Button } from "@/components/Button";
import { SkipLink } from "@/components/Link";

export default function AvatarPicker({
  lang,
  dict,
  defaultImages,
}: {
  lang: Lang;
  dict: Awaited<DictionaryReturnTypes["/en/onboarding/pick-avatar"]>;
  defaultImages: string[];
}) {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [customAvatar, setCustomAvatar] = useState<File | null>(null);
  const [scale, setScale] = useState(1);
  const [isEnabledNext, setIsEnabledNext] = useState(false);
  const [avatarPostError, setAvatarPostError] = useState("");
  const editorRef = useRef<AvatarEditor | null>(null);
  const [uploadError, setUploadError] = useState(false);
  const [defaultAvatar, setDefaultAvatar] = useState("");

  const handlePredefinedAvatarClick = (avatar: string) => {
    setIsEnabledNext(false);
    const selectedCustomAvatar = avatar.replace("/api/user-image/", "");
    setCustomAvatar(null);
    setDefaultAvatar(selectedCustomAvatar);
    setIsEnabledNext(true);
    setSelectedAvatar(avatar);
    setUploadError(false);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    const file = fileInput.files?.[0];
    const maxSizeInBytes = 3 * 1024 * 1024; // 3mb

    if (!file) {
      return;
    }

    if (file.size > maxSizeInBytes) {
      fileInput.value = "";
      setUploadError(true);
      return;
    }

    setScale(1);
    setDefaultAvatar("");
    setCustomAvatar(file);
    setIsEnabledNext(true);
    setUploadError(false);
  };

  const handleSaveAvatar = async () => {
    if (customAvatar) {
      const formData = new FormData();
      formData.append("image", customAvatar);
      const error = await avatarPost(formData, lang);
      setAvatarPostError(error);
    } else if (defaultAvatar) {
      const customError = await defaultAvatarPut(defaultAvatar, lang);
      setAvatarPostError(customError);
    }
  };

  return (
    <>
      <div className="flex grow flex-col gap-10">
        <input
          className="hidden"
          type="file"
          id="your_avatar"
          accept="image/jpeg, image/png, image/webp, image/jpg"
          onChange={handleAvatarChange}
        />
        <div className="flex justify-center">
          <div className="relative h-[200px] w-[200px]">
            <button className="absolute right-0 top-0 z-10 rounded-full">
              <label htmlFor="your_avatar">
                <Image
                  src="/plus-1.png"
                  width={45}
                  height={45}
                  alt="plus"
                  className="cursor-pointer"
                />
              </label>
            </button>

            <div
              className={`h-[200px] w-[200px] overflow-hidden rounded-full ${
                uploadError && "border border-red-500"
              }`}
            >
              {customAvatar ? (
                <AvatarEditor
                  className="-translate-x-7 -translate-y-7 object-cover"
                  ref={editorRef}
                  image={customAvatar}
                  width={205}
                  height={205}
                  scale={scale}
                  borderRadius={100}
                />
              ) : selectedAvatar ? (
                <Image
                  src={`${selectedAvatar}`}
                  alt={`Selected Avatar ${selectedAvatar}`}
                  width={200}
                  height={200}
                  unoptimized
                />
              ) : (
                <button>
                  <label htmlFor="your_avatar">
                    <Image
                      className="cursor-pointer"
                      src="/Preview.svg"
                      width={200}
                      height={200}
                      alt="preview"
                    />
                  </label>
                </button>
              )}
            </div>
          </div>
        </div>
        {uploadError && (
          <div className="mt-4 text-center text-sm font-normal text-red-500">
            <span>
              Image size exceeds limit <br /> Please upload a photo under 3 MB
            </span>
          </div>
        )}
        {avatarPostError && (
          <div className="mt-4 text-center text-sm font-normal text-red-500">
            <span>{avatarPostError}</span>
          </div>
        )}
        {customAvatar && <ScaleImage scale={scale} setScale={setScale} />}
        <h3 className="text-center text-sm font-normal leading-tight text-neutral-50">
          {dict.pickAvatar}
        </h3>
        <DefaultImages
          imagePaths={defaultImages}
          predefinedAvatarClick={handlePredefinedAvatarClick}
          selectedDefaultAvatar={defaultAvatar}
        />
      </div>
      <div className="mt-10 flex flex-col items-center gap-5">
        <Button
          onClick={handleSaveAvatar}
          disabled={!isEnabledNext}
          aria-disabled={!isEnabledNext}
        >
          {dict.next}
        </Button>
        <SkipLink href={`/${lang}/onboarding/introduce-yourself`}>
          {dict.skip}
        </SkipLink>
      </div>
    </>
  );
}
