import Image from "next/image";
export default function ChatMenuDescription() {
    return (
        <div className="max-w-[70%] mx-auto">
            <div className="mx-auto w-[200px] h-[200px] bg-defaultChatImg bg-cover bg-center rounded-lg">
            </div>
            <div className="mt-10">
                <p className="text-white text-[14px] font-normal">Chat is about vegan lifestyle. It is important for me to live in harmony with nature and abstain from using any products derived from animals. My vegan journey not only contributes to my personal well-being but also has a positive impact on the environment.</p>
            </div>
            <div className="mt-5 flex">
                <div className="px-4 py-2 rounded-3xl border border-white">
                    <span className="text-[12px] font-normal">#community</span>
                </div>
            </div>
        </div>
    )
}