'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PasswordInput from './passwordInput';

export default function SignUpForm() {
    return (
        <form action="">
        <div className="relative mb-5">
            <div className="absolute top-1/2 left-5 transform -translate-y-1/2">
                <Image 
                    src="/user.svg"
                    alt="mail"
                    width={20}
                    height={20}
                 />
            </div>
            <input className="main__input" type="text" placeholder="Login"/>
        </div>
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
        <PasswordInput placeholder={'Password'}/>
        <PasswordInput placeholder={'Confirm Password'} />

        <div className="flex w-full text-center">
            <p className="font-main text-neutral-50 text-xs font-normal font-['Poppins'] leading-none">I have read and agree to the</p>
            <Link href="" className="inline-block w-full text-center text-violet-400 text-xs font-normal font-main underline">Terms and Conditions</Link>
        </div>

        <button type="submit" className="main__btn mt-32">Next step</button>
    </form>
    )
}