'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PasswordInput from './passwordInput';

export default function SignUpForm() {

    const [isTermsChecked, setIsTermsChecked] = useState(false);

    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const termsChekedHandler = () => {
        setIsTermsChecked(!isTermsChecked);
    }

    const setPassHandler = (pass:string) => {
        setPassword(pass)
    }

    const setConfirmPassHandler = (pass:string) => {
        setConfirmPassword(pass)
    }

    return (
        <form action="">
        <div className="relative">
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
        <div className="relative mt-5">
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
        <PasswordInput setPassHandler={setPassHandler} hint={true} placeholder={'Password'}/>
        <PasswordInput setPassHandler={setConfirmPassHandler}hint={false} placeholder={'Confirm Password'} />

        <div className="flex mt-10 items-center text-center">
            <div 
                className="w-[19px] h-[19px] flex justify-center items-center border-2 border-solid border-white rounded"
                onClick={termsChekedHandler}
                > 
                {isTermsChecked ? <Image 
                        src="/checked.svg"
                        alt="mail"
                        width={12}
                        height={12}
                    /> : null}
            </div>
            <span className="text-left ml-2 font-main text-neutral-50 text-xs font-normal font-['Poppins'] leading-none">I have read and agree to the 
            <Link href="" className="break-words ml-1 inline-block text-center text-violet-400 text-xs font-normal font-main underline">Terms and Conditions</Link>
            </span>
        </div>

        <button type="submit" className="main__btn mt-32">
            <Link className="main__link" href=''>Next step</Link>
        </button>
    </form>
    )
}