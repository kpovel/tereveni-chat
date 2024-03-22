import { ChatListHeader } from "@/components/chat/ChatListHeader";
import UserProfile from "public/account/user-profile-02.svg";
import AccountSettings from "public/account/settings.svg";
import File from "public/account/file-05.svg";
import { MenuItem } from "./MenuItem";
import { getDictionary } from "../../dictionaries";

export default async function Account({ params }: { params: { lang: Lang } }) {
  const dict = await getDictionary(`/${params.lang}/account`);
  return (
    <>
      <ChatListHeader lang={params.lang} />
      <main className="px-6 py-10">
        <div className="flex flex-col gap-3">
          <MenuItem
            href={`/${params.lang}/account/profile`}
            img={{ src: UserProfile, alt: dict.myProfile }}
          >
            {dict.myProfile}
          </MenuItem>
          <MenuItem
            href={`/${params.lang}/account/account-settings`}
            img={{ src: AccountSettings, alt: dict.accountSettings }}
          >
            {dict.accountSettings}
          </MenuItem>
          <MenuItem
            href={`/${params.lang}/terms-and-conditions`}
            img={{ src: File, alt: dict.termsConditions }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {dict.termsConditions}
          </MenuItem>
          <MenuItem
            href={`/${params.lang}/privacy-policy`}
            img={{ src: File, alt: dict.privacyPolicy }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {dict.privacyPolicy}
          </MenuItem>
          <MenuItem
            href={`/${params.lang}/cookies-policy`}
            img={{ src: File, alt: dict.cookiesPolicy }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {dict.cookiesPolicy}
          </MenuItem>
          <MenuItem
            href={`/${params.lang}/community-rules`}
            img={{ src: File, alt: dict.communityRules }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {dict.communityRules}
          </MenuItem>
        </div>
      </main>
    </>
  );
}
