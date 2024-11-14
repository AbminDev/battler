import React from "react";
import { motion } from "framer-motion";

interface AnimatedFooterProps {
  children: React.ReactNode;
}

const footerVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8, // Тривалість анімації Footer
    },
  },
};

export const AnimatedFooter: React.FC<AnimatedFooterProps> = ({ children }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    exit="hidden"
    variants={footerVariants}
  >
    {children}
  </motion.div>
);
