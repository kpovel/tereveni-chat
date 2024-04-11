"use client";

import Image from "next/image";
import ChevronRight from "public/account/chevron-right.svg";
import { MenuItem } from "../MenuItem";
import Lock from "public/account/lock-02.svg";
import Lang from "public/lang.svg";
import Hashtag from "public/account/hash-02.svg";
import { DeleteAccount } from "./DeleteAccount";
import { DictionaryReturnTypes } from "@/app/[lang]/dictionaries";
import { useState } from "react";
import { DeleteAccountPopup } from "./DeleteAccountPopup";
import Link from "next/link";

export function AccountSettings({
  dict,
  lang,
}: {
  lang: Lang;
  dict: Awaited<DictionaryReturnTypes["/en/account/settings"]>;
}) {
  const [deleteAccountStage, setDeleteAccountStage] =
    useState<DeleteAccountStage>(null);

  return (
    <>
      <main
        className={
          "flex w-full flex-col gap-10 px-6 py-10 " +
          (deleteAccountStage && "blur-[3px]")
        }
      >
        <div className="flex flex-row justify-between">
          <Link href={`/${lang}/account`}>
            <Image
              src={ChevronRight}
              alt="Chevron left"
              className="rotate-180"
            />
          </Link>
          <h1 className="text-lg font-medium">{dict.title}</h1>
          <div></div>
        </div>
        <div className="flex flex-col gap-3">
          <MenuItem
            href={`/${lang}/account/settings/change-password`}
            img={{ src: Lock, alt: dict.menu.password }}
          >
            {dict.menu.password}
          </MenuItem>
          <MenuItem
            href={`/${lang}/account/settings/language`}
            img={{ src: Lang, alt: dict.menu.language }}
          >
            {dict.menu.language}
          </MenuItem>
          <MenuItem
            href={`/${lang}/account/settings/hashtags`}
            img={{ src: Hashtag, alt: dict.menu.hastags }}
          >
            {dict.menu.hastags}
          </MenuItem>
          <DeleteAccount
            dict={dict}
            setDeleteAccountStage={setDeleteAccountStage}
          />
        </div>
      </main>
      <DeleteAccountPopup
        setDeleteAccountStage={setDeleteAccountStage}
        deleteAccountStage={deleteAccountStage}
        dict={dict}
        lang={lang}
      />
    </>
  );
}

export type DeleteAccountStage = null | "ConfirmDeletion" | "AccountDeleted";
