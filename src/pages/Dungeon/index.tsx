import React, { useState, useEffect } from "react";
import { ActionCard, ActionModal } from "../../containers/Play";
import { Playground } from "../../layout/components/Playground";
import {
  BattleSaves,
  CardType,
  ConditionParameter,
  ConditionSide,
  DungeonStage, DungeonStagesResponse,
  DungeonType,
  mockCards,
  Opponent,
  StageType,
} from "../../endpoints/mock";
import { updateBattleSave } from "../../utils/updateBattleSave";
import { useTelegram } from "../../hooks/useTelegram";
import { CardProps } from "../../interfaces/card";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { useUtils } from "../../utils/navigateTo";
import DungeonEffect from "../../containers/Router/components/DungeonEffect";
import {
  cancelDungeonCard,
  cancelDungeonCardResponse, CardsAtDeck,
  getDungeonProgressByDungeonId, responseForManyEndpoints, usingDungeonCard,
} from "../../endpoints/dungeonEndpoints";
import { getTitleForStages} from "../../endpoints/dungeonMock";
import {toast} from "react-toastify";
import update = toast.update;
import {updateBattleProgress} from "../../endpoints/battleProgress";
import {FooterCave} from "../../layout/components/FooterCave";
import {HeaderCave} from "../../layout/components/HeaderCave";
import {DungeonShop} from "./DungeonShop";
import {Smithy} from "../../containers/Smithy";
import { saveFarmTutorialProgress, setFarmSave } from "../../app/features/farmTutoralSlice";
import { TutorialFarmStage } from "../../interfaces/tutorial";
import {Tavern} from "./Tavern";
import { motion, AnimatePresence } from 'framer-motion';
import { Resource } from "../../mock/resources";
import { Resources } from "../../enums/resources";
import { completeDungeon } from "../../app/features/dungeonCompleted";
import {Bag} from "./Bag";
import {useSoundService} from "../../utils/soundService";
import {Chest} from "./Chest";
import {useTranslation} from "react-i18next";

export type VisibleItems = DungeonStagesResponse[];

const CARDS_WITH_1_LVL = [36, 24];
const CARDS_WITH_2_LVL = [16, 29, 31];

const SomeTavernsStage = [StageType.tavern, StageType.shop, StageType.forge];

