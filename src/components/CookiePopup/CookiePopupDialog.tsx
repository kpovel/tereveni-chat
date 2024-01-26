"use client";

import { useState } from "react";
import { PopupMenu } from "./PopupMenu";
import { acceptCookiePolicy } from ".";
import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";

export function CookiePopupDialog({
  openedDialog,
  dict,
}: {
  openedDialog: boolean;
  dict: Awaited<DictionaryReturnTypes["components/en/CookiePopup"]>;
}) {
  const [open, setOpen] = useState(!openedDialog);

  function closePopup() {
    setOpen(false);
    acceptCookiePolicy();
  }

  return (
    <dialog
      open={open}
      className="absolute bottom-0 left-0 h-screen w-screen bg-white bg-opacity-20"
    >
      <PopupMenu closePopup={closePopup} dict={dict}/>
    </dialog>
  );
}
