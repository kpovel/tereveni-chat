"use client"

import { useState, ChangeEvent } from "react";
import avatar from "../../../../../../public/Avatar.svg";
import trashIcon from "../../../../../../public/trash_icon.svg";
import copyIcon from "../../../../../../public/copy_icon.svg";
import searchIcon from "../../../../../../public/search_icon.svg";
import cancelIcon from "../../../../../../public/cancel_icon.svg";
import Image from "next/image";

export default function PrivateChatHeader() {

    const [ isOnline, setIsOnline ] = useState(true);
    const [ isMenuActive, setIsMenuActive ] = useState(false)
    const [ isSearchActive, setIsSearchActive ] = useState(false)
    const [ isClearBtnActive, setIsClearBtnActive ] = useState(false);
    const [ searchValue, setSearchValue ] = useState('');

    const activeMenuHandler = () => {
        setIsMenuActive(!isMenuActive)
    }

    const searchValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.trim().length > 0) {
            setIsClearBtnActive(true);
            setSearchValue(event.target.value);
        } else {
            setIsClearBtnActive(false);
        }
      };

    const clearSearch = () => {
        setSearchValue('')
        setIsClearBtnActive(false);
    }

    const searchActiveHandler = () => {
        setIsSearchActive(true)
    }
    const searchDisableHandler = () => {
        setIsSearchActive(false)
    }

    return (
        <div>
            {
                !isSearchActive ? 
                <div className="flex px-6 py-3 justify-between items-center">
                    <div className="flex">
                        <div className="w-[46px] h-[46px]">
                            <Image 
                                src={ avatar }
                                alt={ `chatAvatar` }
                                width={46}
                                height={46}
                            />
                        </div>
                        <div className="ml-4">
                            <p className="text-white text-base font-medium">Name</p>
                            <div className="flex items-center">
                                <div className={`w-2 h-2 rounded-full border ${isOnline ? 'border-green-900 bg-green-500' : 'bg-zinc-500 border-stone-900'}`}></div>
                                <span className={`ml-[5px] text-center text-xs font-normal ${isOnline ? 'text-green-500' : 'text-zinc-500'}`}>{isOnline ? 'Online' : 'Offline'}</span>
                            </div>
                        </div>

                    </div>
                    <div className="relative">
                        <button className={`w-8 h-8 rounded ${!isMenuActive ? 'bg-none' : 'bg-neutral-900'}`} onClick={activeMenuHandler}>
                            <div className="w-[3px] h-[3px] mx-auto rounded-full mb-[3px] mt-[3px] bg-white"></div>
                            <div className="w-[3px] h-[3px] mx-auto rounded-full mb-[3px] bg-white"></div>
                            <div className="w-[3px] h-[3px] mx-auto rounded-full mb-[3px] bg-white"></div>
                        </button>
                        {
                            isMenuActive ? <div className="absolute z-10 w-40 top-9 -left-[128px] py-2 px-4 bg-stone-900 rounded-lg shadow flex-col justify-start items-start gap-1 inline-flex">
                                <button onClick={searchActiveHandler} className="flex justify-start w-full mb-1 py-[7px] bg-none transition-all ease-in delay-150 hover:bg-neutral-900">
                                    <Image src={searchIcon} />
                                    <p className="text-white text-sm font-normal ml-2">Search</p>
                                </button>
                                <button className="flex justify-start w-full mb-1 py-[7px] bg-none transition-all ease-in delay-150 hover:bg-neutral-900">
                                    <Image src={copyIcon} />
                                    <p className="text-white text-sm font-normal ml-2">Invitation link</p>
                                </button>
                                <button className="flex justify-start w-full py-[7px] bg-none transition-all ease-in delay-150 hover:bg-neutral-900">
                                    <Image src={trashIcon} />
                                    <p className="text-white text-sm font-normal ml-2">Delete chat</p>
                                </button>
                            </div> : null
                        }
                    </div>
                </div>
                :
                <div className="px-6 py-3 flex w-full justify-between items-center">
                    <div className="flex w-full justify-between items-center mr-4 p-3 bg-neutral-600 rounded-3xl border border-neutral-700 justify-start items-center inline-flex">
                        <button className="w-4 h-4">
                            <Image src={searchIcon} />
                        </button>
                        <form className="w-full mx-3" action="">
                            <input
                            value={searchValue}
                            onChange={searchValueHandler}
                            className="border-transparent bg-transparent outline-none text-white text-sm font-normal" 
                            placeholder="Сhat search"
                            type="text"/>
                        </form>
                        {
                            isClearBtnActive && <button onClick={clearSearch} className="w-4 h-4">
                                <Image src={cancelIcon} />
                            </button>
                        }
                    </div>
                    <button onClick={searchDisableHandler}>Cancel</button>
                </div>
            }
            </div>
        )
}