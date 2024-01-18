"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import AvatarEditor from "react-avatar-editor";
import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import { avatarPost } from "./avatarPost";
import { defaultAvatarPut } from "./defaultAvataPut";
import "./page.css";

export default function AvatarPicker({
  lang,
  dict,
  defaultImages,
}: {
  lang: "en" | "uk";
  dict: Awaited<DictionaryReturnTypes["/en/onboarding/pick-avatar"]>;
  defaultImages: string[];
}) {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [customAvatar, setCustomAvatar] = useState<File | null>(null);
  const [scale, setScale] = useState(1);
  const [isEnabledNext, setIsEnabledNext] = useState(false);
  const [avatarPostError, setAvatarPostError] = useState("");
  const editorRef = useRef<AvatarEditor | null>(null);
  const [uploadError, setUploadError] = useState(false);
  const [customAvatarData, setCustomAvatarData] = useState("");

  const handlePredefinedAvatarClick = (avatar: any) => {
    setIsEnabledNext(false);
    const selectedCustomAvatar = avatar.replace("api/user-image/", "");
    setCustomAvatar(null);
    setCustomAvatarData(selectedCustomAvatar);
    setIsEnabledNext(true);
    setSelectedAvatar(avatar);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    const file = fileInput.files?.[0];

    const maxSizeInBytes = 3 * 1024 * 1024;

    if (file && file.size < maxSizeInBytes) {
      setCustomAvatarData("");
      setCustomAvatar(file);
      setIsEnabledNext(true);
      setUploadError(false);
    } else {
      fileInput.value = "";
      setUploadError(true);
    }
  };

  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(e.target.value));
  };

  const handleSaveAvatar = async () => {
    if (customAvatar) {
      const formData = new FormData();
      formData.append("image", customAvatar);
      const error = await avatarPost(formData, lang);
      setAvatarPostError(error);
    } else if (customAvatarData) {
      const customError = await defaultAvatarPut(customAvatarData, lang);
      setAvatarPostError(customError);;
    }
  };

  return (
    <div className="mt-10">
      <input
        className="hidden"
        type="file"
        id="your_avatar"
        accept="image/*"
        onChange={handleAvatarChange}
      />
      <div className="flex justify-center">
        <div className="relative h-[200px] w-[200px]">
          <button className="absolute right-0 top-0 z-10 rounded-full">
            <label htmlFor="your_avatar">
              <Image src="/plus-1.png" width={45} height={45} alt="plus" />
            </label>
          </button>

          <div
            className={`h-[200px] w-[200px] overflow-hidden rounded-full ${
              uploadError && "border border-red-500"
            }`}
          >
            {customAvatar ? (
              <AvatarEditor
                className="-translate-x-7 -translate-y-7"
                ref={editorRef}
                image={customAvatar}
                width={205}
                height={205}
                scale={scale}
                borderRadius={100}
              />
            ) : selectedAvatar ? (
              <Image
                src={`/${selectedAvatar}`}
                alt={`Selected Avatar ${selectedAvatar}`}
                width={200}
                height={200}
              />
            ) : (
              <Image
                src="/Preview.svg"
                width={200}
                height={200}
                alt="preview"
              />
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
      {customAvatar && (
        <div className="mb-4 mt-4 flex justify-center">
          <input
            className="avatar__scale"
            type="range"
            value={scale}
            min="1"
            max="2"
            step="0.01"
            onChange={handleScaleChange}
          />
        </div>
      )}
      <div className="mt-10 flex flex-col items-center">
        <h3 className="text-center font-main text-sm font-normal leading-tight text-neutral-50">
          {dict.pickAvatar}
        </h3>
        <div className="mt-10 grid grid-cols-4 justify-center gap-4 md:max-w-md md:grid-cols-6">
          {defaultImages.map((avatar) => {
            const avatarSrc = avatar.substring(1);

            return (
              <div key={avatar}>
                <Image
                  src={avatar}
                  alt={`Avatar ${avatar}`}
                  width={60}
                  height={60}
                  onClick={() => handlePredefinedAvatarClick(avatarSrc)}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center">
        <button
          className={`main__btn main__link mt-24 cursor-pointer ${
            !isEnabledNext && "bg-opacity-10 text-zinc-500"
          }`}
          onClick={handleSaveAvatar}
          disabled={!isEnabledNext}
        >
          {dict.next}
        </button>
        <button className="mt-5 w-full border-none bg-transparent text-center font-main text-sm font-normal leading-tight text-stone-300 outline-none">
          <Link href={`/${lang}/onboarding/introduce-yourself`}>
            {dict.skip}
          </Link>
        </button>
      </div>
    </div>
  );
}
