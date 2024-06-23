import Image from "next/image"
import Search from "public/search_icon.svg"
import Close from "public/chat/x-close.svg";

export default function MembersSearch({ searchMember, searchQuery }: any) {
    return (
        <div className="flex mt-10 w-[70%] mx-auto justify-between">
            <div className="w-full mr-3 h-11 p-3 bg-stone-900 rounded-3xl border border-neutral-700 justify-start items-center gap-3 inline-flex">
                <div>
                    <Image src={Search} />
                </div>
                <form action="" className="w-full flex items-center">
                    <span>@</span>
                    <input 
                    className="w-full border-none bg-transparent outline-none"
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => searchMember(e.target.value)}
                    placeholder=""
                    />
                </form>
                <button onClick={() => searchMember("")}>
                    <Image src={Close} />
                </button>
            </div>
            <button onClick={() => searchMember("")}>Cancel</button>
        </div>
    )
}