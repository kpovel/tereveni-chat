"use client";

import { useState } from "react";
import { PopupMenu } from "./PopupMenu";

export function CookiePopup() {
  const [open, setOpen] = useState(true);

  return (
    <dialog
      open={open}
      className="absolute bottom-0 left-0 h-screen w-screen bg-white bg-opacity-20"
    >
    <PopupMenu />
    </dialog>
  );
}
