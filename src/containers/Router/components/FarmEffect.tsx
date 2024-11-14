import React from "react";
import { motion } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
  direction: "down" | "up";
}

const FarmEffect: React.FC<PageTransitionProps> = ({
  children,
  direction,
}) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "down" ? -200 : 200,
      filter: "blur(5px)",
      scale: 0.9,
      rotate: direction === "up" ? -5 : 0, // Легкий нахил при підйомі
      boxShadow: "0 0 15px rgba(0,0,0,0.5)", // Додавання тіні
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      y: direction === "down" ? 200 : -200,
      filter: "blur(10px)",
      scale: 1.1,
      rotate: direction === "up" ? 5 : 0,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        background:
          "radial-gradient(circle, rgba(0,0,0,0.8) 50%, rgba(0,0,0,1) 100%)",
        overflow: "hidden",
        boxShadow: "inset 0 0 50px rgba(0,0,0,0.8)", // Ефект тіні по краях
      }}
    >
      {children}
    </motion.div>
  );
};

export default FarmEffect;
