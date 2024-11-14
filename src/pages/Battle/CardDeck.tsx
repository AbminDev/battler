import { motion, useAnimation } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Card } from "../../components/Card";
import { preloadImages } from "../../utils/preloadImages";
import { mockCards } from "../../endpoints/mock";

interface CardDeckProps {
  triggerBossCardAnimationHit: boolean;
  initialDeck: any[];
  showDeck: boolean;
}

export const CardDeck: React.FC<CardDeckProps> = ({
  triggerBossCardAnimationHit,
  initialDeck,
  showDeck,
}) => {
  
  const [deck, setDeck] = useState(initialDeck);
  const [selectedCard, setSelectedCard] = useState<
    (typeof initialDeck)[0] | null
  >(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const deckRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    setDeck(initialDeck);
  }, [initialDeck]);

  useEffect(() => {
    if (triggerBossCardAnimationHit && imagesLoaded) {
      handleDrawCard();
    }
  }, [triggerBossCardAnimationHit, imagesLoaded]);

  useEffect(() => {
    const imageSources = initialDeck.map((card) => {
      return require(`../../assets/images/cards/${
        mockCards.find((obj) => obj.id === card.id)?.data.name
      }-${card.lvl}Star.png`);
    });

    preloadImages(imageSources)
      .then(() => {
        // console.log("All images loaded");
        setImagesLoaded(true);
      })
      .catch((err) => {
        console.error("Failed to preload images 2", err);
        setImagesLoaded(true); // Продовжуємо навіть якщо деякі зображення не завантажилися
      });
  }, [initialDeck]);

  useEffect(() => {
    if (showDeck) {
      controls.start({ opacity: 1, x: 0 });
    } else {
      controls.start({ opacity: 0, x: -200 });
    }
  }, [showDeck, controls]);

  const handleDrawCard = () => {
    if (deck.length > 0 && !isAnimating) {
      const card = deck[0];
      // console.log("handleDrawCard", card);
      setSelectedCard(card);
      setDeck(deck.slice(1));
      setIsAnimating(true);
      setCardVisible(false);
    }
  };
  // console.log("selectedCard", selectedCard);
  // console.log("cardVisible", cardVisible);

  let cardId =
    selectedCard && selectedCard.id != null && selectedCard.id !== 0
      ? selectedCard.id
      : 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      animate={controls}
      transition={{ duration: 0.5 }}
      className="absolute flex justify-center items-center top-32"
    >
      <div
        ref={deckRef}
        className="deck"
        style={{
          position: "relative",
          width: 20, // 1/4 розміру
          height: 35, // 1/4 розміру
          margin: "auto",
          borderRadius: 10,
        }}
      >
        {deck.map((card, index) => (
          <motion.div
            key={index}
            className="card-back"
            style={{
              position: "absolute",
              top: -index * 2,
              left: index * 2,
              width: "100%",
              height: "100%",
              background: "gray",
              borderRadius: 5,
              border: "1px solid black",
              zIndex: deck.length - index,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-white z-10">
              {deck.length - index}
            </div>
          </motion.div>
        ))}
      </div>

      {selectedCard && (
        <motion.div
          className="card-face"
          initial={{
            x: 0 - cardId * 2, // Початкова позиція колоди
            y: 0 + cardId * 2, // Початкова позиція колоди
            scale: 0.25, // Спочатку 1/4 розміру
            rotateY: 180,
            backgroundColor: "#808080",
            opacity: 1, // Спочатку сірий фон
          }}
          animate={{
            x: "-120px", // Летить в верхній лівий кут
            y: "50px", // Летить догори
            scale: 1, // Повний розмір
            rotateY: 360, // Поворот карти
            backgroundColor: cardVisible ? "transparent" : "#808080", // Змінюємо фон на прозорий
          }}
          transition={{ duration: 0.5 }}
          onUpdate={(latest) => {
            if (Number(latest.x) <= -60 && !cardVisible) {
              setCardVisible(true);
            }
          }}
          onAnimationComplete={() => {
            setIsAnimating(false);
            setTimeout(() => setSelectedCard(null), 1200); // Приховуємо карту після анімації
          }}
          style={{
            position: "absolute",
            width: 100, // Повний розмір
            height: 150, // Повний розмір
            background: "black",
            borderRadius: cardVisible ? 0 : 10,
            border: cardVisible ? "" : "1px solid black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {cardVisible && (
            <Card
              id={selectedCard.id}
              lvl={selectedCard.lvl}
              uid={selectedCard.uid}
              hidden={false}
            />
          )}
        </motion.div>
      )}
    </motion.div>
  );
};
