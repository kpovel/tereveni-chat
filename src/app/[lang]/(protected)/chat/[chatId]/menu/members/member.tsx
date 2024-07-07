"use client";
import { useEffect, ReactNode } from "react";
import { MemberContext } from "./memberContext";
import Image from "next/image";
import { useClickOutside } from "@/util/useClickOutside";
import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import { memberInterface } from "./membersWrapper";

export default function Member({
  dict,
  memberInfo,
  selectedMember,
  setSelectedMember,
  setDisableScroll,
  setModalContent,
}: {
  dict: Awaited<DictionaryReturnTypes["/en/chat/menu/members"]>;
  memberInfo: memberInterface;
  selectedMember: string | null;
  setSelectedMember: (memberId: string | null) => void;
  setDisableScroll: (val: boolean) => void;
  setModalContent: (val: string | null) => void;
}) {
  const { name, avatar } = memberInfo;

  const chatContextMenuRef =
    useClickOutside<HTMLDivElement>(hideChatContextMenu);

  const openContext = selectedMember === memberInfo.id;

  useEffect(() => {
    if (selectedMember === null) {
      chatContextMenuRef.current?.classList.remove("blur-sm");
      return;
    }

    if (openContext) {
      chatContextMenuRef.current?.classList.remove("blur-sm");
      return;
    }

    chatContextMenuRef.current?.classList.add("blur-sm");
  }, [openContext, selectedMember]);

  function hideChatContextMenu() {
    if (openContext) {
      setSelectedMember(null);
      chatContextMenuRef.current?.classList.remove("blur-sm");
      setDisableScroll(false);
    }
  }

  function openModal(content: string) {
    setModalContent(content);
    setSelectedMember(null);
  }

  function handleContextMenu(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setSelectedMember(memberInfo.id);
    setDisableScroll(true);
  }

  return (
    <RemoveMemberOnBlur selectedChat={selectedMember}>
      <div
        ref={chatContextMenuRef}
        className="relative mb-3 flex w-full items-center justify-between gap-3 rounded-[32px] border border-violet-950 px-3 py-2"
      >
        <div className="flex items-center">
          <div>
            <Image src={avatar} alt="memberAvatar" />
          </div>
          <p className="ml-3 text-[14px] text-white">{name}</p>
        </div>
        <div className="relative">
          <button
            onClick={handleContextMenu}
            className="h-8 w-8 bg-transparent outline-none"
          >
            <span className="m-auto mb-[3px] block h-[4px] w-[4px] rounded-full bg-white"></span>
            <span className="m-auto mb-[3px] block h-[4px] w-[4px] rounded-full bg-white"></span>
            <span className="m-auto mb-[3px] block h-[4px] w-[4px] rounded-full bg-white"></span>
          </button>
          <MemberContext
            dict={dict}
            openContext={openContext}
            openModal={openModal}
          />
        </div>
      </div>
    </RemoveMemberOnBlur>
  );
}

function RemoveMemberOnBlur({
  children,
  selectedChat,
}: {
  children: ReactNode;
  selectedChat: string | null;
}) {
  if (selectedChat === null) {
    return <div className="flex gap-3 rounded-2xl ">{children}</div>;
  }

  return <div className="flex select-none gap-3 rounded-2xl ">{children}</div>;
}
