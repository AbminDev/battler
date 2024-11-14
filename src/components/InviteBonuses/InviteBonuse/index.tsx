import { ClaimButton } from "../../../containers/Claim/components";
import { GoldIco } from "../../../layout/components/HeaderFarm/components/ResourceCard";
import { InviteButton } from "../../InvitesButtons/components";
import { PopupButton } from "../../PopupButton";

export const InviteBonuse = ({
  task,
  taskDescription,
  taskImg,
  eligibleClaim,
  status,
  claimFunc
}: {
  task?: string;
  taskDescription?: any;
  taskImg: string;
  eligibleClaim: boolean;
  status?: number;
  claimFunc?: () => void;
}) => {
  return (
    <div
      className={`flex w-full items-center justify-between min-h-[70px] ${
        status === 1
          ? "bg-[#18191a] border-[#554837]"
          : eligibleClaim
          ? "bg-[#4c905f] shadow-[0_0_15px_5px_rgba(34,197,94,0.6)] border border-[#0e2822]"
          : "bg-[#18191a] border-[#554837]"
      } rounded-lg border  p-2 gap-2`}
    >
      <div className="h-[60px] min-w-[47px] justify-center items-center inline-flex">
        <img className="w-full h-full" src={taskImg} />
      </div>
      <div className="flex-col justify-center items-start gap-2 inline-flex">
        {task ? (
          <div className="text-white text-sm font-normal leading-[14px]">
            {task}
          </div>
        ) : (
          ""
        )}
        {taskDescription ? (
          <div
            dangerouslySetInnerHTML={taskDescription}
            className=" text-[#a49a7c] text-xs font-light leading-[14.40px]"
          ></div>
        ) : (
          ""
        )}
      </div>

      <PopupButton
        onClick={claimFunc}
        disabled={!eligibleClaim}
        width="90px"
        type={eligibleClaim ? (status === 1 ? "blue" : "green") : "gray"}
      >
        {status === 1 ? "Invite" : "Claim"}
      </PopupButton>
    </div>
  );
};
