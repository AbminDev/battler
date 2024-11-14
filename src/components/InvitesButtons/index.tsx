import { useTelegram } from "../../hooks/useTelegram";
import { CopyButton, InviteButton } from "./components";

export const InvitesButtons = () => {
  return (
    <div className="w-full flex justify-center fixed gap-2 bottom-[5px] p-4">
      <InviteButton />
      <CopyButton />
    </div>
  );
};
