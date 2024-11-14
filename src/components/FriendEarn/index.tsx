import { claimRevShare } from "../../endpoints/refEndpoints";
import { useTelegram } from "../../hooks/useTelegram";
import { PopupButton } from "../PopupButton";

export const FriendEarn = ({
  referralsEarn,
  userEarnFromRefs,
  onClaim
}: {
  referralsEarn: number;
  userEarnFromRefs: number;
  onClaim: () => void
}) => {
const { userId } = useTelegram()

const handleClaim = async () => {

  await claimRevShare({
    clientId: userId
  })

  onClaim()
}

  return (
    <div className="flex w-full flex-col pb-4 ">
      <div className="flex justify-between ">
        <div className="text-white text-base font-normal leading-tight">
          Your friends get {referralsEarn} $KITSU
        </div>
        <div>info</div>
      </div>
      <div
        className={`flex w-full items-center justify-between py-4 px-2 rounded-md ${
          userEarnFromRefs && userEarnFromRefs > 0
            ? "bg-[#4c905f] shadow-[0_0_15px_5px_rgba(34,197,94,0.6)] border border-[#0e2822]"
            : "border border-[#554837] shadow-inner-sm-white"
        }  `}
      >
        {userEarnFromRefs && userEarnFromRefs > 0 ? (
          <div className="flex gap-2 items-center">
            <div className="text-white text-[40px] font-normal leading-[48px]">
              {userEarnFromRefs} $KITSU
            </div>
          </div>
        ) : null}
        {userEarnFromRefs && userEarnFromRefs > 0 ? (
          <div>
            <PopupButton type="green" width="72px" onClick={handleClaim}>
              Claim
            </PopupButton>
          </div>
        ) : null}

        {userEarnFromRefs <= 0 && (
          <div className="text-center text-[#6f675c] text-sm font-normal leading-[14px] p-4 w-full ">
            Invite friends to get interest
          </div>
        )}
      </div>
    </div>
  );
};
