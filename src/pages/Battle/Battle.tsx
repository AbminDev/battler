import { useTelegram } from "../../hooks/useTelegram";
import {
  BattleRewards,
  endTurn,
  getRewardsAfterBattle,
  makeAction,
  startBattle,
} from "../../endpoints/lobbyEndpoints";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BattleEffects, Effects } from "./Effects";
import { BattleEffectsData, EnemyBattleData } from "./EnemyBattleData";
import { ActiveCards } from "./ActiveCards";
import {
  CalculationMethod,
  CardsConfig,
  CardType,
  ConditionParameter,
  ConditionSide,
  ExecutionActionType,
  MakeAction,
  mockCards,
  Opponent,
  Parameter,
} from "../../endpoints/mock";
import { ProfileBattleData } from "../../layout/components/ProfileBattleData";
import { CardProps } from "../../interfaces/card";
import {
  BossCardHitAnimation,
  BossDyingAnimation,
  FloatingNumber,
  HitAnimation,
  LevelUp,
  LooseAnimation,
  Startbattle,
  UnitAnimation,
  VictoryAnimation,
} from "../../components";
import { YourTurn } from "../../components/";
import { setSave } from "../../app/features/tutorialSaveSlice";
import { AppDispatch, RootState } from "../../app/store";
import { useUtils } from "../../utils/navigateTo";
import {
  isAddEffectAction,
  isChangeParametersAction,
  isDiscardCardsAction,
  isShuffleCardsAction,
  isUpdateCardsAction,
} from "../../utils/MakeActionTypeGuards";
import ReactGA from "react-ga4";
import * as amplitude from "@amplitude/analytics-browser";

import { Card } from "../../components/Card";
import {
  TutorialFarmStage,
  TutorialSave,
  TutorialStage,
} from "../../interfaces/tutorial";
import { updateTutorialProgress } from "../../endpoints/tutorialProgress";
import { updateBattleSave } from "../../utils/updateBattleSave";
import { updateDungeonCards } from "../../utils/updateDungeonCards";
import { isDungeonFinishStage } from "../../utils/dungeonFinishStage";
import { useFarm } from "../Farm/useFarm";
import { islandsConfigMock } from "../../mock/buildings";
import { IslandProps } from "../../containers/Farm/Island";
import { useIsland } from "../../containers/Farm/Island/useIsland";
import { sleep } from "../../utils/sleep";
import { motion } from "framer-motion";
import { usingCard } from "../../utils/usingCard";
import { PlayerGetHit } from "../../components/animation/PlayerGetHit";
import { CardDeck } from "./CardDeck";
// import { enemiesConfig } from "../../interfaces/battle";
import { useTranslation } from "react-i18next";
import {
  saveFarmTutorialProgress,
  setFarmSave,
  fetchFarmTutorialProgress,
} from "../../app/features/farmTutoralSlice";
import { completeDungeon } from "../../app/features/dungeonCompleted";
import { Resources } from "../../enums/resources";
import { Resource } from "../../mock/resources";
import { PopupButton } from "../../components/PopupButton";
import { HandleBackButton } from "../../layout/components/HeaderCave/components";
import { useSoundService } from "../../utils/soundService";
import { useUserInteraction } from "../../utils/hasInteracted";
import { DisplayData, handleLootBoxResult } from "../../utils/lootBoxHandler";
import { Enemies, parseEnemiesConfig } from "../../interfaces/battle";
import { fetchAppConfig } from "../../app/features/appConfigSlice";
import {APP_ENV} from "../../config";
import {heroesConfig} from "../../interfaces/hero";

enum HitType {
  Slash1 = 1,
  Slash3 = 2,
  Slash2 = 3,
  Slash4 = 4,
  // Explosion1 = 4,
}

const getRandomHitType = (): number => {
  return Math.floor(Math.random() * 3) + 1;
};

interface ParameterInfo {
  currValue: number;
  maxValue: number;
}

const UNIQ_EFFECTS = [3];

// const initialDeck = [
//   {
//     id: 0,
//     lvl: 1,
//     uid: "unique-id-1",
//     selected: true,
//     draggable: false,
//     hidden: false,
//     isBacklight: true,
//   },
//   {
//     id: 0,
//     lvl: 1,
//     uid: "unique-id-2",
//     selected: true,
//     draggable: false,
//     hidden: false,
//     isBacklight: true,
//   },
//   // {id: 3,
//   //   lvl: 10,
//   //   uid: "unique-id-3",
//   //   selected: true,
//   //   draggable: false,
//   //   hidden: false,
//   //   isBacklight: true,
//   // },
//   // Add more cards as needed
// ];

