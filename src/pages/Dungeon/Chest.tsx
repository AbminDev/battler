import React, { useEffect, useRef, useState } from "react";
import { Card } from "../../components/Card";
import { CardProps } from "../../interfaces/card";
import { useScroll } from "../../utils/ScrollContext";
import {PopupButton} from "../../components/PopupButton";
import { GoldIco } from "../../layout/components/HeaderFarm/components/ResourceCard";
import {buyCard, getChestRewards, takeChestReward, getShopItems} from "../../endpoints/dungeonEndpoints";
import {useTelegram} from "../../hooks/useTelegram";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {useTranslation} from "react-i18next";
import {BattleEffects} from "../Battle/Effects";
import {useSoundService} from "../../utils/soundService";

interface ShopCards {

}
export const Chest = ({ close, updateSomeStates, usingCard, stageId, clientId, dungeonId}: {
  close: () => void,
  updateSomeStates: any,
  usingCard: any;
  dungeonId: number;
  clientId: string;
  stageId: number;
}) => {
  const {t} = useTranslation();
  const actualSaves = useSelector(
    (state: RootState) => state.battleSave.battleSave.save
  );
  const [activeTab, setActiveTab] = useState("myCards");
  const { setScrollable } = useScroll();
  const scrollableElRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [notEnoughBalance, setNotEnoughBalance] = useState(false);
  const { playSound } = useSoundService();
  const [cards, setCards] = useState<any[]>([
    // {
    //   id: 8,
    //   lvl: 0,
    //   uid: '1',
    //   glow: false,
    // },
    // {
    //   id: 9,
    //   lvl: 0,
    //   uid: '2',
    //   glow: false,
    // },
    // {
    //   id: 10,
    //   lvl: 0,
    //   uid: '3',
    //   glow: false,
    // }
  ] as CardProps[]);

  useEffect(() => {
    setScrollable(true, scrollableElRef);

    return () => {
      setScrollable(false);
    };
  }, [setScrollable]);

  const {userId} = useTelegram();

  useEffect(() => {
    // console.log('getChestItems');
    const getRewards = async () => {
      //@ts-ignore
      const getCards = await getChestRewards({ stageId: actualSaves?.currentStage, clientId: userId });
      if (getCards.length) {
        // console.log('CARDS FROM Chest->', getCards);
        getCards.forEach((card, index) => {
          cards.push({
            id: card.cardId,
            lvl: card.stars,
            uid: `${index}`,
            glow: false,
          })
        });
        //setCards(getCards.cards);
        setIsLoading(true);
      }
    };
    getRewards();
//setCards([])
  }, []);

  useEffect(() => {

  }, [cards.length, isLoading]);

  const removeCardAndTake = ({cardIndex, cardId}:{cardIndex: number, cardId: number}) => {
    // console.log('removeCardAndTake');
    const copyCards = [...cards];
    copyCards.splice(cardIndex, 1);
    setCards(copyCards);
    (async () => {
      try {
       const result = await takeChestReward({stageId: actualSaves?.currentStage!, cardId, clientId: userId});
       if (result.currentHp) {
         updateSomeStates({currentMana: result.currentMana, currentHp: result.currentHp, cardsAtDeck: result.cardsAtDeck, gold: result.gold});
         if (!copyCards.length) {
           close();
           usingCard({dungeonId, cardId: stageId, clientId});
         }
       }
      } catch (e) {
        console.error(e);
      }
    })();
  };

  // console.log('Cards???? Chest', cards);

  return (
    <>
      {isLoading && (
        <div className="z-40 absolute top-1/2 left-1/2 ">
          <div className="w-full fixed top-0 left-0 bottom-0 right-0 z-5 flex items-center justify-center">
            <div className="w-full h-full absolute bg-black opacity-60"></div>
            <div className="relative w-[90%] bg-[#554837] border border-[#18191a] rounded-[2px] p-[2px]">
              {/*<img src={require('../../assets/images/shop-person.png')}*/}
              {/*     className="w-[120px] absolute left-[11px] top-[-121px]" alt=""/>*/}
              <img src={require("../../assets/images/cards-modal-border.png")}
                   className="absolute w-[17.5px] h-[21px] -top-[6px] -left-[5px]" alt=""
              />
              <img src={require("../../assets/images/cards-modal-border.png")}
                   className="absolute w-[17.5px] h-[21px] -bottom-[6.5px] -left-[4.5px] -rotate-90" alt=""
              />
              <img src={require("../../assets/images/cards-modal-border.png")}
                   className="absolute w-[17.5px] h-[21px] -bottom-[5.5px] -right-[4.5px] -rotate-180" alt=""
              />
              <button className="absolute z-10 w-7 h-7 -top-2 -right-2 flex items-center justify-center"
                      onClick={close}>
                <img src={require("../../assets/images/shop-modal-close.png")} className="w-7 h-7" alt=""/>
              </button>
              <div
                className=" w-full h-full bg-[#242520] border border-[#18191a] rounded-[2px] p-3 shadow-inner-sm-white">
                <div className="relative w-full h-full bg-[#201b18] rounded-[1px] p-3 pt-7 shadow-inner-sm-black">
                  <div className="absolute top-[-28px] left-0 right-0 flex justify-self-center">
                    <div className="min-w-[120px] bg-[#847a70] border border-[#18191a] rounded-[2px] p-[1px] mx-auto">
                      <div className="bg-[#351d1e] text-center text-white text-xl p-[7px] leading-none rounded-[1px]
                        border border-[#18191a] shadow-inner-sm-black">{t('dungeon.chest.title')}</div>
                    </div>
                  </div>
                  {cards.length ? (
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      {cards.map((card, index) => (
                        <div className="table" key={index}>
                          <div className="mb-2">
                            <Card
                              id={card.id}
                              lvl={card.lvl}
                              uid={card.uid}
                              hidden={false}
                            />
                          </div>
                          <PopupButton type={'green'} className="w-full" onClick={() => {
                             playSound('button');
                             removeCardAndTake({cardId: card.id, cardIndex: index});
                           }}>
                            <div className="flex justify-center items-center text-center gap-1">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12.0006 22.8C17.9653 22.8 22.8006 17.9647 22.8006 12C22.8006 6.0353 17.9653 1.19998 12.0006 1.19998C6.03591 1.19998 1.20059 6.0353 1.20059 12C1.20059 17.9647 6.03591 22.8 12.0006 22.8Z"
                                  fill="#FFD540"
                                  stroke="black"
                                  strokeWidth="0.8"
                                />
                                <g>
                                  <path
                                    d="M22.4077 11.9999C22.4077 17.7455 17.7499 22.4072 12.0004 22.4072C9.39266 22.4072 7.0088 21.445 5.18262 19.8623C6.83207 20.7381 8.71324 21.229 10.7083 21.229C16.5599 21.229 21.4219 16.9915 22.3919 11.4187C22.4037 11.6111 22.4077 11.8036 22.4077 11.9999Z"
                                    fill="#F15A24"
                                  />
                                </g>
                                <g>
                                  <path
                                    d="M15.6997 2.27207C15.201 2.22102 14.6944 2.19352 14.1838 2.19352C8.91733 2.19352 4.32635 5.08793 1.92285 9.37652C3.0814 4.89942 7.15399 1.59265 11.9963 1.59265C13.3002 1.59265 14.5491 1.83222 15.6997 2.27207Z"
                                    fill="white"
                                  />
                                </g>
                                <path
                                  d="M12.0862 20.3337C16.641 20.3337 20.3334 16.6412 20.3334 12.0864C20.3334 7.53155 16.641 3.83911 12.0862 3.83911C7.5313 3.83911 3.83887 7.53155 3.83887 12.0864C3.83887 16.6412 7.5313 20.3337 12.0862 20.3337Z"
                                  fill="#EBA233"
                                  stroke="#FCEE21"
                                  strokeWidth="0.4"
                                />
                                <path
                                  d="M18.9742 16.261C19.5868 15.126 19.9324 13.8261 19.9324 12.4437C19.9324 7.99802 16.3311 4.39278 11.8815 4.39278C8.97141 4.39278 6.42261 5.9362 5.00879 8.24937C6.37155 5.73984 9.03032 4.0354 12.0857 4.0354C16.5353 4.0354 20.1367 7.64064 20.1367 12.0863C20.1367 13.614 19.7125 15.0436 18.9742 16.261Z"
                                  fill="#EC9140"
                                />
                                <path
                                  d="M20.7775 6.40762C14.3761 9.30595 8.98784 14.0501 5.29227 19.9567C3.03016 18.0481 1.59277 15.189 1.59277 12.0001C1.59277 6.25052 6.25445 1.59277 12.0001 1.59277C15.6917 1.59277 18.9317 3.50928 20.7775 6.40762Z"
                                  fill="url(#paint0_radial_596_6421)"
                                />
                                <defs>
                                  <radialGradient
                                    id="paint0_radial_596_6421"
                                    cx="0"
                                    cy="0"
                                    r="1"
                                    gradientUnits="userSpaceOnUse"
                                    gradientTransform="translate(12.1385 13.9029) rotate(-108.14) scale(13.8711 29.8495)"
                                  >
                                    <stop offset="0.416941" stopColor="white"/>
                                    <stop offset="0.654304" stopColor="white" stopOpacity="0"/>
                                  </radialGradient>
                                </defs>
                              </svg>
                              <div
                                className="text-right text-white leading-[14px] font-[900]">
                                Take
                              </div>
                            </div>
                          </PopupButton>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      className="flex items-center justify-center h-full w-full text-2xl text-white pt-10 pb-12">Empty</div>
                  )}
                </div>
              </div>
            </div>
            {notEnoughBalance && (
              <div className="absolute bottom-[100px] left-1/2 -translate-x-1/2 bg-[rgba(120,22,22,0.8)] text-white
                py-2.5 px-4 z-10 rounded flex items-center text-center leading-[1.2] whitespace-nowrap">
                {t('notEnoughBalance')}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
