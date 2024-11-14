import { useEffect, useRef, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSessionStorage } from "@uidotdev/usehooks";
import { useTelegram } from "../../hooks/useTelegram";
import {RootState} from "../../app/store";
import { useUtils } from "../../utils/navigateTo";
import ReactGA from 'react-ga4';
import * as amplitude from "@amplitude/analytics-browser";
import {TutorialSave, TutorialStage} from "../../interfaces/tutorial";
import {getTutorialProgress, updateTutorialProgress} from "../../endpoints/tutorialProgress";
import {setSave} from "../../app/features/tutorialSaveSlice";
import {useSoundService} from "../../utils/soundService";
import {APP_ENV} from "../../config";

interface Click {
  id: number;
  x: number;
  y: number;
}

export function useTutorial() {
  const { tg } = useTelegram();
  const { t } = useTranslation();
  const [clicks, setClicks] = useState<Click[]>([]);
  const [counter, setCounter] = useState<number>(0);
  const [isClicked, setIsClicked] = useState(false);
  const [stage, setStage] = useState("");//TODO сделать пустым
  const [showImage, setShowImage] = useState(false);
  const [animDir, setAnimDir] = useState("");
  const tutorialSave = useSelector((state: RootState) => state.tutorialSave.tutorialSave.save);
  const { playSound, pausedMusic } = useSoundService();
  const [cards, setCards] = useState<
    {
      name: string;
      title: string;
      image: string;
      count: number;
    }[]
  >([]);
  const {navigateTo} = useUtils();
  const { userId } = useTelegram();
const dispatch = useDispatch();
  // navigateTo('/tutorial');

  useEffect(() => {

    //console.log('FIRST GETTING PROGRESS', tutorialSave);
    if (!tutorialSave?.stage) {
      const getProgressAndSet = async () => {
        const progress = await getTutorialProgress({clientId: userId});

        //console.log('GET PROGRESS', progress);
        // @ts-ignore
        // if (progress?.enemyId >= 0) { // айди первого босса 0
        // }
        if (progress?.stage) {
          //console.log('HAVE SOME PROGRESS', progress);
          dispatch(setSave(progress))
          setStage(TutorialStage[progress.stage]);
          loadTutorialProgress(progress);
        } else {
          setStage('fire');
          if (APP_ENV === 'production') {
            ReactGA.event({category: 'Tutorial', action: 'Start'});
            amplitude.track('Start', {group: 'Tutorial'});
          }
          updateSave({save: {stage: TutorialStage.start}});
        }
      }
      getProgressAndSet();
    } else {
      //console.log('HAVE SOME PROGRESS', tutorialSave);
      dispatch(setSave(tutorialSave))
      setStage(TutorialStage[tutorialSave.stage]);
      loadTutorialProgress(tutorialSave);
    }
  }, []);

  const loadTutorialProgress = (tutorialSave: TutorialSave) => {
    switch (tutorialSave.stage) {
      case TutorialStage.stone:
        addCard("Stone", t('tutorial.item1'));
        break;
      case TutorialStage.stone2:
        //console.log('AT STAGE STONE2!!!!!!!');
        addCard("Stone", t('tutorial.item1'));
        addCard("Stone", t('tutorial.item1'));
        break;
      case TutorialStage.torch:
        addCard("Stone", t('tutorial.item1'));
        addCard("Stone", t('tutorial.item1'));
        addCard("Torch", t('tutorial.item2'));
        break;
      case TutorialStage.fire:
        addCard("Stone", t('tutorial.item1'));
        addCard("Stone", t('tutorial.item1'));
        addCard("Fire", t('tutorial.item3'));
        break;
      case TutorialStage.amulet:
        navigateTo('/tutorial/dialogue');
        break;
      case TutorialStage.battle:
        //console.log('CASE WITH BATTLE');
        navigateTo('/battle');
        break;
      case TutorialStage.dialogue1:
        navigateTo('/tutorial/dialogue');
        break;
      case TutorialStage.dialogue2:
        navigateTo('/tutorial/dialogue');
        break;
      case TutorialStage.dialogue3:
        navigateTo('/tutorial/dialogue');
        break;
      case TutorialStage.dungeon:
        navigateTo('/tutorial/dungeon');
        break;
      case TutorialStage.finish:
        setStage('amulet');
        navigateTo('/tutorial');
        break;
    }
  }

  const maxCounter: number = 1;

  useEffect(() => {
    // @ts-ignore
    if (tutorialSave && tutorialSave.enemyId === 2 && tutorialSave?.stage === TutorialStage.finish && tutorialSave?.dialogueId == 3) {
      setStage('amulet');
      pausedMusic();
      updateSave({save: {stage: TutorialStage.amulet, dialogueId: tutorialSave?.dialogueId}});
    }
  }, [tutorialSave]);

  useEffect(() => {
    if (tg) {
      tg.setHeaderColor("#1f1c1a");
    }
  }, [tg]);

  const handleClick = (clientX: number, clientY: number) => {
    const newClick: Click = {
      id: Date.now(),
      x: clientX,
      y: clientY,
    };

    setClicks((prevClicks) => [...prevClicks, newClick]);

    setTimeout(() => {
      setClicks((prevClicks) =>
        prevClicks.filter((click) => click.id !== newClick.id)
      );
    }, 700);

    const sxt = (newClick.x - 125) / 100;
    const syt = (newClick.y - 125) / 100;
    const skew =
      Math.round(Math.abs(1.2 - Math.abs(sxt) - Math.abs(syt)) * 10) / 10;

    const dir = Math.abs(sxt) - Math.abs(syt);
    //console.log(sxt, syt, dir, skew);

    if (dir > 0) {
      if (sxt > 0) {
        if (skew >= 0.3) {
          syt >= 0
            ? setAnimDir(`[transform:matrix(1,0,0.1,1,10,10)]`)
            : setAnimDir(`[transform:matrix(1,-0.1,0,1,10,-10)]`);
        } else {
          setAnimDir(`[transform:matrix(1.05,0,0,0.95,10,0)]`);
        }
      } else {
        if (skew >= 0.3) {
          syt >= 0
            ? setAnimDir(`[transform:matrix(1,0,-0.1,1,-10,10)]`)
            : setAnimDir(`[transform:matrix(1,0.1,0,1,-10,-10)]`);
        } else {
          setAnimDir(`[transform:matrix(1.05,0,0,0.95,-10,0)]`);
        }
      }
    } else {
      if (syt > 0) {
        setAnimDir(`[transform:matrix(0.95,0,0,1.05,0,10)]`);
      } else {
        setAnimDir(`[transform:matrix(0.95,0,0,1.05,0,-10)]`);
      }
    }
    // console.log(clientX - btnLeft, clientY - btnTop);
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 50);
  };

  const addCard = (
    newCardName: string,
    newCardTitle: string,
    count: number = 1
  ) => {
    setCards((prevCards) => [
      ...prevCards,
      {
        name: newCardName,
        title: newCardTitle,
        image: newCardName.toLowerCase(),
        count: count,
      },
    ]);
  };

  const removeCard = (cardName: string) => {
    setCards((prevCards) => {
      const index = prevCards.findIndex((card) => card.name === cardName);

      if (index !== -1) {
        const updatedCards = [...prevCards];
        updatedCards.splice(index, 1);
        return updatedCards;
      }

      return prevCards;
    });
  };

  function getBackgroundOpacity(num: number): string {
    num *= 100 / maxCounter;

    let numStr: string = num.toString().padStart(2, "0");

    if (numStr.endsWith("0")) {
      numStr = numStr.slice(0, -1);
    }

    return numStr === "10" ? "1" : "." + numStr;
  }

  function getNegativeOpacity(num: number): string {
    num *= 100 / maxCounter;

    let invertedNum = 100 - num;

    let numStr: string = invertedNum.toString().padStart(2, "0");

    if (numStr.endsWith("0")) {
      numStr = numStr.slice(0, -1);
    }

    return invertedNum === 100 ? "1" : "0." + numStr;
  }

  function getTransformScale(num: number): string {
    num *= 100 / maxCounter;

    let numStr: string = num.toString().padStart(2, "0");

    if (numStr.endsWith("0")) {
      numStr = numStr.slice(0, -1);
    }

    return numStr === "10" ? "1" : "1." + numStr;
  }

  useEffect(() => {
    // Функція для запобігання прокручування
    const preventScroll = (event: WheelEvent) => {
      event.preventDefault();
    };

    // Додаємо обробник події при монтуванні компонента
    window.addEventListener("wheel", preventScroll, { passive: false });

    // Видаляємо обробник події при демонтуванні компонента
    return () => {
      window.removeEventListener("wheel", preventScroll);
    };
  }, []);

  const updateSave = ({save}: {save: TutorialSave}) => {
    // const save = { stage: TutorialStage.stone }
    dispatch(setSave(save));
    const updatingSave = async () => {
      await updateTutorialProgress({clientId: userId, save: JSON.stringify(save)});
    }
    updatingSave();
  }

    useEffect(() => {
      if (counter >= maxCounter) {
        setShowImage(true);
        if (stage !== 'fire') {
          playSound('notification');
        }
        setTimeout(function () {
          setShowImage(false);
          switch (stage) {
            case "start":
              addCard("Stone", t('tutorial.item1'));
              setStage("stone");
              updateSave({save: {stage: TutorialStage.stone}});
              if (APP_ENV === 'production') {
                ReactGA.event({category: 'Tutorial', action: 'Got stone 1'});
                amplitude.track('Got stone 1', {group: 'Tutorial'});
              }
              break;
            case "stone":
              addCard("Stone", t('tutorial.item1'));
              setStage("stone2");
              updateSave({save: {stage: TutorialStage.stone2}});
              if (APP_ENV === 'production') {
                ReactGA.event({category: 'Tutorial', action: 'Got stone 2'});
                amplitude.track('Got stone 2', {group: 'Tutorial'});
              }
              break;
            case "stone2":
              addCard("Torch", t('tutorial.item2'));
              setStage("torch");
              updateSave({save: {stage: TutorialStage.torch}});
              if (APP_ENV === 'production') {
                ReactGA.event({category: 'Tutorial', action: 'Got torch'});
                amplitude.track('Got torch', {group: 'Tutorial'});
              }
              break;
            case "torch":
              removeCard("Torch");
              addCard("Fire", t('tutorial.item3'));
              setStage("fire");
              updateSave({save: {stage: TutorialStage.fire}});
              if (APP_ENV === 'production') {
                ReactGA.event({category: 'Tutorial', action: 'Got fire'});
                amplitude.track('Got fire', {group: 'Tutorial'});
              }
              break;
            case "fire":
              setStage("battle");
              updateSave({save: {stage: TutorialStage.battle, enemyId: 0,}});
              navigateTo('/battle');
              break;
            case "amulet":
              //updateSave({save: {stage: TutorialStage.fire}});
              if (APP_ENV === 'production') {
                ReactGA.event({category: 'Tutorial', action: 'Got amulet'});
                amplitude.track('Got amulet', {group: 'Tutorial'});
              }
              navigateTo('/tutorial/dialogue');
              break;
            default:
              setStage("start");
              break;
          }
          setCounter(0);
        }, 2000);
      }
    }, [counter, stage]);


  const touchHandledRef = useRef(false);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!touchHandledRef.current) {
      handleClick(
        event.clientX - event.currentTarget.getBoundingClientRect().left,
        event.clientY - event.currentTarget.getBoundingClientRect().top
      );
      if (counter < maxCounter) {
        setCounter((prevCounter) =>
          prevCounter + 1 > maxCounter ? maxCounter : prevCounter + 1
        );
      }
    }
    touchHandledRef.current = false;
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLButtonElement>) => {
    playSound('buttonTap');
    touchHandledRef.current = true;
    for (let i = 0; i < event.touches.length; i++) {
      handleClick(
        event.touches[i].clientX -
          event.currentTarget.getBoundingClientRect().left,
        event.touches[i].clientY -
          event.currentTarget.getBoundingClientRect().top
      );
    }
    if (counter < maxCounter) {
      setCounter((prevCounter) =>
        prevCounter + event.touches.length > maxCounter
          ? maxCounter
          : prevCounter + event.touches.length
      );
    }
  };

  const handleBack = () => {
    navigateTo('/');
  };

  return {
    stage,
    getBackgroundOpacity,
    getNegativeOpacity,
    counter,
    maxCounter,
    isClicked,
    setIsClicked,
    navigateTo,
    handleButtonClick,
    handleTouchStart,
    animDir,
    showImage,
    clicks,
    cards,
    handleBack,
  };
}
