import { useLocation, Routes, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  Home,
  Friends,
  Tutorial,
  Heroes,
  Rewards,
  RoomPage,
  Profile,
  NotFound,
} from "../../../../pages";
import { Battle } from "../../../../pages/Battle/Battle";
import { Farm } from "../../../../pages/Farm";
import { LanguageSettings } from "../../../LanguageSettings";
import { Layout } from "../../../../layout";
import { ExchangeSettings } from "../../../ExchangeSettings";
import { IslandWindow } from "../../../Farm/IslandWindow";
import { Dialogue, TutorialDungeon } from "../../../../components/Tutorial";
import { Dungeon } from "../../../../pages/Dungeon";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { getTutorialProgress } from "../../../../endpoints/tutorialProgress";
import { useTelegram } from "../../../../hooks/useTelegram";
import { useUtils } from "../../../../utils/navigateTo";
import { TutorialStage } from "../../../../interfaces/tutorial";
import { Quests } from "../../../../pages/Quests";
import { getCurrentHero } from "../../../../endpoints/heroEndpoints";
import {useDispatch, useSelector} from "react-redux";
import { setHero } from "../../../../app/features/heroSlice";
import { setSave } from "../../../../app/features/tutorialSaveSlice";
import { getUserSettings } from "../../../../endpoints/saveSettings";
import {RootState, store} from "../../../../app/store";
import { setUserSettings } from "../../../../app/features/userSettings";
import { AppDispatch } from "../../../../app/store";
import { fetchAppConfig } from "../../../../app/features/appConfigSlice";
import { useUserInteraction } from "../../../../utils/hasInteracted";
import { useSoundService } from "../../../../utils/soundService";
import { createProfile } from "../../../../endpoints/getProfileInfo";

export const AnimatedRoutes = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { navigateTo, activeDiv } = useUtils();
  const location = useLocation();
  const { userId, user, startParam, tg } = useTelegram();
  const { playMusic, pausedMusic } = useSoundService();
  const hasInteracted = useUserInteraction();
  const settings = useSelector((state: RootState) => state.settings.settings);

  document.documentElement.lang = settings.language.toLowerCase();

  useEffect(() => {
    if (tg) {
      tg.setHeaderColor("#1f1c1a");
    }
  }, []);

  // console.log('Active div!!!!!!!!!', activeDiv);

  useEffect(() => {
    // console.log('ANIMATED ROUTES')
    dispatch(fetchAppConfig());
  }, []);

  // console.log("user", user);

  useEffect(() => {
    //console.log("CURRENT PAGE (ANIMATED)", activeDiv);
    if (activeDiv === "/island" || activeDiv === "/tutorial/dialogue") {
      //pausedMusic();
      playMusic("farm");
    }
    if (
      activeDiv === "/dungeon" ||
      activeDiv === "/tutorial/dungeon" ||
      activeDiv === "/tutorial"
    ) {
      //pausedMusic();
      playMusic("dungeon");
    }
  }, [activeDiv, hasInteracted]);

  useEffect(() => {
    const getHero = async () => {
      const result = await getCurrentHero({ clientId: userId });
      if (result?.heroId) {
        dispatch(setHero(result));
      }
    };
    getHero();
  }, []);

  useEffect(() => {
    const getSettings = async () => {
      const result = await getUserSettings({ clientId: userId });
      if (result) {
        store.dispatch(setUserSettings(result));
      }
    };
    getSettings();
  }, [userId]);

  const extractUserId = (startParam: string) => {
    const regex = /^ref_(\d+)$/;
    const match = startParam.match(regex);

    if (match) {
      return match[1];
    } else {
      return undefined;
    }
  };
  useEffect(() => {
    const CreateProfile = async () => {
      if (user) {
        const fullName = user.username
          ? user.last_name
            ? `${user.first_name} ${user.last_name}`
            : user.first_name
          : null;

        const result = await createProfile({
          clientId: userId,
          isPremium: user.is_premium ? user.is_premium : false,
          referrer: startParam ? extractUserId(startParam) : undefined,
          fullName: fullName,
          avatarId: user.photo_url ? user.photo_url : undefined,
        });

        // console.log("result", result);
      }
    };

    CreateProfile();
  }, [user]);

  useEffect(() => {
    // Виклик методу для отримання прогресу тут
    const checkTutorialProgress = async () => {
      try {
        const save = await getTutorialProgress({ clientId: userId });
        // console.log('SAVE AT ANIMATED ROUTES', save);
        if (save?.completed || save?.stage) {
          dispatch(setSave(save));
        }
        if (!save?.completed && sessionStorage.getItem("firstVisit")) {
          navigateTo(`${activeDiv}`);
          return;
        }
        if (!save.completed) {
          switch (save.stage) {
            case TutorialStage.amulet:
              navigateTo("/tutorial/dialogue");
              break;
            case TutorialStage.battle:
              navigateTo("/battle");
              break;
            case TutorialStage.dialogue1:
              navigateTo("/tutorial/dialogue");
              break;
            case TutorialStage.dialogue2:
              navigateTo("/tutorial/dialogue");
              break;
            case TutorialStage.dialogue3:
              navigateTo("/tutorial/dialogue");
              break;
            case TutorialStage.dungeon:
              navigateTo("/tutorial/dungeon");
              break;
            case TutorialStage.finish:
              // navigateTo("/tutorial");
              //console.log('MY LOCATION?', window.location.pathname);
              navigateTo(`${activeDiv}`);
              break;
            default:
              navigateTo("/tutorial");
              break;
          }
        } else if (window.location.pathname == "/") {
          navigateTo("/island");
          return;
        }
        if (!sessionStorage.getItem("firstVisit")) {
          sessionStorage.setItem("firstVisit", "true");

          if (save?.completed) {
            navigateTo("/island");
            return;
          }
        }
      } catch (error) {
        console.error("Error fetching tutorial progress:", error);
      }
    };

    checkTutorialProgress();
  }, []);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<NotFound />} />
          <Route path="tutorial" element={<Tutorial />}>
            <Route path="dialogue" element={<Dialogue />} />
            <Route path="dungeon" element={<TutorialDungeon />} />
          </Route>
          <Route path="quests" element={<Quests />} />
          <Route path="island" element={<IslandWindow />} />
          <Route path="battle" element={<Battle />} />
          <Route path="dungeon" element={<Dungeon />} />
          <Route path="room" element={<RoomPage />} />
          <Route path="friends" element={<Friends />} />
          <Route path="heroes" element={<Heroes />} />
          <Route path="profile" element={<Profile />}>
            <Route path="language" element={<LanguageSettings />} />
            <Route path="exchange" element={<ExchangeSettings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};
