import { useParams } from "next/navigation";
import RenderMessages from "./renderMessages";
import { useClickOutside } from "@/util/useClickOutside";
import { DictionaryReturnTypes } from "../../../dictionaries";
import ModalContainer, {
  ModalContentType,
} from "@/components/chat/ModalContainer/ModalContainer";
import { Message } from "./page";

type RouteParams = {
  lang: string;
  chatId: string;
};

export default function MessagesField({
  openModal,
  modalContent,
  hideModal,
  receiveMessages,
  currentChatUserUUID,
  dict
}: {
  openModal: (content: ModalContentType) => void;
  modalContent: ModalContentType;
  hideModal: () => void;
  receiveMessages: Message[];
  currentChatUserUUID: string;
  dict: Awaited<DictionaryReturnTypes["/en/chat"]>;
}) {
  const elemRef = useClickOutside<HTMLDivElement>(hideModal);
  const params = useParams<RouteParams>();

  return (
    <div
      className={`h-full ${
        modalContent ? "overflow-hidden" : "overflow-y-scroll"
      } px-6`}
    >
        <ModalContainer
        openModal={openModal}
        childrenElem={modalContent}
        elemRef={elemRef}
        chatRoomUuid={params.chatId}
        lang={params.lang}
      />
      {!receiveMessages.length && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <p className="text-center text-sm font-normal text-white text-opacity-50">
            {dict.messages.noMessages}
          </p>
        </div>
      )}
      <RenderMessages messages={receiveMessages} currentChatUserUUID={currentChatUserUUID} />
    </div>
  );
}
