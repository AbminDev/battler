import { useEffect, useState } from "react";
import {
  InviteText,
  InviteBonuses,
  InvitesButtons,
  FriendEarn,
} from "../../components";
import { FriendsList } from "../../containers";
import { useTelegram } from "../../hooks/useTelegram";
import PageTransition from "../../containers/Router/components/PageTransition";
import { RefreshFriends } from "../../containers/FriendsList/components/RefreshFriends";
import { getRewardsToClaim } from "../../endpoints/refEndpoints";

export const Friends = () => {
  const { tg } = useTelegram();

  useEffect(() => {
    if (tg) {
      tg.setHeaderColor("#1f1c1a");
    }
  }, [tg]);

  const [defaultReferralTask, setDefaultReferralTask] = useState();
  const [premiumReferralTask, setPremiumReferralTask] = useState();

  const [referralsEarn, setReferralsEarn] = useState<number>(0);
  const [userEarnFromRefs, setUserEarnFromRefs] = useState<number>(0);

  const { userId } = useTelegram();
  
  const getReward = async () => {
    const data = await getRewardsToClaim({
      clientId: userId,
    });


    if (data) {
      setDefaultReferralTask(data.defaultReferralTask);
      setPremiumReferralTask(data.premiumReferralTask);
      setReferralsEarn(data.referralsEarnedCum);
      setUserEarnFromRefs(data.referralsEarnedCum);
    }
  };

  useEffect(() => {
    getReward();
  }, []);

  return (
    <PageTransition>
      <div className="h-screen w-full p-4 bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-950 flex flex-col">
        <InviteText />
        <InviteBonuses
          defaultReferralTask={defaultReferralTask}
          premiumReferralTask={premiumReferralTask}
          onClaim={getReward}
        />
        <FriendEarn
          referralsEarn={referralsEarn}
          userEarnFromRefs={userEarnFromRefs}
          onClaim={getReward}
        />
        {/* <RefreshFriends /> */}

        {/* <FriendsList /> */}

        <InvitesButtons />
      </div>
    </PageTransition>
  );
};
