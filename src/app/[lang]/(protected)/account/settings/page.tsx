import { getDictionary } from "@/app/[lang]/dictionaries";
import { AccountSettings } from "./AccountSettings";

export default async function Settings({ params }: { params: { lang: Lang } }) {
  const dict = await getDictionary(`/${params.lang}/account/settings`);

  return <AccountSettings dict={dict} lang={params.lang} />;
}
