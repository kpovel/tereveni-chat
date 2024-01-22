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
  "/en/terms-conditions": () =>
    import("./terms-conditions/en.json").then((module) => module.default),
  "/uk/terms-conditions": () =>
    import("./terms-conditions/uk.json").then((module) => module.default),

  "/en/signup": () =>
    import("./signup/en.json").then((module) => module.default),
  "/uk/signup": () =>
    import("./signup/uk.json").then((module) => module.default),
  "/en/validate-email": () =>
    import("./send-mail/en.json").then((module) => module.default),
  "/en/send-mail-restore-pass": () =>
    import("./send-mail-restore-pass/en.json").then((module) => module.default),
  "/uk/send-mail-restore-pass": () =>
    import("./send-mail-restore-pass/uk.json").then((module) => module.default),
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
};

export type DictionaryReturnTypes = {
  [K in keyof typeof dictionaries]: ReturnType<(typeof dictionaries)[K]>;
};

export async function getDictionary<T extends keyof typeof dictionaries>(
  page: T,
): Promise<DictionaryReturnTypes[T]> {
  return dictionaries[page]() as Promise<DictionaryReturnTypes[T]>;
}
