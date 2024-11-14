import { Handle, Position } from "@xyflow/react";
import React from "react";

export const SkillNode = ({ data }: { data: any }) => {

  // Визначаємо шлях до зображення
  let imageSrc = require(`../../../../../../assets/images/heroes/upgradeIcons/${data.image}`);

  // Встановлюємо класи для розміру та анімації
  let imageClasses = `${
    data.size === "large" ? "w-20 h-20" : "w-8 h-8"
  } transition-transform duration-300`;

  // Ініціалізуємо рядок фільтрів
  let filterStyle = "";

  // Якщо навичка не заявлена, додаємо grayscale
  if (!data.claimed) {
    filterStyle += "grayscale(100%) ";
  }


  // Додаємо відповідні drop-shadow базуючись на стані
  if (data.selected) {
    // Якщо вибрана, додаємо drop-shadow-selected
    filterStyle +=
      "drop-shadow(0 0 6px rgba(255, 255, 0, 1)) " +
      "drop-shadow(0 0 10px rgba(255, 215, 0, 0.8)) " +
      "drop-shadow(0 0 15px rgba(255, 223, 0, 0.6))";
    // Додаємо масштабування
    imageClasses += " transform scale-105";
  } else if (!data.claimed && data.available) {
    // Якщо доступна, додаємо drop-shadow-yellow
    filterStyle += " drop-shadow(0 0 6px rgba(255, 255, 0, 1))";
  }

  return (
    <div className="relative flex justify-center items-center ">
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: "rgba(0,0,0,0)", // Прозорий фон
          border: "none", // Без обводки
          width: 1,
          height: 1,
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: "rgba(0,0,0,0)", // Прозорий фон
          border: "none", // Без обводки
          width: 10,
          height: 10,
        }}
      />
      <img
        className={imageClasses}
        src={imageSrc}
        alt={data.alt}
        style={{ filter: filterStyle }}
      />
    </div>
  );
};
