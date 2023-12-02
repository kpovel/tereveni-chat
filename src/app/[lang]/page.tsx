import { getDictionary } from "./dictionaries";

export default async function Home({
  params,
}: {
  params: { lang: "uk" | "en" };
}) {
  const dict = await getDictionary(`/${params.lang}`);

  return <h1>{dict.title}</h1>;
}
