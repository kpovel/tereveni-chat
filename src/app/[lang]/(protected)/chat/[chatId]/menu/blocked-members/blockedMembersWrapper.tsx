"use client";

import { useState, useEffect } from "react";
import MembersSearch from "../members/membersSearch";
import BlockedMembersHeader from "./blockedMembersHeader";
import BlockedMembersSearch from "./blockedMembersSearch";
import BlockedMember from "./blockedMember";
import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import DefaultAvatar from "/public/Avatar.svg";

export default function BlockedMembersWrapper({
  dict,
  chatId,
}: {
  dict: Awaited<DictionaryReturnTypes["/en/chat/menu/blocked-members"]>;
  chatId: string;
}) {
  const [members, setMembers] = useState([
    {
      id: "2376478236424",
      name: "Ihor Kasdasd",
      avatar: DefaultAvatar,
      checked: false,
    },
    {
      id: "2342343245325",
      name: "Afsdfsdf Rqweqwe",
      avatar: DefaultAvatar,
      checked: false,
    },
    {
      id: "9832764834287",
      name: "Hdsfsdf Wsdffsdfsd",
      avatar: DefaultAvatar,
      checked: true,
    },
    {
      id: "235641627387",
      name: "Dasfewwe Rwqewqeqw",
      avatar: DefaultAvatar,
      checked: false,
    },
    {
      id: "123512789847987",
      name: "Dsfsdfs sdfsdfsdf",
      avatar: DefaultAvatar,
      checked: true,
      blocked: true,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState(null);
  const [disableScroll, setDisableScroll] = useState(false);

  useEffect(() => {
    if (modalContent) {
      setDisableScroll(true);
    } else {
      setDisableScroll(false);
    }
  }, [modalContent]);

  useEffect(() => {
    if (disableScroll) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [disableScroll]);

  function searchMember(query: any) {
    setSearchQuery(query);
  }

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full max-w-[1440px] pt-10">
      <BlockedMembersHeader dict={dict} chatId={chatId} />
      <BlockedMembersSearch
        dict={dict}
        searchMember={searchMember}
        searchQuery={searchQuery}
      />
      <div className="mx-auto w-full max-w-[70%] pt-11">
        {filteredMembers.map((member) => (
          <BlockedMember
            key={member.id}
            dict={dict}
            memberInfo={member}
            selectedMember={selectedMember}
            setSelectedMember={setSelectedMember}
            setDisableScroll={setDisableScroll}
          />
        ))}
      </div>
    </div>
  );
}
