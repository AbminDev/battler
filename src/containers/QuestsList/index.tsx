import React, { useState } from "react";
import { CardProps } from "../../interfaces/card";
import { useTranslation } from "react-i18next";
import { HpBarAnimation } from "../../components";
import { ManaBarAnimation } from "../../components/animation/ManaBarAnimation";
import { ProgressBar } from "../../layout/components/FooterCave/components";
import { KitsuIco } from "../../layout/components/HeaderFarm/components";
import { PopupButton } from "../../components/PopupButton";
import { QuestBlock } from "./components";
import { TaskSource } from "./components/QuestBlock";
import { Resources } from "../../enums/resources";

export enum QuestType {
  quests,
  achievements,
}
export const QuestsList = ({ quests, activeTab }: { quests: any[], activeTab : number }) => {

  const { t } = useTranslation();

  console.log("quests", quests)

  const cases = [
    {
      src: require("../../assets/images/quests/case1.png"),
      isAvailable: true,
    },
    {
      src: require("../../assets/images/quests/case2.png"),
      isAvailable: false,
    },
    {
      src: require("../../assets/images/quests/case3.png"),
      isAvailable: false,
    },
  ];

  return (
    <>
      {/* <div className="flex justify-center gap-x-4 my-4">
        <button
          onClick={() => setActiveTab(QuestType.daily)}
          className={`${buttonBaseClass} ${
            activeTab === QuestType.daily
              ? "border-black shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              : "border-[#18191a] opacity-60"
          }`}
        >
          <div className={buttonInnerClass}>{daily}</div>
        </button>
        <button
          onClick={() => setActiveTab(QuestType.weekly)}
          className={`${buttonBaseClass} ${
            activeTab === QuestType.weekly
              ? "border-black shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              : "border-[#18191a] opacity-60"
          }`}
        >
          <div className={buttonInnerClass}>{weekly}</div>
        </button>
      </div> */}

      {/* {activeTab === QuestType.quests && (
        <div className="flex justify-between items-center">
          <div className="w-14 h-14 flex-shrink-0">
            <img src={require("../../assets/images/quests/amulet.png")} />
          </div>
          <div className="flex flex-col justify-between items-center flex-grow mx-4 gap-1">
            <div className="flex justify-around items-center w-full h-full">
              {cases.map((caseItem, index) => (
                <div
                  key={index}
                  className={`w-9 h-9 flex justify-center items-center relative ${
                    caseItem.isAvailable ? "animate-pulse " : ""
                  } flex-shrink-0`}
                >
                  <div className="absolute w-7 h-7">
                    <img
                      src={require("../../assets/images/quests/case-background.png")}
                    />
                  </div>
                  <div className={`z-20 pt-[2px] w-6 h-6`}>
                    <img
                      src={caseItem.src}
                      className={`${
                        caseItem.isAvailable
                          ? "filter brightness-125 rounded-full shadow-glow"
                          : ""
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <ProgressBar
              current={2}
              total={10}
              color={"bg-gradient-to-b from-[#fffe2e] to-[#fe8315] "}
            />
          </div>
          <div className="w-16 h-16 flex-shrink-0 pt-1">
            <img src={require("../../assets/images/quests/big-case.png")} />
          </div>
        </div>
      )} */}

      {/* Контейнер з вертикальним прокручуванням та паддінгом знизу */}
      <div className="flex flex-col justify-start items-center pt-4 pb-4 space-y-2 overflow-y-auto max-h-full">
        {quests.map((quest, index) => {
          return (
          <React.Fragment key={quest.questId.value}>
            <QuestBlock quest={quest} />
            {index !== quests.length - 1 && (
              <div className="w-full min-h-px bg-[#584d3c]"></div>
            )}
          </React.Fragment>
        )})}
      </div>
    </>
  );
};
