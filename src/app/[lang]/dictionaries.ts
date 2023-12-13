import "server-only";

const dictionaries = {
  "/en": () => import("./en.json").then((module) => module.default),
  "/uk": () => import("./uk.json").then((module) => module.default),
  "/en/login": () => import("./login/en.json").then((module) => module.default),
  "/uk/login": () => import("./login/uk.json").then((module) => module.default),
  "/en/onboarding/categories": () =>
    import("./onboarding/categories/en.json").then((module) => module.default),
  "/uk/onboarding/categories": () =>
    import("./onboarding/categories/uk.json").then((module) => module.default),
};

type DictionaryReturnTypes = {
  [K in keyof typeof dictionaries]: ReturnType<(typeof dictionaries)[K]>;
};

export async function getDictionary<T extends keyof typeof dictionaries>(
  page: T,
): Promise<DictionaryReturnTypes[T]> {
  return dictionaries[page]() as Promise<DictionaryReturnTypes[T]>;
}
