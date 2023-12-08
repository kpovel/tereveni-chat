'use client'

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Introduce() {

    const [introduce, setIntroduce] = useState('')
    const [textLength, setTextLength] = useState(0);

    const maxCharacters = 300;

    useEffect(() => {
        setTextLength(introduce.length)
    }, [introduce])

    const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.currentTarget.value.length <= maxCharacters) {
            setIntroduce(e.currentTarget.value);
        }
    }

    return (
        <div className="mt-10">
            <textarea value={introduce} max-length="300" onChange={handleText} className="h-[192px] outline-none font-main text-sm font-normal text-neutral-50 leading-tight focus:border-violet-700 py-3 px-5 w-full bg-stone-900 rounded-3xl border border-neutral-700 justify-center items-center inline-flex" name="introduce" id="introduce" placeholder="Type here..."></textarea>
            <div className="text-right -mt-2 px-2">
                <span className="text-stone-300 text-xs font-normal font-main leading-none">{textLength} / 300</span>
            </div>
            <button className="main__btn mt-24">
                <Link className="main__link" href="">
                    Next step
                </Link>
            </button>
            <button className="w-full mt-5 border-none bg-transparent outline-none">
                <Link className="text-center text-stone-300 text-sm font-normal font-main leading-tight" href="">
                    Skip
                </Link>
            </button>
        </div>
    )
}