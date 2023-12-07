'use client'

import { useState } from 'react';
import Image from 'next/image';

interface PasswordInputProps {
    placeholder: string;
    hint: boolean;
    setPassHandler: (pass:string) => void
  }

export default function PasswordInput({placeholder, hint, setPassHandler}: PasswordInputProps) {

    const [isHidden, setIsHidden] = useState(true);
    const [isVisibleHint, setIsVisibleHint] = useState(false);

    const hiddenPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setIsHidden(!isHidden)
    }

    const hintHandler = () => {
        if(hint) {
            setIsVisibleHint(true)
        }
    }

    const hiddenHint = () => {
        if(hint) {
            setIsVisibleHint(false)
        }
    }

    return (
        <div>
            <div className="relative mt-5">
            <div className="scale-75 absolute top-1/2 left-5 transform -translate-y-1/2">
                <Image 
                    src="/lock.svg"
                    alt="lock"
                    width={20}
                    height={20}
                />
            </div>
            <input onFocus={hintHandler} onBlur={hiddenHint} className="main__input" type={`${isHidden ? 'password' : 'text'}`} placeholder={placeholder}/>
            <button 
                className="absolute top-1/2 right-5 transform -translate-y-1/2"
                onClick={hiddenPassword}
                >
                <Image 
                    src="/eye-open.svg"
                    alt="lock"
                    width={20}
                    height={20}
                />
            </button>
        </div>
        {isVisibleHint ? <div className="transition px-2 mt-1"><p className="leading-5 text-neutral-50 text-xs font-normal">Password must be 6 to 72 characters and contain at least 1 capital letter, 1 number and 1 special character</p></div> : null}
        </div>
    )
}