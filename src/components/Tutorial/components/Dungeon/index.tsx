import { HeaderCave } from "../../../../layout/components/HeaderCave";
import { FooterCave } from "../../../../layout/components/FooterCave";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useUtils } from "../../../../utils/navigateTo";
import { CardDisappear, ChestAnimation } from "../../..";
import ReactGA from "react-ga4";
import * as amplitude from "@amplitude/analytics-browser";
import { TutorialSave, TutorialStage } from "../../../../interfaces/tutorial";
import { setSave } from "../../../../app/features/tutorialSaveSlice";
import { updateTutorialProgress } from "../../../../endpoints/tutorialProgress";
import { AppDispatch, RootState } from "../../../../app/store";
import { useTelegram } from "../../../../hooks/useTelegram";
import { motion } from "framer-motion";
import {useTranslation} from "react-i18next";
import { parseEnemiesConfig } from "../../../../interfaces/battle";
import {useSoundService} from "../../../../utils/soundService";
import { fetchAppConfig } from "../../../../app/features/appConfigSlice";
import {APP_ENV} from "../../../../config";

enum DungeonStageDescription {
  open,
  use,
  fight,
}


type GoldCoinProps = {
  amount: number; // Кількість золота для відображення
};

const GoldCoin: React.FC<GoldCoinProps> = ({ amount }) => {
  return (
    <div>
      {/* Основний контейнер з цифрами */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{
          y: [50, -50, 0], // Вилітає вверх і повертається вниз
          opacity: 1,
          rotate: [0, 10, -10, 0], // Балансує вліво-вправо
        }}
        transition={{
          duration: 2, // Тривалість анімації
          ease: "easeInOut", // Плавність рухів
          repeat: Infinity, // Повторюється нескінченно
          repeatType: "reverse", // Відтворюється у зворотньому порядку після кожного повтору
        }}
        style={{
          fontSize: '50px',
          color: '#FFD700', // Колір схожий на золото
          fontWeight: 'bold',
        }}
      >
        <div className="flex justify-center items-center gap-2">
        + {amount}

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
            <stop offset="0.416941" stopColor="white" />
            <stop offset="0.654304" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
        </div>

      </motion.div>
    </div>
  );
};

export default GoldCoin;



