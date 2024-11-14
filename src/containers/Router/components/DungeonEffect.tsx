import React from "react";
import { motion, Variants } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
  direction: "down" | "up";
}

const fireflyVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.5,
  },
  animate: {
    opacity: [0.7, 1, 0.7], // Плавне мерехтіння
    scale: [1, 1.2, 1], // Зміна масштабу
    x: [0, 5, -5, 10, -10], // Менший рух по осі X
    y: [0, -5, 5, -10, 10], // Менший рух по осі Y
    transition: {
      duration: 5, // Збільшена тривалість для повільнішого руху
      repeat: Infinity, // Повторювати безкінечно
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};

const DungeonEffect: React.FC<PageTransitionProps> = ({
  children,
  direction,
}) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "down" ? -200 : 200,
      filter: "blur(5px)",
      scale: 0.9,
      rotate: 0,
      boxShadow: "0 0 15px rgba(0,0,0,0.5)",
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
      rotate: 0,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  const getRandomPosition = (index: number) => {
    const isTop = index % 2 === 0; // Чередуємо розміщення вогників між верхом і низом
    const top = isTop
      ? `${Math.random() * 20}%` // Розміщення вогників ближче до верху
      : `${79 + Math.random() * 20}%`; // Розміщення вогників ближче до низу
    const left = `${Math.random() * 80 + 10}%`; // Рандомне розташування по ширині, щоб уникнути центру

    return { top, left };
  };

  
  const generateFireflyPositions = (count: number) => {
    const positions = [];
    const margin = 10; // Відступ від країв і між вогниками
    const isTop = true;
  
    for (let i = 0; i < count; i++) {
      const isTop = i % 2 === 0; // Чергуємо між верхньою і нижньою частиною
      const top = isTop
        ? `${Math.random() * 20 + margin}%` // Верхня частина (0-10%)
        : `${85 + Math.random() * 20 - margin}%`; // Нижня частина (90-100%)
      
      const left = `${Math.random() * 80 + 10}%`; // Рандомне розташування по ширині
      
      // Додаємо випадковий зсув для більш природного вигляду
      const randomOffsetX = Math.random() * 10 - 5; // Зсув по X
      const randomOffsetY = Math.random() * 10 - 5; // Зсув по Y
  
      positions.push({ top: `calc(${top} + ${randomOffsetY}px)`, left: `calc(${left} + ${randomOffsetX}px)` });
    }
  
    return positions;
  };


  // const fireflyPositions = generateFireflyPositions(16); // Задаємо кількість вогників
  // const fireflies = fireflyPositions.map((position, index) => (
  //   <motion.div
  //     key={index}
  //     className="firefly z-50"
  //     variants={fireflyVariants}
  //     initial="initial"
  //     animate="animate"
  //     style={{
  //       position: 'absolute',
  //       top: position.top,
  //       left: position.left,
  //       width: '10px',
  //       height: '10px',
  //       background: 'orange',
  //       borderRadius: '50%',
  //       boxShadow: '0 0 20px orange',
  //     }}
  //   />
  // ));

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
        boxShadow: "inset 0 0 50px rgba(0,0,0,0.8)",
      }}
    >
      {/* Додаємо вогники до сторінки */}
      {/* {fireflies} */}
      {children}
    </motion.div>
  );
};

export default DungeonEffect;
