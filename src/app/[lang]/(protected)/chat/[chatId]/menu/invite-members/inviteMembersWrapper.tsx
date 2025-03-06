"use client";

import { useState } from "react";
import InviteMember from "./inviteMember";
import InviteMembersSearch from "./inviteMembersSearch";
import InviteHeader from "./inviteHeader";
import DefaultAvatar from "/public/Avatar.svg";
import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";

export default function InviteMembersWrapper({
  dict,
  chatId,
}: {
  dict: Awaited<DictionaryReturnTypes["/en/chat/menu/invite-members"]>;
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
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  function searchMember(query: any) {
    setSearchQuery(query);
  }

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  function handleCheck(id: string) {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id ? { ...member, checked: !member.checked } : member,
      ),
    );
  }

  return (
    <div className="w-full max-w-[1440px] pt-10">
      <InviteHeader dict={dict} chatId={chatId} />
      <InviteMembersSearch
        dict={dict}
        searchMember={searchMember}
        searchQuery={searchQuery}
      />
      <div className="mx-auto w-full max-w-[70%] pt-11">
        <form action="">
          {filteredMembers.map((member) => (
            <InviteMember
              key={member.id}
              memberInfo={member}
              handleCheck={() => handleCheck(member.id)}
            />
          ))}
          <button className="mt-7 inline-flex h-12 w-full flex-col items-center justify-center rounded-full bg-violet-700">
            {dict.buttons.sendLink}
          </button>
        </form>
      </div>
    </div>
  );
}
