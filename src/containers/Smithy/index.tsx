import {useEffect, useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PopupButton } from "../../components/PopupButton";
import { CardProps } from "../../interfaces/card";
import { useTelegram } from "../../hooks/useTelegram";
import { Card } from "../../components/Card";
import { UpgradeArrow } from "../Room";
import {
  CardsAtDeck,
  getUpgradePrice,
  upgradeCard,
} from "../../endpoints/dungeonEndpoints";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {useSoundService} from "../../utils/soundService";

export const Smithy = ({
  cardsAtDeck,
  closeDeck,
  gold,
  updateSomeStates,
}: {
  cardsAtDeck: CardsAtDeck[];
  closeDeck: () => void;
  gold: number;
  updateSomeStates: any;
}) => {
  const actualSaves = useSelector(
    (state: RootState) => state.battleSave.battleSave.save
  );

  const [zoomedCard, setZoomedCard] = useState({} as CardProps);
  const [upgradeCount, setUpgradeCount] = useState(0);
  const [price, setPrice] = useState(-1);
  const { userId } = useTelegram();
  const [isAnimating, setIsAnimating] = useState(false);
  const { playSound } = useSoundService();
  const [cards, setCards] = useState<
    { id: number; lvl: number; uid: string }[]
  >(
    []
  );
  useEffect(() => {
    const a = async () => {
      const result = await getUpgradePrice({
        stageId: actualSaves?.currentStage!,
        clientId: userId,
        dungeonId: actualSaves?.dungeonId!,
      });

      if (result) {
        setPrice(result?.price);
        setUpgradeCount(result?.price / 10);
      }
    }
    a();
  }, []);

  useEffect(() => {

  }, [upgradeCount]);

  const calculatePrice = () => {
    if (upgradeCount === 0) {
      return "Free";
    }
    return upgradeCount * 10;
  };

  useEffect(() => {
    // console.log('CARDS AT DECK SMITHY', cardsAtDeck);
    setCards(cardsAtDeck.map((card) => {
      return { id: card.cardId, lvl: card.stars, uid: card.cardUid };
    }));
  }, [cardsAtDeck]);



  const handleOpenUpgrade = (card: CardProps) => {
    const getUpdateCost = async () => {
      const result = await getUpgradePrice({
        stageId: actualSaves?.currentStage!,
        clientId: userId,
        dungeonId: actualSaves?.dungeonId!,
      });

      if (result) {
        setPrice(result?.price);
      }
    };
    getUpdateCost();
    setZoomedCard(card);
  };

  const handleCloseUpgrade = () => {
    setZoomedCard({} as CardProps);
  };

  const handleUpdateCard = async (card: {
    id: number;
    lvl: number;
    uid: string;
  }) => {
    // console.log("here");
    try {
      setIsAnimating(true); // Почати анімацію
      const response = await upgradeCard({
        clientId: userId,
        cardUid: card.uid,
        dungeonId: actualSaves?.dungeonId!,
        stageId: actualSaves?.currentStage!,
      });
      if (response) {
        setTimeout(() => {
          setIsAnimating(false);
          handleCloseUpgrade();
          setUpgradeCount(upgradeCount + 1);
          updateSomeStates({gold: response.gold, currentMana: response.currentMana, currentHp: response.currentHp, cardsAtDeck: response.cardsAtDeck});
        }, 1000); // Тривалість анімації + затримка
      }
    } catch (e) {
      console.error("Error updating card:", e);
    }
  };

  const upgradeVariants = {
    initial: { scale: 1, boxShadow: "0px 0px 0px rgba(255, 255, 255, 0)" },
    animate: {
      scale: [1, 1.2, 1],
      // boxShadow: [
      //   "0px 0px 10px rgba(255, 255, 255, 0.8)",
      //   "0px 0px 20px rgba(255, 255, 255, 1)",
      //   "0px 0px 10px rgba(255, 255, 255, 0.8)",
      // ],
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };
  useEffect(() => {

  }, [cards]);
  useEffect(() => {

  }, [upgradeCount]);

  return (
    <div>
      <div className="w-full h-full fixed top-0 left-0 bottom-0 right-0 z-[41]">
        <div className="w-full h-full absolute bg-black opacity-60"></div>
        <div className="absolute top-12 inset-x-4 bottom-16 bg-[#554837] border border-[#18191a] rounded-[2px] p-[2px]">
          <button
            className="absolute z-10 w-7 h-7 -top-2 -right-2 bg-gradient-to-b from-[#B43D2F] to-[#893026] border border-[#18191a] rounded-full flex items-center justify-center"
            onClick={closeDeck}
          >
            <img
              src={require("../../assets/images/smithy-modal-close.png")}
              className="w-7 h-7"
              alt=""
            />
          </button>
          <div className="w-full h-full bg-[#242520] border border-[#18191a] rounded-[2px] p-3 shadow-inner-sm-white">
            <div className="relative w-full h-full bg-[#201b18] rounded-[1px] p-3 pt-7 shadow-inner-sm-black">
              <div className="absolute top-[-28px] left-0 right-0 flex justify-self-center">
                <div className="min-w-[120px] bg-[#847a70] border border-[#18191a] rounded-[2px] p-[1px] mx-auto">
                  <div
                    className="bg-[#351d1e] text-center text-white text-xl p-[7px] leading-none rounded-[1px] border
                        border-[#18191a] shadow-inner-sm-black"
                  >
                    Smithy
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-x-4 mb-4">
                <div className="text-center text-[#a49a7c] text-sm font-light leading-[14px]">
                  Select the card to upgrade. Current price:
                  <span className="text-white"> {upgradeCount === 0?"Free": upgradeCount * 10}</span>
                </div>
              </div>
              <div className="w-full h-px bg-[#584d3c]"></div>

              <div
                className={`overflow-x-hidden overflow-y-auto absolute left-3 right-3 bottom-0 top-[80px]`}
              >
                {cards.length ? (
                  <div className="grid grid-cols-3 gap-7 mb-3">
                    {cards.map((card, index) => (
                      <motion.div
                        key={card.uid}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleOpenUpgrade({ ...card })}
                        className="cursor-pointer"
                      >
                        <Card
                          id={card.id}
                          lvl={card.lvl}
                          uid={card.uid}
                          hidden={false}
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full w-full text-2xl text-white pb-12">
                    Empty
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {zoomedCard && Object.keys(zoomedCard).length !== 0 && price >= 0 && (
          <div>
            <div className="bg-black opacity-60 absolute top-0 left-0 right-0 bottom-0 w-full h-full z-10"></div>
            <div className="absolute z-10 top-0 left-0 right-0 bottom-0 w-full h-full flex flex-col items-center justify-center">
              <div className="flex items-center justify-center gap-2 pb-[43px]">
                <div className="flex flex-col gap-4 items-center justify-center relative w-[115px]">
                  <Card
                    id={zoomedCard.id}
                    lvl={zoomedCard.lvl }
                    uid={zoomedCard.uid}
                    hidden={false}
                    glow={isAnimating}
                    IsDraggable={true}
                  />
                </div>

                <UpgradeArrow direction="right" height={24} width={24} />

                <AnimatePresence>
                  <motion.div
                    key={zoomedCard.uid}
                    variants={upgradeVariants}
                    initial="initial"
                    animate={isAnimating ? "animate" : "initial"}
                    exit="initial"
                    className="flex flex-col gap-4 items-center justify-center relative w-[135px]"
                  >
                    <Card
                      id={zoomedCard.id}
                      lvl={zoomedCard.lvl === 3 ? zoomedCard.lvl : zoomedCard.lvl+1}
                      uid={zoomedCard.uid}
                      hidden={false}
                      glow={true}
                      IsDraggable={true}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex justify-center items-center gap-[96px]">
                <PopupButton
                  type={"red"}
                  onClick={() => {
                    handleCloseUpgrade();
                    playSound('button');
                  }}
                  height={"30px"}
                  width={"70px"}
                >
                  <div className="flex flex-col items-center px-2 gap-1 w-full h-full">
                    <div className="flex flex-row justify-center items-center gap-[2px]">
                      <div className="flex items-center justify-center pt-1 leading-[10px] w-[66px] h-[22px] text-center text-white text-base font-normal leading-none">
                        Close
                      </div>
                    </div>
                  </div>
                </PopupButton>
                <PopupButton
                  type={price === 0 ? "blue" : gold > price ? "gold" : "gray"}
                  onClick={() => {
                    //console.log("herererererer", gold, price);
                    if (gold >= price) {
                      playSound('itemUpgrade');
                      // console.log("herererererer 2");
                      handleUpdateCard({
                        id: zoomedCard.id,
                        lvl: zoomedCard.lvl,
                        uid: zoomedCard.uid,
                      });
                    } else {
                      playSound('button');
                    }
                  }}
                  height={"30px"}
                  width={"70px"}
                >
                  <div className="flex flex-col items-center px-2 gap-1 w-full h-full">
                    <div className="flex flex-row justify-center items-center gap-[2px]">
                      <div className="flex items-center justify-center pt-1 leading-[10px] w-[66px] h-[22px] text-center text-white text-base font-normal leading-none">
                        {price === 0 ? "Free" : price}
                      </div>
                    </div>
                  </div>
                </PopupButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
