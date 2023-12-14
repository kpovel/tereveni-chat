import "server-only";

const dictionaries = {
  "/en": () => import("./en.json").then((module) => module.default),
  "/uk": () => import("./uk.json").then((module) => module.default),
  "/en/login": () => import("./login/en.json").then((module) => module.default),
  "/uk/login": () => import("./login/uk.json").then((module) => module.default),
  "/en/signup": () =>
    import("./signup/en.json").then((module) => module.default),
  "/uk/signup": () =>
    import("./signup/uk.json").then((module) => module.default),
  "/en/validate-email": () =>
    import("./validate-email/en.json").then((module) => module.default),
  "/uk/validate-email": () =>
    import("./validate-email/uk.json").then((module) => module.default),
  "/en/onboarding/categories": () =>
    import("./onboarding/categories/en.json").then((module) => module.default),
  "/uk/onboarding/categories": () =>
    import("./onboarding/categories/uk.json").then((module) => module.default),
  "/en/onboarding/final": () =>
    import("./onboarding/final/en.json").then((module) => module.default),
  "/uk/onboarding/final": () =>
    import("./onboarding/final/uk.json").then((module) => module.default),
  "/en/onboarding/introduce-yourself": () =>
    import("./onboarding/introduce-yourself/en.json").then(
      (module) => module.default,
    ),
  "/uk/onboarding/introduce-yourself": () =>
    import("./onboarding/introduce-yourself/uk.json").then(
      (module) => module.default,
    ),
  "/en/onboarding/pick-avatar": () =>
    import("./onboarding/pick-avatar/en.json").then((module) => module.default),
  "/uk/onboarding/pick-avatar": () =>
    import("./onboarding/pick-avatar/uk.json").then((module) => module.default),
};

export type DictionaryReturnTypes = {
  [K in keyof typeof dictionaries]: ReturnType<(typeof dictionaries)[K]>;
};

export async function getDictionary<T extends keyof typeof dictionaries>(
  page: T,
): Promise<DictionaryReturnTypes[T]> {
  return dictionaries[page]() as Promise<DictionaryReturnTypes[T]>;
}
