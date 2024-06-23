"use client"

import { useState } from "react"
import InviteMember from "./inviteMember";
import MembersSearch from "../members/membersSearch";
import InviteHeader from "./inviteHeader"
import DefaultAvatar from "/public/Avatar.svg"

export default function InviteMembersWrapper({chatId}:{chatId: string}) {

    const [ members, setMembers ] = useState([
        {
            id: '2376478236424',
            name: 'Ihor Kasdasd',
            avatar: DefaultAvatar,
            checked: false
        },
        {
            id: '2342343245325',
            name: 'Afsdfsdf Rqweqwe',
            avatar: DefaultAvatar,
            checked: false
        },
        {
            id: '9832764834287',
            name: 'Hdsfsdf Wsdffsdfsd',
            avatar: DefaultAvatar,
            checked: true
        },
        {
            id: '235641627387',
            name: 'Dasfewwe Rwqewqeqw',
            avatar: DefaultAvatar,
            checked: false
        },
        {
            id: '123512789847987',
            name: 'Dsfsdfs sdfsdfsdf',
            avatar: DefaultAvatar,
            checked: true
        },
    ])

    const [searchQuery, setSearchQuery] = useState("");

    function searchMember(query: any) {
        setSearchQuery(query);
    }

    const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    function handleCheck(id: string) {
        setMembers((prevMembers) =>
            prevMembers.map((member) =>
                member.id === id ? { ...member, checked: !member.checked } : member
            )
        );
    }

    return (
        <div className="w-full max-w-[1440px] pt-10">
            <InviteHeader chatId={chatId}/>
            <MembersSearch searchMember={searchMember} searchQuery={searchQuery}/>
            <div className="mx-auto w-full max-w-[70%] pt-11">
                <form action="">
                    {filteredMembers.map((member) => (
                    <InviteMember key={member.id} memberInfo={member} handleCheck={() => handleCheck(member.id)} />
                ))}
                    <button className="mt-7 w-full h-12 bg-violet-700 rounded-full flex-col justify-center items-center inline-flex">Send invitation link</button>
                </form>
            </div>
        </div>
    )
}