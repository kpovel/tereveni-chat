import Image from "next/image";
import Arrow from "public/account/chevron-right.svg"
import Link from "next/link";

export default function BtnOptions({img, text, href}: any) {
    return (
        <div className="mb-3">
            <Link href={href}>
                <div className="w-full p-4 flex rounded-3xl border border-[#3E205D] justify-between items-center gap-3 inline-flex">
                    <div className="flex">
                        <div>
                            <Image src={img} alt='options btn' />
                        </div>
                        <p className="ml-3 text-white text-[14px] font-normal">{text}</p>
                    </div>
                    <div>
                        <Image src={Arrow} alt="arrow"/>
                    </div>
                </div>
            </Link>
        </div>
    )
}