import Image from "next/image";

export default function ValidateEmail() {
  return (
    <div className="container mx-auto px-6">
      <h2 className="mt-20 text-center text-lg font-medium text-neutral-50">
        Check your email
      </h2>
      <p className="mt-5 text-center font-main text-sm font-normal leading-tight text-neutral-50">
        Please follow the link in the email to verify your email address and
        continue the sign up process
      </p>
      <div className="mt-20 flex justify-center">
        <Image src="/send-email.svg" alt="mail" width={226} height={180} />
      </div>
    </div>
  );
}
