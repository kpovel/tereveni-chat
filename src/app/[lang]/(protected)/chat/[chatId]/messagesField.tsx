import { useState } from "react";
import { useParams } from 'next/navigation';
import RenderMessages from "./renderMessages";
import { useClickOutside } from "@/util/useClickOutside";
import ModalContainer, {
  ModalContentType,
} from "@/components/chat/ModalContainer/ModalContainer";

type RouteParams = {
  lang: string
  chatId: string;
}

export default function MessagesField({
  openModal,
  modalContent,
  hideModal
}: {
  openModal: (content: ModalContentType) => void;
  modalContent: ModalContentType;
  hideModal: () => void;
}) {
  const [messages, setMessages] = useState([
    {
      uuid: "fsdf4ds65f4d5f6sd454f6s",
      content: "dsfbdf sd f s fsdfdsfs fsdfsdfewfsfdfsd f",
      user: {
        uiid: "fsdf4ds65f4s6d5f6sd454f6s",
        name: "Steve",
        image: {
          name: "string",
        },
        dateOfCreated: "2024-02-23T14:51:11.1892951",
      },
      dateOfCreated: "2024-02-23T14:51:11.1892951",
    },
    {
      uuid: "fsdf4ds65f4s6d5f6sd454f6s",
      content: "dsfbds s fsdfdsfs fsdfsdfewfsfdfsd f",
      user: {
        uiid: "fsdf4ds65f4s6d5f6sd454f6s",
        name: "Steve",
        image: {
          name: "string",
        },
        dateOfCreated: "2024-02-23T14:51:11.1892951",
      },
      dateOfCreated: "2024-02-23T14:51:11.1892951",
    },
    {
      uuid: "fsdf4ds65f4d5f6sd454f6s",
      content: "dsfbd sd f s fsdfdsfs fsdfsdfewfsfdfsd f",
      user: {
        uiid: "fsdf4ds65f4s6d5f6sd454f6s",
        name: "Steve",
        image: {
          name: "string",
        },
        dateOfCreated: "2024-02-23T14:51:11.1892951",
      },
      dateOfCreated: "2024-02-23T14:51:11.1892951",
    },
    {
      uuid: "fsdf4ds65f4s6d5f6sd454f6s",
      content: "dsfbdsbfs s fsdfdsfs fsdfsdfewfsfdfsd f",
      user: {
        uiid: "fsdf4ds65f4s6d5f6sd454f6s",
        name: "Steve",
        image: {
          name: "string",
        },
        dateOfCreated: "2024-02-23T14:51:11.1892951",
      },
      dateOfCreated: "2024-02-23T14:51:11.1892951",
    },
    {
      uuid: "fsdf4ds65s6d5f6sd454f6s",
      content: "dsfbdsbfsdf sfsfdfsd f",
      user: {
        uiid: "fsdf4ds65f4s6d5f6sd454f6s",
        name: "Steve",
        image: {
          name: "string",
        },
        dateOfCreated: "2024-02-23T14:51:11.1892951",
      },
      dateOfCreated: "2024-02-23T14:51:11.1892951",
    },
    {
      uuid: "fsdf4ds65f4s6d5f6sd454f6s",
      content: "dsfbdsbfsdf sdf sd f s fsdfsdfdsfsdfdsfs fsdfsdfewfsfdfsd f",
      user: {
        uiid: "fsdf4ds65f4s6d5f6sd454f6s",
        name: "Steve",
        image: {
          name: "string",
        },
        dateOfCreated: "2024-02-23T14:51:11.1892951",
      },
      dateOfCreated: "2024-02-23T14:51:11.1892951",
    },
    {
      uuid: "fsdf4ds65f4d5f6sd454f6s",
      content: "dsfbdf sd f s fsdfdsfs fsdfsdfewfsfdfsd f",
      user: {
        uiid: "fsdf4ds65f4s6d5f6sd454f6s",
        name: "Steve",
        image: {
          name: "string",
        },
        dateOfCreated: "2024-02-23T14:51:11.1892951",
      },
      dateOfCreated: "2024-02-23T14:51:11.1892951",
    },
    {
      uuid: "fsdf4ds65f4s6d5f6sd454f6s",
      content: "dsfbds s fsdfdsfs fsdfsdfewfsfdfsd f",
      user: {
        uiid: "fsdf4ds65f4s6d5f6sd454f6s",
        name: "Steve",
        image: {
          name: "string",
        },
        dateOfCreated: "2024-02-23T14:51:11.1892951",
      },
      dateOfCreated: "2024-02-23T14:51:11.1892951",
    },
    {
      uuid: "fsdf4ds65f4d5f6sd454f6s",
      content: "dsfbd sd f s fsdfdsfs fsdfsdfewfsfdfsd f",
      user: {
        uiid: "fsdf4ds65f4s6d5f6sd454f6s",
        name: "Steve",
        image: {
          name: "string",
        },
        dateOfCreated: "2024-02-23T14:51:11.1892951",
      },
      dateOfCreated: "2024-02-23T14:51:11.1892951",
    },
    {
      uuid: "fsdf4ds65f4s6d5f6sd454f6s",
      content: "dsfbdsbfs s fsdfdsfs fsdfsdfewfsfdfsd f",
      user: {
        uiid: "fsdf4ds65f4s6d5f6sd454f6s",
        name: "Steve",
        image: {
          name: "string",
        },
        dateOfCreated: "2024-02-23T14:51:11.1892951",
      },
      dateOfCreated: "2024-02-23T14:51:11.1892951",
    },
    {
      uuid: "fsdf4ds65s6d5f6sd454f6s",
      content: "dsfbdsbfsdf sfsfdfsd f",
      user: {
        uiid: "fsdf4ds65f4s6d5f6sd454f6s",
        name: "Steve",
        image: {
          name: "string",
        },
        dateOfCreated: "2024-02-23T14:51:11.1892951",
      },
      dateOfCreated: "2024-02-23T14:51:11.1892951",
    },
    {
      uuid: "fsdf4ds65f4s6d5f6sd454f6s",
      content: "dsfbdsbfsdf sdf sd f s fsdfsdfdsfsdfdsfs fsdfsdfewfsfdfsd f",
      user: {
        uiid: "fsdf4ds65f4s6d5f6sd454f6s",
        name: "Steve",
        image: {
          name: "string",
        },
        dateOfCreated: "2024-02-23T14:51:11.1892951",
      },
      dateOfCreated: "2024-02-23T14:51:11.1892951",
    },
    {
      uuid: "fsdf4ds65f4s65f6sd454f6s",
      content: "dsfbdsbffdsfs fsdfsdfewfsfdfsd f",
      user: {
        uiid: "fsdf4ds65f4s6d5f6sd454f6s",
        name: "Steve",
        image: {
          name: "string",
        },
        dateOfCreated: "2024-02-23T14:51:11.1892951",
      },
      dateOfCreated: "2024-02-23T14:51:11.1892951",
    },
    {
      uuid: "fsdf4ds65f4s6d5f6sd454f6s",
      content: "dsfbdsbfsdf sdf sd f s fsdfdsfswfsfdfsd f",
      user: {
        uiid: "fsdf4ds65f4s6d5f6sd454f6s",
        name: "Steve",
        image: {
          name: "string",
        },
        dateOfCreated: "2024-02-23T14:51:11.1892951",
      },
      dateOfCreated: "2024-02-23T14:51:11.1892951",
    },
    {
      uuid: "fsdf4ds65f4s6d5f6sd454f6s",
      content: "dsfbdsdsfswfsfdfsd f",
      user: {
        uiid: "fsdf4ds65f4s6d5f6sd454f6s",
        name: "Steve",
        image: {
          name: "string",
        },
        dateOfCreated: "2024-02-23T14:51:11.1892951",
      },
      dateOfCreated: "2024-02-23T14:51:11.1892951",
    },
    {
      uuid: "fsdf4ds65f4s6d5f6sd454f6s",
      content:
        "dsfbdsbfsdf sdsdfsdfsdfsdfsdfdsf sd fsdfsdfsdfsdf fdsfsf ssdfsdfsdfsdfsdd sdfsdfsdfsdsdf s fsdfdsfswfsfdfsd f",
      user: {
        uiid: "fsdf4ds65f4s6d5f6sd454f6s",
        name: "Steve",
        image: {
          name: "string",
        },
        dateOfCreated: "2024-02-23T14:51:11.1892951",
      },
      dateOfCreated: "2024-02-23T14:51:11.1892951",
    },
    {
      uuid: "fsdf4ds65f4s65f6sd454f6s",
      content: "dsfbdsbffdsfs fsdfsdfewfsfdfsd f",
      user: {
        uiid: "fsdf4ds65f4s6d5f6sd454f6s",
        name: "Steve",
        image: {
          name: "string",
        },
        dateOfCreated: "2024-02-23T14:51:11.1892951",
      },
      dateOfCreated: "2024-02-23T14:51:11.1892951",
    },
    {
      uuid: "fsdf4ds65f4s6d5f6sd454f6s",
      content: "dsfbdsbfsdf sdf sd f s fsdfdsfswfsfdfsd f",
      user: {
        uiid: "fsdf4ds65f4s6d5f6sd454f6s",
        name: "Steve",
        image: {
          name: "string",
        },
        dateOfCreated: "2024-02-23T14:51:11.1892951",
      },
      dateOfCreated: "2024-02-23T14:51:11.1892951",
    },
    {
      uuid: "fsdf4ds65f4s6d5f6sd454f6s",
      content: "dsfbdsdsfswfsfdfsd f",
      user: {
        uiid: "fsdf4ds65f4s6d5f6sd454f6s",
        name: "Steve",
        image: {
          name: "string",
        },
        dateOfCreated: "2024-02-23T14:51:11.1892951",
      },
      dateOfCreated: "2024-02-23T14:51:11.1892951",
    },
    {
      uuid: "fsdf4ds65f4s6d5f6sd454f6s",
      content:
        "dsfbdsbfsdf sdsdfsdfsdfsdfsdfdsf sd fsdfsdfsdfsdf fdsfsf ssdfsdfsdfsdfsdd sdfsdfsdfsdsdf s fsdfdsfswfsfdfsd f",
      user: {
        uiid: "fsdf4ds65f4s6d5f6sd454f6s",
        name: "Steve",
        image: {
          name: "string",
        },
        dateOfCreated: "2024-02-23T14:51:11.1892951",
      },
      dateOfCreated: "2024-02-23T14:51:11.1892951",
    },
  ]);
  const elemRef = useClickOutside<HTMLDivElement>(hideModal);
  const params = useParams<RouteParams>();

  return (
    <div
      className={`relative h-full ${
        modalContent ? "overflow-hidden" : "overflow-scroll"
      } px-6`}
    >
        <ModalContainer
        openModal={openModal}
        childrenElem={modalContent}
        elemRef={elemRef}
        chatRoomUuid={params.chatId}
        lang={params.lang}
      />
      {!messages.length && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <p className="text-center text-sm font-normal text-white text-opacity-50">
            No messages here yet
          </p>
        </div>
      )}
      <RenderMessages messages={messages} />
    </div>
  );
}
