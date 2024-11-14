import React, { useState, useEffect, useRef } from "react";
import { BattleEffects } from "./Effects";
import { useTranslation } from "react-i18next";
import { HpBarAnimation } from "../../components";
import { ManaBarAnimation } from "../../components/animation/ManaBarAnimation";
import { BuffAnimation } from "../../components";
import { useUtils } from "../../utils/navigateTo";
import { motion } from "framer-motion";

//TODO согласовать этот енам с беком, узнать у гд об эффектах
export enum BattleEffectsLink {
  stun = "../../assets/images/effect-stun.png",
  dmg = "../../assets/images/effect-dmg.png",
}
//TODO согласовать с беком
export interface BattleEffectsData {
  effectId: BattleEffects;
  effectUid: string;
  amount: number;
}

function getEffectImage(effect: BattleEffects): string {
  return require(`../../assets/images/effect-${BattleEffects[effect]}.png`);
}

interface EnemyBattleDataProps {
  name: string;
  lvl: number;
  currentHp: number;
  maxHp: number;
  maxMana: number;
  currentMana: number;
  effects: BattleEffectsData[];
}

interface DisplayAmount {
  [key: string]: number;
}
const scaleAndRed = {
  visible: {
    scale: [1, 2, 1],
    transition: { duration: 0.5 },
  },
  initial: {
    scale: 1,
  },
};

const bounceAndFlash = {
  visible: {
    y: [0, -10, 0],
    opacity: [1, 0.8, 1],
    boxShadow: [
      "0px 0px 5px 2px #fff",
      "0px 0px 15px 5px #fff",
      "0px 0px 5px 2px #fff",
    ],
  },
  initial: {
    y: 0,
    opacity: 1,
    boxShadow: "0px 0px 0px 0px #fff",
  },
};

