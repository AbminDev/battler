import React from "react";
import { motion } from "framer-motion";

export const FloatingNumber = ({ value }: { value: number }) => {
  // Визначаємо розмір шрифту залежно від значення
  const fontSize = Math.min(24 + Math.abs(value) * 2, 60);
  const color = value > 0 ? "green" : "red";

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 0, y: -50 }}
      transition={{ duration: 1.5 }}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        color: color,
        fontSize: `${fontSize}px`,
        fontWeight: "bold",
        textShadow: `
        -1px -1px 0 #000,
        1px -1px 0 #000,
        -1px 1px 0 #000,
        1px 1px 0 #000
      `,
      }}
    >
      {value > 0 ? `+${value}` : value}
    </motion.div>
  );
};
