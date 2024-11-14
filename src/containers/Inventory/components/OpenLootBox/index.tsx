import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { DungeonCompletErays } from "../../../../components/animation/DungeonCompletErays";
import { LevelUpBanner } from "../../../../components/LevelUp";
import {
  XPIco,
  KitsuIco,
  StoneIco,
} from "../../../../layout/components/HeaderFarm/components";
import { Resource } from "../../../../mock/resources";
import { ItemType, LootBoxOpenResult } from "../../../../interfaces/lootBotx";
import {
  DisplayData,
  handleLootBoxResult,
} from "../../../../utils/lootBoxHandler";
import { useState } from "react";

export const OpenLootBox = ({
  rewards,
  onClose,
  openBoxName,
}: {
  rewards: DisplayData[];
  onClose: () => void;
  openBoxName: string;
}) => {
  const dispatch = useDispatch();

  const [skipAnimation, setSkipAnimation] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  // Функція для агрегації нагород
  const aggregateRewards = (rewards: DisplayData[]): DisplayData[] => {
    const rewardMap = new Map<string, DisplayData>();

    rewards.forEach((reward) => {
      const key = `${reward.name}-${reward.type}`;
      if (rewardMap.has(key)) {
        const existing = rewardMap.get(key)!;
        existing.amount += reward.amount;
      } else {
        rewardMap.set(key, { ...reward });
      }
    });

    return Array.from(rewardMap.values());
  };

  const aggregatedRewards = aggregateRewards(rewards);

  // Оновлені варіанти з використанням функції для visible
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (skipAnimation: boolean) => ({
      opacity: 1,
      transition: {
        staggerChildren: skipAnimation ? 0 : 0.5,
      },
    }),
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleOverlayClick = () => {
    if (!isAnimationComplete) {
      console.log("Пропуск анімації");
      setSkipAnimation(true);
    } else {
      onClose();
    }
  };

  const handleAnimationComplete = () => {
    setIsAnimationComplete(true);
  };

  return (
    <div className="fixed inset-0 z-40" onClick={handleOverlayClick}>
      {/* Overlay Background */}
      <div className="w-full h-full absolute bg-gradient-to-b from-black via-black/70 to-black opacity-80"></div>

      <div className="w-full h-full absolute">
        <DungeonCompletErays />
      </div>
      {/* Modal Container */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      w-11/12 max-w-md p-4 "
      >
        <LevelUpBanner text={openBoxName} />
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          custom={skipAnimation}
          onAnimationComplete={handleAnimationComplete}
        >
          {aggregatedRewards.map((item) => (
            <motion.div
              key={`${item.name}-${item.type}`}
              variants={itemVariants}
              className="flex flex-col items-center p-2 w-20 "
            >
              <div
                className={`w-16 h-16 mb-2 relative ${
                  item.type === ItemType.timeBoosts
                    ? "bg-blue-600 rounded-md border border-black"
                    : ""
                }`}
              >
                {item.type === ItemType.timeBoosts && (
                  <div className="absolute flex justify-center text-center w-full">
                    <div className="absolute w-full h-full bg-black opacity-30"></div>
                    <div className=" text-white text-lg font-semibold z-10 leading-none">
                      {item.name}
                    </div>
                  </div>
                )}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="text-center text-white text-lg font-semibold">
                {item.amount}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