export const EnemyBattleData = (props: EnemyBattleDataProps) => {
  const { t } = useTranslation();
  const [effectTooltip, setEffectTooltip] = useState<{
    effectId: BattleEffects;
    amount: number;
  } | null>(null);
  const { activeDiv } = useUtils();
  const [animationType, setAnimationType] = useState<"bounce" | "scale">(
    "bounce"
  );
  // Стан для збереження останнього доданого ефекту для анімації
  const [triggeredEffect, setTriggeredEffect] = useState<string | null>(null);
  const [displayAmount, setDisplayAmount] = useState<DisplayAmount>({});
  const prevAmounts = useRef<DisplayAmount>({});
  const handleMouseDown = (effect: BattleEffectsData) => {
    setEffectTooltip({ effectId: effect.effectId, amount: effect.amount });
  };

  const handleMouseUp = () => {
    setEffectTooltip(null);
  };

  const handleMouseLeave = () => {
    setEffectTooltip(null);
  };

  const handleTouchStart = (effect: BattleEffectsData) => {
    setEffectTooltip({ effectId: effect.effectId, amount: effect.amount });
  };

  const handleTouchEnd = () => {
    setEffectTooltip(null);
  };

  const { lvl, name, effects, maxHp, maxMana, currentMana, currentHp } = props;
  // console.log("effects", effects);

  // Ефект для анімації додавання ефектів
  useEffect(() => {
    if (effects.length > 0) {
      const lastEffect = effects[effects.length - 1];
      const effectUid = lastEffect.effectUid;
      const newAmount = lastEffect.amount;
      const prevAmount = prevAmounts.current[effectUid] || 0;

      if (newAmount > prevAmount) {
        setAnimationType("bounce");
      } else if (newAmount < prevAmount) {
        setAnimationType("scale");
      }

      setTriggeredEffect(effectUid);
      prevAmounts.current[effectUid] = newAmount;

      // Анімоване оновлення числа
      if (newAmount < prevAmount) {
        setDisplayAmount((prev) => ({
          ...prev,
          [effectUid]: prevAmount,
        }));

        setTimeout(() => {
          setDisplayAmount((prev) => ({
            ...prev,
            [effectUid]: newAmount,
          }));
        }, 500); // Затримка відповідає тривалості анімації
      } else {
        setDisplayAmount((prev) => ({
          ...prev,
          [effectUid]: newAmount,
        }));
      }

      // Скидаємо тригер через деякий час, щоб анімація могла відображатися знову
      const timer = setTimeout(() => {
        setTriggeredEffect(null);
      }, 1500); // Тривалість анімації

      return () => clearTimeout(timer);
    }
  }, [effects]);



  return (
    <>
      <div className="absolute top-[30px] z-[2]">
        <div className="flex justify-between">
          <div className="text-white leading-none text-stroke-regular">
            {name}
          </div>
          <div className="text-white leading-none text-stroke-regular">
            {t('level', {lvl})}
          </div>
        </div>
        <div
          className="relative text-white h-[16px] w-[234px] bg-[#312e2b] text-center text-xl rounded-[3px] leading-3">
          {activeDiv === "/battle" && (
            <HpBarAnimation currentHp={currentHp} maxHp={maxHp}/>
          )}
        </div>
        <div
          className="flex absolute right-0.5 text-white bg-[rgba(25,25,27,0.6)] text-center text-xs rounded-[3px] leading-4 border border-black py-[3px] px-[5px] mt-[4px]">
          <img
            src={require("../../assets/images/mana-icon.png")}
            className="w-[14px] h-[14px] mr-[5px]"
          />
          {currentMana}
        </div>
        {/*<div className="flex w-[234px] mt-[3px] justify-center">*/}
        {/*  <div className="w-[120px] relative text-white h-[12px] text-center text-xl rounded-[3px] leading-3">*/}
        {/*    <div className="absolute h-full w-full">*/}
        {/*      {activeDiv === "/battle" && (*/}
        {/*        <ManaBarAnimation currentMana={currentMana} maxMana={maxMana} />*/}
        {/*      )}*/}
        {/*    </div>*/}
        {/*    <div className=" absolute text-white text-[14px] leading-none text-stroke-small top-[-3px] w-full text-center">*/}
        {/*      {currentMana}*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className="absolute flex justify-center items-center top-[50px] z-0 w-full">
          {effects.map((effectData) => (
            <div
              className="flex w-[34px] h-[34px] ml-[4px] justify-center items-center text-center relative"
              key={effectData.effectUid}
              onMouseDown={() => handleMouseDown(effectData)}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={() => handleTouchStart(effectData)}
              onTouchEnd={handleTouchEnd}
              onClick={() => setTriggeredEffect("")}
            >
              {triggeredEffect === effectData.effectUid ? (
                <motion.div
                  className="flex justify-center items-center absolute w-[34px] h-[34px] z-10"
                  variants={
                    animationType === "bounce" ? bounceAndFlash : scaleAndRed
                  }
                  initial="initial"
                  animate="visible"
                  transition={{duration: 0.5}}
                >
                  <div className="flex justify-center items-center absolute w-20 h-20 z-10">
                    {/* BuffAnimation повинен бути визначений або імпортований */}
                    <BuffAnimation/>
                  </div>
                  <motion.img
                    src={getEffectImage(effectData.effectId)}
                    className="w-full h-full object-contain"
                    alt=""
                  />
                  <div
                    className={`w-full h-full text-[18px] absolute text-stroke-regular z-10 flex justify-center items-center ${
                      animationType === "scale" ? "text-red-500" : "text-white"
                    }`}
                  >
                    {displayAmount[effectData.effectUid] > 0 &&
                      displayAmount[effectData.effectUid]}
                  </div>
                </motion.div>
              ) : (
                <>
                  <img
                    src={getEffectImage(effectData.effectId)}
                    className="w-full h-full object-contain"
                    alt=""
                  />
                  <div
                    className={`w-full h-full text-[18px] absolute text-stroke-regular z-10 flex justify-center items-center ${
                      animationType === "scale" ? "text-red-500" : "text-white"
                    }`}
                  >
                    {displayAmount[effectData.effectUid] > 0 &&
                      displayAmount[effectData.effectUid]}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      {effectTooltip && (
        <div
          className="absolute bottom-[150px] left-[8px] bg-[rgba(25,25,27,0.9)] text-white py-2.5 px-4 z-10 rounded flex items-center">
          <img
            src={getEffectImage(effectTooltip.effectId)}
            className="w-[28px] h-[28px] rounded-[6px] mr-2"
            alt=""
          />
          <div
            dangerouslySetInnerHTML={{
              __html: t(
                "effects.descriptions." + BattleEffects[effectTooltip.effectId],
                {
                  amount:
                    '<span class="text-[#ff3a3a]">' +
                    effectTooltip.amount +
                    "</span>",
                }
              ),
            }}
          />
        </div>
      )}
    </>
  );
};
