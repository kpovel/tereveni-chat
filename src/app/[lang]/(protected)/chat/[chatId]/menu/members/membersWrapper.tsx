"use client"

import { useState, useEffect } from "react";
import MembersHeader from "./membersHeader"
import MembersSearch from "./membersSearch";
import Member from "./member";
import DefaultAvatar from "/public/Avatar.svg"

export default function MembersWrapper({chatId}:{chatId:string}) {

    const [modalContent, setModalContent] = useState(null);
    const [disableScroll, setDisableScroll] = useState(false);

    const [selectedMember, setSelectedMember] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [ members, setMembers ] = useState([
        {
            id: '2376478236424',
            name: 'Ihor Kasdasd',
            avatar: DefaultAvatar,
            checked: false,
        },
        {
            id: '2342343245325',
            name: 'Afsdfsdf Rqweqwe',
            avatar: DefaultAvatar,
            checked: false,
        },
        {
            id: '9832764834287',
            name: 'Hdsfsdf Wsdffsdfsd',
            avatar: DefaultAvatar,
            checked: true,
        },
        {
            id: '235641627387',
            name: 'Dasfewwe Rwqewqeqw',
            avatar: DefaultAvatar,
            checked: false,
        },
        {
            id: '123512789847987',
            name: 'Dsfsdfs sdfsdfsdf',
            avatar: DefaultAvatar,
            checked: true,
            blocked: true
        },
    ])

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

    const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-full max-w-[1440px] pt-10">
            <MembersHeader chatId={chatId}/>
            <MembersSearch searchMember={searchMember} searchQuery={searchQuery}/>
            <div className="mx-auto w-full max-w-[70%] pt-11">
            {filteredMembers.map((member) => (
                    <Member 
                        key={member.id} 
                        memberInfo={member} 
                        selectedMember={selectedMember}
                        setSelectedMember={setSelectedMember}
                        setModalContent={setModalContent}
                        setDisableScroll={setDisableScroll}
                        modalContent={modalContent}
                    />
                ))}
            </div>
        </div>
    )
}