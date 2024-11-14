import React, { useEffect, useRef, useState } from "react";
import { Card } from "../../components/Card";
import { CardProps } from "../../interfaces/card";
import { useScroll } from "../../utils/ScrollContext";
import {useTranslation} from "react-i18next";

export const Bag = ({
   cardsAtDeck,
    closeDeck,
   }: {
  cardsAtDeck: CardProps[];
  closeDeck: () => void;
}) => {
  const [activeTab, setActiveTab] = useState("myCards");
  const { setScrollable } = useScroll();
  const scrollableElRef = useRef<HTMLDivElement | null>(null);
  const [zoomedCard, setZoomedCard] = useState(null as CardProps | null);
  const [touchStartPosition, setTouchStartPosition] = useState({ x: 0, y: 0 });
  const [longPressTimeout, setLongPressTimeout] = useState(null as any | null);
  const { t } = useTranslation();

  useEffect(() => {
    setScrollable(true, scrollableElRef);

    return () => {
      setScrollable(false);
    };
  }, [setScrollable]);

  const handleTouchStart = (event: any, card: CardProps) => {
    setTouchStartPosition({
      x: event.touches[0].clientX,
      y: event.touches[0].clientY
    });

    const timeout = setTimeout(() => {
      setZoomedCard(card);
    }, 150);

    setLongPressTimeout(timeout);
  };

  const handleTouchMove = (event: any) => {
    const touchMovePosition = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY
    };

    const deltaX = Math.abs(touchMovePosition.x - touchStartPosition.x);
    const deltaY = Math.abs(touchMovePosition.y - touchStartPosition.y);

    if (deltaX > 10 || deltaY > 10) {
      clearTimeout(longPressTimeout);
      setLongPressTimeout(null);
    }
  };

  const handleTouchEnd = () => {
    clearTimeout(longPressTimeout);
    setLongPressTimeout(null);
    setZoomedCard(null);
  };

  return (
    <div className="z-40 absolute top-1/2 left-1/2 ">
      <div className="w-full fixed top-0 left-0 bottom-0 right-0 z-5 flex items-center justify-center">
        <div className="w-full h-full absolute bg-black opacity-60"></div>
        <div className="relative w-[90%] bg-[#554837] border border-[#18191a] rounded-[2px] p-[2px]" style={{
          height: "calc(100vh - 230px)"
        }}>
          <img src={require("../../assets/images/cards-modal-border.png")}
               className="absolute w-[17.5px] h-[21px] -top-[6px] -left-[5px]" alt=""
          />
          <img src={require("../../assets/images/cards-modal-border.png")}
               className="absolute w-[17.5px] h-[21px] -bottom-[6.5px] -left-[4.5px] -rotate-90" alt=""
          />
          <img src={require("../../assets/images/cards-modal-border.png")}
               className="absolute w-[17.5px] h-[21px] -bottom-[5.5px] -right-[4.5px] -rotate-180" alt=""
          />
          <button className="absolute z-10 w-7 h-7 -top-2 -right-2 flex items-center justify-center" onClick={closeDeck}>
            <img src={require("../../assets/images/shop-modal-close.png")} className="w-7 h-7" alt=""/>
          </button>
          <div
            className=" w-full h-full bg-[#242520] border border-[#18191a] rounded-[2px] p-3 shadow-inner-sm-white">
            <div className="relative w-full h-full bg-[#201b18] rounded-[1px] p-3 pt-7 shadow-inner-sm-black">
              <div className="absolute top-[-28px] left-0 right-0 flex justify-self-center">
                <div className="min-w-[120px] bg-[#847a70] border border-[#18191a] rounded-[2px] p-[1px] mx-auto">
                  <div className="bg-[#351d1e] text-center text-white text-xl p-[7px] leading-none rounded-[1px]
                        border border-[#18191a] shadow-inner-sm-black">{t('tutorial.modals.bag')}</div>
                </div>
              </div>
              <div className="flex justify-center gap-x-4 mb-4">
                <button
                  className={`border border-[#18191a] bg-[#4c3f2f] shadow-inner-sm-white rounded-[2px] p-[1px]
                ${activeTab !== "myCards" ? "opacity-40" : ""}`}
                >
                  <div
                    className="w-full h-full border border-[#272018] bg-[#4c3f2f] rounded-[1px] text-white text-sm leading-none p-3"
                    onClick={() => setActiveTab("myCards")}
                  >
                    {t('tutorial.modals.myCards')}
                  </div>
                </button>
                <button
                  className={`border border-[#18191a] bg-[#4c3f2f] shadow-inner-sm-white rounded-[2px] p-[1px]
                ${activeTab !== "bless" ? "opacity-40" : ""}`}
                >
                  <div
                    className="w-full h-full border border-[#272018] bg-[#4c3f2f] rounded-[1px] text-white text-sm leading-none p-3"
                    onClick={() => setActiveTab("bless")}
                  >
                    {t('tutorial.modals.bless')}
                  </div>
                </button>
              </div>
              <div
                {...(activeTab === "myCards"
                  ? {
                    ref: scrollableElRef,
                    style: {
                      overflowY: "auto",
                    },
                  }
                  : {})}
                className={`overflow-x-hidden overflow-y-auto absolute left-3 right-3 bottom-0 top-[94px] ${
                  activeTab !== "myCards" ? "hidden" : "scrollable-element"
                }`}
              >
                {cardsAtDeck.length ? (
                  <div className="grid grid-cols-3 gap-7 mb-3">
                    {cardsAtDeck.map((card, index) => (
                      <div
                        key={index}
                        onTouchStart={(event) => handleTouchStart(event, card)}
                        onTouchEnd={handleTouchEnd}
                        onTouchMove={handleTouchMove}>
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
                    {t('tutorial.modals.empty')}
                  </div>
                )}
              </div>

              <div
                {...(activeTab === "bless"
                  ? {
                    ref: scrollableElRef,
                    style: {
                      overflowY: "auto",
                    },
                  }
                  : {})}
                className={`overflow-x-hidden  absolute left-3 right-3 bottom-0 top-[94px] ${
                  activeTab !== "bless" ? "hidden" : "scrollable-element"
                }`}
              >
                {[].length ? (
                  <div></div>
                ) : (
                  <div className="flex items-center justify-center h-full w-full text-2xl text-white pb-12">
                    {t('tutorial.modals.empty')}
                  </div>
                )}
              </div>

              {zoomedCard && Object.keys(zoomedCard).length !== 0 && (
                <div>
                  <div className="bg-black opacity-60 absolute top-0 left-0 right-0 bottom-0 w-full h-full z-10"></div>
                  <div className="absolute z-10 top-0 left-0 right-0 bottom-0 w-full h-full flex items-center justify-center">
                    <div className="relative w-[200px]">
                      <Card
                        id={zoomedCard.id}
                        lvl={zoomedCard.lvl}
                        uid={zoomedCard.uid}
                        hidden={false}
                        glow={false}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
