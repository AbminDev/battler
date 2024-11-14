import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardsModal } from "../../../pages/Battle/CardsModal";
import { CardProps } from "../../../interfaces/card";
import { HpBarAnimation } from "../../../components";
import { useUtils } from "../../../utils/navigateTo";
import { ManaBarAnimation } from "../../../components/animation/ManaBarAnimation";
import {useTranslation} from "react-i18next";
import {useSoundService} from "../../../utils/soundService";
import {PopupButton} from "../../../components/PopupButton";

interface ProfileBattleDataProps {
  currentHp: number;
  maxHp: number;
  currentMana: number;
  maxMana: number;
  heroName: string;
  isDeckOpen: boolean;
  openDeck: () => void;
  closeDeck: () => void;
  cardsAtDeck: CardProps[];
  cardsAtHand: CardProps[];
  endTurnEndpoint: any;
  currentDefense: number;
  isDraggingCards: boolean;
  isFirstCardPlayed: boolean;
}
export const ProfileBattleData = (props: ProfileBattleDataProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { playSound } = useSoundService();
  const { activeDiv } = useUtils();
  // const [currentHp, setCurrentHp] = useState(15);
  // const [currentMana, setCurrentMana] = useState(2);
  // const [maxHp, setMaxHp] = useState(20);
  // const [maxMana, setMaxMana] = useState(8);
  // const [isDeckOpen, setIsDeckOpen] = useState(false);
  const {
    isDeckOpen,
    maxHp,
    maxMana,
    currentMana,
    currentHp,
    heroName,
    cardsAtDeck,
    cardsAtHand,
    endTurnEndpoint,
    currentDefense,
    isDraggingCards,
    isFirstCardPlayed,
  } = props;

  //console.log("cards At Deck", cardsAtDeck);
  //console.log("cardsAtHand", cardsAtHand);
  // const openDeck = () => {
  //   setIsDeckOpen(true);
  // };
  //
  // const closeDeck = () => {
  //   setIsDeckOpen(false);
  // };
  //console.log('PROFILE DATA CURRENT HP', currentHp);
  //console.log('ACTIVE DIV!!!!!!!', activeDiv);
  return (
    <div
      className={`bottom-0 fixed px-4 pt-5 pb-[30px] w-full bg-[#1b1b1d] flex flex-nowrap items-start ${isDeckOpen ? 'z-[5]' : 'z-[1]'}`}>
      {isDeckOpen && (
        <CardsModal cardsAtDeck={cardsAtDeck} closeDeck={props.closeDeck}/>
      )}
      <div
        className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-b from-[#4f3e35] to-[#302620] border-y border-black shadow-[0_0.4px_0_1px_#131314]"></div>
      <div className="flex-1 mr-2 mt-1.5">
        {/*<div className="text-white font-[900]">{heroName}</div>*/}
        <div
          className="relative text-white mb-2 h-[16px] bg-[#312e2b] text-center text-xl rounded-[3px] leading-3 w-full">
          {/* <div
            className="absolute h-full bg-[#ff3a3a] rounded-[2px]"
            style={{ width: (currentHp / maxHp) * 100 + "%" }}
          ></div>
          <div className="absolute w-full text-center text-stroke-regular text-[17px] -mt-px">
            {currentHp}/{maxHp}
          </div> */}
          {activeDiv === "/battle" && (
            <HpBarAnimation currentHp={currentHp} maxHp={maxHp}/>
          )}
        </div>

        <div className="flex relative">
          {/*<div className="w-1/2 relative text-white h-[16px]  text-center text-xl rounded-[3px] leading-3">*/}
          {/*  <div className="absolute h-full w-full">*/}
          {/*    {activeDiv === "/battle" && (*/}
          {/*      <ManaBarAnimation currentMana={currentMana} maxMana={maxMana} />*/}
          {/*    )}*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className="ml-[8px] text-white text-[17px] leading-none text-stroke-small">*/}
          {/*  {currentMana}*/}
          {/*</div>*/}
        </div>
      </div>

      {/*<div className="flex mr-[9px] items-center content-center relative">*/}
      {/*  <img*/}
      {/*    src={require("../../../assets/images/shield.png")}*/}
      {/*    className="w-[30px] h-[40px]"*/}
      {/*  />*/}
      {/*  <div className="text-white absolute w-full text-center">*/}
      {/*    {currentDefense}*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div className="flex text-white bg-[#12140e] text-center text-xs rounded-[3px]
        leading-4 border border-black p-1.5 mr-2 flex-shrink-0">
        <img src={require("../../../assets/images/mana-icon.png")} className="w-[16px] h-[16px] mr-1" alt=""/>
        {currentMana}
      </div>

      <button
        className="flex-none mr-3 p-1.5 bg-[#837E60] border border-black shadow-[inset_0_-3px_0_0_#302b20]
        rounded text-center text-white"
        onClick={() => {
          props.openDeck();
          playSound('button');
        }}
      >
        <div className="text-[18px] leading-[1] text-stroke-small">
          {cardsAtDeck.length}
        </div>
      </button>

      <PopupButton type="green" className="flex-shrink-0"
         onClick={() => {
           if (!isDraggingCards) return;
           endTurnEndpoint();
           playSound('button');
           if (cardsAtHand.length > 0) {
             playSound('discard');
           }
         }}>
        {isFirstCardPlayed && isDraggingCards && <div className="btn-pulse transition animate-opacityTransition
          absolute z-[-1] w-full h-full left-0 top-0"></div>}
          {t('tutorial.endTurn')}
      </PopupButton>
    </div>
  );
};
