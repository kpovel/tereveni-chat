'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginForm() {

    const [isHidden, setIsHidden] = useState(true);

    const hiddelPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setIsHidden(!isHidden)
    }

    return (
        <form className="flex flex-col items-cinter" action="">
            <div className="relative mb-5">
                <div className="absolute top-1/2 left-5 transform -translate-y-1/2">
                    <Image 
                        src="/mail.svg"
                        alt="mail"
                        width={20}
                        height={20}
                     />
                </div>
                <input className="main__input" type="text" placeholder="Email address"/>
            </div>
            <div className="relative mb-5">
                <div className="scale-75 absolute top-1/2 left-5 transform -translate-y-1/2">
                    <Image 
                        src="/lock.svg"
                        alt="lock"
                        width={20}
                        height={20}
                     />
                </div>
                <input className="main__input" type={`${isHidden ? 'password' : 'text'}`} placeholder="Password"/>
                <button 
                    className="absolute top-1/2 right-5 transform -translate-y-1/2"
                    onClick={hiddelPassword}
                    >
                    <Image 
                        src="/eye-open.svg"
                        alt="lock"
                        width={20}
                        height={20}
                     />
                </button>
            </div>
            <Link href="" className="inline-block w-full text-center text-violet-400 text-xs font-normal font-main underline">Forgot your password?</Link>

            <button type="submit" className="main__btn mt-32">
                <Link className="main__link" href=''>Login</Link>
            </button>
        </form>
    )
}