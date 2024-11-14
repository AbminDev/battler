// components/ActiveCards.tsx
import React, { useState, useRef, useEffect } from "react";
import { Card } from "../../components/Card";
import { CardProps } from "../../interfaces/card";
import { DraggableCore } from "react-draggable";
import { motion, AnimatePresence } from "framer-motion";
import {
  CardType,
  ConditionParameter,
  ConditionSide,
  mockCards,
  Opponent,
} from "../../endpoints/mock";
import { useTelegram } from "../../hooks/useTelegram";
import { preloadImages } from "../../utils/preloadImages" // Імпортуємо утиліту
import {useSoundService} from "../../utils/soundService";

export const ActiveCards = ({
  cards,
  makeCardAction,
  usedCards,
  setUsedCards,
  cardStrategy,
  removeCard,
  isDraggingCards,
}: {
  cards: any[];
  makeCardAction: any;
  usedCards: CardProps[];
  setUsedCards: any;
  cardStrategy: any;
  removeCard: any;
  isDraggingCards: boolean;
}) => {
  // console.log('we are here ', cards)
  const activeCardsRef = useRef<HTMLDivElement>(null);
  const [activeCardsHeight, setActiveCardsHeight] = useState<number>(0);
  const allowedDropAreaRef = useRef<HTMLDivElement>(null);
  const [draggableCard, setDraggableCard] = useState<string>("");
  const [cardsAtHand, setCardsAtHand] = useState<CardProps[]>([]);
  const [cardTypes, setCardTypes] = useState<{ [uid: string]: CardType }>({});
  const [cardUsedTypes, setUsedCardTypes] = useState<{ [uid: string]: CardType }>({});
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  const [dragOffsets, setDragOffsets] = useState<{ x: number; y: number }[]>([]);
  const [usedCardsPosition, setUsedCardsPosition] = useState<{ x: number; y: number }[]>([]);
  const { userId } = useTelegram();

  const [discardingCardIndex, setDiscardingCardIndex] = useState<number | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false); // Стан для відстеження завантаження зображень

  // console.log('CARDS AT HAND', cardsAtHand);

  useEffect(() => {
    if (activeCardsRef.current) {
      const currentHeight = activeCardsRef.current.offsetHeight;
      if (currentHeight > activeCardsHeight) {
        //console.log(currentHeight);
        setActiveCardsHeight(currentHeight);
      }
    }
  }, [cardsAtHand]);

  useEffect(() => {
    //console.log('USE EFFECT CARDS AT HAND', cardsAtHand);
    playSound('cardPlay');
  }, [cardsAtHand]);

  // Синхронізуємо positions та dragOffsets з cardsAtHand
  useEffect(() => {
    setPositions(cardsAtHand.map(() => ({ x: 0, y: 0 })));
    setDragOffsets(cardsAtHand.map(() => ({ x: 0, y: 0 })));
  }, [cardsAtHand]);

  useEffect(() => {
    const sortedCards = [...cards].sort((a, b) => a?.id - b?.id);
    const initializedCards = sortedCards.map((card) => ({
      ...card,
      draggable: true,
      isBackLight: card?.isBackLight,
    }));

    // Підготовка шляхів до зображень для попереднього завантаження
    const imagePaths = initializedCards.map(card => {
      try {
        return require(`../../assets/images/cards/${mockCards.find(obj => obj.id === card.id)?.data.name}-${card.lvl}Star.png`);
      } catch (error) {
        console.error(`Image for card ID ${card.id} not found.`);
        return null;
      }
    }).filter(src => src !== null);

    // Попереднє завантаження зображень
    preloadImages(imagePaths)
      .then(() => {
        //console.log('All images preloaded successfully.');
        setCardsAtHand(initializedCards);
        setPositions(initializedCards.map(() => ({ x: 0, y: 0 })));
        setDragOffsets(initializedCards.map(() => ({ x: 0, y: 0 })));
        setImagesLoaded(true); // Встановлюємо стан після завантаження всіх зображень
      })
      .catch((error: any) => {
        console.error('Error preloading images:', error);
        // Можна вирішити, що робити у випадку помилки (наприклад, показати повідомлення)
      });
  }, [cards]);

  useEffect(() => {
    const updateCardTypes = () => {
      const newCardTypes = {} as any;

      cards.forEach((card) => {
        const cardData = mockCards.find((v) => v.id === card.id)?.data;

        if (cardData) {
          // console.log("cardData", cardData);
          newCardTypes[card.uid] = cardData.type;

          cardStrategy[cardData.type]({ card });
        }
      });

      setCardTypes(newCardTypes);
    };

    updateCardTypes();
  }, [cards.length]);

  const updateCardTypesUsed = (newArray: CardProps[]) => {
    const newCardTypes: { [uid: string]: CardType } = {};

    newArray.forEach((card: CardProps) => {
      const cardData = mockCards.find((v: any) => v.id === card.id)?.data;
      if (cardData) {
        newCardTypes[card.uid] = cardData.type;
      }
    });

    setUsedCardTypes(newCardTypes);
  };

  const scale: number = 1.3;

  const getRotationAngle = (index: number, totalCards: number) => {
    const maxAngle = 8;
    const minAngle = -8;

    if (totalCards <= 2) return 0;

    const angleStep = (maxAngle - minAngle) / (totalCards - 1);

    return (minAngle + index * angleStep).toFixed(2);
  };

  const getVerticalOffset = (index: number, totalCards: number) => {
    const b = totalCards < 6 ? -15 : -25;

    if (totalCards === 1) return 0;

    const angleStep = Math.PI / (totalCards - 1);
    const angle = angleStep * index;

    return (b * Math.sin(angle)).toFixed(2);
  };

  const selectedTransformStyle = {
    transform: `rotate(0deg) translateY(0)`,
  };

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleStart = (e: any, data: any, index: number, uid: string) => {
    if (!isDraggingCards) return false;

    if (!cardsAtHand[index].draggable || draggableCard !== "") return false;

    // Уникаємо ситуацій, де дані можуть бути некоректними
    if (data.x === null || data.y === null) return false;

    setDraggableCard(uid);
    setDragOffsets((prevOffsets) => {
      const newOffsets = [...prevOffsets];
      newOffsets[index] = { x: data.x, y: data.y };
      return newOffsets;
    });
  };

  const handleDrag = (e: any, data: any, index: number) => {
    if (!cardsAtHand[index].draggable) return false;

    let offsetX: number = data.x - dragOffsets[index].x;
    let offsetY: number = data.y - dragOffsets[index].y;

    // Існуюча логіка переміщення
    if (
      positions[index]?.x !== 0 ||
      positions[index]?.y !== 0 ||
      offsetX < 0 ||
      offsetX > 0 ||
      offsetY < 0 ||
      offsetY > 0
    ) {
      setPositions((prevPositions) => {
        const newPositions = [...prevPositions];
        newPositions[index] = {
          x: data.x - dragOffsets[index].x,
          y: data.y - dragOffsets[index].y,
        };
        return newPositions;
      });
    }
  };

  const [disappearingCard, setDisappearingCard] = useState("0");
  const { playSound } = useSoundService();

  const handleStop = (e: any, data: any, index: number) => {
    if (!cardsAtHand[index].draggable) return false;
    setDraggableCard("");

    const allowedArea = allowedDropAreaRef.current;
    if (
      allowedArea &&
      (positions[index]?.x !== 0 || positions[index]?.y !== 0)
    ) {
      const rect = allowedArea.getBoundingClientRect();
      const element = e.target.getBoundingClientRect();

      if (element.top + element.height / 2 < rect.height) {
        cardsAtHand[index].draggable = false;

        setPositions((prev) => {
          const newPositions = [...prev];
          newPositions[index] = {
            x: data.x - dragOffsets[index].x,
            y: data.y - dragOffsets[index].y,
          };
          return newPositions;
        });

        const usedCard = cardsAtHand.filter((card, i) => i === index)[0];

        const newArrayCards = [...usedCards, usedCard];

        setUsedCards(newArrayCards);

        updateCardTypesUsed(newArrayCards);
        const cardData = mockCards.find((v: any) => v.id === usedCard.id)?.data;
        if (cardData && cardData.type === CardType.spell) {
          playSound('attackMagic');
        }
        if (cardData && cardData.type === CardType.atk) {
          playSound('attackBow');
        }
        if (cardData && cardData.type === CardType.equip) {
          playSound('defend');
        }
        if (cardData && cardData.name === '16Red') {
          playSound('healing');
        }

        usedCardsPosition.push({ x: element.left, y: element.top });
        setUsedCardsPosition(usedCardsPosition);

        setPositions(positions.filter((p, i) => i !== index));
        setCardsAtHand(
          cardsAtHand.filter((card, ind) => card.uid !== usedCard.uid)
        );
        removeCard(usedCard.uid);
        setDragOffsets(dragOffsets.filter((p, i) => i !== index));

        makeCardAction({
          clientId: userId,
          cardUid: usedCard.uid,
          cardId: usedCard.id,
        });
        setDisappearingCard(cardsAtHand[index].uid);

        setTimeout(function () {
          const newUsedCards = newArrayCards;

          setUsedCards(newUsedCards);

          setTimeout(() => {
            newUsedCards.filter((card) => card.uid === usedCard.uid)[0].hidden =
              true;
            setUsedCards(newUsedCards);
          }, 1000);
          // setUsedCards((prev) => {
          //   const newUsedCards = [...prev];
          //   newUsedCards.filter((card) => card.uid === usedCard.uid)[0].hidden =
          //     true;
          //   return newUsedCards;
          // });
        }, 150);
      } else {
        setPositions((prev) => {
          const newPositions = [...prev];
          newPositions[index] = { x: 0, y: 0 };
          return newPositions;
        });
      }
    }
  };

  // Визначаємо початкову позицію для появи карт
  const initialCardPosition = { x: 70, y: 170 };

  if (!imagesLoaded) {
    // Покажіть глобальний завантажувач або нічого не рендеріть
    return null; // Або <div>Завантаження...</div>
  }

  return (
    <>
      <div
        ref={allowedDropAreaRef}
        className="absolute left-0 top-0 right-0 bottom-[330px]"
      ></div>
      {usedCards.map((card, index) => (
        <div
          className="absolute max-w-[30%]"
          key={index}
          style={{
            width: `${100 / usedCards.length + 75}%`,
            top: usedCardsPosition[index]?.y,
            left: usedCardsPosition[index]?.x,
          }}
        >
          <AnimatePresence>
            {!card.hidden && (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ position: "relative" }}
              >
                <Card
                  id={card.id}
                  lvl={card.lvl}
                  uid={card.uid}
                  glow={false}
                  IsDraggable={isDraggingCards}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {disappearingCard === card.uid && (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "100%", // Збільшена ширина
                  height: "100%", // Збільшена висота
                  transform: "translate(-50%, -50%)", // Центрування
                  zIndex: 100,
                  transition: "width 0.3s ease, height 0.3s ease",
                }}
              >
                <img
                  className="w-full h-full"
                  src={require(`../../assets/images/cardsIcons/${
                    cardUsedTypes[card.uid]
                  }.png`)}
                  alt=""
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      <div
        ref={activeCardsRef}
        className="absolute w-full px-3 pb-[144px] flex items-end h-full"
      >
        <div className="w-full flex justify-center items-end z-[5]">
          {cardsAtHand &&
            cardsAtHand.map((card, index) => {
              return (
                <DraggableCore
                  key={card.uid}
                  onStart={(e, data) => handleStart(e, data, index, card.uid)}
                  onDrag={(e, data) => handleDrag(e, data, index)}
                  onStop={(e, data) => handleStop(e, data, index)}
                >
                  <AnimatePresence>
                    <motion.div
                      className={`max-w-[30%] aspect-[0.67]`}
                      style={{
                        width: 100 / cardsAtHand.length + 75 + "%",
                        marginLeft:
                          index !== 0
                            ? cardsAtHand.length < 4
                              ? "6px" // карток менше ніж 4
                              : cardsAtHand.length < 6
                              ? "-10%" // карток менше ніж 6
                              : "-20%" // карток більше ніж 6
                            : "0",
                        zIndex: draggableCard === card.uid ? 2 : 1,
                      }}
                      key={card.uid}
                      initial={{
                        opacity: 0,
                        x: initialCardPosition.x,
                        y: initialCardPosition.y,
                        scale: 0.1,
                        rotate: 0,
                        marginLeft: 0,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        y: 0,
                        transform:
                          draggableCard === card.uid
                            ? `${selectedTransformStyle.transform} ${
                                positions[index]?.x === 0 &&
                                positions[index]?.y === 0
                                  ? " scale(1.3) translateY(-130px)"
                                  : " scale(1) translateY(0)"
                              }`
                            : `rotate(${getRotationAngle(
                                index,
                                cardsAtHand.length
                              )}deg) translateY(${getVerticalOffset(
                                index,
                                cardsAtHand.length
                              )}px) scale(1)`,
                        // Анімація marginLeft до потрібного значення
                        marginLeft:
                          index !== 0
                            ? cardsAtHand.length < 4
                              ? "6px"
                              : cardsAtHand.length < 6
                              ? "-10%"
                              : "-20%"
                            : "0",
                        willChange: "transform",
                        position: "relative",
                      }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.3,
                      }}
                    >
                      <div
                        style={{
                          transform:
                            draggableCard === card.uid
                              ? `${selectedTransformStyle.transform} translate(${positions[index]?.x}px, ${positions[index]?.y}px)`
                              : `translate(${positions[index]?.x}px, ${positions[index]?.y}px)`,
                          zIndex: draggableCard === card.uid ? 2 : 1,
                          willChange: "transform",
                          position: "relative",
                        }}
                      >
                        {draggableCard === card.uid && (
                          <div
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%", // Збільшена ширина
                              height: "100%", // Збільшена висота
                              zIndex: 100,
                              transition: "width 0.3s ease, height 0.3s ease",
                            }}
                          >
                            <img
                              className="w-full h-full"
                              src={require(`../../assets/images/cardsIcons/${
                                cardTypes[card.uid]
                              }.png`)}
                              alt=""
                            />
                          </div>
                        )}
                        <div>
                          <Card
                            id={card.id}
                            lvl={card.lvl}
                            uid={card.uid}
                            isBacklight={card?.isBacklight}
                            glow={true}
                            IsDraggable={isDraggingCards}
                            isFocused={draggableCard === card.uid}
                            card={card}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </DraggableCore>
              );
            })}
        </div>
      </div>
    </>
  );
};
