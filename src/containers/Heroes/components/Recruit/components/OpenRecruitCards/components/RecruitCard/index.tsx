// RecruitCard.tsx

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { ItemType } from "../../../../../../../../interfaces/lootBotx";
import { DisplayData } from "../../../../../../../../utils/lootBoxHandler";

interface RecruitCardProps {
  data: DisplayData;
  delay: number;
  position: { x: number; y: number };
  flipAll: boolean;
  onFlip: () => void;
}

export const RecruitCard = ({
  data,
  delay,
  position,
  flipAll,
  onFlip,
}: RecruitCardProps) => {
  const initialY =
    typeof window !== "undefined" ? window.innerHeight + 200 : 1000;
  const randomX = Math.random() * 400 - 200;
  const randomRotation = Math.random() * 360 - 180;
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    if (!isFlipped) {
      onFlip();
      setIsFlipped(true);
    }
  };

  useEffect(() => {
    setIsFlipped(flipAll);
  }, [flipAll]);

  const frontBackgroundImage = require("../../../../../../../../assets/images/recruit/cardBg.png");
  const backBackgroundImage = require(`../../../../../../../../assets/images/recruit/cardBg-${data.rarity}.png`);

  const textColors = [  "#82e6f6", "#eaa1ff","#f7de52", "#ffa777",  "#52f7b5"];
  const bgColor = [  "#207EA1","#74217A" ,"#bd7027","#bc4727",  "#168A5B"];

  const textStyle = { color: textColors[data.rarity] };
  const bgStyle = { backgroundColor: bgColor[data.rarity] };
  const glowStyle =
    data.type === ItemType.timeBoosts
      ? { boxShadow: "0 0 15px rgba(255, 255, 0, 0.8)" }
      : {};

  return (
    <motion.div
      onClick={handleCardClick}
      style={{
        position: "absolute",
        transformStyle: "preserve-3d",
      }}
      initial={{ x: randomX, y: initialY, rotate: randomRotation, opacity: 0 }}
      animate={{
        x: position.x,
        y: position.y,
        rotate: 0,
        opacity: 1,
        rotateY: isFlipped ? 180 : 0,
      }}
      transition={{
        delay: delay / 1000,
        duration: 1,
        type: "spring",
        stiffness: 70,
      }}
      className="w-[80px] h-[115px] relative cursor-pointer"
    >
      <div
        className={`absolute inset-0 bg-cover bg-center p-4 flex items-center justify-center text-xl font-semibold rounded-lg shadow-md`}
        style={{
          backfaceVisibility: "hidden",
          backgroundImage: `url(${frontBackgroundImage})`,
        }}
      ></div>
      <div
        className={`absolute inset-0 bg-cover bg-center p-4 flex flex-col items-center justify-center text-xl font-semibold rounded-lg shadow-md`}
        style={{
          transform: "rotateY(180deg)",
          backfaceVisibility: "hidden",
          backgroundImage: `url(${backBackgroundImage})`,
          ...glowStyle,
        }}
      >
        {/* Контент задньої сторони */}
        <div className="pb-5">
          <img src={data.image} alt={data.name} />
        </div>

        <div
          className="absolute bottom-[5px] left-0 right-0 mx-auto h-6 w-[calc(100%-0.25rem)] rounded-bl-sm rounded-br-sm flex items-center justify-center"
          style={bgStyle}
        >
          <div
            className="text-center  text-xs font-normal leading-3"
            style={textStyle}
          >
            {data.name} x{data.amount}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
