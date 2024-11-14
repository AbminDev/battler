import { Outlet, useLocation } from "react-router-dom";
import { Balance, QuestsList, Setting } from "../../containers";
import { Background } from "../../layout/components/Background";
import { TitleField } from "../../containers/Room";
import { HandleBackButton } from "../../layout/components/HeaderCave/components";
import { useTranslation } from "react-i18next";
import PageTransition from "../../containers/Router/components/PageTransition";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useEffect, useState } from "react";
import { QuestType } from "../../containers/QuestsList";
import { QuestBlockInnerSkeleton, QuestBlockSkeleton } from "../../components";
import { PopupButton } from "../../components/PopupButton";
import { useTelegram } from "../../hooks/useTelegram";
import { claimQuestReward, getQuests } from "../../endpoints/userQuests";
import { QuestTask, TaskStatus } from "../../app/features/questsSlice";
import { useUtils } from "../../utils/navigateTo";

export const Quests = () => {
  const { t } = useTranslation();
  const { navigateTo } = useUtils()
  const location = useLocation();

  const dispatch = useDispatch();

  const appConfig = useSelector((state: RootState) => state.appConfig.configs);

  const {
    quests: { variables: allQuests },
  } = appConfig;

  console.log("allQuests", allQuests);
  const dailyQuests = useSelector((state: RootState) => state.quests.quests);

  console.log("dailyQuests", dailyQuests);

  const allQuestsById = allQuests.reduce((acc: any, quest: any) => {
    acc[quest.questId.value] = quest;
    return acc;
  }, {});

  const onClickHandlers = {
    [TaskStatus.NotDone]: (quest: any) => {
      console.log(`Завдання ${quest.questId.value} ще не виконано.`);
      navigateTo('/island')
      // Перенаправити користувача або показати повідомлення
    },
    [TaskStatus.Done]: async (quest: any) => {
      console.log(
        `Завдання ${quest.questId.value} виконано! Отримайте нагороду.`
      );
      // Викликати функцію для отримання нагороди
      await claimQuestReward({
        clientId: userId,
        questId: quest.questId.value,
      });
    },
    [TaskStatus.Claimed]: (quest: any) => {
      console.log(`Нагорода за завдання ${quest.questId.value} вже отримана.`);
      // Можливо, нічого не робити
    },
  };

  const combinedQuests = dailyQuests
    .map((dq) => {
      const correspondingQuest = allQuestsById[dq.taskId];
      if (correspondingQuest) {
        const onClick = onClickHandlers[dq.status]
          ? () => onClickHandlers[dq.status](correspondingQuest)
          : () => {
              console.log(`Статус завдання ${dq.taskId} невідомий.`);
            };

        return {
          ...correspondingQuest,
          status: dq.status,
          currentProgress: dq.currentProgress,
          // Додаємо функцію onClick
          onClick,
        };
      } else {
        return null;
      }
    })
    .filter(Boolean);

  const [activeTab, setActiveTab] = useState<QuestType>(QuestType.quests);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useTelegram();

  useEffect(() => {
    const fetchQuests = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedQuests = await getQuests({
          clientId: userId,
        });
        console.log("Fetched Quests:", fetchedQuests);
      } catch (err) {
        setError("Не вдалося завантажити завдання.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuests();
  }, [activeTab, dispatch]);

  const buttonBaseClass =
    "border bg-[#4c3f2f] rounded-[2px] p-[1px] transition-all duration-300";
  const buttonInnerClass =
    "w-full h-full bg-[#4c3f2f]  text-white text-sm leading-none p-3";

  return (
    <>
      <PageTransition>
        <>
          <div className="p-3  bg-[#242520] shadow-inner-sm-white border-t border-[#18191a] h-full pb-[90px]">
            <div className="absolute pt-5 pl-5 z-10">
              <HandleBackButton />
            </div>
            <div className="bg-[#332b26] p-4 rounded-[1px] shadow-inner-sm-black h-full flex flex-col">
              <TitleField title={"Quests"} />
              <div className="flex justify-center gap-x-4 my-4">
                <button
                  onClick={() => setActiveTab(QuestType.quests)}
                  className={`${buttonBaseClass} ${
                    activeTab === QuestType.quests
                      ? "border-black shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                      : "border-[#18191a] opacity-60"
                  }`}
                >
                  <div className={buttonInnerClass}>{t("quests.name")}</div>
                </button>
                <button
                  onClick={() => setActiveTab(QuestType.achievements)}
                  className={`${buttonBaseClass} ${
                    activeTab === QuestType.achievements
                      ? "border-black shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                      : "border-[#18191a] opacity-60"
                  }`}
                >
                  <div className={buttonInnerClass}>
                    {t("achievements.name")}
                  </div>
                </button>
              </div>

              {loading ? (
                <div className="flex flex-col gap-4">
                  {activeTab === QuestType.quests && (
                    <QuestBlockInnerSkeleton />
                  )}
                  {Array.from({ length: 3 }).map((_, index) => (
                    <QuestBlockSkeleton key={index} />
                  ))}
                </div>
              ) : error ? (
                <div className="text-center text-red-500">{error}</div>
              ) : (
                <QuestsList quests={combinedQuests} activeTab={activeTab} />
              )}
            </div>
          </div>

          <div className="absolute bottom-0  w-full">
            <div className="w-full h-2 bg-gradient-to-t from-[#372b24] to-[#524037]  shadow-inner border border-[#0e0100]"></div>
            <div className="bg-[#1b1b1d] flex justify-center items-center p-3 pb-[30px]">
              <PopupButton type={"green"}>Claim All</PopupButton>
            </div>
          </div>
        </>
      </PageTransition>
    </>
  );
};
