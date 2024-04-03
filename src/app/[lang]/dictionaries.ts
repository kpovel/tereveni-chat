import "server-only";

const dictionaries = {
  "/en": () => import("./en.json").then((module) => module.default),
  "/uk": () => import("./uk.json").then((module) => module.default),
  "/en/login": () => import("./login/en.json").then((module) => module.default),
  "/uk/login": () => import("./login/uk.json").then((module) => module.default),
  "/en/forgot-password": () =>
    import("./forgot-password/en.json").then((module) => module.default),
  "/uk/forgot-password": () =>
    import("./forgot-password/uk.json").then((module) => module.default),

  "/en/signup": () =>
    import("./signup/en.json").then((module) => module.default),
  "/uk/signup": () =>
    import("./signup/uk.json").then((module) => module.default),
  "/en/validate-email": () =>
    import("./send-mail/en.json").then((module) => module.default),
  "/en/restore-password-mail": () =>
    import("./restore-password-mail/en.json").then((module) => module.default),
  "/uk/restore-password-mail": () =>
    import("./restore-password-mail/uk.json").then((module) => module.default),
  "/uk/validate-email": () =>
    import("./send-mail/uk.json").then((module) => module.default),

  "/en/onboarding/categories": () =>
    import("./(protected)/onboarding/categories/en.json").then(
      (module) => module.default,
    ),
  "/uk/onboarding/categories": () =>
    import("./(protected)/onboarding/categories/uk.json").then(
      (module) => module.default,
    ),
  "/en/onboarding/final": () =>
    import("./(protected)/onboarding/final/en.json").then(
      (module) => module.default,
    ),
  "/uk/onboarding/final": () =>
    import("./(protected)/onboarding/final/uk.json").then(
      (module) => module.default,
    ),
  "/en/onboarding/introduce-yourself": () =>
    import("./(protected)/onboarding/introduce-yourself/en.json").then(
      (module) => module.default,
    ),
  "/uk/onboarding/introduce-yourself": () =>
    import("./(protected)/onboarding/introduce-yourself/uk.json").then(
      (module) => module.default,
    ),
  "/en/onboarding/pick-avatar": () =>
    import("./(protected)/onboarding/pick-avatar/en.json").then(
      (module) => module.default,
    ),
  "/uk/onboarding/pick-avatar": () =>
    import("./(protected)/onboarding/pick-avatar/uk.json").then(
      (module) => module.default,
    ),
  "/en/create-new-password": () =>
    import("./(protected)/create-new-password/en.json").then(
      (module) => module.default,
    ),
  "/uk/create-new-password": () =>
    import("./(protected)/create-new-password/uk.json").then(
      (module) => module.default,
    ),
  "/en/chat/create": () =>
    import("./(protected)/chat/(create)/create/en.json").then(
      (module) => module.default,
    ),
  "/uk/chat/create": () =>
    import("./(protected)/chat/(create)/create/uk.json").then(
      (module) => module.default,
    ),
  "/en/chat/create/hashtag": () =>
    import(
      "./(protected)/chat/(create)/create/[chat_uuid]/hashtag/en.json"
    ).then((module) => module.default),
  "/uk/chat/create/hashtag": () =>
    import(
      "./(protected)/chat/(create)/create/[chat_uuid]/hashtag/uk.json"
    ).then((module) => module.default),
  "/en/chat/create/description": () =>
    import(
      "./(protected)/chat/(create)/create/[chat_uuid]/description/en.json"
    ).then((module) => module.default),
  "/uk/chat/create/description": () =>
    import(
      "./(protected)/chat/(create)/create/[chat_uuid]/description/uk.json"
    ).then((module) => module.default),
  "/en/account": () =>
    import("./(protected)/account/en.json").then((module) => module.default),
  "/uk/account": () =>
    import("./(protected)/account/uk.json").then((module) => module.default),
  "/en/account/settings": () =>
    import("./(protected)/account/settings/en.json").then(
      (module) => module.default,
    ),
  "/uk/account/settings": () =>
    import("./(protected)/account/settings/uk.json").then(
      (module) => module.default,
    ),
  "/en/account/settings/change-password": () =>
    import("./(protected)/account/settings/change-password/en.json").then(
      (module) => module.default,
    ),
  "/uk/account/settings/change-password": () =>
    import("./(protected)/account/settings/change-password/uk.json").then(
      (module) => module.default,
    ),
  "/en/account/settings/language": () =>
    import("./(protected)/account/settings/language/en.json").then(
      (module) => module.default,
    ),
  "/uk/account/settings/language": () =>
    import("./(protected)/account/settings/language/uk.json").then(
      (module) => module.default,
    ),
  "components/en/CookiePopup": () =>
    import("../../components/CookiePopup/en.json").then(
      (module) => module.default,
    ),
  "components/uk/CookiePopup": () =>
    import("../../components/CookiePopup/uk.json").then(
      (module) => module.default,
    ),
  "components/en/ChatListHeader": () =>
    import("../../components/chat/ChatListHeader/en.json").then(
      (module) => module.default,
    ),
  "components/uk/ChatListHeader": () =>
    import("../../components/chat/ChatListHeader/uk.json").then(
      (module) => module.default,
    ),
  "components/en/ChatNavigation": () =>
    import("../../components/chat/ChatNavigation/en.json").then(
      (module) => module.default,
    ),
  "components/uk/ChatNavigation": () =>
    import("../../components/chat/ChatNavigation/uk.json").then(
      (module) => module.default,
    ),
  "/components/en/EmptyChatListMessage": () =>
    import("../../components/chat/EmptyChatListMessage/en.json").then(
      (module) => module.default,
    ),
  "/components/uk/EmptyChatListMessage": () =>
    import("../../components/chat/EmptyChatListMessage/uk.json").then(
      (module) => module.default,
    ),
  "components/en/ProgressStep": () =>
    import("../../components/progress/en.json").then(
      (module) => module.default,
    ),
  "components/uk/ProgressStep": () =>
    import("../../components/progress/uk.json").then(
      (module) => module.default,
    ),
};

export type DictionaryReturnTypes = {
  [K in keyof typeof dictionaries]: ReturnType<(typeof dictionaries)[K]>;
};

export async function getDictionary<T extends keyof typeof dictionaries>(
  page: T,
): Promise<DictionaryReturnTypes[T]> {
  return dictionaries[page]() as Promise<DictionaryReturnTypes[T]>;
}
