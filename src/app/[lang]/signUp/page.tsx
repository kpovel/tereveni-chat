import SignUpForm from "./signUpForm";

export default function SignUp() {
  return (
    <div className="container mx-auto px-6">
      <h2 className="mt-20 text-center text-lg font-medium text-neutral-50">
        Hi there! Let&apos;s create your account
      </h2>
      <div className="mt-10">
        <SignUpForm />
      </div>
    </div>
  );
}
