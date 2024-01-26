"use client";

import { useState } from "react";
import { PopupMenu } from "./PopupMenu";
import { acceptCookiePolicy } from ".";

export function CookiePopupDialog({
  opennedDialog,
}: {
  opennedDialog: boolean;
}) {
  const [open, setOpen] = useState(!opennedDialog);

  function closePopup() {
    setOpen(false);
    acceptCookiePolicy();
  }

  return (
    <dialog
      open={open}
      className="absolute bottom-0 left-0 h-screen w-screen bg-white bg-opacity-20"
    >
      <PopupMenu closePopup={closePopup} />
    </dialog>
  );
}
