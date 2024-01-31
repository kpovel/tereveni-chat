import Image from "next/image";
import { getDictionary } from "../dictionaries";
import mail from "public/send-email.svg"

export default async function ValidateEmail({
  params,
}: {
  params: { lang: "uk" | "en" };
}) {
  const dict = await getDictionary(`/${params.lang}/validate-email`);

  return (
    <div className="container mx-auto px-6">
      <h2 className="mt-20 text-center text-lg font-medium text-neutral-50">
        {dict.checkEmail}
      </h2>
      <p className="mt-5 text-center text-sm font-normal leading-tight text-neutral-50">
        {dict.followLink}
      </p>
      <div className="mt-20 flex justify-center">
        <Image src={mail} alt="Mail" />
      </div>
      <p className="mt-20 text-center font-main text-sm font-normal leading-tight text-neutral-50">
        {dict.warning}
      </p>
    </div>
  );
}
