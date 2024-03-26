import { Dispatch, SetStateAction } from "react";
import { DeleteAccountStage } from "./AccountSettings";

export function DeleteAccountPopup({
  deleteAccountStage,
  setDeleteAccountStage,
}: {
  deleteAccountStage: DeleteAccountStage;
  setDeleteAccountStage: Dispatch<SetStateAction<DeleteAccountStage>>;
}) {
  return (
    <div
      className="absolute left-0 top-0 h-dvh w-screen z-10"
    >
      here
    </div>
  );
}
