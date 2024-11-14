import { useEffect, useState } from "react";
import { RecruitCard } from "./components";
import { PopupButton } from "../../../../../../components/PopupButton";
import { AnimatePresence, motion } from "framer-motion";
import { LootBoxOpenResult } from "../../../../../../interfaces/lootBotx";
import { DisplayData } from "../../../../../../utils/lootBoxHandler";

export const OpenRecruitCards = ({
  cardData,
  keys,
  onRecruit,
}: {
  cardData: DisplayData[];
  keys: number;
  onRecruit: (amount: number) => void;
}) => {
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  const [flipAll, setFlipAll] = useState(false);

  const [isAnimating, setIsAnimating] = useState(true);
  const [flippedCount, setFlippedCount] = useState(0);

  useEffect(() => {
    if (cardData) {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const centerX = screenWidth / 8.5;
      const centerY = 0;

      const cardWidth = 80;
      const cardHeight = 115;

      const horizontalSpacing = 20;
      const verticalSpacing = 10;

      const numRows = 4;
      const numVerticalSpacings = numRows - 1;

      let extraSpacing = 300;

      if (screenHeight >= 850) {
        extraSpacing = 200;
      }

      const totalHeight =
        numRows * cardHeight + numVerticalSpacings * verticalSpacing;

      const topY = centerY - totalHeight + extraSpacing;

      const positions = [];

      if (cardData.length === 1) {
        // Якщо одна картка, розміщуємо її по центру
        positions.push({
          x: 0,
          y: 0,
        });

        setPositions(positions);

        setTimeout(() => {
          setIsAnimating(false);
        }, 1000);

        return;
      }

      // 1-й рядок з 2 картками
      {
        const numCards = 2;
        const totalWidth =
          numCards * cardWidth + (numCards - 1) * horizontalSpacing;
        const leftX = centerX - totalWidth / 2;

        positions.push(
          { x: leftX, y: topY },
          { x: leftX + cardWidth + horizontalSpacing, y: topY }
        );
      }

      // 2-й рядок з 3 картками
      {
        const numCards = 3;
        const totalWidth =
          numCards * cardWidth + (numCards - 1) * horizontalSpacing;
        const leftX = centerX - totalWidth / 2;
        const y = topY + cardHeight + verticalSpacing;

        positions.push(
          { x: leftX, y: y },
          { x: leftX + cardWidth + horizontalSpacing, y: y },
          { x: leftX + 2 * (cardWidth + horizontalSpacing), y: y }
        );
      }

      // 3-й рядок з 3 картками
      {
        const numCards = 3;
        const totalWidth =
          numCards * cardWidth + (numCards - 1) * horizontalSpacing;
        const leftX = centerX - totalWidth / 2;
        const y = topY + 2 * (cardHeight + verticalSpacing);

        positions.push(
          { x: leftX, y: y },
          { x: leftX + cardWidth + horizontalSpacing, y: y },
          { x: leftX + 2 * (cardWidth + horizontalSpacing), y: y }
        );
      }

      // 4-й рядок з 2 картками
      {
        const numCards = 2;
        const totalWidth =
          numCards * cardWidth + (numCards - 1) * horizontalSpacing;
        const leftX = centerX - totalWidth / 2;
        const y = topY + 3 * (cardHeight + verticalSpacing);

        positions.push(
          { x: leftX, y: y },
          { x: leftX + cardWidth + horizontalSpacing, y: y }
        );
      }

      setPositions(positions);

      setTimeout(() => {
        setIsAnimating(false);
      }, 2000);
    }
  }, [cardData]);

  useEffect(() => {
    // Скидаємо стан при зміні cardData
    setFlipAll(false);
    setFlippedCount(0);
    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
    }, 2000);
  }, [cardData]);

  // Розрахунок тривалості анімації
  const maxIndex = positions.length - 1;
  const maxDelay = maxIndex * 100; // Максимальна затримка
  const flipAnimationDuration = 600; // Тривалість анімації перевертання (мс)

  const animationDuration = maxDelay + flipAnimationDuration; // Загальна тривалість

  const handleQuickFlip = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setFlipAll(!flipAll);

    setTimeout(() => {
      setIsAnimating(false);
    }, animationDuration);
  };

  const handleButtonClick = () => {
    if (isAnimating) return;
    if (flippedCount < cardData.length) {
      console.log("herere 2");
      // Якщо не всі картки перевернуті, виконуємо Quick Flip
      setIsAnimating(true);
      setFlipAll(true);
      setFlippedCount(cardData.length);

      setTimeout(() => {
        setIsAnimating(false);
      }, animationDuration);
    } else {
      setFlipAll(true);
      console.log("herere");
      setTimeout(() => {
        setIsAnimating(true);
        setFlipAll(false);
        setFlippedCount(0);

        setTimeout(() => {
          setIsAnimating(false);
        }, animationDuration);
      }, 100);
    }
  };

  const handleCardFlip = () => {
    setFlippedCount((prev) => prev + 1);
  };

  const allFlipped = flippedCount === cardData.length;

  const cards = cardData.map((data, index) => (
    <RecruitCard
      data={data}
      delay={index * 100}
      key={index}
      position={positions[index]}
      flipAll={flipAll}
      onFlip={handleCardFlip}
    />
  ));

  const handleRecruit = (amount: number) => {
    if (isAnimating) return;

    setIsAnimating(true);
    handleButtonClick();

    setTimeout(() => {
      onRecruit(amount);
    }, 1000);
  };

  console.log("allFlipped", allFlipped);
  return (
    <div
      className={`relative bg-[url('./assets/images/summon-bg.png')] bg-contain bg-center bg-no-repeat flex flex-col overflow-hidden w-full h-full left-0 top-0 items-center justify-center`}
    >
      {/* Накладка з радіальним градієнтом */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
        }}
      ></div>
      <div className="absolute bottom-0 w-full h-[45vh] bg-gradient-to-b from-transparent via-[rgba(27,27,27,0.97)] to-[#201b18]"></div>

      {cards ? cards : null}
      {cards ? (
        <AnimatePresence>
          {allFlipped ? (
            <motion.div
              className="flex gap-4 absolute bottom-[20px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {keys >= 10 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <PopupButton
                    type={isAnimating ? "gray" : "green"}
                    onClick={() => handleRecruit(10)}
                    disabled={isAnimating}
                    className="transition-colors duration-300 ease-in-out"
                  >
                    Recruit x10
                  </PopupButton>
                </motion.div>
              )}
              {keys >= 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <PopupButton
                    type={isAnimating ? "gray" : "green"}
                    onClick={() => handleRecruit(1)}
                    disabled={isAnimating}
                    className="transition-colors duration-300 ease-in-out"
                  >
                    Recruit x1
                  </PopupButton>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              className="absolute bottom-[20px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PopupButton
                type={isAnimating ? "gray" : "green"}
                onClick={handleButtonClick}
                disabled={isAnimating}
                className="transition-colors duration-300 ease-in-out"
              >
                Quick Flip
              </PopupButton>
            </motion.div>
          )}
        </AnimatePresence>
      ) : null}
    </div>
  );
};
