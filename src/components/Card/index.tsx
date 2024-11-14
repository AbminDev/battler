import React, { useState, useEffect, useRef } from 'react';
import {CardProps} from "../../interfaces/card";
import {CardsConfig, CardType, mockCards} from "../../endpoints/mock";
import useFitText from "use-fit-text";
import {useTranslation} from "react-i18next";

export const Card: React.FC<CardProps> = (props) => {
  //console.log('INIT CARD COMPONENT->->', props);
  const { t } = useTranslation();
  const { fontSize, ref } = useFitText({ maxFontSize: 100, minFontSize: 40 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [typeFontSize, setTypeFontSize] = useState('8px');
  const [nameFontSize, setNameFontSize] = useState('12px');
  const [elementFontSize, setElementFontSize] = useState('10px');
  const [starSize, setStarSize] = useState('16px');
  const [actionPointsFontSize, setActionPointsFontSize] = useState('18px');
  const [card, setCard] = useState<CardsConfig & {lvl: number}>({} as unknown as CardsConfig & {lvl: number});

  useEffect(() => {
    const cardInfo: CardsConfig = mockCards.find(obj => obj.id === props.id)!;
  // console.log('CARD INFO DATA INFO DATA', {...cardInfo, lvl: props.lvl});
    setCard({...cardInfo, lvl: props.lvl});
  }, [props]);

  useEffect(() => {
    const updateSizes = () => {
      if (buttonRef.current) {
        setTypeFontSize(buttonRef.current.offsetWidth * 0.085+'px');
        setNameFontSize(buttonRef.current.offsetWidth * 0.13+'px');
        setElementFontSize(buttonRef.current.offsetWidth * 0.13+'px');
        setStarSize(buttonRef.current.offsetWidth * 0.11+'px');
        setActionPointsFontSize(buttonRef.current.offsetWidth * 0.13+'px');
      }
    };

    updateSizes();

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === buttonRef.current) {
          updateSizes();
        }
      }
    });

    if (buttonRef.current) {
      resizeObserver.observe(buttonRef.current);
    }

    return () => {
      if (buttonRef.current) {
        resizeObserver.unobserve(buttonRef.current);
      }
    };
  }, []);

  if (card?.id === 4 && props.isFocused) {
    // console.log('CARD DATA ANT CARDS COMP->->->->', props.IsDraggable, props?.glow, props?.isBacklight)
  }

  useEffect(() => {

  }, [props, card]);
  return (
    <>
      {card?.data && (
        <button ref={buttonRef}
          className={`relative aspect-[0.67] h-full w-full ${card.data.type === CardType.equip ? 'rounded-card' : 'rounded-md'}
          ${props.IsDraggable && props?.glow ? props?.card?.isBacklight ? 'yellow-glow' : 'blue-glow' : ''}`}>
          <img src={require('../../assets/images/cards/' + card.data.name + '-'+card.lvl+'Star.png')}
            className="absolute top-0 w-full left-0 object-contain" alt=""/>
          {card.data.actionPoints && (card.data.type === CardType.spell || card.data.type === CardType.equip) ? (
            <>
              <div className={`w-[25%] max-w-[25%] bg-[url('./assets/images/card-mana.png')] bg-no-repeat bg-top bg-contain absolute
              z-[101] aspect-[1] flex justify-center items-center text-white text-stroke-regular 
              ${card.data.type === CardType.spell ? ' top-0 left-0' : ''}
              ${card.data.type === CardType.equip ? 'top-[4%] left-[4%]' : ''}`}
                   style={{fontSize: actionPointsFontSize, lineHeight: actionPointsFontSize}}>
                {card.data.actionPoints}
              </div>
              {props.isFocused && (
                <img
                  className={`w-[25%] max-w-[25%] aspect-[1] absolute z-[102]
                  ${card.data.type === CardType.spell ? ' top-0 left-0' : ''}
                  ${card.data.type === CardType.equip ? 'top-[4%] left-[4%]' : ''}`}
                  src={require(`../../assets/images/card-mana-light.png`)}
                  alt=""/>
              )}
            </>
          ) : null}
          {/*<div className="absolute w-full top-[15px] flex justify-center">*/}
          {/*  {card.data?.stars && card.data.stars > 0 ? Array.from({length: +card.data.stars}).map((_, i: number) => (*/}
          {/*    <img key={i} src={require('../../assets/images/card-star.png')}*/}
          {/*      style={{width: starSize, height: starSize}} alt=""/>*/}
          {/*  )) : null}*/}
          {/*</div>*/}
        </button>
      )}
    </>
  );
};
