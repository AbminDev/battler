import React, {useEffect, useState} from "react";
import {CardDisappear} from "../../../components";
import {mockCards, StageType} from "../../../endpoints/mock";
import {useTranslation} from "react-i18next";
import {useSoundService} from "../../../utils/soundService";
import {preloadImages} from "../../../utils/preloadImages";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Enemies, parseEnemiesConfig } from "../../../interfaces/battle";

interface ActionCardProps {
  type: StageType;
  active?: boolean;
  onClickActive?: () => void;
  title: string;
  name: string;
  description?: string;
  onDisapear: () => void;
  handleAction: () => void;
  enemyId?: number;
  animationOn?: () => void;
  animationOff?: () => void;
  isAnimation?: boolean;
}

enum DungeonStageDescription {
  open= 'OPEN',
  heal = 'HEAL',
  fight = 'FIGHT',
  use = 'USE',
}

export const ActionCard = (props: ActionCardProps) => {
  const { t } = useTranslation();
  const { playSound } = useSoundService();
  
  const appConfig = useSelector((state: RootState) => state.appConfig.configs);

  const enemiesConfig = appConfig.enemies.variables

  const enemies: Enemies[] = parseEnemiesConfig(enemiesConfig)
  const {
    active = false,
    title = "",
    name,
    onDisapear,
    onClickActive,
    handleAction,
    description = "",
    type,
    enemyId,
  } = props;

  useEffect(() => {
    if (enemyId) {
      const img = new Image();
      img.src = require(`../../../assets/images/battle/battle-background-${enemyId}.jpg`);
    }
  }, []);

  const getDescriptionForStage = (stageType: StageType) => {
    switch (stageType) {
      case StageType.enemy:
        return DungeonStageDescription.fight;
      case StageType.boss:
        return DungeonStageDescription.fight;
      case StageType.elixir:
        return DungeonStageDescription.heal;
      case StageType.shop:
        return DungeonStageDescription.use;
      case StageType.forge:
        return DungeonStageDescription.use;
      case StageType.bonfire:
        return DungeonStageDescription.heal;
      case StageType.tavern:
        return DungeonStageDescription.use;
      case StageType.chest:
        return DungeonStageDescription.open;
      default:
        return "";
    }
  }

  // console.log("active?", active);
  useEffect(() => {}, [active]);

  const [isChestOpen, setChestOpen] = useState(false);

  const [burn, setBurn] = useState(false);

  const closeChest = () => {
    setChestOpen(false);
    setburnAnimationStart(false);
  };

  const openChest = () => {
    setburnAnimationStart(true);
    setTimeout(() => {
      setChestOpen(true);
    }, 500);
  };

  const handlePickCard = () => {
    if (props?.isAnimation) {
      //@ts-ignore
      props?.animationOn();
    }
    if (type === StageType.shop || type === StageType.forge || type === StageType.enemy || type === StageType.boss || type === StageType.tavern || type === StageType.chest) {
      // console.log("type handlePickCard", type)
      handleAction();
      if (props?.isAnimation) {
        //@ts-ignore
        props?.animationOff();
      }
      return;
    }
    setburnAnimationStart(true);
    setTimeout(() => {
      setBurn(true);
      setTimeout(() => {
        // handleAction();
        setburnAnimationStart(false);
        setBurn(false);
      }, 1000);
      // handleAction();
    }, 500);
    setTimeout(() => {
      handleAction();
    }, 1500);
    if (props?.isAnimation) {
      //@ts-ignore
      props?.animationOff();
    }
  };

  const burnCard = () => {
    if (props?.isAnimation) {
      //@ts-ignore
      props?.animationOn();
    }
    playSound('screenTransition');
    setburnAnimationStart(true);
    setTimeout(() => {
      setBurn(true);
      setTimeout(() => {
        //handleAction();
        setburnAnimationStart(false);
        setBurn(false);
      }, 1000);
    }, 500);
    if (props?.isAnimation) {
      //@ts-ignore
      props?.animationOff();
    }
  }

  const [burnAnimationStart, setburnAnimationStart] = useState(false);

  // console.log('ENEMYID AT ACTION CARD', enemyId);
  // const imagePath = enemyId ? require("../../../assets/images/dungeon-image-enemy" +
  //   props?.enemyId + ".png")
  //   : require("../../../assets/images/dungeon-image-" + title + ".png");

  let imagePath;
  if (enemyId) {
   imagePath = require(`../../../assets/images/dungeon-image-enemy${enemyId}.png`);
  } else {
    imagePath = require(`../../../assets/images/dungeon-image-${name}.png`);
  }

  return (
    <div
      className={`relative flex-1 flex flex-col text-center items-center [border-image:url('./assets/images/stoneBorder.png')]`}
      onClick={() => {
        if (onClickActive) {
          onClickActive();
        }
        playSound('button');
      }}>
      {burnAnimationStart && (
        <div className="absolute w-52 h-52 z-50 bottom-6">
          <CardDisappear />
        </div>
      )}
      {!burn ? (
        <>{active ? type === StageType.shop || type === StageType.forge || type === StageType.tavern || type === StageType.chest ?<CloseButton onDisapear={onDisapear} type={type} burnCard={burnCard} isBurning={true} />  : <CloseButton onDisapear={onDisapear} type={type} isBurning={false} /> : null}</>
      ) : null}

      {!burn && (
        <>
          <img
            src={require("../../../assets/images/cardBg.png")}
            className={`absolute z-1 ${
              active ? "[filter:drop-shadow(0px_0px_10px_#C6D9FF)]" : ""
            }`}
          />
          <img
            src={require("../../../assets/images/stoneBorder.png")}
            className={`absolute z-20`}
          />
        </>
      )}
      {!burn ? (
        <div
          className={`relative w-[110px] h-[173.15px] inline-block [-webkit-mask:url(./assets/images/cardBg.png)_no-repeat] [mask:url(./assets/images/cardBg.png)_no-repeat] bg-center bg-cover [background-blend-mode:darken] before:content-[''] before:block before:pt-[100%]`}
          style={{backgroundImage: `url(${imagePath})`}}
        >
          {enemyId ? (
            <div
              className="h-[60px] w-full absolute top-1 justify-center  text-[12px] font-[300] items-start leading-[1.3] pt-2 text-white bg-[linear-gradient(0deg,rgba(0,0,0,0.00)0%,rgba(0,0,0,0.50)36.01%,#000_100%)]">
              {enemies[enemyId].isBoss ? (
                <div
                  className="w-full text-[#dd5444] text-center text-[12px]  leading-[1] font-[600] uppercase">
                  Boss
                </div>
              ): null}
              {enemies[enemyId].name}
              <div
                className="w-full text-[#F6A000] text-center text-[10px]  font-[300] leading-[1]">
                {t('level', {lvl: enemies[enemyId].lvl})}
              </div>
            </div>
          ) : (
            <div className="h-[60px] w-full absolute top-1 justify-center  text-[12px] font-[300]
              items-start leading-[1.3] pt-2 text-white bg-[linear-gradient(0deg,rgba(0,0,0,0.00)0%,rgba(0,0,0,0.50)36.01%,#000_100%)]">
              {title}
              {type === StageType.elixir ? (
                <div className="w-full text-[#F6A000] text-center text-[10px]  font-[300] leading-[1]">
                  Heal 5 HP
                </div>
              ) : ''}
              {type === StageType.bonfire ? (
                <div className="w-full text-[#F6A000] text-center text-[10px]  font-[300] leading-[1]">
                  Restore full HP
                </div>
              ) : ''}
            </div>
          )}
      {active ? (
        enemyId ? (
          <div className="h-[60px] w-full items-center absolute bottom-0 justify-center text-[12px] font-[300] pt-2.5 pb-2.5 px-3
                  text-white flex bg-[linear-gradient(180deg,rgba(0,0,0,0.00)0%,rgba(0,0,0,0.70)50%,#000_100%)] leading-[1.2]">
                {enemies[enemyId].description}
              </div>
            ) : (
              <div className="h-[60px] w-full items-center absolute bottom-0 justify-center text-[10px] font-[300] pt-2.5 pb-2.5 px-3
                  text-white flex bg-[linear-gradient(180deg,rgba(0,0,0,0.00)0%,rgba(0,0,0,0.70)50%,#000_100%)] leading-[1.2]">
                {description}
              </div>
            )
          ) : null}
        </div>
      ) : (
        <div className={`w-[110px] h-[173.15px]`}></div>
      )}
      {!burn ? (
        <div
          className={`w-[110px] h-[34px] z-10 ${
            active
              ? "[backdrop-filter:sepia(100%)_hue-rotate(190deg)_saturate(500%)]"
              : ""
          } items-center text-center justify-center flex mt-2 [mask:url(./assets/images/btnBg.png)_no-repeat] flex-col`}
          onClick={active ? handlePickCard : undefined}
        >
          {active ? (
            <button
              className="uppercase text-black font-[800] tracking-[0.05em]"
            >
              {getDescriptionForStage(type)}
            </button>
          ) : (
            <p className="uppercase text-black font-[800] tracking-[0.05em]">{getDescriptionForStage(type)}</p>
          )}
        </div>
      ) : (
        <div className={`w-[110px] h-[34px]`}></div>
      )}
      {!burn && (
        <img
          src={require("../../../assets/images/btnBg.png")}
          className={`w-[110px] h-[34px] z-1 mt-[-34px] ${
            active ? "[filter:drop-shadow(0px_0px_5px_#C6D9FF)]" : ""
          }`}
        ></img>
      )}
    </div>
  );
};

const CloseButton = (props: { onDisapear: () => void, type: StageType, burnCard?: () => void, isBurning: boolean }) => {

  return (
    <>
      {props.type !== StageType.boss && props.type !== StageType.enemy && (
        <svg
          onClick={() => {
            if (props.isBurning) {
              //@ts-ignore
              props?.burnCard();
            }
            setTimeout(() => {props.onDisapear()}, 1300);
            //props.onDisapear();
          }}
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="bg-[#b41308] rounded-[18px] border-1 border-[#19191B] absolute p-[1px] z-30 self-end"
        >
          <g id="ion:close-sharp">
            <g id="Vector" filter="url(#filter0_d_664_9366)">
              <path
                d="M14.0625 5.11488L12.8851 3.9375L9 7.82262L5.11488 3.9375L3.9375 5.11488L7.82262 9L3.9375 12.8851L5.11488 14.0625L9 10.1774L12.8851 14.0625L14.0625 12.8851L10.1774 9L14.0625 5.11488Z"
                fill="#e6e6e6"
              />
              <path
                d="M14.1761 5.22853L14.2898 5.11488L14.1761 5.00124L12.9988 3.82386L12.8851 3.71022L12.7715 3.82386L9 7.59533L5.22853 3.82386L5.11488 3.71022L5.00124 3.82386L3.82386 5.00124L3.71022 5.11488L3.82386 5.22853L7.59533 9L3.82386 12.7715L3.71022 12.8851L3.82386 12.9988L5.00124 14.1761L5.11488 14.2898L5.22853 14.1761L9 10.4047L12.7715 14.1761L12.8851 14.2898L12.9988 14.1761L14.1761 12.9988L14.2898 12.8851L14.1761 12.7715L10.4047 9L14.1761 5.22853Z"
                stroke="#e6e6e6"
                strokeWidth="0.321429"
              />
            </g>
          </g>
          <defs>
            <filter
              id="filter0_d_664_9366"
              x="3.4834"
              y="3.48291"
              width="11.0332"
              height="11.4842"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="0.45"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_664_9366"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_664_9366"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      )}
    </>
  );
};
