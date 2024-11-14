import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Resource } from "../../mock/resources";
import { LevelUpBanner } from "../LevelUp";
import { DungeonCompletErays } from "../animation/DungeonCompletErays";
import { Resources } from "../../enums/resources";
import {
  GoldIco,
  KitsuIco,
  StoneIco,
  XPIco,
} from "../../layout/components/HeaderFarm/components";
import { AnimatedResource } from "../../containers/Farm/Room/components/RenderRoom/components";
import { RootState } from "../../app/store";
import { DisplayData } from "../../utils/lootBoxHandler";

export const DungeonComplete = ({
  resources,
  onClose,
  isResourcesShown,
}: {
  resources: DisplayData[];
  onClose: () => void;
  isResourcesShown: boolean;
}) => {
  const dispatch = useDispatch();

  const balancePositions = useSelector(
    (state: RootState) => state.resources.positions
  );

  // const sortResourses = [...resources].sort(
  //   (a, b) => a.resourceType - b.resourceType
  // );

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

  const aggregatedRewards = aggregateRewards(resources);

  const sortedAggregatedRewards = [...aggregatedRewards].sort(
    (a, b) => a.type - b.type
  );

  const [animatedResources, setAnimatedResources] = useState<any[]>([]);

  // Об'єкт для зберігання рефів ресурсів
  const resourceRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Функція для конвертації абсолютних координат до координат контейнера
  const getRelativePosition = (
    absolutePosition: { x: number; y: number },
    resourseType: Resources
  ) => {
    const container = resourceRefs.current[resourseType];
    if (container) {
      const containerRect = container.getBoundingClientRect();

      return {
        x:
          resourseType === Resources.experience
            ? absolutePosition.x - containerRect.left + 100
            : absolutePosition.x - containerRect.left,
        y: absolutePosition.y - containerRect.top,
      };
    }
    return { x: 0, y: 0 };
  };

  // Обробка завершення анімації
  const handleAnimationComplete = (id: any) => {
    setAnimatedResources((prev) => prev.filter((res) => res.id !== id));
  };

  // const resourceStartPositions: {
  //   [key in Resources]: { x: number; y: number };
  // } = {
  //   [Resources.kitsu]: { x: -50, y: 0 },
  //   [Resources.stone]: { x: 0, y: 0 },
  //   [Resources.experience]: { x: 150, y: 0 },
  //   [Resources.none]: { x: 9999, y: 9999 },
  //   [Resources.keys]: { x: 150, y: 0 },
  // };

  // useEffect(() => {
  //   if (sortedAggregatedRewards && sortedAggregatedRewards.length > 0) {
  //     // Створення нових анімованих ресурсів
  //     const newAnimatedResources = sortedAggregatedRewards.flatMap((resource) => {
  //       const iconCount = getIconCount(resource.amount);

  //       const startPos = resourceStartPositions[resource.];
  //       return Array.from({ length: iconCount }, (_, index) => ({
  //         id: `${resource.resourceType}-${Date.now()}-${index}`,
  //         type: resource.resourceType,
  //         startPosition: {
  //           x: startPos.x + Math.random() * 100 - 100, // невелике зміщення для кожного іконки
  //           y: startPos.y + Math.random() * 100 - 50,
  //         },
  //       }));
  //     });
  //     setAnimatedResources(newAnimatedResources);
  //   }
  // }, [resources]);

  useEffect(() => {
    if (isResourcesShown) {
      const timer = setTimeout(() => {
        setAnimatedResources([]);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isResourcesShown]);

  const getIconCount = (value: number) => {
    if (value >= 3000) {
      return 40;
    } else if (value >= 300 && value < 3000) {
      return 35;
    } else if (value > 100 && value < 300) {
      return 20;
    } else {
      return 15;
    }
  };

  const RenderResourceIco = (props: { type?: Resources }) => {
    switch (props.type) {
      case Resources.experience:
        return (
          <div className="w-14 h-14">
            <XPIco />
          </div>
        );
      case Resources.kitsu:
        return (
          <div className="w-14 h-14">
            <KitsuIco />
          </div>
        );
      case Resources.stone:
        return (
          <div className="w-14 h-14">
            <StoneIco />
          </div>
        );
      default:
        return <div />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="fixed inset-0 z-40" onClick={onClose}>
      {!isResourcesShown && (
        <div className="w-full h-full absolute bg-gradient-to-b from-black via-black/70 to-black opacity-80"></div>
      )}
      <div className="absolute top-[35%] w-full h-full inset-x-4 rounded-[2px] p-[2px] left-0">
        {!isResourcesShown && (
          <div className="relative top-[-23%] flex w-full h-full ">
            <DungeonCompletErays />
          </div>
        )}

        {!isResourcesShown && (
          <div className="absolute top-[-20px] left-0 right-0 flex justify-center">
            <LevelUpBanner text={`Dungeon Completed`} />
          </div>
        )}

        <motion.div
          className="absolute w-full h-full flex justify-center pt-5 top-[3%]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* {isResourcesShown &&
            animatedResources.map((res) => {
              const targetPosition = balancePositions[res.type];
              if (!targetPosition) return null;

              const relativeEndPosition = getRelativePosition(
                targetPosition,
                res.type
              );

              return (
                <AnimatedResource
                  key={res.id}
                  iconType={res.type}
                  startPosition={res.startPosition}
                  endPosition={relativeEndPosition}
                  onAnimationComplete={() => handleAnimationComplete(res.id)}
                />
              );
            })} */}
          {!isResourcesShown &&
            sortedAggregatedRewards.map((resource) => {
              if (!resourceRefs.current[resource.type]) {
                resourceRefs.current[resource.type] = null;
              }

              return (
                <motion.div
                  key={resource.type}
                  variants={itemVariants}
                  className="mx-2"
                  ref={(el) => (resourceRefs.current[resource.type] = el)}
                >
                  <div className="w-[72px] h-[72px]">
                    <div className="w-full h-full flex justify-center items-center">
                      <div className="w-14 h-14">
                        <img src={resource.image} />
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-white text-2xl font-normal leading-normal">
                    {resource.amount}
                  </div>
                </motion.div>
              );
            })}
        </motion.div>
      </div>
    </div>
  );
};
