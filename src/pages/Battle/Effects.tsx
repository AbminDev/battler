import React, { useState, useEffect, useRef } from "react";
import { BattleEffectsData } from "./EnemyBattleData";
import { useTranslation } from "react-i18next";
import { BuffAnimation } from "../../components";
import { motion, Variants } from "framer-motion";

// Варіанти анімації
const scaleAndRed: Variants = {
  visible: {
    scale: [1, 2, 1],
    transition: { duration: 0.5 },
  },
  initial: {
    scale: 1,
  },
};

const bounceAndFlash: Variants = {
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

// Енуми
export enum BattleEffectsLink {
  stun = "../../assets/images/effect-stun.png",
  dmg = "../../assets/images/effect-dmg.png",
}

export enum BattleEffects {
  defense,
  triggeredByEnemiesAttackCard,
  doubleDamage,
  returnDamage,
}

// Функція для отримання зображення ефекту
function getEffectImage(effect: BattleEffects): string {
  return require(`../../assets/images/effect-${BattleEffects[effect]}.png`);
}

// Інтерфейс для displayAmount
interface DisplayAmount {
  [key: string]: number;
}

// Пропси компонента Effects
interface EffectsProps {
  effects: BattleEffectsData[];
  isReturnDamageAnimation: boolean;
}

export const Effects: React.FC<EffectsProps> = ({ effects, isReturnDamageAnimation }) => {
  const { t } = useTranslation();

  // Стан для тултіпу
  const [effectTooltip, setEffectTooltip] = useState<{
    effectId: BattleEffects;
    amount: number;
  } | null>(null);

  // Масив з effectUid, які тригерять анімацію
  const [triggeredEffects, setTriggeredEffects] = useState<string[]>([]);

  // Тип анімації для кожного effectUid
  const [animationTypes, setAnimationTypes] = useState<{ [key: string]: "bounce" | "scale" }>({});

  // Відображувані значення amount
  const [displayAmount, setDisplayAmount] = useState<DisplayAmount>({});

  // Попередні значення amount для кожного effectUid
  const prevAmounts = useRef<DisplayAmount>({});

  // Обробники подій
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

  // useEffect для обробки змін у масиві effects
  useEffect(() => {
    if (effects.length > 0) {
      const updatedAnimationTypes: { [key: string]: "bounce" | "scale" } = {};
      const updatedTriggeredEffects: string[] = [];
      const timers: NodeJS.Timeout[] = []; // Для зберігання таймерів

      effects.forEach((effect) => {
        const { effectUid, effectId, amount } = effect;
        const prevAmount = prevAmounts.current[effectUid] || 0;

        if (amount > prevAmount) {
          // Amount increased
          updatedAnimationTypes[effectUid] = "bounce";
          setDisplayAmount((prev) => ({
            ...prev,
            [effectUid]: amount,
          }));
          updatedTriggeredEffects.push(effectUid);
        } else if (amount < prevAmount) {
          // Amount decreased
          updatedAnimationTypes[effectUid] = "scale";
          setDisplayAmount((prev) => ({
            ...prev,
            [effectUid]: prevAmount, // Показуємо старе значення
          }));
          updatedTriggeredEffects.push(effectUid);

          // Встановлюємо таймер для оновлення до нового значення після анімації
          const timer = setTimeout(() => {
            setDisplayAmount((prev) => ({
              ...prev,
              [effectUid]: amount,
            }));
            // Видаляємо effectUid з triggeredEffects після анімації
            setTriggeredEffects((prev) => prev.filter((uid) => uid !== effectUid));
            // Видаляємо тип анімації
            setAnimationTypes((prev) => {
              const newTypes = { ...prev };
              delete newTypes[effectUid];
              return newTypes;
            });
          }, 500); // Тривалість анімації scaleAndRed

          timers.push(timer);
        } else {
          // Якщо amount не змінився, пропускаємо
          return;
        }

        // Оновлюємо попереднє значення
        prevAmounts.current[effectUid] = amount;
      });

      // Оновлюємо animationTypes
      setAnimationTypes((prev) => ({
        ...prev,
        ...updatedAnimationTypes,
      }));

      // Встановлюємо triggeredEffects
      setTriggeredEffects((prev) => [...prev, ...updatedTriggeredEffects]);

      // Очищаємо таймери при відміні компонента або змінах
      return () => {
        timers.forEach((timer) => clearTimeout(timer));
      };
    }
  }, [effects]);

  // useEffect для обробки isReturnDamageAnimation
  useEffect(() => {
    if (isReturnDamageAnimation) {
      const returnDamageEffects = effects.filter(
        (effect) => effect.effectId === BattleEffects.returnDamage
      );

      if (returnDamageEffects.length > 0) {
        const returnDamageEffect = returnDamageEffects[0];
        const { effectUid, effectId, amount } = returnDamageEffect;

        // Порівнюємо з попереднім значенням
        const prevAmount = prevAmounts.current[effectUid] || 0;

        if (amount > prevAmount) {
          setAnimationTypes((prev) => ({
            ...prev,
            [effectUid]: "bounce",
          }));
        } else if (amount < prevAmount) {
          setAnimationTypes((prev) => ({
            ...prev,
            [effectUid]: "scale",
          }));
        }

        // Оновлюємо попереднє значення
        prevAmounts.current[effectUid] = amount;

        if (amount < prevAmount) {
          // Amount decreased
          setDisplayAmount((prev) => ({
            ...prev,
            [effectUid]: prevAmount, // Показуємо старе значення
          }));

          // Тригеримо анімацію
          setTriggeredEffects((prev) => [...prev, effectUid]);

          // Встановлюємо таймер для оновлення до нового значення після анімації
          const timer = setTimeout(() => {
            setDisplayAmount((prev) => ({
              ...prev,
              [effectUid]: amount,
            }));
            setTriggeredEffects((prev) => prev.filter((uid) => uid !== effectUid));
            setAnimationTypes((prev) => {
              const newTypes = { ...prev };
              delete newTypes[effectUid];
              return newTypes;
            });
          }, 500); // Тривалість анімації scaleAndRed

          return () => clearTimeout(timer);
        } else {
          // Amount increased
          setDisplayAmount((prev) => ({
            ...prev,
            [effectUid]: amount,
          }));
          setTriggeredEffects((prev) => [...prev, effectUid]);

          const timer = setTimeout(() => {
            setTriggeredEffects((prev) => prev.filter((uid) => uid !== effectUid));
            setAnimationTypes((prev) => {
              const newTypes = { ...prev };
              delete newTypes[effectUid];
              return newTypes;
            });
          }, 1500); // Тривалість анімації bounceAndFlash

          return () => clearTimeout(timer);
        }
      }
    }
  }, [isReturnDamageAnimation, effects]);

  return (
    <>
      <div className="absolute flex flex-row bottom-[102px] z-0">
        {effects.map((effectData) => (
          <div key={effectData.effectUid}>
            <motion.div
              className="flex w-[34px] h-[34px] ml-[4px] justify-center items-center text-center relative"
              onMouseDown={() => handleMouseDown(effectData)}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={() => handleTouchStart(effectData)}
              onTouchEnd={handleTouchEnd}
              variants={
                animationTypes[effectData.effectUid] === "bounce"
                  ? bounceAndFlash
                  : scaleAndRed
              }
              initial="initial"
              animate={
                triggeredEffects.includes(effectData.effectUid) ? "visible" : "initial"
              }
              transition={{ duration: 0.5 }}
            >
              {triggeredEffects.includes(effectData.effectUid) && (
                <div className="flex justify-center items-center absolute w-20 h-20 z-10">
                  <BuffAnimation />
                </div>
              )}
              <img
                src={getEffectImage(effectData.effectId)}
                className="absolute w-[34px] h-[34px] rounded-[6px]"
                alt=""
              />
              <div
                className={`text-[18px] text-stroke-regular z-[1] ${
                  animationTypes[effectData.effectUid] === "scale" ? "text-red-500" : "text-white"
                }`}
              >
                {displayAmount[effectData.effectUid] > 0 &&
                  displayAmount[effectData.effectUid]}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
      {effectTooltip && (
        <div className="absolute bottom-[150px] left-[8px] right-[8px] bg-[rgba(25,25,27,0.9)] text-white py-2.5 px-4 z-10 rounded flex items-center">
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
