// src/components/AnimatedResource.jsx

import React from "react";
import { motion } from "framer-motion";
import { RenderResourceIco } from "../..";

export const AnimatedResource = ({
  iconType,
  startPosition,
  endPosition,
  onAnimationComplete,
}: {
  iconType: any;
  startPosition: any;
  endPosition: any;
  onAnimationComplete: any;
}) => {
  const randomDelay = Math.random() * 0.5; // Випадкова затримка до 0.5 секунд
  

  return (
    <motion.div
      initial={{
        x: startPosition.x,
        y: startPosition.y,
        opacity: 1,
        scale: 1,
        rotate: 0,
      }}
      animate={{
        x: endPosition.x,
        y: endPosition.y,
        opacity: 0,
        scale: 0.5,
        rotate: 360,
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: randomDelay,
      }}
      onAnimationComplete={onAnimationComplete}
      style={{
        position: "absolute",
        pointerEvents: "none",
        zIndex: 999
      }}
    >
      <RenderResourceIco type={iconType} />
    </motion.div>
  );
};
