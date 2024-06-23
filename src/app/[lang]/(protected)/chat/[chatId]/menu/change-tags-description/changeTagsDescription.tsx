"use client";

import { useState } from "react";
import Image from "next/image";
import ChevronRight from "public/account/chevron-right.svg";

export default function ChangeTagsDescription() {

    const [ introduce, setIntroduce ] = useState("");
    const [ isOpen, setIsOpen ] = useState<boolean>(false)

    const [selectedItems, setSelectedItems] = useState({
        item1: false,
        item2: false,
        item3: true,
        item4: false,
        item5: false,
        item6: true,
        item7: false,
        item8: true,
        item9: false,
        item10: false,
        item11: false,
        item12: false,
      });

    const maxCharacters = 300;

    const toggleDropdown = (e:any) => {
        e.preventDefault();
        setIsOpen(!isOpen);
      };

    const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textValue = e.currentTarget.value.slice(0, maxCharacters);
        setIntroduce(textValue);
      };

      const handleCheckboxChange = (e: any) => {
        const { name, checked } = e.target;
        setSelectedItems((prevItems) => ({
          ...prevItems,
          [name]: checked,
        }));
      };

    
    return (
        <div className="mt-10">
            <div>
                <form className="flex grow flex-col justify-between">
                    <div className="mb-10">
                        <textarea
                        value={"chat description"}
                        max-length={maxCharacters}
                        onChange={handleText}
                        className="h-[192px] w-full resize-none rounded-3xl border border-neutral-700 bg-stone-900 px-5 py-3 text-sm font-normal leading-tight text-neutral-50 outline-none focus:border-violet-700"
                        name="introduce"
                        id="introduce"
                        ></textarea>
                        <div className="px-2 text-right">
                        <span className="text-xs font-normal leading-none text-stone-300">
                            {introduce.length} / {maxCharacters}
                        </span>
                        </div>
                    </div>

                    <div className="relative">
                        {isOpen && (
                            <div className="transition delay-150 duration-300 ease-in-out w-full p-4 absolute -top-[330px] bg-stone-900 rounded-3xl border border-violet-700">
                                <div className="overflow-y-scroll max-h-[282px] custom-scrollbar">
                                    {
                                Object.entries(selectedItems).map(([key, value]) => {
                                    return (
                                        <div className={`${value ? "bg-[#252525]" : ""} w-[97%] px-4 py-2 rounded-lg`} key={key}>
                                    <label className="flex items-center">
                                        <input
                                        type="checkbox"
                                        name={key}
                                        checked={value}
                                        onChange={handleCheckboxChange}
                                        className="form-checkbox hidden"
                                        />
                                        <span className="ml-2">{key}</span>
                                    </label>
                                    </div>
                                    )
                                }
                                )
                            }
                                </div>
                            </div>
                            )
                        }
                        
                        <div className="w-full h-12 px-5 py-3.5 bg-stone-900 rounded-3xl border border-neutral-700 justify-center items-center gap-3 inline-flex">
                            <p>#selected tags</p>
                            <button onClick={toggleDropdown} className="rotate-90">
                                <Image src={ChevronRight} alt="dropdown"/>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}