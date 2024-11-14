import React, { useMemo } from "react";
import { InviteBonuse } from "./InviteBonuse";
import { useTranslation } from "react-i18next";
import { claimReferralTask } from "../../endpoints/refEndpoints";
import { useTelegram } from "../../hooks/useTelegram";

export const InviteBonuses = ({
  defaultReferralTask,
  premiumReferralTask,
  onClaim,
}: {
  defaultReferralTask: any;
  premiumReferralTask: any;
  onClaim: () => void;
}) => {
  const { t } = useTranslation();

  const { userId, tg } = useTelegram();

  const handleClaim = async (id: number, isPremium: boolean) => {
    await claimReferralTask({
      clientId: userId,
      referralTaskId: id,
      isPremium: isPremium,
    });
    onClaim();
  };

  const handleInviteClick = () => {
    const url = `t.me/DungeonsOfKitsune_bot/game?startapp=ref_${userId}`;

    if (tg) {
      tg.openTelegramLink(`https://t.me/share/url?url=${url}`);
    }
  };

  const tasks = useMemo(
    () => [
      {
        task: t("rewards.titles.commonFriend", {
          count: defaultReferralTask?.amount ?? 1,
          reward: defaultReferralTask?.reward ?? 300,
        }),
        taskDescription: {
          __html: t("rewards.description.commonFriend", {
            reward:
              '<span class="text-white text-xs font-normal leading-[14.40px]">' +
              300 +
              " $KITSU" +
              "</span>",
          }),
        },
        taskImg: require(`../../assets/images/chestBonus.png`),
        eligibleClaim: defaultReferralTask?.isClaimable ?? false,
        claimFunc: () => handleClaim(defaultReferralTask?.id, false),
      },
      {
        task: t("rewards.titles.premiumFriend", {
          count: premiumReferralTask?.amount ?? 1,
          reward: premiumReferralTask?.reward ?? 1500,
        }),
        taskDescription: {
          __html: t("rewards.description.premiumFriend", {
            reward:
              '<span class="text-white text-xs font-normal leading-[14.40px]">' +
              1500 +
              " $KITSU" +
              "</span>",
          }),
        },
        taskImg: require(`../../assets/images/chestPrem.png`),
        eligibleClaim: premiumReferralTask?.isClaimable ?? false,
        claimFunc: () => handleClaim(premiumReferralTask?.id, true),
      },
      {
        taskDescription: {
          __html: t("rewards.titles.percentageReward", {
            name:
              '<span class="text-white text-xs font-normal leading-[14.40px]">' +
              "$KITSU" +
              "</span>",
            percentage:
              '<span class="text-white text-xs font-normal leading-[14.40px]">' +
              10 +
              "%" +
              "</span>",
          }),
        },
        taskImg: require(`../../assets/images/persent.png`),
        status: 1,
        eligibleClaim: true,
        claimFunc: () => handleInviteClick(),
      },
      // Додайте більше завдань за потреби
    ],
    [t, defaultReferralTask, premiumReferralTask]
  );

  return (
    <div className="flex flex-col gap-4 py-4 ">
      {tasks.map((task, index) => (
        <InviteBonuse
          key={index}
          task={task.task}
          taskDescription={task.taskDescription}
          taskImg={task.taskImg}
          eligibleClaim={task.eligibleClaim}
          status={task.status}
          claimFunc={task.claimFunc}
        />
      ))}
    </div>
  );
};
