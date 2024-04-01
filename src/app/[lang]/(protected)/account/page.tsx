import { ChatListHeader } from "@/components/chat/ChatListHeader";
import { getDictionary } from "../../dictionaries";
import { MenuItems } from "./MenuItems";

export default async function Account({ params }: { params: { lang: Lang } }) {
  const dict = await getDictionary(`/${params.lang}/account`);

  return (
    <div className="flex w-full grow flex-col">
      <ChatListHeader lang={params.lang} />
      <MenuItems lang={params.lang} dict={dict} />
    </div>
  );
}
