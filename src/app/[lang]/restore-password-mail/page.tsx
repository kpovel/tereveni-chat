import Image from "next/image";
import { getDictionary } from "../dictionaries";
import SendEmail from "public/sendMail.svg";
import MailNum from "public/mailNum.svg";

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
        <p className="font-main mt-5 text-center text-sm font-normal leading-tight text-neutral-50">
          {dict.followLink}
        </p>
      </div>
      <div className="mt-20 flex justify-center">
          <div className="max-w-[198px] relative">
            <Image
              src={SendEmail}
              width={198}
              height={150}
              alt="mail"
              className="h-[150px]"
            />
          <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-[46px] h-[46px] rounded-full">
            <Image
              src={MailNum}
              width={46}
              height={46}
              alt="mailNum"
              className="h-[46px]"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto my-0 max-w-xs md:max-w-md">
        <p className="font-main mt-20 text-center text-sm font-normal leading-tight text-neutral-50">
          {dict.warning}
        </p>
      </div>
    </div>
  );
}
