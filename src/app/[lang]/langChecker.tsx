'use client'

import Image from 'next/image';
import { useState } from 'react';

export default function LangChecker() {

    const [ isActive, setIsActive ] = useState(true);

    const checkedLang = () => {
        setIsActive(!isActive)
    }

    return (
        <div className="flex justify-end items-center mt-5">
            <Image
              src="lang.svg"
              alt="lang logo"
              width={18}
              height={18}
              />
          <button
            onClick={checkedLang}
            className={`transition duration-150 ease-in text-sm ml-2 mr-1 ${isActive ? 'text-white' : 'text-zinc-500'}`}
          >en</button>
          <div className="w-0.5 h-3.5 bg-zinc-500"></div>
          <button 
            onClick={checkedLang}
            className={`text-sm ml-1 ${!isActive ? 'text-white' : 'text-zinc-500'}`}
          >ua</button>
        </div>
    )
}