import React from "react";

interface LanguageCardProps {
  code: string;
  language: string;
  isSelected: boolean;
  onSelect: (language: string) => void;
}

export const LanguageCard: React.FC<LanguageCardProps> = ({
  code,
  language,
  isSelected,
  onSelect,
}) => {
  return (
    <button
      onClick={() => onSelect(code)}
      disabled={isSelected}
      className={`p-4 bg-stone-900 rounded-md mb-2 ${
        isSelected ? "shadow-[0_0_0_1px_white]" : "shadow-[0_0_0_1px_#554837]"
      } flex justify-between items-start gap-2.5`}
    >
      <div className="text-stone-300 text-base font-normal leading-none">
        {language}
      </div>
      {isSelected ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 5.25L7.5 12.75L3.75 9"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        ""
      )}
    </button>
  );
};
