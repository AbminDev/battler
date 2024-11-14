import React from "react";

export const HeroRating = ({
  claimedLevels,
  totalLevels,
  starsWidth
}: {
  claimedLevels: number;
  totalLevels: number;
  starsWidth: string
}) => {
  const totalParts = 25; // 5 зірок по 5 частин
  const filledParts = (claimedLevels / totalLevels) * totalParts;

  console.log("filledParts", filledParts);

  const fullStars = Math.floor(filledParts / 5);
  const partialParts = Math.floor(filledParts % 5);
  console.log("partialParts", partialParts)
  const emptyStars = 5 - fullStars - (partialParts > 0 ? 1 : 0);

  // Визначаємо, яке часткове зображення використовувати
  const getPartialStar = (parts: any) => {
    switch (parts) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 3:
        return 3;
      case 4:
        return 4;
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center space-x-[1px] z-30 ">
      {/* Повні зірки */}
      {Array.from({ length: fullStars }, (_, index) => (
        <img
          key={`full-${index}`}
          src={require("../../../../assets/images/stars/full-star.png")}
          className={`${starsWidth}`}
          alt="Повна зірка"
        />
      ))}

      {/* Часткова зірка */}
      {partialParts > 0 && (
        <img
          key={`partial`}
          src={require(`../../../../assets/images/stars/star-${getPartialStar(
            partialParts
          )}.png`)}
          className={`${starsWidth}`}
          alt={`Часткова зірка - ${partialParts}/5`}
        />
      )}

      {/* Порожні зірки */}
      {Array.from({ length: emptyStars }, (_, index) => (
        <img
          key={`empty-${index}`}
          src={require("../../../../assets/images/stars/empty-start.png")}
          className={`${starsWidth}`}
          alt="Порожня зірка"
        />
      ))}
    </div>
  );
};
