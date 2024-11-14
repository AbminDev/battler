import React from "react";

export const ProgressBar = ({
  current,
  total,
  color = "bg-[#ff3a3a]",
}: {
  current: number;
  total: number;
  color?: string;
}) => {
  // Обчислюємо ширину прогрес бару в процентах
  const progressPercentage = (current / total) * 100;

  return (
    <div className="relative h-4 w-full bg-zinc-800 rounded-[3px] shadow-inner border border-black">
      <div
        className={`h-3.5 rounded-sm ${color}`}
        style={{ width: `${progressPercentage}%` }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white text-sm">{`${current}/${total}`}</span>
      </div>
    </div>
  );
};
