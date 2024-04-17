import { getDictionary } from "@/app/[lang]/dictionaries";
import { AccountHeader } from "./AccountHeader";

export default async function Profile(props: { params: { lang: Lang } }) {
  const dict = await getDictionary(`/${props.params.lang}/account/profile`);

  return (
    <main className="flex w-full flex-col gap-10 px-6 py-10">
      <AccountHeader lang={props.params.lang} dict={dict} />
    </main>
  );
}
