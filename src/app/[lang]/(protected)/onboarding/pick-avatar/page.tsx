import { getDictionary } from "@/app/[lang]/dictionaries";
import AvatarPicker from "./avatarPicker";

export default async function PickAvatar({
  params,
}: {
  params: { lang: "uk" | "en" };
}) {
  const dict = await getDictionary(`/${params.lang}/onboarding/pick-avatar`);

  return (
    <div className="container mx-auto px-6">
      <h2 className="mt-20 text-center text-lg font-medium text-neutral-50 ">
        {dict.title}
      </h2>
      <p className="mt-5 text-center font-main text-sm font-normal leading-tight text-neutral-50">
        {dict.subtitle}
      </p>
      <AvatarPicker dict={dict} />
    </div>
  );
}
