import Image from "next/image";
import { memberInterface } from "../members/membersWrapper";

export default function InviteMember({
  memberInfo,
  handleCheck,
}: {
  memberInfo: memberInterface;
  handleCheck: () => void;
}) {
  const { id, name, avatar, checked } = memberInfo;

  return (
    <label htmlFor={id}>
      <div className="mb-3 flex w-full items-center justify-between gap-3 rounded-[32px] border border-violet-950 px-3 py-2">
        <div className="flex items-center">
          <div>
            <Image src={avatar} alt="memberAvatar" />
          </div>
          <p className="ml-3 text-[14px] text-white">{name}</p>
        </div>
        <div className="flex h-[20px] w-[20px] items-center justify-center rounded-full border-2 border-white">
          {checked && (
            <span className="block h-[10px] w-[10px] rounded-full bg-white"></span>
          )}
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
  );
}
