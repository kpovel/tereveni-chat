import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { DictionaryReturnTypes } from "../../../dictionaries";
import addToMessage from "../../../../../../public/add-to-message.svg";
import sendBtn from "../../../../../../public/send-btn.svg";

export default function MessageInput({
  sendMessage,
  dict
}: {
  sendMessage: (msg: string) => void;
  dict: DictionaryReturnTypes
}) {
  const [isSendBtnActive, setIsSendBtnActive] = useState(false);
  const [messageToSend, setMessageToSend] = useState<string>("");

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

  function handleMessage(event: ChangeEvent<HTMLInputElement>) {
    setMessageToSend(event.currentTarget.value);
  }

  function handleSubmitMessage(e: any) {

    e.preventDefault();
    sendMessage(messageToSend);
    setMessageToSend("");
    const inputElement = e.currentTarget.querySelector('input');
    if (inputElement) {
      inputElement.blur();
    }
    setIsSendBtnActive(false);
  }

  return (
    <div className="flex w-full items-center justify-start gap-2 bg-stone-900 py-2 pl-3 pr-5">
      <button className="h-[34px] w-[34px] bg-none">
        <Image src={addToMessage} alt="addToMessage" />
      </button>
      <form
        onSubmit={handleSubmitMessage}
        className="flex w-full items-center"
        action=""
      >
        <input
          className={`w-full rounded-2xl bg-[#545454] px-4 py-2 text-sm font-normal outline-none ${
            isSendBtnActive ? "bg-[#c2c2c2] text-[#050404]" : ""
          }`}
          type="text"
          placeholder={dict.placeholder.enterMessage}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={handleMessage}
          value={messageToSend}
        />
        {isSendBtnActive && (
          <button type="submit" className="ml-2 h-[34px] w-[34px]">
            <Image src={sendBtn} alt="submit" />
          </button>
        )}
      </form>
    </div>
  );
}
