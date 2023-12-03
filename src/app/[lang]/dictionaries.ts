import "server-only";

const dictionaries = {
  "/en": () => import("./en.json").then((module) => module.default),
  "/uk": () => import("./uk.json").then((module) => module.default),
};

export async function getDictionary(page: keyof typeof dictionaries) {
  return dictionaries[page]();
}
