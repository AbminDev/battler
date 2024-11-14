import {useEffect, useState} from "react";
import { PopupButton } from "../../components/PopupButton";
import { CardProps } from "../../interfaces/card";
import { useTelegram } from "../../hooks/useTelegram";
import { Card } from "../../components/Card";
import {
  CardsAtDeck,
  getRemovePrice,
  getUpgradePrice,
  removeCard,
  updateCard,
  upgradeCard
} from "../../endpoints/dungeonEndpoints";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {useSoundService} from "../../utils/soundService";

export const Tavern = ({
 cardsAtDeck,
 closeDeck,
 gold,
  updateSomeStates
 }: {
  cardsAtDeck: CardsAtDeck[];
  closeDeck: () => void;
  gold: number;
  updateSomeStates: any;
}) => {
  // console.log('TAVERN INIT');
  const actualSaves = useSelector(
    (state: RootState) => state.battleSave.battleSave.save
  );
  const [zoomedCard, setZoomedCard] = useState({} as CardProps);
  const [upgradeCount, setUpgradeCount] = useState(0);
  const [price, setPrice] = useState(-1);
  const { userId } = useTelegram();
  const { playSound } = useSoundService()
  const [isAnimating, setIsAnimating] = useState(false);
  const [cards, setCards] = useState<{id: number, lvl: number, uid: string}[]>([]);

  // const calculatePrice = () => {
  //   if (upgradeCount === 0) {
  //     return "Free";
  //   }
  //   return upgradeCount * 5;
  // };
  // console.log("zoomedCard && Object.keys(zoomedCard).length !== 0 && price >= 0", zoomedCard && Object.keys(zoomedCard).length !== 0 && price >= 0)
  const handleOpenUpgrade = (card: CardProps) => {
    const getUpdateCost = async () => {
      const result = await getRemovePrice({
        stageId: actualSaves?.currentStage!,
        clientId: userId,
        dungeonId:  actualSaves?.dungeonId!,
      })

      if (result) {
        setPrice(result?.price)
      }
    }
    // console.log("setZoomedCard", card)
    getUpdateCost();
    setZoomedCard(card);
  };

  const handleCloseUpgrade = () => {
    setZoomedCard({} as CardProps);
  };

  const handleRemoveCard = async (card: { id: number; lvl: number, uid: string }) => {
    try {
      setIsAnimating(true); // Почати анімацію
       const result = await removeCard({
        clientId: userId,
        cardUid: card.uid,
        dungeonId: actualSaves?.dungeonId!,
        stageId: actualSaves?.currentStage!,
      });
        setTimeout(() => {
          setIsAnimating(false);
          handleCloseUpgrade();
          updateSomeStates({
            gold: result.gold,
            currentMana: result.currentMana,
            currentHp: result.currentHp,
            cardsAtDeck: result.cardsAtDeck
          });
        }, 1000);
      //setUpgradeCount(upgradeCount + 1);

    } catch (e) {
      console.error("Error updating card:", e);
    }
  };
  useEffect(() => {
    // console.log('CARDS AT DECK SMITHY', cardsAtDeck);
    setCards(cardsAtDeck.map((card) => {
      return { id: card.cardId, lvl: card.stars, uid: card.cardUid };
    }));
  }, [cardsAtDeck]);

  useEffect(() => {

  }, [cards]);

  return (
    <div>
      <div className="w-full h-full fixed top-0 left-0 bottom-0 right-0 z-[41]">
        <div className="w-full h-full absolute bg-black opacity-60"></div>
        <div className="absolute top-12 inset-x-4 bottom-16 bg-[#554837] border border-[#18191a] rounded-[2px] p-[2px]">
          <button
            className="absolute z-10 w-7 h-7 -top-2 -right-2 bg-gradient-to-b from-[#B43D2F] to-[#893026] border
              border-[#18191a] rounded-full flex items-center justify-center"
            onClick={closeDeck}
          >
            <img
              src={require("../../assets/images/smithy-modal-close.png")}
              className="w-7 h-7"
              alt=""
            />
          </button>
          <div className=" w-full h-full bg-[#242520] border border-[#18191a] rounded-[2px] p-3 shadow-inner-sm-white">
            <div className="relative w-full h-full bg-[#201b18] rounded-[1px] p-3 pt-7 shadow-inner-sm-black">
              <div className="absolute top-[-28px] left-0 right-0 flex justify-self-center">
                <div className="min-w-[120px] bg-[#847a70] border border-[#18191a] rounded-[2px] p-[1px] mx-auto">
                  <div
                    className="bg-[#351d1e] text-center text-white text-xl p-[7px] leading-none rounded-[1px] border
                    border-[#18191a] shadow-inner-sm-black"
                  >
                    Abyss
                  </div>
                </div>
              </div>

              {/*<div className="flex justify-center gap-x-4 mb-4">*/}
              {/*  <div className="text-center text-[#a49a7c] text-sm font-light leading-[14px]">*/}
              {/*    Select the card to upgrade. Current price:*/}
              {/*    <span className="text-white"> {calculatePrice()}</span>*/}
              {/*  </div>*/}
              {/*</div>*/}
              <div className="w-full h-px bg-[#584d3c]"></div>

              <div
                className={`overflow-x-hidden overflow-y-auto absolute left-3 right-3 bottom-0 top-[80px]`}
              >
                {cards.length ? (
                  <div className="grid grid-cols-3 gap-7 mb-3">
                    {cards.map((card, index) => (
                      <div onClick={() => handleOpenUpgrade({...card})} key={index}>
                        <Card
                          id={card.id}
                          lvl={card.lvl}
                          uid={card.uid}
                          hidden={false}
                        />
                      </div>
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
            <div className="absolute z-10 top-0 left-0 right-0 bottom-0 w-full h-full flex items-center justify-center gap-2">
              <div className="flex flex-col gap-4 items-center justify-center relative w-[115px] ">
                <Card
                  id={zoomedCard.id}
                  lvl={zoomedCard.lvl}
                  uid={zoomedCard.uid}
                  hidden={false}
                />
                <div className="flex justify-center items-center gap-[96px] pt-[43px]">
                <PopupButton
                  type={price === 0 ? "blue" : gold > price ?'gold' : 'gray'}
                  onClick={() => {
                    if (gold > price) {
                      handleRemoveCard({
                        id: zoomedCard.id,
                        lvl: zoomedCard.lvl,
                        uid: zoomedCard.uid,
                      })
                      playSound('itemDelete');
                    } else {
                      playSound('button');
                    }
                  }}
                  height={"40px"}
                  width={"80px"}
                ><div className="text-nowrap">Forget {price === 0 ? 'free' : price }</div></PopupButton>
                <PopupButton
                  type={"red"}
                  onClick={() => {
                    handleCloseUpgrade();
                    playSound('button');
                  }}
                  height={"40px"}
                  width={"80px"}
                >Close</PopupButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
