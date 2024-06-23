import Image from "next/image"


export default function InviteMember({memberInfo, handleCheck}: any){

    const { id, name, avatar, checked } = memberInfo;

    return (
        <label htmlFor={id}>
            <div className="flex w-full justify-between items-center px-3 py-2 rounded-[32px] border border-violet-950 gap-3 mb-3">
                <div className="flex items-center">
                    <div>
                        <Image src={avatar} alt="memberAvatar"/>
                    </div>
                    <p className="text-[14px] text-white ml-3">{name}</p>
                </div>
                <div className="w-[20px] h-[20px] rounded-full border-2 border-white flex justify-center items-center">
                    {
                        checked && <span className="block w-[10px] h-[10px] rounded-full bg-white"></span>
                    }
                </div>
            </div>
            <input
                type="checkbox"
                name={id}
                id={id}
                checked={checked}
                onChange={handleCheck}
                className="form-checkbox hidden"
            />
        </label>
    )
}