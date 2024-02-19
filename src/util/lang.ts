declare global {
    type Lang = "en" | "uk";
}

export async function langUnwrapOrDefault(lang: string) {
  if (lang === "en" || lang === "uk") {
    return lang;
  }
  return "en";
}
