import SignUpForm from './signUpForm';

export default function SignUp() {
    return (
        <div className="container mx-auto px-6">
            <h2 className="mt-20 text-center text-neutral-50 text-lg font-medium ">Hi there! Let's create your account</h2>
            <div className="mt-10">
                <SignUpForm />
            </div>
        </div>
    )
}