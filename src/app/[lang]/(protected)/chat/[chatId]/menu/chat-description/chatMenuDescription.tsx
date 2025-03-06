import Image from "next/image";
export default function ChatMenuDescription() {
  return (
    <div className="mx-auto max-w-[70%]">
      <div className="mx-auto h-[200px] w-[200px] rounded-lg bg-defaultChatImg bg-cover bg-center"></div>
      <div className="mt-10">
        <p className="text-[14px] font-normal text-white">
          Chat is about vegan lifestyle. It is important for me to live in
          harmony with nature and abstain from using any products derived from
          animals. My vegan journey not only contributes to my personal
          well-being but also has a positive impact on the environment.
        </p>
      </div>
      <div className="mt-5 flex">
        <div className="rounded-3xl border border-white px-4 py-2">
          <span className="text-[12px] font-normal">#community</span>
        </div>
      </div>
    </div>
  );
}