export const Battle = () => {
  const tutorialSave = useSelector(
    (state: RootState) => state.tutorialSave.tutorialSave.save
  );
  const actualSaves = useSelector(
    (state: RootState) => state.battleSave.battleSave.save
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAppConfig())
  },[])

  const appConfig = useSelector((state: RootState) => state.appConfig.configs);

  const enemiesConfig = appConfig.enemies.variables

  const enemies: Enemies[] = parseEnemiesConfig(enemiesConfig)

  const { t } = useTranslation();
  const { tg, userId } = useTelegram();
  const { navigateTo } = useUtils();

  const [isBattleStart, setIsBattleStart] = useState(false);
  const [isBattleStartAnimation, setIsBattleStartAnimation] = useState(false);
  // const [battleInit, setBattleInit] = useState<BattleInit>({} as BattleInit);
  const [bossEffects, setBossEffects] = useState<BattleEffectsData[]>([]);
  const [bossCurrentHp, setBossCurrentHp] = useState(15);
  const [bossCurrentMana, setBossCurrentMana] = useState(2);
  const [bossMaxHp, setBossMaxHp] = useState(20);
  const [bossMaxMana, setBossMaxMana] = useState(8);
  const [currentHp, setCurrentHp] = useState(15);
  const [currentMana, setCurrentMana] = useState(0);
  const [maxHp, setMaxHp] = useState(20);
  const [maxMana, setMaxMana] = useState(8);
  const [isDeckOpen, setIsDeckOpen] = useState(false);
  const [effects, setEffects] = useState<BattleEffectsData[]>([]);
  const [bossName, setBossName] = useState("");
  const [heroName, setHeroName] = useState("");
  const [bossLvl, setBossLvl] = useState(0);
  const [isBoss, setIsBoss] = useState(false);
  const [cards, setCards] = useState<CardProps[]>([]);
  const [actionPoints, setActionPoints] = useState(0);
  const [cardsAtDeck, setCardsAtDeck] = useState<CardProps[]>([]);
  const [isBattleEnd, setIsBattleEnd] = useState(false);
  const [confirmEndModal, setConfirmEndModal] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [triggerHit, setTriggerHit] = useState(false);
  const [triggerHitAmount, setTriggerHitAmount] = useState(false);
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const [animationType, setAnimationType] = useState("");
  const [startTurn, setStartTurn] = useState(false);
  const [fadeClass, setFadeClass] = useState("");
  const [fadeClassEndBattle, setFadeClassEndBattle] = useState("");
  const [usedCards, setUsedCards] = useState<CardProps[]>([]);
  const [defense, setDefense] = useState(0);
  const [bossDefense, setBossDefense] = useState(0);
  const [triggerBossCardAnination, setTriggerBossCardAnination] =
    useState(false);
  const [triggerBossAninationHit, setTriggerBossAninationHit] = useState(false);
  const [showBossDeck, setShowBossDeck] = useState(false);
  const [bossAttack, setBossAttack] = useState(false);
  const [bossAttackAmount, setBossAttackAmount] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [bossHit, setBossHit] = useState();
  const [bossDying, setBossDying] = useState(false);
  const [bossDyingAnimation, setBossDyingAnimation] = useState(false);
  const [hitType, setHitType] = useState(HitType.Slash1);
  const [hitAmount, setHitAmount] = useState<number>(0);
  const [BossHitAmount, setBossHitAmount] = useState<number>(0);
  const [isDraggingCards, setIsDraggingCards] = useState(true);
  const [isReturnDamageAnimation, setIsReturnDamageAnimation] = useState(false);
  const [showPopupButton, setShowPopupButton] = useState(false);
  const [isAnimationWinStart, setIsAnimationWinStart] = useState(false);
  const [isLevelUpStart, setIsLevelUpStart] = useState(false);
  const [isAnimationLooseStart, setIsAnimationLooseStart] = useState(false);
  const [bossCardsAtHand, setBossCardsAtHand] = useState<CardProps[]>([]);
  const [rewards, setRewards] = useState<BattleRewards>(
    {} as unknown as BattleRewards
  );
  const [isFirstUsedCard, setIsFirstUsedCard] = useState(false);
  const settings = useSelector((state: RootState) => state.settings.settings);
  const { playSound, playMusic, pausedSounds } = useSoundService();
  const hasInteracted = useUserInteraction();
  const [bossDeck, setBossDeck] = useState<CardProps[]>();

  //const { userId } = useTelegram();
  function setNewUsedCards(usedCards: CardProps[]) {
    setUsedCards(usedCards);
  }
  //console.log("hitType", hitType);
  let enemyId = 0;
  if (tutorialSave?.completed && actualSaves?.enemyId) {
    // console.log("ENEMIE Id from SAVE", actualSaves?.enemyId);
    //@ts-ignore
    enemyId = actualSaves?.enemyId;
  } else {
    enemyId = tutorialSave?.enemyId || 0;
  }

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const timeouts = useRef<any>([]);

  useEffect(() => {
    // console.log("hitAmount", hitAmount);
    if (hitAmount > 0) {
      setTriggerHit(true);
      playSound("enmHit");
      setTriggerHitAmount(true);
      const randomHitType = getRandomHitType();

      setHitType(randomHitType);
      // Після затримки анімації знімаємо тригер
      const timeoutId1 = setTimeout(() => {
        setTriggerHit(false);
      }, 250);

      const timeoutId2 = setTimeout(() => {
        setTriggerHitAmount(false);
      }, 1000);

      timeouts.current.push(timeoutId1);
      timeouts.current.push(timeoutId2);

      return () => {
        // Очищення всіх таймерів при розмонтажі
        timeouts.current.forEach(clearTimeout);
        timeouts.current = [];
      };
    }
  }, [hitAmount, bossCurrentHp, bossDefense]);

  useEffect(() => {
    dispatch(fetchFarmTutorialProgress(userId));
  }, []);

  const handleHeroHpChange = async (newHp: number) => {
    if (newHp < currentHp) {
      // console.log("start here");
      if (
        effects.some(
          (effectInfo) => effectInfo.effectId === BattleEffects.returnDamage
        )
      ) {
        setIsReturnDamageAnimation(true);
        setTimeout(() => setIsReturnDamageAnimation(false), 2000);
      }

      // Виконуємо анімацію урону
      await delay(1000);
      setTriggerBossAninationHit(true);
      await delay(200);

      setCurrentHp((prevHp) => {
        const hitAmount = prevHp - newHp;
        // console.log("hitAmount", hitAmount); // Логічне значення

        if (prevHp < newHp * 0.65) {
          playSound("damage");
        } else {
          playSound("enmHit");
        }
        // Оновлюємо hitAmount перед оновленням HP
        setBossHitAmount(hitAmount);

        // Повертаємо новий HP
        return newHp;
      });

      setBossAttack(true);
      setBossAttackAmount(true);
      setAnimationType("hit");
      setTriggerAnimation(true);
      setFadeClass("fade-in");

      if (navigator?.vibrate && settings?.vibration) {
        navigator.vibrate(150);
      }

      setTriggerBossAninationHit(false);
      await delay(500);
      setFadeClass("fade-out");
      setBossAttack(false);
      await delay(500);
      setBossAttackAmount(false);
      await delay(200);
      setTriggerAnimation(false);

      // console.log("end here");
    } else if (newHp > currentHp) {
      // Виконуємо анімацію хіла
      setAnimationType("heal");
      setTriggerAnimation(true);
      setFadeClass("fade-in");

      await delay(500);
      setFadeClass("fade-out");

      await delay(500);
      setTriggerAnimation(false);

      setCurrentHp((prevHp) => {
        const hitAmount = prevHp - newHp;
        // console.log("hitAmount", hitAmount); // Логічне значення

        // Оновлюємо hitAmount перед оновленням HP
        setBossHitAmount(hitAmount);

        // Повертаємо новий HP
        return newHp;
      });
    }
  };

  const handleBossHpChange = async (newHp: number) => {
    setBossCurrentHp((prevHp) => {
      const hitAmount = prevHp - newHp;
      // console.log("hitAmount", hitAmount); // Логічне значення

      // Оновлюємо hitAmount перед оновленням HP
      setHitAmount(hitAmount);

      // Повертаємо новий HP
      return newHp;
    });
  };

  const handleStartTurn = async () => {
    setStartTurn(true);
    await delay(800);
    setStartTurn(false);
  };

  useEffect(() => {
    if (tg) {
      tg.setHeaderColor("#1f1c1a");
    }
  }, [tg]);

  useEffect(() => {}, [cards?.length]);

  function removeCard(cardUid: string) {
    setCards(cards.filter((v) => v.uid !== cardUid));
    //console.log("cards at remove", cards.filter((v) => v.uid !== cardUid));
  }

  const cardStrategy: {
    [k in CardType]?: ({ card }: { card: CardProps }) => void;
  } = {
    [CardType.atk]: ({ card }) => {
      // console.log("ATK TYPE");
     //console.log("START CHECK SPELL");
      const copyCards = [...cards];
      const currentCard = copyCards.filter(
        (cardInfo) => cardInfo.uid === card.uid
      )[0];
      const cardInfo = mockCards.filter(
        (cardData) => cardData.id === currentCard.id
      )[0];
      switch (cardInfo.data?.condition?.parameter) {
        case ConditionParameter.health:
          const healthInfo =
            cardInfo.data?.condition.target === Opponent.enemy
              ? { maxHp: bossMaxHp, currHp: bossCurrentHp }
              : { maxHp, currHp: currentHp };
          const updatedCards = copyCards.filter((v) => {
            if (v.uid !== card.uid) {
              return v;
            }
          });
          if (cardInfo.data?.condition.conditionSide === ConditionSide.less) {
            lessConditionSide(
              cardInfo,
              currentCard,
              { currValue: healthInfo.currHp, maxValue: healthInfo.maxHp },
              updatedCards
            );
          } else {

          }
          break;
      }

      // const copyCards = cards;
      // console.log("UPDATED CARDS ->", copyCards);
      // const currentCard = copyCards.filter(
      //   (cardInfo) => cardInfo.uid === card.uid
      // )[0];
      // console.log("UPDATED CARDS AFTER FILTER->", copyCards);
      // currentCard.isBacklight = true;
      // setCards([]);
      // const updatedCards = copyCards.filter((v) => {
      //   if (v.uid !== card.uid) {
      //     return v;
      //   }
      // });
      // setCards([...(updatedCards as CardProps[]), currentCard]);
    },
    [CardType.spell]: ({ card }) => {
      // console.log("START CHECK SPELL");
      const copyCards = [...cards];
      const currentCard = copyCards.filter(
        (cardInfo) => cardInfo.uid === card.uid
      )[0];
      const cardInfo = mockCards.filter(
        (cardData) => cardData.id === currentCard.id
      )[0];
      if (cardInfo.id === 4) {
        // console.log("CARD ->4");
      }
      switch (cardInfo.data?.condition?.parameter) {
        case ConditionParameter.health:
          const healthInfo =
            cardInfo.data?.condition.target === Opponent.enemy
              ? { maxHp: bossMaxHp, currHp: bossCurrentHp }
              : { maxHp, currHp: currentHp };
          if (cardInfo.id === 4) {
            // console.log("HEALTHINFO->", healthInfo);
          }
          const updatedCards = copyCards.filter((v) => {
            if (v.uid !== card.uid) {
              return v;
            }
          });
          if (cardInfo.data?.condition.conditionSide === ConditionSide.less) {
            lessConditionSide(
              cardInfo,
              currentCard,
              { currValue: healthInfo.currHp, maxValue: healthInfo.maxHp },
              updatedCards
            );
          }
          break;
      }
    },
    [CardType.equip]: ({ card }) => {
      // console.log("START CHECK EQUIP");
      const copyCards = [...cards];
      const currentCard = copyCards.filter(
        (cardInfo) => cardInfo.uid === card.uid
      )[0];
      const cardInfo = mockCards.filter(
        (cardData) => cardData.id === currentCard.id
      )[0];
      switch (cardInfo.data?.condition?.parameter) {
        case ConditionParameter.health:
          const healthInfo =
            cardInfo.data?.condition.target === Opponent.enemy
              ? { maxHp: bossMaxHp, currHp: bossCurrentHp }
              : { maxHp, currHp: currentHp };
          const updatedCards = copyCards.filter((v) => {
            if (v.uid !== card.uid) {
              return v;
            }
          });
          if (cardInfo.data?.condition.conditionSide === ConditionSide.less) {
            lessConditionSide(
              cardInfo,
              currentCard,
              { currValue: healthInfo.currHp, maxValue: healthInfo.maxHp },
              updatedCards
            );
          }
          break;
      }
      // const copyCards = cards;
      // const currentCard = copyCards.filter(
      //   (cardInfo) => cardInfo.uid === card.uid
      // )[0];
      // const cardInfo = mockCards.filter(
      //   (cardData) => cardData.id === currentCard.id
      // )[0];
      // switch (cardInfo.data?.condition?.parameter) {
      //   case ConditionParameter.health:
      //     const healthInfo =
      //       cardInfo.data?.condition.target === Opponent.enemy
      //         ? { maxHp: bossMaxHp, currHp: bossCurrentHp }
      //         : { maxHp, currHp: currentHp };
      //     const updatedCards = copyCards.filter((v) => {
      //       if (v.uid !== card.uid) {
      //         return v;
      //       }
      //     });
      //     if (cardInfo.data?.condition.conditionSide === ConditionSide.less) {
      //       lessConditionSide(
      //         cardInfo,
      //         currentCard,
      //         { currValue: healthInfo.currHp, maxValue: healthInfo.maxHp },
      //         updatedCards
      //       );
      //     }
      //     break;
      // }
    },
  };

  const lessConditionSide = (
    cardInfo: CardsConfig,
    currentCard: CardProps,
    parameterInfo: ParameterInfo,
    updatedCards: CardProps[]
  ) => {
    if (cardInfo.id === 4) {
      // console.log("START LESS CONDITION SIDE");
    }
    switch (cardInfo.data?.condition?.calculationMethod) {
      case CalculationMethod.percent:
        //console.log("before statement", parameterInfo);
        if (cardInfo.id === 4) {
          // console.log("BOSS CURRENT HP->", bossCurrentHp);
          // console.log(
          //   "CONDITIONVALUE",
          //   Math.ceil((bossMaxHp * cardInfo.data?.condition.value) / 100)
          // );
        }
        currentCard.isBacklight =
          bossCurrentHp <=
          Math.ceil((bossMaxHp * cardInfo.data?.condition.value) / 100);

        //console.log("CURRENT BACKLIGHT", currentCard.isBacklight);
        //setCards([]);
        setCards([...updatedCards, currentCard]);

        break;
      case CalculationMethod.count:
        break;
    }
  };

  const moreConditionSide = (
    cardInfo: CardsConfig,
    currentCard: CardProps,
    parameterInfo: ParameterInfo
  ) => {
    switch (cardInfo.data?.condition?.calculationMethod) {
      case CalculationMethod.percent:
        currentCard.isBacklight =
          parameterInfo.currValue >
          (parameterInfo.maxValue * cardInfo.data?.condition.value) / 100;
        setCards([...cards, currentCard]);
        break;
      case CalculationMethod.count:
        break;
    }
  };

  const checkEffectAndSet = (target: Opponent, effect: BattleEffectsData) => {
    switch (target) {
      case Opponent.hero:
        if (
          effects.some((effectInfo) => effectInfo.effectId === effect.effectId)
        ) {
          // console.log("herere setEffects", effect);
          !UNIQ_EFFECTS.includes(effect.effectId) &&
            setEffects([...effects, effect]);
        } else {
          // console.log("herere setEffects 2", effect);
          setEffects([...effects, effect]);
        }
        break;
      case Opponent.enemy:
        //console.log("EFFECT BAFORE CHECK->", effect);
        // console.log("BOSS EFFECTS->", bossEffects);
        if (
          bossEffects.some(
            (effectInfo) => effectInfo.effectId === effect.effectId
          )
        ) {
          //console.log("HERE??");
          !UNIQ_EFFECTS.includes(effect.effectId) &&
            setBossEffects([...effects, effect]);
        } else {
          bossEffects.push(effect);
          // setBossEffects([...effects, effect]);
        }
        break;

      default:
        break;
    }
  };

  const changeBossHpAndShowDamageAnimation = async (bossHpValue: number) => {
    // console.log("we are here ");
    // if(effects.some((effectInfo) => effectInfo.effectId === BattleEffects.returnDamage)){
    //   setIsReturnDamageAnimation(true);
    //   setTimeout(() => setIsReturnDamageAnimation(false), 2000);
    // }
    await handleBossHpChange(bossHpValue);
  };

  const handleHeroDefenseChange = async (newDefense: number) => {
    // Зберігаємо попереднє значення захисту
    const prevDefense = defense;

    // Оновлюємо значення захисту
    setDefense((prevHp) => {
      const hitAmount = prevHp - newDefense;
      // console.log("hitAmount", hitAmount); // Логічне значення

      // Оновлюємо hitAmount перед оновленням HP
      setBossHitAmount(hitAmount);

      // Повертаємо новий HP
      return newDefense;
    });

    // Оновлюємо ефекти
    const effectsWithoutDefense = effects.filter(
      (v) => v.effectId !== BattleEffects.defense
    );

    // Запускаємо анімацію при зміні захисту
    if (newDefense < prevDefense) {
      if (
        effects.some(
          (effectInfo) => effectInfo.effectId === BattleEffects.returnDamage
        )
      ) {
        setIsReturnDamageAnimation(true);
        setTimeout(() => setIsReturnDamageAnimation(false), 2000);
      }
      // Якщо захист зменшився - виконуємо анімацію атаки боса

      await delay(1200);

      setTriggerBossAninationHit(true);
      await delay(300);
      // Починаємо анімацію атаки боса
      setBossAttack(true);
      setBossAttackAmount(true);
      setAnimationType("defence");
      playSound("defend");
      setTriggerAnimation(true);
      setFadeClass("fade-in");
      // console.log("herere setEffects 4", newDefense);

      setEffects([
        ...effectsWithoutDefense,
        {
          effectId: BattleEffects.defense,
          amount: newDefense,
          effectUid: "someStringForDefense",
        },
      ]);

      if (!newDefense) {
        setTimeout(() => {
          setEffects([...effectsWithoutDefense]);
        }, 500);
      }

      if (navigator?.vibrate && settings?.vibration) {
        navigator.vibrate(150);
      }

      // Затримка на тривалість анімації
      await delay(500);

      // Завершуємо анімацію
      setFadeClass("fade-out");
      setBossAttack(false);
      await delay(500);
      setBossAttackAmount(false);
      await delay(500);

      setTriggerAnimation(false);
      setTriggerBossAninationHit(false);
    }

    if (newDefense > prevDefense) {
      // console.log("herere setEffects 5", newDefense);
      setEffects([
        ...effectsWithoutDefense,
        {
          effectId: BattleEffects.defense,
          amount: newDefense,
          effectUid: "someStringForDefense",
        },
      ]);
      // Якщо захист збільшився - виконуємо анімацію захисту
      setAnimationType("defence");
      playSound("attackHit");
      setTriggerAnimation(true);
      setFadeClass("fade-in");

      // Затримка на тривалість анімації
      await delay(500);

      setFadeClass("fade-out");

      await delay(500);

      setTriggerAnimation(false);
    }
  };

  const handleBossDefenseChange = async (newDefense: number) => {
    // Зберігаємо попереднє значення захисту боса
    const prevDefense = bossDefense;

    // Оновлюємо значення захисту боса
    // setBossDefense(newDefense);
    // Запускаємо анімацію при зміні захисту боса

    setBossDefense((prevDef) => {
      // console.log("prevDef", prevDef);
      // console.log("newDefense", newDefense);

      const hitAmount = prevDef - newDefense;

      // console.log("hitAmount", hitAmount); // Логічне значення

      // Оновлюємо hitAmount перед оновленням HP
      setHitAmount(hitAmount);

      // Повертаємо новий HP
      return newDefense;
    });

    if (newDefense > 0) {
      if (newDefense > bossDefense) {
        // console.log('here', newDefense, bossDefense)
        // setShowBossDeck(true);
        await delay(500);
        // setTriggerBossCardAnination(true)

        // setAnimationType("defence");
        // setTriggerAnimation(true);
        // setFadeClass("fade-in");
        // // Очікуємо тривалість анімації fade-in
        // await delay(500);
        // setFadeClass("fade-out");
        // // Очікуємо тривалість анімації fade-out
        // await delay(500);
        // setTriggerAnimation(false);
      }

      if (bossDefense > newDefense) {
        // setAnimationType("defence");
        // setTriggerAnimation(true);
        // setFadeClass("fade-in");
        // // Очікуємо тривалість анімації fade-in
        // await delay(500);
        // setFadeClass("fade-out");
        // // Очікуємо тривалість анімації fade-out
        // await delay(500);
        // setTriggerAnimation(false);
      }
    }
    await delay(1000);

    // Оновлюємо ефекти боса
    const effectsWithoutDefense = bossEffects.filter(
      (v) => v.effectId !== BattleEffects.defense
    );

    setBossEffects([
      ...effectsWithoutDefense,
      {
        effectId: BattleEffects.defense,
        amount: newDefense,
        effectUid: "someStringForDefense",
      },
    ]);

    if (!newDefense) {
      setTimeout(() => {
        setBossEffects([...effectsWithoutDefense]);
      }, 500);
    }
  };

  const actionStrategy: {
    [k in ExecutionActionType]?: ({
      action,
    }: {
      action: MakeAction;
    }) => Promise<void>;
  } = {
    [ExecutionActionType.addEffect]: async ({ action }) => {
      // console.log("ADD EFFECT", action);
      if (isAddEffectAction(action)) {
        checkEffectAndSet(action.target, {
          effectId: action.effectId,
          effectUid: action.effectUid,
          amount: action.durationInRounds,
        });
      }
    },
    [ExecutionActionType.removeEffect]: async ({ action }) => {
      if (isAddEffectAction(action)) {
        if (action.target === Opponent.hero) {
          // console.log("herere setEffects 6", effects);
          setEffects(
            effects.filter((effect) => effect?.effectUid !== action.effectUid)
          );
        } else {
          setBossEffects(
            bossEffects.filter(
              (bossEffect) => bossEffect?.effectUid !== action.effectUid
            )
          );
        }
      }
    },
    [ExecutionActionType.executeSkill]: async ({ action }) => {
      // Логіка виконання скіла
    },
    [ExecutionActionType.executeEffect]: async ({ action }) => {
      // Логіка виконання ефекту
    },
    [ExecutionActionType.updateCards]: async ({ action }) => {
      if (isUpdateCardsAction(action)) {
        setCards(action.cardIds as unknown as CardProps[]);
      }
    },
    [ExecutionActionType.changeParameters]: async ({ action }) => {
      if (isChangeParametersAction(action)) {
        // console.log("at changeParameters", action);
        switch (action.parameter) {
          case Parameter.health:
            if (action.target === Opponent.hero) {
              // console.log("CASE NEEEDED");
              await handleHeroHpChange(action.value);
            } else {
              await changeBossHpAndShowDamageAnimation(action.value);
            }
            break;
          case Parameter.mana:
            if (action.target === Opponent.hero) {
              setCurrentMana(action.value);
            } else {
              setBossCurrentMana(action.value);
            }
            break;
          case Parameter.actionPoints:
            if (action.target === Opponent.hero) {
              setActionPoints(action.value);
            }
            break;
          case Parameter.defense:
            if (action.target === Opponent.hero) {
              await handleHeroDefenseChange(action.value); // Зміна захисту для героя
            } else {
              await handleBossDefenseChange(action.value); // Зміна захисту для боса
            }
            break;
        }
      }
    },
    [ExecutionActionType.discardCards]: async ({ action }) => {
      if (isDiscardCardsAction(action)) {
        setCards(action.cardIds as unknown as CardProps[]);
      }
    },
    [ExecutionActionType.shuffleCards]: async ({ action }) => {
      if (isShuffleCardsAction(action)) {
        // Додайте анімацію на замішування карти
      }
    },
  };

  function syncAndModifyArraysWithoutChangingOrder(
    firstArray: number[],
    secondArray: any[]
  ): number[] {
    const copyCards = [...cards];
    secondArray.forEach((card, index) => {
      if (!copyCards.some((v) => v.uid === card.uid)) {
        copyCards[copyCards.length] = card;
      }
    });
    const setSecond = new Set(secondArray);

    // Оставляем в первом массиве только те элементы, которые есть во втором
    const preservedOrderArray = firstArray.filter((id) => setSecond.has(id));

    const setFirst = new Set(preservedOrderArray);

    // Добавляем в первый массив те id, которых в нем нет, но которые есть во втором
    const missingInFirst = secondArray.filter((id) => !setFirst.has(id));

    // Возвращаем объединенный массив с сохранением порядка существующих элементов
    return [...preservedOrderArray, ...missingInFirst];
  }

  // // Пример использования
  //   let firstArray = [1, 2, 3, 4, 5];
  //   const secondArray = [4, 5, 6, 7, 8];
  //
  //   const updatedFirstArray = syncAndModifyArraysWithoutChangingOrder(firstArray, secondArray);
  //
  //   console.log('Updated firstArray:', updatedFirstArray); // [4, 5, 6, 7, 8]

  useEffect(() => {
    // console.log("CARDS CHANGES", cards);
  }, [cards]);

  const openDeck = () => {
    setIsDeckOpen(true);
  };
  const closeDeck = () => {
    setIsDeckOpen(false);
  };
  useEffect(() => {
    //console.log("cards before check", cards);
    if (cards) {
      cards.forEach((card) => {
        const cardType = mockCards.filter((v) => v.id === card.id)[0]?.data
          .type;

        // console.log("$$$$$$$$$$$$$$$$$$$$$", cardType);
        //@ts-ignore
        cardStrategy[cardType]({ card });
      });
    }
  }, [
    cards?.length,
    currentHp,
    currentMana,
    actionPoints,
    defense,
    maxHp,
    bossMaxHp,
    bossCurrentHp,
    bossCurrentMana,
  ]);
  async function makeCardAction({
    clientId,
    cardUid,
    cardId,
  }: {
    clientId: string;
    cardUid: string;
    cardId: number;
  }): Promise<void> {
    setIsDraggingCards(false);
    const usedCardResult = (await makeAction({
      cardUid,
      clientId,
    })) as MakeAction[];
    if (usedCardResult) {
      // console.log("Actions->", usedCardResult);
      for (const action of usedCardResult) {
        //console.log("Action iterator", action);
        await new Promise<void>((resolve) => {
          // console.log("START ACTION", action);
          //@ts-ignore
          actionStrategy[action?.type]?.({ action });
          resolve();
        });
        await sleep(100);
      }
      // Оновлюємо карти
      cards.forEach((card) => {
        const cardType = mockCards.find((v) => v.id === card.id)?.data.type;
        if (cardType && cardStrategy[cardType]) {
          //@ts-ignore
          cardStrategy[cardType]({ card });
        }
      });

      !isFirstUsedCard && setIsFirstUsedCard(true);
      setIsDraggingCards(true);
      return void 0;
    }
  }

  const updateSave = ({ save }: { save: TutorialSave }) => {
    // const save = { stage: TutorialStage.stone }
    dispatch(setSave(save));
    const updatingSave = async () => {
      await updateTutorialProgress({
        clientId: userId,
        save: JSON.stringify(save),
      });
    };
    updatingSave();
  };

  const { transformComponentRef } = useFarm();

  let islandData = islandsConfigMock[0];

  let props: IslandProps = {
    island: islandData,
    zoomRef: transformComponentRef,
  };
  const { onClickNavigate } = useIsland(props);

  const isFarmTutorialCompleted = useSelector(
    (state: RootState) => state.farmTutorial.tutorialFarmSave.save?.completed
  );
  const farmTutorialSave = useSelector(
    (state: RootState) => state.farmTutorial.tutorialFarmSave.save
  );

  const handleCompleteDungeon = (rewards: BattleRewards) => {
    console.log("rewards", rewards);
    // Приклад отриманих ресурсів
    const earnedResources: Resource[] = [
      { resourceType: Resources.experience, value: 100 },
      { resourceType: Resources.kitsu, value: 50 },
      { resourceType: Resources.stone, value: 30 },
    ];
    const displayData: DisplayData[] = rewards.bossRewards
    .map(handleLootBoxResult)
    .filter((data): data is DisplayData => data !== null);

    dispatch(completeDungeon(displayData));
  };

  const handleWin = () => {
    setIsBattleEnd(true);
    setIsWin(true);
    // navigateTo("/tutorial/dialogue");
    // if (tutorialSave) {
    // setTimeout(() => {
    // @ts-ignore
    if (tutorialSave?.completed) {
      //@ts-ignore
      if (isDungeonFinishStage({ actualSave: actualSaves })) {
        if (APP_ENV === 'production' && actualSaves?.dungeonId) {
          ReactGA.event({
            category: "Farm",
            action: `Dungeon ${actualSaves.dungeonId} completed`,
          });
          amplitude.track(`Dungeon ${actualSaves.dungeonId} completed`, {
            group: "Farm",
          });
        }

        updateBattleSave({
          clientId: userId,
          save: {
            //@ts-ignore
            enemyId: actualSaves.enemyId!,
            dungeonId: -1,
            stages: [],
            currentHp: -1,
            gold: -1,
            currentMana: -1,
            buildingId: -1,
          },
        });

        if (
          !isFarmTutorialCompleted &&
          farmTutorialSave?.stage &&
          farmTutorialSave?.stage < TutorialFarmStage.finishFirstBuilding
        ) {
          const dialogueId: number = farmTutorialSave?.dialogueId ?? 1;

          dispatch(
            saveFarmTutorialProgress({
              clientId: userId,
              save: {
                dialogueId: dialogueId + 1,
                stage: TutorialFarmStage.endbattle,
              },
            })
          );
        }

        handleCompleteDungeon(rewards);
        onClickNavigate();
      } else {
        //@ts-ignore
        //usingCard({dungeonId: actualSaves?.dungeonId, clientId: userId, stageId: actualSaves?.currentStage});
        // updateBattleSave({
        //   clientId: userId,
        //   save: {
        //     //@ts-ignore
        //     dungeonId: actualSaves.dungeonId,
        //     //@ts-ignore
        //     lastStageId: actualSaves.lastStageId + 1,
        //     //@ts-ignore
        //     enemyId: actualSaves.enemyId,
        //     //@ts-ignore
        //     stages: actualSaves.stages,
        //     currentStage: actualSaves?.currentStage,
        //     }});
        navigateTo("/dungeon");
      }

      return;
    }
    //@ts-ignore
    // console.log("CASE WITH WIN SKELETON AT TUTORIAL!!!!!!!!", tutorialSave);
    //@ts-ignore
    if (tutorialSave?.enemyId < 2) {
      if (!tutorialSave?.enemyId) {
        //dispatch(setSave({ enemyId: 1, stage: TutorialStage.dialogue1, dialogueId: (tutorialSave?.dialogueId ?? 0) + 1 }));
        updateSave({
          save: { enemyId: 1, stage: TutorialStage.dialogue1, dialogueId: 1 },
        });
        navigateTo("/tutorial/dialogue");
      } else {
        //dispatch(setSave({ enemyId: tutorialSave?.enemyId + 1, stage: TutorialStage.dialogue2, dialogueId: (tutorialSave?.dialogueId ?? 0) + 1 }));
        // console.log("BEFORE UPDATE SAVE AT END OF BATTLE", tutorialSave);
        updateSave({ save: { ...tutorialSave, completed: true } });

        if (APP_ENV === 'production') {
          ReactGA.event({ category: "Tutorial", action: "Finish" });
          amplitude.track("Finish", { group: "Tutorial" });
        }

        navigateTo("/island");
      }
    }
    // }, 1500);
    //}
  };

  const handleAnimationWinEnd = () => {
    // console.log("handleAnimationWinEnd");
    setFadeClassEndBattle("fade-out-end-battle");

    setTimeout(() => {
      setFadeClassEndBattle("");
      setIsAnimationWinStart(false);
      setShowPopupButton(false);
      const levelUp = false;
      if (levelUp) {
        setIsLevelUpStart(true);
        playSound("levelUp");
      } else {
        handleWin();
      }
    }, 1000);
  };

  const handleLoose = () => {
    //setCards([]);
    setFadeClassEndBattle("fade-out-end-battle");
    setTimeout(() => {
      setIsAnimationLooseStart(false);
      setShowPopupButton(false);
      setIsBattleEnd(true);
      setFadeClassEndBattle("");
      //pausedSounds();
      if (tutorialSave?.enemyId === 2) {
        if (APP_ENV === 'production') {
          ReactGA.event({ category: "Tutorial", action: "Died" });
          amplitude.track("Died", { group: "Tutorial" });
        }
        //dispatch(setSave({ enemyId: tutorialSave?.enemyId, stage: TutorialStage.amulet, dialogueId: tutorialSave?.dialogueId }));
        updateSave({
          save: {
            enemyId: tutorialSave?.enemyId,
            stage: TutorialStage.finish,
            dialogueId: tutorialSave?.dialogueId,
          },
        });
        navigateTo("/tutorial");
      } else {
        if (enemyId > 2) {
          navigateTo("/dungeon");
        }
        resetBattle();
      }
    }, 1000);
  };

  const handeleStartBattle = () => {
    setIsBattleStartAnimation(true);
    playSound("battleStart");
    setTimeout(() => {
      setIsBattleStart(true);
      setIsBattleStartAnimation(false);
    }, 2500);
    if (APP_ENV === 'production') {
      ReactGA.event({
        category: "Battle",
        action: "Start battle vs " + bossName,
      });
      amplitude.track("Battle vs " + bossName, {
        group: "Battle",
        enemy: bossName,
        start: true,
      });
    }
  };

  useEffect(() => {
    if (hasInteracted) {
      if (isBoss) {
        playMusic("battleBoss");
      } else {
        playMusic("battleEnemy");
      }
    }
  }, [hasInteracted]);

  const resetBattle = async () => {
    setIsBattleEnd(false);
    setIsWin(false);

    // let enemyId = 0;
    // // if (tutorialSave) {
    //   if (tutorialSave?.completed) {
    //     //@ts-ignore
    //     enemyId = actualSaves?.enemyId;
    //   } else {
    //     enemyId = tutorialSave?.enemyId || 0;
    //   }
    // //}

    const battleInitEndpoint = await startBattle({
      clientId: userId,
      //@ts-ignore
      cardId: tutorialSave?.completed ? actualSaves?.currentStage : enemyId,
      dungeonId: actualSaves?.dungeonId ?? 0,
      buildingId: actualSaves?.buildingId ?? 0,
    });

    if (battleInitEndpoint) {
      // console.log(
      //   "Battle Init ->",
      //   battleInitEndpoint?.maxHp,
      //   typeof battleInitEndpoint?.maxHp
      // );
      setMaxHp(battleInitEndpoint?.maxHp);
      setMaxMana(battleInitEndpoint?.maxMana);
      setCurrentHp(battleInitEndpoint?.currentHp);
      setCurrentMana(battleInitEndpoint?.maxMana);
      setBossMaxHp(battleInitEndpoint?.enemy?.maxHp);
      setBossMaxMana(battleInitEndpoint?.enemy?.maxMana);
      setBossCurrentHp(battleInitEndpoint?.enemy?.maxHp);
      setBossCurrentMana(battleInitEndpoint?.enemy?.maxMana);
      setBossLvl(enemies[battleInitEndpoint?.enemy?.id]?.lvl);
      setIsBoss(enemies[battleInitEndpoint?.enemy?.id]?.isBoss);
      setCardsAtDeck(battleInitEndpoint?.cardsAtDeck);
      setBossName(enemies[battleInitEndpoint?.enemy?.id]?.name);
      setHeroName(heroesConfig[battleInitEndpoint?.heroId]?.name);
      setCards([]);
      setCards(battleInitEndpoint?.cardsAtHand);
      setBossCardsAtHand(battleInitEndpoint?.enemy?.cardsAtHand);

      handeleStartBattle();
    }
  };

  useEffect(() => {
    checkBattleEnd();
  }, [currentHp, bossCurrentHp]);

  const handleBossDying = () => {
    setBossDyingAnimation(true);
    playSound("death");
    delay(1000);

    setIsAnimationWinStart(true);

    delay(300);

    setShowPopupButton(true);
  };
  const checkBattleEnd = () => {
    if (currentHp <= 0) {
      playSound("battleEnd");
      if (APP_ENV === 'production') {
        ReactGA.event({
          category: "Battle",
          action: "Loose in battle vs " + bossName,
        });
        amplitude.track("Battle vs " + bossName, {
          group: "Battle",
          enemy: bossName,
          loose: true,
        });
      }
      setIsAnimationLooseStart(true);
      delay(300);
      setShowPopupButton(true);
      setCards([]);
      // setIsBattleEnd(true);
      // if (tutorialSave?.enemyId === 2) {
      //   ReactGA.event({ category: "Tutorial", action: "Died" });
      //   navigateTo("/tutorial");
      // } else {
      //   resetBattle();
      // }
    }

    if (bossCurrentHp <= 0) {
      playSound("battleEnd");
      setBossDying(true);
      const getRewards = async () => {
        const getRewardsResult = await getRewardsAfterBattle({
          dungeonId: actualSaves?.dungeonId!,
          clientId: userId,
          stageId: actualSaves?.currentStage!,
        });
        if (getRewardsResult) {
          setRewards(getRewardsResult);
        }
      };
      if (tutorialSave?.completed) {
        getRewards();
      } else {
        setRewards({ coins: 5, bossRewards: [] });
      }
      if (APP_ENV === 'production') {
        ReactGA.event({
          category: "Battle",
          action: "Win in battle vs " + bossName,
        });
        amplitude.track("Battle vs " + bossName, {
          group: "Battle",
          enemy: bossName,
          win: true,
        });
      }
      // setIsBattleEnd(true);
      // setIsWin(true);
      // if (tutorialSave) {
      //   dispatch(setSave({enemyId: tutorialSave.enemyId + 1}));
      // }
      // navigate('/tutorial/dialogue');
    }
  };
  const [isAllStepsResolved, setIsAllStepsResolved] = useState(true);

  async function executeAction(steps: {
    cardInfo?: { cardId: number; lvl: number; uid: string };
    actions: MakeAction[];
  }) {
    // Перевіряємо, чи є cardInfo і чи дія належить босу
    if (steps.cardInfo) {
      // Встановлюємо поточну карту боса для анімації
      setShowBossDeck(true);
      await delay(500);
      setTriggerBossCardAnination(true);

      // Після певного часу скидаємо тригер анімації
      setTimeout(() => {
        setTriggerBossCardAnination(false);
      }, 2500); // Задайте потрібний час для анімації
    }

    for (const act of steps.actions) {
      if (actionStrategy[act?.type]) {
        if (act.type !== ExecutionActionType.updateCards) {
          //@ts-ignore
          await actionStrategy[act.type]({ action: act });
        }
      } else {
        console.warn(`No handler for action type: ${act.type}`);
      }
    }
  }

  async function endTurnEndpoint() {
    setUsedCards([]);
    setIsDraggingCards(false);
    setIsAllStepsResolved(false);
    const endTurnResult = await endTurn({
      clientId: userId,
    });
    if (endTurnResult) {
      let allBossCards: CardProps[] = [];

      // Проходимо по всіх кроках
      endTurnResult.steps.forEach((step) => {
        // Проходимо по всіх діях в кроці
        // Перевіряємо, чи є cardInfo та чи дія належить босу
        if (step.cardInfo) {
          allBossCards.push({ ...step.cardInfo, id: step.cardInfo.cardId });
        }
      });
      console.log("allBossCards", allBossCards);
      setBossDeck(allBossCards);

      for (const action of endTurnResult.steps) {
        // console.log("Processing action:", action);

        // here cards
        await executeAction(action);
        // for (const act of action.actions) {

        //   if (actionStrategy[act?.type]) {
        //     if (act.type !== ExecutionActionType.updateCards) {
        //       //@ts-ignore
        //       await actionStrategy[act.type]({ action: act });
        //     }
        //   } else {
        //     console.warn(`No handler for action type: ${act.type}`);
        //   }
        // }
        //@ts-ignore

        // if (endTurnResult.cardsAtHand.length > 0) {
        //   console.log('HEREEE at CARDS FROM ????');
        //   setCards(endTurnResult?.cardsAtHand as unknown as CardProps[]);
        //   const updatedCardsAtDeck = cardsAtDeck.filter(
        //     (deckCard) =>
        //       !endTurnResult?.cardsAtHand.some(
        //         (card) => card.uid === deckCard.uid
        //       )
        //   );
        //   setCardsAtDeck(updatedCardsAtDeck);
        // }

        // Можливо, потрібно затримати між діями для плавності анімації
        // await delay(600);
      }
      if (endTurnResult.cardsAtHand.length > 0) {
        // console.log("HEREEE at CARDS FROM ????");
        setCards(endTurnResult?.cardsAtHand as unknown as CardProps[]);
        const updatedCardsAtDeck = cardsAtDeck.filter(
          (deckCard) =>
            !endTurnResult?.cardsAtHand.some(
              (card) => card.uid === deckCard.uid
            )
        );
        setCardsAtDeck(updatedCardsAtDeck);

        // preload my new cards
        endTurnResult.cardsAtHand.forEach((card) => {
          const cardName = mockCards.find((v) => v.id === card.id)?.data.name;
          try {
            const img = new Image();
            img.src = require(`../../assets/images/cards/${cardName}-${card.lvl}Star.png`);
          } catch (e) {
            console.error(`Error loading card ${cardName}-${card.lvl}Star.png`);
          }
        });

        // preload new enemy cards
        if (
          endTurnResult?.enemy?.cardsAtHand &&
          endTurnResult.enemy.cardsAtHand.length > 0
        ) {
          endTurnResult.enemy.cardsAtHand.forEach((card) => {
            const cardName = mockCards.find((v) => v.id === card.id)?.data.name;
            try {
              const img = new Image();
              img.src = require(`../../assets/images/cards/${cardName}-${card.lvl}Star.png`);
            } catch (e) {
              console.error(
                `Error loading card ${cardName}-${card.lvl}Star.png`
              );
            }
          });
        }
      }

      setBossCardsAtHand(endTurnResult?.enemy?.cardsAtHand);

      // Оновлюємо карти
      cards.forEach((card) => {
        const cardType = mockCards.find((v) => v.id === card.id)?.data.type;
        if (cardType && cardStrategy[cardType]) {
          //@ts-ignore
          cardStrategy[cardType]({ card });
        }
      });

      setIsAllStepsResolved(true);

      // Чекаємо завершення всіх анімацій перед початком нового ходу
      await handleStartTurn();
      setIsFirstUsedCard(false);
      setIsDraggingCards(true);
      setShowBossDeck(false);
    }
  }
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    async function battleInit() {
      if (!tutorialSave) {
        dispatch(setSave({ enemyId: 0, stage: TutorialStage.battle }));
      }

      //@ts-ignore
      // console.log(
      //   "BEFORE LOADING BATLE ENEMY ID AND SAVE",
      //   tutorialSave?.enemyId,
      //   tutorialSave
      // );
      // let enemyId = 0;
      // // if (tutorialSave) {
      // if (tutorialSave?.completed) {
      //   //@ts-ignore
      //   console.log('My actual save!!!!!', actualSaves);
      //   //@ts-ignore
      //   enemyId = actualSaves?.enemyId;
      // } else {
      //   enemyId = tutorialSave?.enemyId || 0;
      // }

      const battleInitEndpoint = await startBattle({
        clientId: userId,
        dungeonId: actualSaves?.dungeonId ?? 0,
        //@ts-ignore
        cardId: tutorialSave?.completed ? actualSaves?.currentStage : enemyId,
        buildingId: actualSaves?.buildingId ?? 0,
      });

      if (!battleInitEndpoint) {
        setError(true);
      }
      if (battleInitEndpoint) {
        setLoaded(true);
        // console.log(battleInitEndpoint);
        if (APP_ENV === 'production') {
          ReactGA.event({
            category: "Tutorial",
            action: "Battle " + (battleInitEndpoint?.enemy.id + 1),
          });
          amplitude.track("Battle " + (battleInitEndpoint?.enemy.id + 1), {
            group: "Tutorial",
          });
        }

        // console.log(
        //   "Battle Init ->",
        //   battleInitEndpoint?.maxHp,
        //   typeof battleInitEndpoint?.maxHp
        // );
        setMaxHp(battleInitEndpoint?.maxHp);
        setMaxMana(battleInitEndpoint?.maxMana);
        setCurrentHp(battleInitEndpoint?.currentHp);
        //console.log('AT MIDDLE STEP');
        setCurrentMana(battleInitEndpoint?.maxMana);
        setBossMaxHp(battleInitEndpoint?.enemy?.maxHp);
        setBossMaxMana(battleInitEndpoint?.enemy?.maxMana);
        setBossCurrentHp(battleInitEndpoint?.enemy?.maxHp);
        setBossCurrentMana(battleInitEndpoint?.enemy?.maxMana);
        setBossLvl(enemies[battleInitEndpoint?.enemy?.id]?.lvl);
        setIsBoss(enemies[battleInitEndpoint?.enemy?.id]?.isBoss);
        setCardsAtDeck(battleInitEndpoint?.cardsAtDeck);
        setBossName(enemies[battleInitEndpoint?.enemy?.id]?.name);
        setHeroName(heroesConfig[battleInitEndpoint?.heroId]?.name);
        setCards(battleInitEndpoint?.cardsAtHand);
        setBossCardsAtHand(battleInitEndpoint?.enemy?.cardsAtHand);
        handeleStartBattle();
        //console.log('END BATTLE INIT');

        // preload my cards
        if (
          battleInitEndpoint?.cardsAtHand &&
          battleInitEndpoint.cardsAtHand.length > 0
        ) {
          battleInitEndpoint.cardsAtHand.forEach((card) => {
            const cardName = mockCards.find((v) => v.id === card.id)?.data.name;
            try {
              const img = new Image();
              img.src = require(`../../assets/images/cards/${cardName}-${card.lvl}Star.png`);
            } catch (e) {
              console.error(
                `Error loading card ${cardName}-${card.lvl}Star.png`
              );
            }
          });
        }

        // preload enemy cards
        if (
          battleInitEndpoint?.enemy?.cardsAtHand &&
          battleInitEndpoint.enemy.cardsAtHand.length > 0
        ) {
          battleInitEndpoint.enemy.cardsAtHand.forEach((card) => {
            const cardName = mockCards.find((v) => v.id === card.id)?.data.name;
            try {
              const img = new Image();
              img.src = require(`../../assets/images/cards/${cardName}-${card.lvl}Star.png`);
            } catch (e) {
              console.error(
                `Error loading card ${cardName}-${card.lvl}Star.png`
              );
            }
          });
        }
      }
    }

    battleInit();
  }, []);

  useEffect(() => {
    //console.log('maxHPHPHPHPHPHP->', maxHp);
  }, [maxHp]);

  useEffect(() => {
    handleStartTurn();
  }, [isBattleStart]);

  const checkIsCardUsage = () => {

  };

  const card = {
    id: 1,
    lvl: 10,
    uid: "unique-id-1",
    selected: true,
    draggable: false,
    hidden: false,
    isBacklight: true,
  };
  // console.log("BATTLE TUTORIAL SAVE", tutorialSave, tutorialSave?.enemyId ?? 0);

  const { goBack } = useUtils();

  // @ts-ignore
  return (
    <>
      {!error ? (
        <>
          {/* <button onClick={() => handleHeroHpChange(19)}>Heal</button> */}
          {isBattleStartAnimation && (
            <>
              {
                <motion.div
                  className="h-full w-full absolute bg-no-repeat bg-center bg-cover"
                  style={{
                    backgroundImage: `url(${
                      enemyId
                        ? require(`../../assets/images/battle/battle-background-${enemyId}.jpg`)
                        : require(`../../assets/images/battle/battle-background-0.jpg`)
                    })`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2 }}
                ></motion.div>
              }
              <Startbattle className="absolute w-full h-full ml-[5px] z-20" />
            </>
          )}
          {isBattleStart && (
            <>
              <div>
                {/*<div> TODO battle background</div>*/}
                <div className="absolute flex items-center justify-center h-full w-full">
                  {tutorialSave?.completed && (
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <div
                        className="flex items-center justify-center w-8 h-8 bg-stone-700 border border-zinc-900 cursor-pointer"
                        onClick={() => {
                          playSound("notification");
                          setConfirmEndModal(true);
                        }}
                      >
                        <div className="flex items-center justify-center w-[24px] h-[24px] bg-stone-500 border border-zinc-900">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.75 11.1477V12.8523H8.52273L13.2102 17.5398L12 18.75L5.25 12L12 5.25L13.2102 6.46023L8.52273 11.1477H18.75Z"
                              fill="#352A21"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                  {tutorialSave?.completed && (
                    <div
                      className={`absolute transform transition-transform duration-200 z-10 left-0 right-0 p-5 h-[282px] 
                -bottom-[282px] bg-no-repeat bg-[length:100%_100%] bg-[url('./assets/images/shop-buy-modal-background.png')]
                ${confirmEndModal ? "-translate-y-full" : "translate-y-0"}
              `}
                    >
                      <button
                        className="absolute z-10 w-5 h-5 top-3.5 right-3.5 flex items-center justify-center"
                        onClick={() => setConfirmEndModal(false)}
                      >
                        <img
                          src={require("../../assets/images/shop-modal-close.png")}
                          className="w-5 h-5"
                          alt=""
                        />
                      </button>
                      <div className="text-[30px] leading-[1.2] mt-3 mb-2 text-[#19191B] text-center">
                        {t("battleGoBackTitle")}
                      </div>
                      {t("battleGoBackDescription")}
                      <div className="flex justify-center mt-8">
                        <PopupButton
                          type="gray"
                          className="mr-4"
                          onClick={() => {
                            setConfirmEndModal(false);
                            playSound("button");
                          }}
                        >
                          {t("cancel")}
                        </PopupButton>
                        <PopupButton
                          type="red"
                          onClick={() => {
                            if (goBack) goBack();
                            playSound("battleEnd");
                          }}
                        >
                          {t("confirm")}
                        </PopupButton>
                      </div>
                    </div>
                  )}
                  {/*<div className={`absolute transform transition-transform duration-200 z-10 left-0 right-0 p-5 h-[282px] */}
                  {/*  -bottom-[282px] bg-no-repeat bg-[length:100%_100%] bg-[url('./assets/images/shop-buy-modal-background.png')]*/}
                  {/*  ${confirmEndModal ? "-translate-y-full" : "translate-y-0"}*/}
                  {/*`}>*/}
                  {/*  <button className="absolute z-10 w-5 h-5 top-3.5 right-3.5 flex items-center justify-center"*/}
                  {/*    onClick={() => setConfirmEndModal(false)}>*/}
                  {/*    <img src={require("../../assets/images/shop-modal-close.png")} className="w-5 h-5"*/}
                  {/*      alt=""/>*/}
                  {/*  </button>*/}
                  {/*  <div*/}
                  {/*    className="text-[30px] leading-[1.2] mt-3 mb-2 text-[#19191B] text-center">*/}
                  {/*    {t("battleGoBackTitle")}*/}
                  {/*  </div>*/}
                  {/*  {t("battleGoBackDescription")}*/}
                  {/*  <div className="flex justify-center mt-8">*/}
                  {/*    <PopupButton type="gray" width="auto" onClick={() => setConfirmEndModal(false)}>*/}
                  {/*      {t("cancel")}*/}
                  {/*    </PopupButton>*/}
                  {/*    <PopupButton type="red" width="180px" onClick={goBack}>*/}
                  {/*      {t("confirm")}*/}
                  {/*    </PopupButton>*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                  {tutorialSave && (
                    <div
                      className="h-full w-full absolute bg-no-repeat bg-center bg-cover"
                      style={{
                        backgroundImage: `url(${require(`../../assets/images/battle/battle-background-${enemyId}.jpg`)})`,
                      }}
                    ></div>
                  )}
                  {triggerHit && (
                    <>
                      <HitAnimation
                        triggerHit={triggerHit}
                        hitType={hitType}
                        hitAmount={hitAmount}
                        className="absolute w-[300px] h-[300px] top-[20%] ml-[12px] z-10"
                      />
                    </>
                  )}
                  {triggerHitAmount && (
                    <div className="absolute w-[300px] h-[300px] top-[16%] ml-[12px] z-10 flex items-center justify-center">
                      <FloatingNumber value={-hitAmount} />
                    </div>
                  )}
                  {triggerAnimation && (
                    <div
                      className={`absolute top-0 z-20 h-full w-full ${fadeClass}`}
                    >
                      {animationType === "heal" && (
                        <div className="fixed inset-0 w-full h-full z-[9999] shadow-[inset_0_0_40px_30px_#24b510]"></div>
                      )}
                      {animationType === "hit" && (
                        <div className="fixed inset-0 w-full h-full z-[9999] shadow-[inset_0_0_40px_30px_#a10b28]"></div>
                      )}
                      {animationType === "defence" && (
                        <div className="fixed inset-0 w-full h-full z-[9999] shadow-[inset_0_0_40px_30px_#1c79c3]"></div>
                      )}
                    </div>
                  )}
                  {/* <TextAnimation /> */}
                  {/*@ts-ignore*/}
                  {(!tutorialSave || enemyId < 1) && !isBattleEnd && (
                    <motion.div
                      initial={{ opacity: 1 }} // Початково непрозорий
                      animate={{ opacity: bossDyingAnimation ? 0 : 1 }} // Якщо bossDying true, то зникає (прозорість 0)
                      transition={{ duration: 2 }} // Тривалість анімації прозорості
                      className="flex justify-center items-center"
                    >
                      <UnitAnimation
                        fileName={"/enemy/newskeleton.riv"}
                        className={
                          "absolute w-[300px] h-[300px] top-[20%] ml-[12px]"
                        }
                        triggerHit={triggerHit}
                        triggerAttack={triggerBossAninationHit}
                      />
                    </motion.div>
                  )}
                  {/*@ts-ignore*/}
                  {tutorialSave && enemyId > 0 && !isBattleEnd && (
                    <motion.div
                      initial={{ opacity: 1 }} // Початково непрозорий
                      animate={{ opacity: bossDyingAnimation ? 0 : 1 }} // Якщо bossDying true, то зникає (прозорість 0)
                      transition={{ duration: 2 }} // Тривалість анімації прозорості
                      className="flex justify-center items-center"
                    >
                      <UnitAnimation
                        fileName={`/enemy/${enemyId}.riv`}
                        className="absolute w-[300px] h-[300px] top-[20%] ml-[12px]"
                        triggerHit={triggerHit}
                        triggerAttack={triggerBossAninationHit}
                      />
                    </motion.div>
                  )}
                  {/* {!isBattleEnd && (
                <>
                  <div className="absolute w-[285px] h-[300px] top-[17%] -left-[25px]">
                    <BossCardHitAnimation
                      triggerHit={triggerBossCardAninationHit}
                    />
                    <div className="absolute flex justify-center items-center w-full h-[35px] top-3">
                      <div className="absolute w-[21px] h-[36px] ml-[145px]">
                        <img
                          src={require(`../../assets/images/CardBack.png`)}
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )} */}
                  {bossAttack && (
                    <div className="absolute flex justify-center w-full bottom-0 top-[25%] z-[51]">
                      {/* <PlayerGetHit /> */}
                      <HitAnimation
                        triggerHit={bossAttack}
                        hitType={HitType.Slash4}
                        hitAmount={BossHitAmount}
                        className="absolute w-full h-[50vh] bottom-0 z-10"
                      />
                    </div>
                  )}
                  {bossAttackAmount && (
                    <div className="absolute flex justify-center w-full h-full top-[25%] z-[51]">
                      <FloatingNumber value={-BossHitAmount} />
                    </div>
                  )}

                  {/* {showBossCard && (
                <div className="absolute flip-card rounded-md w-[100px] h-[150px] top-[17%] left-[5%]">
                  <motion.div
                    className="flip-card-inner w-[100%] h-[100%]"
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 360 }}
                    transition={{ duration: 0.1, animationDirection: "normal" }}
                    onAnimationComplete={() => setIsAnimating(false)}
                  >
                    <div className=" flip-card-back absolute w-[100px] h-[150px] ">
                      <Card
                        id={card.id}
                        lvl={card.lvl}
                        uid={card.uid}
                        hidden={false}
                      />
                    </div>
                    <div className="absolute flip-card-front  w-[100px] h-[150px]  rounded-xl border-black border-2 bg-[#3b3b3b]">
                      <div className="w-full h-[140px] border-black border-b-[3px] rounded-xl bg-[#594f3d]">
                        <div className="w-full h-[130px]  bg-gradient-to-b from-[#827657] to-[#675B47] rounded-t-xl rounded-b-2xl " />
                      </div>
                    </div>
                  </motion.div>
                </div>
              )} */}
                  {bossDying && (
                    <>
                      <BossDyingAnimation
                        className="absolute w-[300px] h-[300px] top-[20%] ml-[12px]"
                        bossDying={handleBossDying}
                      />
                    </>
                  )}

                  {!isBattleEnd && !isAllStepsResolved && bossDeck && (
                    <CardDeck
                      triggerBossCardAnimationHit={triggerBossCardAnination}
                      initialDeck={bossDeck}
                      showDeck={showBossDeck}
                    />
                  )}
                  {startTurn &&
                    !triggerBossCardAnination &&
                    (!isAnimationWinStart || !isAnimationLooseStart) && (
                      <YourTurn
                        startTurn={startTurn}
                        className="absolute w-[700px] h-[700px] top-0 ml-[12px] z-10"
                      />
                    )}
                  <EnemyBattleData
                    lvl={bossLvl}
                    maxHp={bossMaxHp}
                    maxMana={bossMaxMana}
                    name={bossName}
                    currentMana={bossCurrentMana}
                    currentHp={bossCurrentHp}
                    effects={bossEffects}
                  />

                  {!isAnimationWinStart && (
                    <ActiveCards
                      cards={cards}
                      makeCardAction={makeCardAction}
                      usedCards={usedCards}
                      setUsedCards={setNewUsedCards}
                      cardStrategy={cardStrategy}
                      removeCard={removeCard}
                      isDraggingCards={
                        isAllStepsResolved &&
                        isDraggingCards &&
                        !isAnimationWinStart &&
                        !isAnimationLooseStart &&
                        !bossDying
                      }
                    />
                  )}
                  <Effects
                    effects={effects}
                    isReturnDamageAnimation={isReturnDamageAnimation}
                  />
                </div>
                <ProfileBattleData
                  isFirstCardPlayed={isFirstUsedCard}
                  endTurnEndpoint={endTurnEndpoint}
                  cardsAtDeck={cardsAtDeck}
                  cardsAtHand={cards}
                  currentHp={currentHp}
                  heroName={heroName}
                  currentMana={currentMana}
                  maxMana={maxMana}
                  maxHp={maxHp}
                  closeDeck={closeDeck}
                  isDeckOpen={isDeckOpen}
                  openDeck={openDeck}
                  currentDefense={defense}
                  isDraggingCards={isDraggingCards}
                />
              </div>
            </>
          )}
          {isAnimationWinStart && rewards?.coins && (
            <>
              <div
                className="absolute w-full h-full bg-black opacity-60 z-10"
                onClick={handleAnimationWinEnd}
              ></div>
              <div
                className={`${fadeClassEndBattle}`}
                onClick={handleAnimationWinEnd}
              >
                <VictoryAnimation
                  className="absolute w-full h-full ml-[5px] z-20"
                  coinNum={rewards.coins ?? 1}
                  expBarNum={25}
                  lvlNum={1}
                />
              </div>
              {showPopupButton && (
                <div
                  className={`absolute bottom-[100px] w-full px-14 flex justify-center items-center  ${fadeClassEndBattle}`}
                >
                  <div
                    className={`${
                      fadeClassEndBattle.length ? "" : "fade-in-end-battle"
                    }  select-none cursor-pointer w-full h-12 pb-1  relative text-center z-30 border-black text-white text-[30px]`}
                  >
                    {t("next")}
                  </div>
                </div>
              )}

              {/* <div
            className={`absolute bottom-[100px] w-full px-[40px]  ${fadeClassEndBattle}`}
          >
            <div
              className={`${
                fadeClassEndBattle.length ? "" : "fade-in-end-battle"
              }  select-none cursor-pointer w-full h-12 pb-1 bg-[#161C3C] rounded-md shadow-lg  relative transform transition-transform duration-150 active:scale-95 z-30 border-black`}
            >
              <div
                className="relative inline-flex items-center justify-center w-full h-full bg-gradient-to-b from-[#5A60FF]  to-[#3F44C2] rounded-md "
                onClick={handleAnimationWinEnd}
              >
                <div className="flex gap-1 items-center justify-center">
                  <button className="go1487791704">{t("next")}</button>
                </div>

                <div
                  className="absolute inset-0 rounded-md border-b-2 border-black"
                  style={{ filter: "blur(2px)" }}
                ></div>
                <div className="w-1 h-[22px] relative"></div>
              </div>
            </div>
          </div> */}
            </>
          )}
          {isLevelUpStart && (
            <>
              <div onClick={handleWin}>
                <LevelUp />
              </div>
            </>
          )}
          {isAnimationLooseStart && (
            <>
              <div
                className="absolute w-full h-full bg-black opacity-60 z-10"
                onClick={handleLoose}
              ></div>
              <div className={`${fadeClassEndBattle}`} onClick={handleLoose}>
                <LooseAnimation
                  className="absolute w-full h-full  ml-[5px] z-20"
                  expBarNum={25}
                  lvlNum={1}
                />
              </div>

              <div
                className={`absolute bottom-[100px] w-full px-14 flex justify-center items-center   ${fadeClassEndBattle}`}
              >
                <div
                  onClick={handleLoose}
                  className={`${
                    fadeClassEndBattle.length ? "" : "fade-in-end-battle"
                  }  select-none cursor-pointer w-full h-12 pb-1  relative text-center z-30 border-black text-white text-[30px]`}
                >
                  {tutorialSave?.enemyId == 2 ? t("next") : t("retry")}
                </div>
              </div>
              {/* <div
            className={`absolute bottom-[100px] w-full px-[40px] ${fadeClassEndBattle}`}
          >
            <div
              className={`${
                fadeClassEndBattle.length ? "" : "fade-in-end-battle"
              } select-none cursor-pointer w-full h-12 pb-1 bg-[#331a17] rounded-md shadow-lg  relative transform transition-transform duration-150 active:scale-95 z-30 border-black`}
            >
              <div
                className="relative inline-flex items-center justify-center w-full h-full bg-gradient-to-b from-[#B43D2F]  to-[#893026] rounded-md "
                onClick={handleLoose}
              >
                <div className="flex gap-1 items-center justify-center">
                  <button className="go1487791704">
                    {tutorialSave?.enemyId == 2 ? t("next") : t("retry")}
                  </button>
                </div>

                <div
                  className="absolute inset-0 rounded-md border-b-2 border-black"
                  style={{ filter: "blur(2px)" }}
                ></div>
                <div className="w-1 h-[22px] relative"></div>
              </div>
            </div>
          </div> */}
            </>
          )}
        </>
      ) : (
        <div className="absolute w-full h-full flex justify-center items-center text-white text-5xl">
          Error
        </div>
      )}
    </>
  );
};
