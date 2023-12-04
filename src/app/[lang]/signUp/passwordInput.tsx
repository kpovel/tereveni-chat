'use client'

import { useState } from 'react';
import Image from 'next/image';

interface PasswordInputProps {
    placeholder: string;
  }

export default function PasswordInput({placeholder}: PasswordInputProps) {

    const [isHidden, setIsHidden] = useState(true);

    const hiddenPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setIsHidden(!isHidden)
    }

    return (
        <div className="relative mb-5">
            <div className="scale-75 absolute top-1/2 left-5 transform -translate-y-1/2">
                <Image 
                    src="/lock.svg"
                    alt="lock"
                    width={20}
                    height={20}
                />
            </div>
            <input className="main__input" type={`${isHidden ? 'password' : 'text'}`} placeholder={placeholder}/>
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
    )
}