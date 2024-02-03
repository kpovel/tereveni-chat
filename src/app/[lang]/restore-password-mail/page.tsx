import Image from "next/image";
import { getDictionary } from "../dictionaries";
import SendEmail from "public/send-email.svg"

export default async function RestorePassword({
  params,
}: {
  params: { lang: "uk" | "en" };
}) {
  const dict = await getDictionary(`/${params.lang}/restore-password-mail`);

  return (
    <div className="container mx-auto px-6">
      <h2 className="mt-20 text-center text-lg font-medium text-neutral-50">
        {dict.checkEmail}
      </h2>
      <div className="mx-auto my-0 max-w-xs md:max-w-md">
      <p className="mt-5 text-center font-main text-sm font-normal leading-tight text-neutral-50">
        {dict.followLink}
      </p>
      </div>
      <div className="mt-20 flex justify-center">
        <Image src={SendEmail} width={233} height={170} alt="mail"/>
      </div>
      <div className="mx-auto my-0 max-w-xs md:max-w-md">
      <p className="mt-20 text-center font-main text-sm font-normal leading-tight text-neutral-50">
        {dict.warning}
      </p>
      </div>
    </div>
  );
}
