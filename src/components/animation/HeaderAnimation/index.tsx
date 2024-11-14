import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedHeaderProps {
  children: React.ReactNode;
}

const headerVariants = {
  hidden: {
    y: '-100%', // Починає зверху, за межами екрану
    opacity: 0,
  },
  visible: {
    y: '0%', // Позиція на екрані
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 80, // Плавність анімації
      damping: 20,
      duration: 0.8,
    },
  },
  exit: {
    y: '-100%', // Виїжджає вгору за межі екрану
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};


export const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({ children }) => (
  <motion.div initial="hidden" animate="visible" exit="hidden" variants={headerVariants}>
    {children}
  </motion.div>
);

