"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import AvatarEditor from "react-avatar-editor";
import { DictionaryReturnTypes } from "../../dictionaries";
import { avatarPost } from "./avatarPost";
import './page.css';

export default function AvatarPicker({
  lang,
  dict
}: {
  lang: "en" | "uk";
  dict: Awaited<DictionaryReturnTypes["/en/onboarding/pick-avatar"]>;
}) {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [customAvatar, setCustomAvatar] = useState<File | null>(null);
  const [scale, setScale] = useState(1);
  const [avatarPostError, setAvatarPostError] = useState("");
  const editorRef = useRef<AvatarEditor | null>(null);

  const predefinedAvatars = [
    "avatar-1.svg",
    "avatar-2.svg",
    "avatar-3.svg",
    "avatar-4.svg",
    "avatar-5.svg",
    "avatar-6.svg",
    "avatar-7.svg",
    "avatar-8.svg",
    "avatar-9.svg",
    "avatar-10.svg",
    "avatar-11.svg",
    "avatar-12.svg",
    "avatar-13.svg",
    "avatar-14.svg",
    "avatar-15.svg",
    "avatar-16.svg",
  ];

  const handlePredefinedAvatarClick = (avatar: any) => {
    setCustomAvatar(null);
    setSelectedAvatar(avatar);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setCustomAvatar(file)
    }
  };

  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(e.target.value));
  };

  const handleSaveAvatar = async () => {
    if (editorRef.current && customAvatar) {
      if (customAvatar) {
        const formData = new FormData();
        formData.append('image', customAvatar);
        const error = await avatarPost(formData, lang)
        setAvatarPostError(error);
        console.log(error)

      }
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
          
          <div className="h-[200px] w-[200px] overflow-hidden rounded-full">
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
      <div className="flex justify-center mt-4 bb-4">
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
      <div className="mt-10 flex flex-col items-center">
        <h3 className="text-center font-main text-sm font-normal leading-tight text-neutral-50">
          {dict.pickAvatar}
        </h3>
        <div className="mt-10 grid grid-cols-4 justify-center gap-4 md:max-w-md md:grid-cols-6">
          {predefinedAvatars.map((avatar, id) => (
            <div key={id} className={``}>
              <Image
                key={avatar}
                src={`/${avatar}`}
                alt={`Avatar ${avatar}`}
                width={60}
                height={60}
                onClick={() => handlePredefinedAvatarClick(avatar)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center">
        
        <button className="main__btn mt-24" onClick={handleSaveAvatar}>
          <Link className="main__link" href="">
            {dict.next}
          </Link>
        </button>
        <button className="mt-5 w-full border-none bg-transparent outline-none">
          <Link
            className="text-center font-main text-sm font-normal leading-tight text-stone-300"
            href=""
          >
            {dict.skip}
          </Link>
        </button>
      </div>
    </div>
  );
}
