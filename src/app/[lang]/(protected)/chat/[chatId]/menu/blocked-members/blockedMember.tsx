import { useEffect } from "react"
import Image from "next/image"
import DefaultAvatar from "/public/Avatar.svg"
import BlockedIcon from "/public/chat/block-icon.svg";
import { BlockedMemberContext } from "./blockedMemberContext";
import { useClickOutside } from "@/util/useClickOutside";
import ModalContainer from "../../../../../../../components/chat/ModalContainer/ModalContainer";

export default function BlockedMember({memberInfo, selectedMember, setSelectedMember, setDisableScroll, setModalContent, modalContent}: any){

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [openContext, selectedMember]);

      function hideChatContextMenu() {
        if (openContext) {
          setSelectedMember(null);
          chatContextMenuRef.current?.classList.remove("blur-sm");
          setDisableScroll(false);
        }
      }

      function openModal(content: any) {
        setModalContent(content);
        setSelectedMember(null);
      }
    
      function hideModal() {
        setModalContent(null);
        setDisableScroll(false);
      }
      function handleContextMenu(e: any) {
        e.preventDefault();
        setSelectedMember(memberInfo.id);
        setDisableScroll(true);
      }

    return (
        <RemoveMemberOnBlur>
            <div ref={chatContextMenuRef} className="flex w-full justify-between items-center px-3 py-2 rounded-[32px] border border-violet-950 gap-3 mb-3">
                <div className="flex items-center">
                    <div className="relative rounded-full">
                        <Image src={avatar ? avatar : DefaultAvatar} alt="memberAvatar"/>
                        <div className="absolute top-0 bg-black bg-opacity-20 w-full h-full rounded-full">
                            <Image src={BlockedIcon} alt="block" className="w-full"/>
                        </div>
                    </div>
                    <p className="text-[14px] text-white ml-3">{name}</p>
                </div>
                <div className="relative">
                    <button onClick={handleContextMenu} className="w-8 h-8 bg-transparent outline-none">
                        <span className="block w-[4px] h-[4px] rounded-full bg-white mb-[3px] m-auto"></span>
                        <span className="block w-[4px] h-[4px] rounded-full bg-white mb-[3px] m-auto"></span>
                        <span className="block w-[4px] h-[4px] rounded-full bg-white mb-[3px] m-auto"></span>
                    </button>
                    <BlockedMemberContext openContext={openContext} openModal={openModal}/>
                </div>
                <ModalContainer
                    openModal={openModal}
                    childrenElem={modalContent}
                    chatRoomUuid={memberInfo.id}
                    lang={"en"}
                />
            </div>
        </RemoveMemberOnBlur>
    )
}

function RemoveMemberOnBlur({
    children,
    selectedChat
  }: any
//   {
//     children: ReactNode;
//     selectedChat: string | null;
//     lang: Lang;
//     chatRoom: ChatRoom;
//   }
  ) {
    if (selectedChat === null) {
      return (
        <div
          className="flex gap-3 rounded-2xl bg-[rgba(255,_255,_255,_0.05)]
          shadow-[0px_8px_10px_1px_rgba(0,_0,_0,_0.12)]"
        >
          {children}
        </div>
      );
    }
  
    return (
      <div
        className="flex select-none gap-3 rounded-2xl bg-[rgba(255,_255,_255,_0.05)]shadow-[0px_8px_10px_1px_rgba(0,_0,_0,_0.12)]"
      >
        {children}
      </div>
    );
  }