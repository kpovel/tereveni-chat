"use client";

import { ReactNode } from "react";
import { TrashIcon } from "./TrashIcon";
import { useClickOutside } from "@/util/useClickOutside";

export function MessageContextMenu({
  children,
  chatId,
}: {
  children: ReactNode;
  chatId: string;
}) {
  const messageContextId = `context${chatId}`;
  const ref = useClickOutside(hideContextMenu);

  function hideContextMenu() {
    const contextMenu = document.getElementById(messageContextId);
    if (contextMenu) {
      contextMenu.classList.add("hidden");
    }
  }

  function openContextMenu(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();

    const contextMenu = document.getElementById(messageContextId);
    if (contextMenu) {
      contextMenu.classList.remove("hidden");
    }
  }

  function deleteChat() {
    alert("Are you sure you want to delete this chat?");
  }

  return (
    <div
      className="relative"
      id={chatId}
      onContextMenu={openContextMenu}
      onClickCapture={openContextMenu}
      ref={ref}
    >
      {children}
      <div
        id={messageContextId}
        onClick={deleteChat}
        className="absolute right-0 bottom-[-54px] flex hidden w-[164px] cursor-pointer
        gap-2 rounded-lg bg-[#1F1F1F] px-4 py-[15px]
        shadow-[0px_8px_10px_1px_rgba(0,_0,_0,_0.12)]"
      >
        <TrashIcon />
        Delete chat
      </div>
    </div>
  );
}
