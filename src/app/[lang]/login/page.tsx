import LoginForm from "./loginForm";

export default function LoginPage() {
  return (
    <div className="container mx-auto px-6">
      <h2 className="mt-20 text-center text-lg font-medium text-neutral-50 ">
        Welcome back!
      </h2>
      <div className="mx-auto mt-10 max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
