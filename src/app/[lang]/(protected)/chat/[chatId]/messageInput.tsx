"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";
import addToMessage from "../../../../../../public/add-to-message.svg";
import sendBtn from "../../../../../../public/send-btn.svg";

export default function MessageInput() {
  const [isSendBtnActive, setIsSendBtnActive] = useState(false);

  const handleInputFocus = () => {
    setIsSendBtnActive(true);
  };

  const handleInputBlur = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim().length > 0) {
      setIsSendBtnActive(true);
    } else {
      setIsSendBtnActive(false);
    }
  };

  return (
    <div className="flex inline-flex w-full items-center justify-start gap-2 bg-stone-900 py-2 pl-3 pr-5">
      <button className="h-[34px] w-[34px] bg-none">
        <Image src={addToMessage} />
      </button>
      <form className="flex w-full items-center" action="">
        <input
          className={`w-full rounded-2xl bg-neutral-600 px-4 py-2 text-sm font-normal outline-none focus:bg-stone-300 focus:text-black ${
            isSendBtnActive ? "bg-stone-300 text-black" : ""
          }`}
          type="text"
          placeholder="Enter message"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        {isSendBtnActive && (
          <button type="submit" className="ml-2 h-[34px] w-[34px]">
            <Image src={sendBtn} />
          </button>
        )}
      </form>
    </div>
  );
}
