"use client";

import UserProfile from "public/account/user-profile-02.svg";
import AccountSettings from "public/account/settings.svg";
import File from "public/account/file-05.svg";
import LogOut from "public/account/Group 810.svg";
import { MenuItem } from "./MenuItem";
import { LogOutMenuItem } from "./LogOutMenuItem";
import { DictionaryReturnTypes } from "../../dictionaries";
import { useState } from "react";
import { ConfirmLogout } from "./ConfirmLogoutDialog";

export function MenuItems({
  dict,
  lang,
}: {
  dict: Awaited<DictionaryReturnTypes["/en/account"]>;
  lang: Lang;
}) {
  const [openConfirmLogout, setOpenConfirmLogout] = useState(false);

  return (
    <>
      <main className="relative grow px-6 py-10">
        <div
          className={
            "flex flex-col gap-3 " + (openConfirmLogout && "blur-[3px]")
          }
        >
          <MenuItem
            href={`/${lang}/account/profile`}
            img={{ src: UserProfile, alt: dict.myProfile }}
          >
            {dict.myProfile}
          </MenuItem>
          <MenuItem
            href={`/${lang}/account/account-settings`}
            img={{ src: AccountSettings, alt: dict.accountSettings }}
          >
            {dict.accountSettings}
          </MenuItem>
          <MenuItem
            href={`/${lang}/terms-and-conditions`}
            img={{ src: File, alt: dict.termsConditions }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {dict.termsConditions}
          </MenuItem>
          <MenuItem
            href={`/${lang}/privacy-policy`}
            img={{ src: File, alt: dict.privacyPolicy }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {dict.privacyPolicy}
          </MenuItem>
          <MenuItem
            href={`/${lang}/cookies-policy`}
            img={{ src: File, alt: dict.cookiesPolicy }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {dict.cookiesPolicy}
          </MenuItem>
          <MenuItem
            href={`/${lang}/community-rules`}
            img={{ src: File, alt: dict.communityRules }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {dict.communityRules}
          </MenuItem>
          <LogOutMenuItem
            img={{ src: LogOut, alt: dict.logOut }}
            setOpenConfirmLogout={setOpenConfirmLogout}
          >
            {dict.logOut}
          </LogOutMenuItem>
        </div>
        {openConfirmLogout && (
          <ConfirmLogout
            dict={dict}
            setOpenConfirmLogout={setOpenConfirmLogout}
            lang={lang}
          />
        )}
      </main>
    </>
  );
}