export const TutorialDungeon = () => {
  const { t } = useTranslation();
  const [dungeonStage, setDungeonStage] = useState(0);
  const [currentHp, setCurrentHp] = useState(16);
  const [goldAmount, setGoldAmount] = useState(10);
  const { navigateTo, activeDiv } = useUtils();
  const [burn, setBurn] = useState(false);
  const [burnAnimationStart, setburnAnimationStart] = useState(false);
  const [showGold, setShowGold] = useState(false);
  const [isChestOpen, setChestOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const tutorialSave = useSelector(
    (state: RootState) => state.tutorialSave.tutorialSave.save
  );
  const { userId } = useTelegram();
  const { playSound } = useSoundService();

  useEffect(() => {
    dispatch(fetchAppConfig())
  },[])

  const appConfig = useSelector((state: RootState) => state.appConfig.configs);

  const enemiesConfig = appConfig.enemies.variables

  const enemies = parseEnemiesConfig(enemiesConfig)

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

  const closeChest = () => {
    setChestOpen(false);
    setburnAnimationStart(false);
    setBurn(false);
    setDungeonStage(dungeonStage + 1);
  };

  const openChest = () => {
    setburnAnimationStart(true);
    setBurn(true);
    setTimeout(() => {
      playSound('itemPickUp');
      setChestOpen(true);
      setGoldAmount(goldAmount + 1000);
      setTimeout(() => {setShowGold(true)}, 800)

      setTimeout(() => {closeChest()}, 2500)
    }, 500);
    setTimeout(() => {
      setburnAnimationStart(false);
    }, 1000);

  };


  useEffect(() => {
    if (APP_ENV === 'production') {
      ReactGA.event({category: "Tutorial", action: "Dungeon " + (dungeonStage + 1)});
      amplitude.track("Dungeon " + (dungeonStage + 1), {group: "Tutorial"});
    }
  }, [dungeonStage]);

  const handleCardDisappear = () => {
    // console.log("START DUNGEON NEXT");
    //ReactGA.event({category: 'Tutorial', action: 'Dungeon stage '+dungeonStage});

    if (dungeonStage === 0) {
      openChest();
      return;
    }
    setBurn(true);

    setTimeout(() => {
      setburnAnimationStart(false);
      setBurn(false);
    }, 1000);

    if (dungeonStage === 1) {
      setTimeout(() => {
        handleHeal();
      }, 500);
    }
    setTimeout(() => {
      if (dungeonStage < 2) {
        setDungeonStage(dungeonStage + 1);
        if (dungeonStage === 1) {
          // get elixir
          setCurrentHp(20);
        }
      }
    }, 1000);
  };

  const dungeonNext = () => {
    setburnAnimationStart(true);
    // console.log("dungeonStage", dungeonStage);

    if (dungeonStage === 1) {
      playSound('itemUseFlask');
    }

    if (dungeonStage === 2) {
      setBurn(true);

      setTimeout(() => {
        setburnAnimationStart(false);
        setBurn(false);
        updateSave({
          save: {
            stage: TutorialStage.battle,
            enemyId: tutorialSave?.enemyId,
            dialogueId: tutorialSave?.dialogueId,
          },
        });
        // @ts-ignore
        // console.log("AT DUNGEON WHAT A SAVE", tutorialSave);
        // @ts-ignore
        //dispatch(setSave({save: {stage: TutorialStage.battle, enemyId: tutorialSave?.enemyId, dialogueId: tutorialSave?.dialogueId}}));
        navigateTo("/battle");
      }, 1000);
    }
  };

  const cardVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  const [fadeClass, setFadeClass] = useState("");
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  const handleHeal = () => {
    setTriggerAnimation(true);
    setFadeClass("fade-in");

    setTimeout(() => {
      setFadeClass("fade-out");
      setTimeout(() => {
        setTriggerAnimation(false);
      }, 300);
    }, 300);
  };

  return (
    <>
      <div className="absolute w-full z-10">
        <HeaderCave
          tutorial={true}
          pageName={t('dungeon.pageName')}
          remainingPages={3}
          gold={goldAmount}
        />
      </div>
      <div className="absolute flex items-center justify-center h-full w-full">
        <div
          className="h-full w-full absolute bg-[url('./assets/images/battle/battle-background-1.jpg')] bg-no-repeat bg-center bg-cover flex
          items-center justify-center"
        ></div>
        {triggerAnimation && (
          <div className={`absolute top-0 z-20 h-full w-full ${fadeClass}`}>
            <div className="fixed inset-0 w-full h-full z-[9999] shadow-[inset_0_0_40px_30px_#24b510]"></div>
          </div>
        )}

        <div className="relative w-[200px]">
          <div
            className={`flex-1 flex flex-col text-center items-center [border-image:url('./assets/images/stoneBorder.png')]`}
          >
            <motion.img
              initial="visible"
              animate={burn ? "hidden" : "visible"}
              variants={cardVariants}
              transition={{ duration: dungeonStage !== 2 ? 0.9 : 1 }} // Тривалість анімації
              src={require("../../../../assets/images/cardBg.png")}
              className={`absolute z-1 [filter:drop-shadow(0px_0px_10px_#C6D9FF)]`}
              alt=""
            />

            <motion.img
              initial="visible"
              animate={burn ? "hidden" : "visible"}
              variants={cardVariants}
              transition={{ duration: dungeonStage !== 2 ? 0.9 : 1 }} // Тривалість анімації
              src={require("../../../../assets/images/stoneBorder.png")}
              className={`absolute z-20`}
              alt=""
            />

            {burnAnimationStart && dungeonStage !== 2 && (
              <div className="absolute w-full h-full z-20 bottom-6">
                <CardDisappear cardDisappearReady={handleCardDisappear} />
              </div>
            )}

            {dungeonStage === 0 && (
              <>
                <div className="w-[110px] h-[173.15px]">
                  <motion.div
                    className={`inline-block w-full h-full [-webkit-mask:url(./assets/images/cardBg.png)_no-repeat] [mask:url(./assets/images/cardBg.png)_no-repeat] bg-[url(./assets/images/dungeon-card-1.png)] bg-center bg-cover [background-blend-mode:darken] before:content-[''] before:block`}
                    initial="visible"
                    animate={burn ? "hidden" : "visible"}
                    variants={cardVariants}
                    transition={{ duration: 0.9 }} // Тривалість анімації
                  >
                    <div className="h-[60px] justify-center text-[14px] font-[300] items-start pt-4 text-white flex bg-[linear-gradient(0deg,rgba(0,0,0,0.00)0%,rgba(0,0,0,0.50)36.01%,#000_100%)]">
                      {t('dungeon.chest.title')}
                    </div>
                  </motion.div>
                </div>
                {isChestOpen && (
                  <><div
                    className="absolute w-[300px] h-[300px] z-30 bottom-0"
                  >
                    <ChestAnimation />
                  </div>
                  {showGold && <div className="absolute w-[300px] h-[300px] z-40 bottom-0">
                      <GoldCoin amount={1000} />
                    </div>}
                  </>
                )}

                <motion.button
                  className={`w-[110px] h-[34px] z-10 [backdrop-filter:sepia(100%)_hue-rotate(190deg)_saturate(500%)] items-center text-center justify-center flex mt-2 [mask:url(./assets/images/btnBg.png)_no-repeat] flex-col`}
                  initial="visible"
                  animate={burn ? "hidden" : "visible"}
                  variants={cardVariants}
                  transition={{ duration: 0.9 }}
                >
                  <p
                    className="text-black leading-[34px] w-full h-full"
                    onClick={dungeonNext}
                  >
                    {t('dungeon.'+DungeonStageDescription[dungeonStage])}
                  </p>
                </motion.button>
              </>
            )}
            {dungeonStage === 1 && (
              <>
                <div className="w-[110px] h-[173.15px] relative">
                  <motion.div
                    className={`inline-block w-full h-full [-webkit-mask:url(./assets/images/cardBg.png)_no-repeat] [mask:url(./assets/images/cardBg.png)_no-repeat] bg-[url(./assets/images/dungeon-card-2.png)] bg-center bg-cover [background-blend-mode:darken] before:content-[''] before:block`}
                    initial="visible"
                    animate={burn ? "hidden" : "visible"}
                    variants={cardVariants}
                    transition={{ duration: 0.9 }} // Тривалість анімації
                  >
                    <div
                      className="h-[60px] w-full absolute top-1 justify-center text-[12px] font-[300]
                        items-start leading-[1.3] pt-2 text-white bg-[linear-gradient(0deg,rgba(0,0,0,0.00)0%,rgba(0,0,0,0.50)36.01%,#000_100%)]">
                      {t('dungeon.elixir.title')}
                      <div
                        className="w-full text-[#F6A000] text-center text-[10px] font-[300] leading-[1]">
                        Heal 5 HP
                      </div>
                    </div>
                  </motion.div>
                </div>

                <motion.button
                  className={`w-[110px] h-[34px] z-10 [backdrop-filter:sepia(100%)_hue-rotate(190deg)_saturate(500%)] items-center text-center justify-center flex mt-2 [mask:url(./assets/images/btnBg.png)_no-repeat] flex-col`}
                  initial="visible"
                  animate={burn ? "hidden" : "visible"}
                  variants={cardVariants}
                  transition={{ duration: 0.9 }}
                >
                  <p
                    className="text-black leading-[34px] w-full h-full"
                    onClick={dungeonNext}
                  >
                    {t('dungeon.'+DungeonStageDescription[dungeonStage])}
                  </p>
                </motion.button>
              </>
            )}
            {dungeonStage === 2 && (
              <>
                <div className="w-[110px] h-[173.15px] relative">
                  <motion.div
                    className={`inline-block w-full h-full [-webkit-mask:url(./assets/images/cardBg.png)_no-repeat] [mask:url(./assets/images/cardBg.png)_no-repeat] bg-[url(./assets/images/dungeon-card-3.png)] bg-center bg-cover [background-blend-mode:darken] before:content-[''] before:block`}
                    initial="visible"
                    animate={burn ? "hidden" : "visible"}
                    variants={cardVariants}
                    transition={{duration: 1}} // Тривалість анімації
                  >
                    <div
                      className="h-[60px] justify-center text-[14px] font-[300] items-start pt-4 text-white flex bg-[linear-gradient(0deg,rgba(0,0,0,0.00)0%,rgba(0,0,0,0.50)36.01%,#000_100%)]">
                      {t('dungeon.zombie')}
                    </div>
                    <div
                      className="absolute top-[36px] w-full text-[#F6A000] text-center text-[10px] font-[300] left-0">
                      {t('level', {lvl: 2})}
                    </div>
                    <div className="h-[60px] w-full items-center absolute bottom-0 justify-center text-[12px] font-[300] pb-2.5 px-3
                text-white flex bg-[linear-gradient(180deg,rgba(0,0,0,0.00)0%,rgba(0,0,0,0.70)50%,#000_100%)]">
                      {t('dungeon.zombieDescription')}
                    </div>
                  </motion.div>
                </div>
                <motion.button
                  className={`w-[110px] h-[34px] z-10 [backdrop-filter:sepia(100%)_hue-rotate(190deg)_saturate(500%)] items-center text-center justify-center flex mt-2 [mask:url(./assets/images/btnBg.png)_no-repeat] flex-col`}
                  initial="visible"
                  animate={burn ? "hidden" : "visible"}
                  variants={cardVariants}
                  transition={{ duration: 1 }}
                >
                  <p
                    className="text-black leading-[34px] w-full h-full"
                    onClick={dungeonNext}
                  >
                    {t('dungeon.'+DungeonStageDescription[dungeonStage])}
                  </p>
                </motion.button>
              </>
            )}

            <motion.img
              initial="visible"
              animate={burn ? "hidden" : "visible"}
              variants={cardVariants}
              transition={{ duration: dungeonStage !== 2 ? 0.9 : 1 }} // Тривалість анімації
              src={require("../../../../assets/images/btnBg.png")}
              className={`w-[110px] h-[34px] z-1 mt-[-34px] [filter:drop-shadow(0px_0px_5px_#C6D9FF)]`}
              alt=""
            />
          </div>
        </div>
      </div>
      <FooterCave
        tutorial={true}
        manaAmount={2}
        hpAmount={20}
        currentManaAmount={2}
        currentHpAmount={currentHp}
        cardsAtDeck={[]}
      />
    </>
  );
};
