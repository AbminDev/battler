import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIsland } from "../../../../containers/Farm/Island/useIsland";
import { islandsConfigMock } from "../../../../mock/buildings";
import { useFarm } from "../../../../pages/Farm/useFarm";
import { IslandProps } from "../../../../containers/Farm/Island";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useUtils } from "../../../../utils/navigateTo";
import { RootState } from "../../../../app/store";
import { setDialogueInfo } from "../../../../app/features/dialoguesSlice";
import ReactGA from "react-ga4";
import * as amplitude from "@amplitude/analytics-browser";
import { TutorialSave, TutorialStage } from "../../../../interfaces/tutorial";
import { setSave } from "../../../../app/features/tutorialSaveSlice";
import { updateTutorialProgress } from "../../../../endpoints/tutorialProgress";
import { useTelegram } from "../../../../hooks/useTelegram";
import TypingEffect from "../../../../components/TypingEffect";
import { motion, MotionProps } from "framer-motion";
import {APP_ENV} from "../../../../config"; // Імпортуємо motion

interface AnimatedDivProps extends MotionProps {
  children?: React.ReactNode;
  delay?: number;
  className?: string;
  onClick?: () => void;
  shouldAnimate: boolean;
}

const AnimatedDiv: React.FC<AnimatedDivProps> = ({
  children,
  delay = 0,
  className = "",
  onClick,
  shouldAnimate,
  ...motionProps
}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay, duration: 1 },
    },
  };

  if (shouldAnimate) {
    return (
      <motion.div
        className={className}
        onClick={onClick}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        {...motionProps}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
};

export const Dialogue = () => {
  const { navigateTo } = useUtils();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [dialogStage, setDialogStage] = useState(0);
  const [speed, setSpeed] = useState(50);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const { userId } = useTelegram();

  const tutSave = useSelector(
    (state: RootState) => state.tutorialSave.tutorialSave.save
  );

  // Додано: Отримання stage
  const currentStage = tutSave?.stage;

  const dialogueId: number = tutSave?.dialogueId ?? 1;
  const phrases = t(`tutorial.dialogues.dialogue${dialogueId}.phrases`, {
    returnObjects: true,
  });

  useEffect(() => {
    if (APP_ENV === 'production') {
      ReactGA.event({ category: "Tutorial", action: "Dialogue " + dialogueId });
      amplitude.track("Dialogue " + dialogueId, { group: "Tutorial" });
    }
  }, [dialogueId]);

  const { transformComponentRef } = useFarm();

  let islandData = islandsConfigMock[0];

  let props: IslandProps = {
    island: islandData,
    zoomRef: transformComponentRef,
  };
  const { onClickNavigate } = useIsland(props);

  const updateSave = ({ save }: { save: TutorialSave }) => {
    dispatch(setSave(save));
    const updatingSave = async () => {
      await updateTutorialProgress({
        clientId: userId,
        save: JSON.stringify(save),
      });
    };
    updatingSave();
  };

  const next = () => {
    if (!isTypingComplete) {
      setSpeed(10);
      return;
    }

    setSpeed(50);
    setIsTypingComplete(false);

    if (dialogStage < Object.keys(phrases).length - 1) {
      setDialogStage(dialogStage + 1);
    } else {
      dispatch(setDialogueInfo({ id: dialogueId + 1 }));
      if (dialogueId === 3) {
        updateSave({ save: { ...tutSave, completed: true } });
        if (APP_ENV === 'production') {
          ReactGA.event({ category: "Tutorial", action: "Finish" });
          amplitude.track("Finish", { group: "Tutorial" });
        }
      }

      switch (dialogueId) {
        case 1:
          updateSave({
            save: {
              dialogueId: dialogueId + 1,
              stage: TutorialStage.dungeon,
              enemyId: 1,
            },
          });
          break;
        case 2:
          updateSave({
            save: {
              dialogueId: dialogueId + 1,
              stage: TutorialStage.battle,
              enemyId: 2,
            },
          });
          break;
        case 3:
          updateSave({
            save: {
              dialogueId,
              stage: TutorialStage.finish,
              enemyId: tutSave?.enemyId,
              completed: true,
            },
          });
          break;
      }

      if (t(`tutorial.dialogues.dialogue${dialogueId}.nextStep`) === "/") {
        onClickNavigate();
      } else {
        navigateTo(t(`tutorial.dialogues.dialogue${dialogueId}.nextStep`));
      }
    }
  };

  const handleTypingComplete = () => {
    setIsTypingComplete(true);
  };

  // Визначаємо анімаційні варіанти
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
  };

  // const AnimatedDiv = ({
  //   children,
  //   delay = 0,
  //   className = "",
  //   onClick,
  // }: any) => {
  //   if (currentStage === 5) {
  //     return (
  //       <motion.div
  //         onClick={() => onClick()}
  //         className={className}
  //         initial="hidden"
  //         animate="visible"
  //         variants={containerVariants}
  //         transition={{ delay }}
  //       >
  //         {children}
  //       </motion.div>
  //     );
  //   }
  //   return <div  onClick={onClick} className={className}>{children}</div>;
  // };

  return (
    <AnimatedDiv
      className="absolute flex items-center justify-center h-full w-full"
      onClick={next}
      shouldAnimate={currentStage === 5}
    >
      {dialogueId === 3 ? (
        <AnimatedDiv
          shouldAnimate={currentStage === 5}
          className="h-full w-full absolute bg-[url('./assets/images/sky-goddess.jpg')] bg-no-repeat bg-center bg-cover flex items-center justify-center"
          delay={0.1}
        ></AnimatedDiv>
      ) : (
        <AnimatedDiv
          className="h-full w-full absolute bg-[url('./assets/images/cave-2.jpg')] bg-no-repeat bg-center bg-cover flex items-center justify-center"
          delay={0.1}
          shouldAnimate={currentStage === 5}
        ></AnimatedDiv>
      )}

      <AnimatedDiv
        className="h-full w-full absolute top-0 left-0 bg-gradient-to-b from-black/80 via-black/50 via-black/30 via-black/50 to-black/80"
        delay={0.3}
        shouldAnimate={currentStage === 5}
      ></AnimatedDiv>

      {((i18n.exists(
        `tutorial.dialogues.dialogue${dialogueId}.phrases.${dialogStage}.person`
      ) &&
        t(
          `tutorial.dialogues.dialogue${dialogueId}.phrases.${dialogStage}.person`
        ) !== "") ||
        (i18n.exists(
          `tutorial.dialogues.dialogue${dialogueId}.phrases.${dialogStage}.me`
        ) &&
          t(
            `tutorial.dialogues.dialogue${dialogueId}.phrases.${dialogStage}.me`
          ) !== "")) && (
        <AnimatedDiv className="relative px-5" shouldAnimate={currentStage === 5} delay={0.5}>
          <div
            className={`${
              !i18n.exists(
                `tutorial.dialogues.dialogue${dialogueId}.phrases.${dialogStage}.person`
              ) ||
              (t(
                `tutorial.dialogues.dialogue${dialogueId}.phrases.${dialogStage}.person`
              ) === "" &&
                "opacity-0")
            }`}
          >
            <img
              src={require("../../../../assets/images/dialog-cloud.png")}
              className="w-[200px] ml-auto mr-0"
              alt=""
            />
            <div className="absolute z-10 right-5 top-0 w-[200px] h-[100px]">
              <p className="w-full p-3 text-wrap leading-[1.2] text-sm">
                <TypingEffect
                  speed={speed}
                  onComplete={handleTypingComplete}
                  text={t(
                    `tutorial.dialogues.dialogue${dialogueId}.phrases.${dialogStage}.person`
                  )}
                />
              </p>
            </div>
          </div>
          {i18n.exists(`tutorial.dialogues.dialogue${dialogueId}.person`) && (
            <img
              className="mx-auto w-[300px] h-[187px]"
              alt=""
              src={require("../../../../assets/images/dialogue-person-" +
                t(`tutorial.dialogues.dialogue${dialogueId}.person`) +
                ".png")}
            />
          )}
          <AnimatedDiv
            delay={0.7}
            shouldAnimate={currentStage === 5}
            className={`bg-[#c3b996] min-h-[90px] text-base p-5 w-[300px] border border-[#18191a] text-center rounded
            shadow-[0_4px_0_0_rgba(0,0,0,0.6)] color-[#41332C] flex justify-center items-center 
            ${
              !i18n.exists(
                `tutorial.dialogues.dialogue${dialogueId}.phrases.${dialogStage}.me`
              ) ||
              (t(
                `tutorial.dialogues.dialogue${dialogueId}.phrases.${dialogStage}.me`
              ) === "" &&
                "opacity-0")
            }`}
          >
            {t(
              `tutorial.dialogues.dialogue${dialogueId}.phrases.${dialogStage}.me`
            )}
          </AnimatedDiv>
        </AnimatedDiv>
      )}
    </AnimatedDiv>
  );
};