export const Dungeon = () => {
  const appConfig = useSelector((state: RootState) => state.appConfig.configs);
  const {dungeonCards: {variables: dungeonConfig}} = appConfig;
  // console.log('DUNGEON START INIT', dungeonConfig);
  const { userId } = useTelegram();
  const { navigateTo } = useUtils();

  const actualSaves = useSelector(
    (state: RootState) => state.battleSave.battleSave.save
  );
  const heroData = useSelector((state: RootState) => state.heroData);
  const {heroId} = heroData.hero;
  // console.log('heroId->', heroId);
  // console.log('SAVE->', actualSaves);
  //@ts-ignore
  // const {dungeonId} = actualSaves;
  let dungeonId = actualSaves?.dungeonId ?? 0;
  let buildingId = actualSaves?.buildingId ?? 0;

  // state: displayed items in array
  const [visibleItems, setVisibleItems] = useState<VisibleItems>([]);

  // state: define next index of card to display
  const [nextIndex, setNextIndex] = useState(0);

  // state: lvl finished (0 cards remain)
  const [isFinished, setIsFinished] = useState(false);

  // state: active card index
  const [currentIndex, setCurrentIndex] = useState(-1);

  const [lastStageId, setLastStageId] = useState(-1);

  // state: visibility of action modal (clicked on action in card)
  const [isModalVisible, setModalVisible] = useState(false);

  const [fadeClass, setFadeClass] = useState('');

  const [currentHp, setCurrentHp] = useState(20);
  const [currentMana, setCurrentMana] = useState(2);
  const [goldAmount, setGoldAmount] = useState(10);
  const [isShopOpen, setShopOpen] = useState(false);
  const [isSmithyOpen, setSmithyOpen] = useState(false);
  const [cardsAtDeck, setCardsAtDeck] = useState<CardsAtDeck[]>([]);
  const [isTavernOpen, setIsTavernOpen] = useState(false);
  const [isDeckOpen, setIsDeckOpen] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isScreenDarkened, setIsScreenDarkened] = useState(false);
  const [isAnimationActive, setIsAnimationActive] = useState(false);
  const [isChestOpen, setIsChestOpen] = useState(false);
  const [maxHp, setMaxHp] = useState(20);
  const { playSound } = useSoundService();
  const { t } = useTranslation();

  const openDeck = () => {
    setIsDeckOpen(!isDeckOpen);
  };

  const closeDeck = () => {
    setIsDeckOpen(!isDeckOpen);
  };

  const animationOn = () => {
    setIsAnimationActive(true);
  }

  const animationOff = () => {
    setIsAnimationActive(false);
  }

  const handleHeal = () => {
    animationOn();
    setFadeClass("fade-in");

    setTimeout(() => {
      setFadeClass("fade-out");
      setTimeout(() => {
        animationOff();
      }, 300);
    }, 300);
  };

  useEffect(() => {
    // console.log('NEDDED EFFECT', dungeonId);
    if (dungeonId && buildingId) {
      const getDungeonSaveOrStartDungeon = async () => {
        console.log("actualSaves", actualSaves)
        //@ts-ignore
        const progress = await getDungeonProgressByDungeonId({clientId: userId, buildingId: buildingId, heroId});

        if (progress) {
          setVisibleItems(progress.stages);
          setLastStageId(progress.stages[progress?.stages?.length - 1].stageId);
          setCurrentIndex(progress.stages[progress?.stages?.length - 1].stageId - 1);
          setNextIndex(progress.stages[progress?.stages?.length - 1].stageId + 1);
          setCurrentHp(progress.currentHp);
          setCurrentMana(progress.currentMana);
          setGoldAmount(progress.gold);
          setCardsAtDeck(progress?.cardsAtDeck);
          setMaxHp(progress?.hp);
          updateBattleSave({save: {gold: progress.gold, currentHp: progress.currentHp, currentMana: progress.currentMana, stages: progress.stages, dungeonId, enemyId: actualSaves?.enemyId, buildingId }, clientId: userId});
        }
      }
      // @ts-ignore
      getDungeonSaveOrStartDungeon({clientId: userId, dungeonId: actualSaves?.dungeonId});
    }
  }, [dungeonId, buildingId]);

  useEffect(() => {
    if (actualSaves?.dungeonId && actualSaves?.buildingId) {
      dungeonId = actualSaves.dungeonId;
      buildingId = actualSaves.buildingId;
    }
  }, [actualSaves]);
  //
  // useEffect(() => {
  //
  // }, [actualSaves]);

  // useEffect(() => {
  //   // @ts-ignore
  //   setVisibleItems(actualSaves?.stages);
  // }, [])

  //при инициализации сетаем текующий данж из сейва если нет начинаем сначала
  // useEffect(() => {
  //     setDungeonBySave({
  //       save: actualSaves,
  //     });
  // }, []);

  const handleStartBattle = () => {

    setIsFadingOut(true);

    // Чекаємо завершення анімації зникнення (наприклад, 500ms)
    setTimeout(() => {
      // Ваш існуючий код handleAction
      // Наприклад: stageStrategy[item?.type!]({ stage: item });

      setIsScreenDarkened(true);
    }, 500); // Тривалість повинна відповідати тривалості анімації

    setTimeout(() =>  navigateTo("/battle"), 1000);
  }

  useEffect(() => {
    // console.log("CURRENT INDEX!!!!", currentIndex);
  }, [currentIndex]);
  const stageStrategy: {
    [k in StageType]?: ({ stage }: { stage: DungeonStagesResponse }) => void;
  } = {
    [StageType.boss]: ({ stage }) => {
      // if (!isEnemyStage(stage)) {
      //   return;
      // }
      //@ts-ignore
      updateBattleSave({
        clientId: userId,
        save: {
          dungeonId,
          stages: visibleItems,
          currentHp: currentHp,
          currentMana: currentMana,
          gold: goldAmount,
          //@ts-ignore
          enemyId: dungeonConfig[dungeonId - 1].stages.value[stage.stageId - 1]?.enemyId!.value,
          currentStage: stage.stageId,
          buildingId
        },
      });
      handleStartBattle()
    },
    [StageType.bonfire]: ({ stage }) => {
      playSound('itemUseFlask');
      handleHeal();
      updateBattleSave({
        clientId: userId,
        save: {
          dungeonId,
          stages: actualSaves?.stages!,
          //@ts-ignore
          enemyId: actualSaves?.enemyId,
          currentHp: currentHp,
          currentMana: currentMana,
          gold: goldAmount,
          currentStage: stage.stageId,
          buildingId
        },
      });
      usingCard({dungeonId, cardId: stage.stageId, clientId: userId});
    },
    [StageType.enemy]: ({ stage }) => {
      // console.log('STAGE AT ENEMY->', stage,  dungeonConfig[dungeonId - 1].stages.value[stage.stageId - 1]?.enemyId!.value);
      //@ts-ignore
      updateBattleSave({
        clientId: userId,
        save: {
          dungeonId,
          stages: visibleItems,
          currentHp: currentHp,
          currentMana: currentMana,
          gold: goldAmount,
          //@ts-ignore
          enemyId: dungeonConfig[dungeonId - 1].stages.value[stage.stageId - 1]?.enemyId!.value,
          currentStage: stage.stageId,
          buildingId
        },
      });
      handleStartBattle()

    },
    [StageType.elixir]: ({ stage }) => {
      // console.log('STAGE-> ELIXIR', stage);
      playSound('itemUseFlask');
      handleHeal();
      //setCurrentHp(20);
      updateBattleSave({
        clientId: userId,
        save: {
          dungeonId,
          stages: actualSaves?.stages!,
          //@ts-ignore
          enemyId: actualSaves?.enemyId,
          currentHp: currentHp,
          currentMana: currentMana,
          gold: goldAmount,
          currentStage: stage.stageId,
          buildingId
        },
      });
      usingCard({dungeonId, cardId: stage.stageId, clientId: userId});
    },
    [StageType.shop]: ({stage}) => {
      // console.log('STAGE-> SHOP', stage);
      playSound('itemUseShop');
      //@ts-ignore
      updateBattleSave({
        clientId: userId,
        save: {
          dungeonId,
          stages: actualSaves?.stages!,
          //@ts-ignore
          enemyId: actualSaves?.enemyId,
          currentHp: currentHp,
          currentMana: currentMana,
          gold: goldAmount,
          currentStage: stage.stageId,
          buildingId
        },
      });
      setShopOpen(true);
    },
    [StageType.forge]: ({stage}) => {
      // console.log('STAGE-> Smithy (forge)', stage);
      //@ts-ignore
      updateBattleSave({
        clientId: userId,
        save: {
          dungeonId,
          stages: actualSaves?.stages!,
          //@ts-ignore
          enemyId: actualSaves?.enemyId,
          currentHp: currentHp,
          currentMana: currentMana,
          gold: goldAmount,
          currentStage: stage.stageId,
          buildingId
        },
      });
      setSmithyOpen(true);
      // console.log('Forge COMPLETED');
    },
    [StageType.tavern]: ({stage}) => {
      // console.log('STAGE-> Tavern', stage);
      //@ts-ignore
      updateBattleSave({
        clientId: userId,
        save: {
          dungeonId,
          stages: actualSaves?.stages!,
          //@ts-ignore
          enemyId: actualSaves?.enemyId,
          currentHp: currentHp,
          currentMana: currentMana,
          gold: goldAmount,
          currentStage: stage.stageId,
          buildingId
        },
      });
      setIsTavernOpen(true);
      // console.log('Tavern COMPLETED');
    },
    [StageType.chest]: ({stage}) => {
      // console.log('STAGE-> Chest', stage);
      //@ts-ignore
      updateBattleSave({
        clientId: userId,
        save: {
          dungeonId,
          stages: actualSaves?.stages!,
          //@ts-ignore
          enemyId: actualSaves?.enemyId,
          currentHp: currentHp,
          currentMana: currentMana,
          gold: goldAmount,
          currentStage: stage.stageId,
          buildingId
        },
      });
      setIsChestOpen(true);
      // console.log('Chest COMPLETED');
    },
  };



 const cancelCard = () => {
    const cancelEndpoint = async () => {
      //@ts-ignore
      const result = await cancelDungeonCard({dungeonId, clientId: userId, stageId: visibleItems[currentIndex].stageId});
      if (result.stages.length) {
        const items = [...visibleItems];
        items[currentIndex] = result.stages[0];
        setVisibleItems(items);
        setLastStageId(result.stages[0].stageId);
        setCurrentIndex(result.stages[0]?.stageId - 1);
        setNextIndex(result.stages[0]?.stageId + 1);
      }
    }
    cancelEndpoint();
 }

  // method: card's action clicked
  const handleAction = (action: StageType, id: number) => {
    setModalVisible(true);
  };
  const dispatch = useDispatch<AppDispatch>();

  const isFarmTutorialCompleted = useSelector(
    (state: RootState) => state.farmTutorial.tutorialFarmSave.save?.completed
  );

  const farmTutorialSave = useSelector(
    (state: RootState) => state.farmTutorial.tutorialFarmSave.save
  );

  const dialogueId: number = farmTutorialSave?.dialogueId ?? 1;
  // console.log("dialogueId dungeon", dialogueId)


  const testHandleEndDungeon = () => {
    if(!isFarmTutorialCompleted) {
      dispatch(saveFarmTutorialProgress({ clientId: userId, save:{
        dialogueId: dialogueId + 1,
        stage: TutorialFarmStage.endbattle,
      } }));
    }

    navigateTo("/island");
  };

  // const usingCard = ({dungeonId, cardId, clientId}: {dungeonId: number, clientId: number, cardId: number}) => {
  //   console.log('USING CARD START', {dungeonId, cardId, clientId});
  //   const usingDungeonCardEndpoint = async () => {
  //     //@ts-ignore
  //     const result = await usingDungeonCard({dungeonId, clientId, cardId});
  //     console.log('RESULT USING CARD->->->', result);
  //     if (result?.stages?.length) {
  //       console.log('AT CASE@@@@@@@@@@@@@@');
  //       const items = visibleItems.filter((item) => item.cardId !== cardId);
  //       console.log('ITEMS BEFORE ', items);
  //       const {cardId: id, type, amount, currentAmount} = result.stages[0];
  //       //@ts-ignore
  //       items.push({cardId: id, type: type, amount, currentAmount});
  //       console.log('NEW ITEMS', items);
  //       setLastStageId(id);
  //       setVisibleItems(items);
  //       setCurrentIndex(id - 1);
  //       setNextIndex(id + 1);
  //       setCurrentHp(result.currentHp);
  //       setCurrentMana(result.currentMana);
  //       setGoldAmount(result.gold);
  //       updateBattleSave({
  //         clientId: userId,
  //         save: {
  //           dungeonId,
  //           stages: items,
  //           //@ts-ignore
  //           enemyId: actualSaves?.enemyId,
  //           currentHp: currentHp,
  //           currentMana: currentMana,
  //           gold: goldAmount,
  //           currentStage: actualSaves?.currentStage,
  //         },
  //       });
  //     }
  //   }
  //   usingDungeonCardEndpoint();
  //
  // }

  useEffect(() => {

  }, [currentHp, goldAmount]);

  const usingCard = ({dungeonId, cardId, clientId}: {dungeonId: number, clientId: number, cardId: number}) => {
    // console.log('USING CARD START', {dungeonId, cardId, clientId});
    const usingDungeonCardEndpoint = async () => {
      //@ts-ignore
      const result = await usingDungeonCard({dungeonId, clientId, stageId: cardId});
      // console.log('RESULT USING CARD->->->', result);
      if (result?.stages?.length) {
        // console.log('AT CASE@@@@@@@@@@@@@@', result.stages.length);
        const items = [...visibleItems];
        // console.log('ITEMS BEFORE ', items);
        const {stageId: id, type, amount, currentAmount} = result.stages[0];
        //@ts-ignore
       // items.push({cardId: id, type: type, amount, currentAmount});
        items[currentIndex] = {stageId: id, type, amount, currentAmount};
        // console.log('NEW ITEMS', items);
        setLastStageId(id);
        setVisibleItems(items);
        setCurrentIndex(id - 1);
        setNextIndex(id + 1);
        setCurrentHp(result.currentHp);
        setCurrentMana(result.currentMana);
        setGoldAmount(result.gold);
        updateBattleSave({
          clientId: userId,
          save: {
            dungeonId,
            stages: items,
            //@ts-ignore
            enemyId: actualSaves?.enemyId,
            currentHp: currentHp,
            currentMana: currentMana,
            gold: goldAmount,
            currentStage: actualSaves?.currentStage,
            buildingId
          },
        });
      } else {
        if (result) {
          // console.log('AT CASE NOOOOOOOO ADDITIONAL STAGE');
          const items = [...visibleItems];
          // console.log('ITEMS BEFORE ', items);
          //const {cardId: id, type, amount, currentAmount} = result.stages[0];
          //@ts-ignore
          // items.push({cardId: id, type: type, amount, currentAmount});
          items.splice(currentIndex, 1);
          // console.log('NEW ITEMS', items);
          //setLastStageId(id);
          setVisibleItems(items);
          //@ts-ignore
          setCurrentIndex(null);
          //setNextIndex(id + 1);
          setCurrentHp(result.currentHp);
          setCurrentMana(result.currentMana);
          setGoldAmount(result.gold);
          updateBattleSave({
            clientId: userId,
            save: {
              dungeonId,
              stages: items,
              //@ts-ignore
              enemyId: actualSaves?.enemyId,
              currentHp: currentHp,
              currentMana: currentMana,
              gold: goldAmount,
              currentStage: actualSaves?.currentStage,
              buildingId
            },
          });
        }
      }
    }
    usingDungeonCardEndpoint();

  }
  // console.log("VIsible Items", visibleItems);
  // console.log('DUNGEONID->', dungeonId);

  const closeShop = () => {
    playSound('button');
    setShopOpen(false);
    //usingCard({dungeonId, cardId: visibleItems[currentIndex].cardId, clientId: userId});
  }

  const closeSmithy = () => {
    playSound('button');
    setSmithyOpen(false);
    //usingCard({dungeonId, cardId: visibleItems[currentIndex].cardId, clientId: userId});
  }

  const closeTavern = () => {
    playSound('button');
    setIsTavernOpen(false);
    //usingCard({dungeonId, cardId: visibleItems[currentIndex].cardId, clientId: userId});
  }

  const closeChest = () => {
    playSound('button');
    setIsChestOpen(false);
    //usingCard({dungeonId, cardId: visibleItems[currentIndex].cardId, clientId: userId});
  }

  const updateGoldAmountHandler = (totalAmount: number, amount: number) => {
    if (totalAmount - amount > 0) {
      setGoldAmount(totalAmount - amount);
    }
  }

  useEffect(() => {

  }, [goldAmount]);


  const calculateRemainingPages = () => {
    // console.log('HERE??????');
    if (!visibleItems.length) return;
    // console.log('Visible items JJJJJJJJJJJJJJJJJJJ', visibleItems);
    const biggestId = [...visibleItems].sort((a, b) => b?.stageId - a?.stageId)[0]?.stageId;
    // console.log('Biggest ID', biggestId);
    const stagesLength = dungeonConfig[dungeonId - 1].stages.value.length;
    const lastStageId = dungeonConfig[dungeonId - 1].stages.value[stagesLength - 1]?.id.value;
    return lastStageId - biggestId;
  }
  calculateRemainingPages();
  const updateSomeStates = ({gold, currentMana, currentHp, cardsAtDeck}: responseForManyEndpoints) => {
    setGoldAmount(gold);
    setCurrentMana(currentMana);
    setCurrentHp(currentHp);
    setCardsAtDeck(cardsAtDeck);
  }

  useEffect(() => {

  }, [cardsAtDeck]);
  // console.log('DUNGEON STARTING');
  // @ts-ignore
  return visibleItems && visibleItems?.length ? (
    <>
      {/* <div className='text-white' onClick={testHandleEndDungeon}>Back Button </div> */}
      <DungeonEffect direction="up">
        {isAnimationActive && (
          <div className={`absolute top-0 z-20 h-full w-full ${fadeClass}`}>
            <div className="fixed inset-0 w-full h-full z-[9999] shadow-[inset_0_0_40px_30px_#24b510]"></div>
          </div>
        )}
      <Playground>
        {isShopOpen && (<DungeonShop gold={goldAmount} close={() => closeShop()} updateGoldAmount={(totalAmount, amount) => updateGoldAmountHandler(totalAmount, amount)} updateSomeStates={updateSomeStates} />)}
        {isSmithyOpen && (<Smithy cardsAtDeck={cardsAtDeck.filter((v) => v.stars < 3 && !CARDS_WITH_1_LVL.includes(v.cardId) && (v.stars !== 2 || !CARDS_WITH_2_LVL.includes(v.cardId)))} closeDeck={() => closeSmithy()} gold={goldAmount} updateSomeStates={updateSomeStates} />)}
        {isTavernOpen && (<Tavern gold={goldAmount} closeDeck={() => closeTavern()} cardsAtDeck={cardsAtDeck} updateSomeStates={updateSomeStates} />)}
        {isChestOpen && (<Chest close={() => closeChest()} updateSomeStates={updateSomeStates} usingCard={usingCard} dungeonId={dungeonId} clientId={userId} stageId={visibleItems[currentIndex].stageId} />)}
        {isDeckOpen && (<Bag cardsAtDeck={cardsAtDeck.map((card) => {return {id: card.cardId, uid: card.cardUid, lvl: card.stars}})} closeDeck={closeDeck}/>)}
        <div className="absolute w-full z-10 left-0 top-0">
          <HeaderCave pageName={dungeonConfig[dungeonId - 1].description} remainingPages={calculateRemainingPages()} gold={goldAmount} />
        </div>
        {isModalVisible ? (
          <ActionModal
            type={visibleItems[currentIndex].type}
            onClose={() => setModalVisible(false)} />
        ) : null}

          {/* {allItems.length - nextIndex !== 0
  ?
  <p className="text-white">
    Cards remaining: {allItems.length - nextIndex}
  </p>
  : null} */}

        <AnimatePresence>
            {!isFadingOut && (
              <motion.div
                className="items-center justify-center text-center h-full flex flex-col"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                  {isFinished ? (
                      <div>Finish</div>
                  ) : (
                      <div className="flex flex-row gap-[8px]">
                        {visibleItems.map((item, index) => (
                          <ActionCard
                            isAnimation={true}
                            animationOn={animationOn}
                            animationOff={animationOff}
                            //@ts-ignore
                            handleAction={() => {
                              if (isAnimationActive) return;
                              //@ts-ignore
                              stageStrategy[item?.type!]({ stage: item });
                            }}
                            type={item.type}
                            active={currentIndex === index}
                            //@ts-ignore
                            title={t('dungeon.'+StageType[item?.type]+'.title')}
                            //@ts-ignore
                            description={t('dungeon.'+StageType[item?.type]+'.description')}
                            onClickActive={() => setCurrentIndex(index)}
                            name={StageType[item?.type]}
                            key={index}
                            //@ts-ignore
                            enemyId={item.type === StageType.enemy || item.type === StageType.boss ? dungeonConfig[dungeonId - 1].stages.value[item.stageId - 1]?.enemyId.value : undefined}
                            //@ts-ignore
                            onDisapear={() => {
                              if (!isAnimationActive) {
                                if (item.type === StageType.shop || item.type === StageType.forge || item.type === StageType.tavern) {
                                  return usingCard({ dungeonId, cardId: visibleItems[currentIndex].stageId, clientId: userId });
                                } else {
                                  return cancelCard();
                                }
                              }
                              return null;
                            }} />
                        ))}
                      </div>
                  )}
            </motion.div>)}
        </AnimatePresence>

        {/* Затемнення екрану */}
        <AnimatePresence>
          {isScreenDarkened && (
            <motion.div
              className="fixed top-0 left-0 w-full h-full bg-black  z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>

        <FooterCave tutorial={false} currentHpAmount={currentHp} currentManaAmount={currentMana} hpAmount={maxHp}
          manaAmount={2} cardsAtDeck={cardsAtDeck} openDeck={openDeck} />
      </Playground>
    </DungeonEffect></>
  ) : null;
  // return <></>
};
