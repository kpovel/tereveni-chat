import LoginForm from './loginForm';

export default function LoginPage(){
    return (
        <div className="container mx-auto px-6">
            <h2 className="mt-20 text-center text-neutral-50 text-lg font-medium ">Welcome back!</h2>
            <div className="mt-10">
                <LoginForm />
            </div>
        </div>
    )
}