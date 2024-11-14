import React, { useEffect, useState } from "react";
import { useSessionStorage } from "@uidotdev/usehooks";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ItemCard, ItemList, ProgressBar } from "./components";
import { useUtils } from "../../../utils/navigateTo";
import {useTranslation} from "react-i18next";
import {CardsModal} from "../../../pages/Battle/CardsModal";
import {Bag} from "../../../pages/Dungeon/Bag";
import {useSoundService} from "../../../utils/soundService";

export let tutorial: boolean = false;

export const FooterCave: React.FC<{tutorial?: boolean, hpAmount: number, currentHpAmount: number, manaAmount: number, currentManaAmount: number, cardsAtDeck: any[], openDeck?: () => void}> = ({tutorial, currentManaAmount,manaAmount, hpAmount, currentHpAmount, cardsAtDeck, openDeck}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [activeDiv, setActiveDiv] = useSessionStorage("page", "/");
  const [hp, setHp] = useState(hpAmount);
  const [currentHp, setCurrentHp] = useState(currentHpAmount);
  const [mana, setMana] = useState(manaAmount);
  const [currentMana, setCurrentMana] = useState(currentManaAmount);
  const [cards, setCards] = useState(cardsAtDeck);
  const [isDeckOpen, setIsDeckOpen] = useState(false);
  const {navigateTo} = useUtils();
  const { playSound } = useSoundService();

  // console.log('currentHpAmount', currentHpAmount);

  const handleSvgClick = (divLink: string) => {
    navigateTo(divLink);
  };

  useEffect(() => {
    navigateTo(activeDiv);
  }, []);

  useEffect(() => {
    setCurrentHp(currentHpAmount);
  }, [currentHpAmount]);

  const items = [
    // { imageSrc: "path/to/image1.png", number: 1 },
    { imageSrc: "path/to/image2.png", number: 2 },
    { imageSrc: "path/to/image3.png", number: 3 },
    // додайте інші елементи тут
  ];

  return (
    <div className="bottom-0 fixed w-full left-0 ">
      <div className="h-1 bg-gradient-to-t from-stone-800 to-stone-700 shadow-inner border border-stone-950" />
      <footer className="z-2 p-4 items-center bg-zinc-900 ">
        {/*{isDeckOpen && (<Bag cardsAtDeck={cardsAtDeck} closeDeck={closeDeck}/>)}*/}
        <div className="flex justify-between gap-1">
          <ItemCard img={undefined} name={t('deck')} onClick={() => {
            if (openDeck) {
              openDeck();
            }
            playSound('button');
          }} />
          <div className="flex flex-col w-full justify-center gap-y-2 mx-3">
            <ProgressBar current={currentHp} total={hp} color="bg-[#ff3a3a]" />

            <div className="flex w-full gap-x-1 whitespace-nowrap">
              <div className="text-amber-500 text-[17px] font-light leading-[17px] text-nowrap">
                {t('level', { lvl: 1 })}
              </div>

              <ProgressBar current={currentMana} total={mana} color={'bg-[#4F55EA]'}/>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="flex justify-between h-[40px] bg-neutral-900 rounded-sm border border-black">
              <ItemList items={items}/>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
