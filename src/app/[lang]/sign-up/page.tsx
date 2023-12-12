import SignUpForm from "./signUpForm";

export default function SignUp({
  params,
}: {
  params: { lang: "uk" | "en" };
}) {
  return (
    <div className="container mx-auto px-6">
      <h2 className="mt-20 text-center text-lg font-medium text-neutral-50">
        Hi there! Let&apos;s create your account
      </h2>
      <div className="mx-auto mt-10 max-w-md">
        <SignUpForm params={params} />
      </div>
    </div>
  );
}
