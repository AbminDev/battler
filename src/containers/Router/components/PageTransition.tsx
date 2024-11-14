import React from "react";
import { motion, Variants } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const variants: Variants = {
    hidden: {
      opacity: 0,
      backgroundColor: "black", // Задаємо чорний фон під час затемнення
    },
    visible: {
      opacity: 1,
      backgroundColor: "transparent", // Повертаємо прозорість, щоб висвітлити сторінку
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      backgroundColor: "black", // Затемнення перед виходом
      transition: {
        duration: 0.5,
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
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
