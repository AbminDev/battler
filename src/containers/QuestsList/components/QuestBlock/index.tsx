// QuestBlock.jsx
import React from "react";
import { PopupButton } from "../../../../components/PopupButton";
import { Resources } from "../../../../enums/resources";
import {
  KitsuIco,
  StoneIco,
  XPIco,
} from "../../../../layout/components/HeaderFarm/components";
import { useTranslation } from "react-i18next";
import { TaskStatus } from "../../../../app/features/questsSlice";

export enum TaskSource {
  tg,
  x,
}


export const getImageSrc = (source: TaskSource) => {
  switch (source) {
    case TaskSource.tg:
      return require("../../../../assets/images/quests/tg.png");
    case TaskSource.x:
      return require("../../../../assets/images/quests/x.png");
    default:
      return require("../../../../assets/images/quests/tg.png"); // Значення за замовчуванням
  }
};

export const getIcon = (currency: Resources) => {
  switch (currency) {
    case Resources.kitsu:
      return <KitsuIco />;
    case Resources.experience:
      return <XPIco />;
    case Resources.stone:
      return <StoneIco />;
    default:
      return null;
  }
};

interface QuestBlockProps {
  quest: any;
}

export const QuestBlock: React.FC<QuestBlockProps> = ({ quest }) => {
  console.log("quest", quest);

  const { t } = useTranslation();

  const { source, currency, status, onClick, conditions, actionType, rewards } =
    quest;
  console.log("status" , status)
  const messageParts = conditions.value.map((condition: any) => {
    const { amount, resource } = condition;

    const resourceName = resource
      ? t(`quests.resources.${resource.value}`)
      : "";

    return t("quests.condition.messagePart", {
      amount: amount.value,
      resource: resourceName,
    }).trim();
  });

  const Reward = () => {
    const rewardParts = rewards.value.map((reward: any, index: number) => {
      const { amount, resource } = reward;

      // Отримуємо назву ресурсу
      const resourceName = resource
        ? t(`quests.resources.${resource.value}`)
        : "";

      // Отримуємо іконку ресурсу
      const icon = getIcon(resource.value);

      // Формуємо частину повідомлення з кількістю і ресурсом
      const rewardText = t("quests.condition.messagePart", {
        amount: amount.value,
        resource: resourceName,
      }).trim();

      // Повертаємо JSX для кожного елемента з текстом і іконкою
      return (
        <div key={index} className="flex items-center space-x-1">
          <div className="w-3 h-3">{icon}</div>
          <div className="text-right text-white text-sm font-normal uppercase leading-tight">
            {rewardText}
          </div>
        </div>
      );
    });

    return <div className="flex w-full">{rewardParts}</div>;
  };

  const action = t(`quests.condition.actionType.${actionType.value}`);

  const fullMessage = `${action} ${messageParts.join(", ")}`;

  console.log("fullMessage", fullMessage);
  const imageSrc = getImageSrc(source);

  // Визначаємо тип кнопки та текст на основі статусу
  let buttonType: any;
  let buttonText = "";
  let showButton = true;

  switch (status) {
    case TaskStatus.NotDone:
      buttonType = "blue";
      buttonText = "GO";
      break;
    case TaskStatus.Done:
      buttonType = "green";
      buttonText = "Claim";
      break;
    case TaskStatus.Claimed:
      showButton = false;
      break;
    default:
      buttonType = "blue";
      buttonText = "GO";
  }

  return (
    <>
      <div
        className={`flex flex-col gap-2 w-full ${
          TaskStatus.Done === status ? "bg-[#584d3c]" : ""
        }`}
      >
        <div className="flex items-center flex-grow gap-2 w-full">
          {/* Зображення */}
          <div className="w-10 h-10 flex-shrink-0">
            <img
              src={imageSrc}
              alt={`${source} Icon`}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Текст та іконка */}
          <div className="flex flex-col items-end flex-grow gap-1 max-w-sm">
            <div className="text-white text-sm font-normal leading-tight w-full break-words">
              {fullMessage}
            </div>
            <Reward />
          </div>

          {/* Кнопка */}
          {showButton ? (
            <div className="ml-auto min-w-[36px] flex flex-shrink-0">
              <PopupButton  type={buttonType} onClick={onClick}>
                {buttonText}
              </PopupButton>
            </div>
          ) : (
            <div className="flex items-center h-full ml-auto mr-9">
              <svg
                className="w-6 h-6 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
