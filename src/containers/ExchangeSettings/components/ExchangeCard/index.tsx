import React from "react";

interface LanguageCardProps {
  exchange: string;
  isSelected: boolean;
  onSelect: (language: string) => void;
}

export const ExchangeCard: React.FC<LanguageCardProps> = ({
  exchange,
  isSelected,
  onSelect,
}) => {
  return (
    <button
      onClick={() => onSelect(exchange)}
      disabled={isSelected}
      className={`p-4 bg-stone-900 rounded-md mb-2 ${
        isSelected ? "shadow-[0_0_0_1px_white]" : "shadow-[0_0_0_1px_#554837]"
      } flex justify-between items-start gap-2.5`}
    >
      <div className="flex justify-center items-center gap-2">
        <div className="flex justify-center items-center w-6 h-6">
          <img
            src={require(`../../../../assets/images/exchanges/${exchange.toLocaleLowerCase()}.png`)}
          />
        </div>
        <div className="text-stone-300 text-base font-normal leading-none">
          {exchange}
        </div>
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
