import { useDispatch, useSelector } from "react-redux";
import { HandleBackButton } from "../../../layout/components/HeaderCave/components";
import { useUtils } from "../../../utils/navigateTo";
import { AppDispatch, RootState, store } from "../../../app/store";
import { Room } from "../Room";
import { farmRoomMock, islandsConfigMock } from "../../../mock/buildings";
import { setSelectedRoom } from "../../../app/features/selectedRoom";
import { useCallback, useEffect, useRef, useState } from "react";
import { BuildingPopup } from "./components/BuildingPopup";
import { setSelectedIsland } from "../../../app/features/selectedIsland";
import {
  BuilderIcon,
  BuilderOffer,
  BuilderQueue,
  CloudsAnimation,
  EventIcon,
  Explosion,
} from "../../../components";
import FarmEffect from "../../Router/components/FarmEffect";
import { useLocalStorage, useSessionStorage } from "@uidotdev/usehooks";
import { getBalance, getIslands } from "../../../endpoints/farmMock";
import { useTelegram } from "../../../hooks/useTelegram";
import * as amplitude from "@amplitude/analytics-browser";
import { setDialogueInfo } from "../../../app/features/dialoguesSlice";
import { useTranslation } from "react-i18next";
import {
  TutorialFarmSave,
  TutorialFarmStage,
  TutorialStage,
} from "../../../interfaces/tutorial";
import TypingEffect from "../../../components/TypingEffect";
import { Preloader } from "../../../layout/components/Preloader";
import {
  fetchFarmTutorialProgress,
  saveFarmTutorialProgress,
} from "../../../app/features/farmTutoralSlice";
import { getFarmConfig } from "../../../endpoints/configEndpoint";
import {
  updateFarmTutorialProgress,
  updateTutorialProgress,
} from "../../../endpoints/tutorialProgress";
import { fetchConfig } from "../../../app/features/configSlice";
import { resetProgress } from "../../../endpoints/dungeonEndpoints";
import {
  BuildingMask,
  CloudAnimation,
} from "../../../components/animation/CloudAnimation";
import { DungeonComplete } from "../../../components/DungeonComplete";
import { resetDungeon } from "../../../app/features/dungeonCompleted";
import { Explosions } from "../../../components/animation/Explosion";
import { Resource } from "../../../mock/resources";
import { Resources } from "../../../enums/resources";
import { setResource } from "../../../app/features/resourcesSlice";
import PageTransition from "../../Router/components/PageTransition";
import { PopupButton } from "../../../components/PopupButton";
import { useFarm } from "../../../pages/Farm/useFarm";
import { SpeedUpPopUp } from "./components/SpeedUpPopUp";
import { RoomStatus } from "../../../enums/buildingStatus";
import { fetchActiveBoosts } from "../../../app/features/inventorySlice";
import { fetchIslands } from "../../../app/features/islandsSlice";
import { OpenLootBox } from "../../Inventory/components";
import {APP_ENV} from "../../../config";

export const IslandWindow = () => {
  const [currentRoomPopup, setCurrentRoomPopup] = useState<number>();
  const [openSpeed, setOpenSpeed] = useSessionStorage<any>("openSpeed", false);

  const { userId } = useTelegram();
  const [speed, setSpeed] = useState(50);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [dialogStage, setDialogStage] = useState(0);
  const { navigateTo } = useUtils();
  const dispatch = useDispatch<AppDispatch>();
  const { t, i18n } = useTranslation();

  const [buildingMasks, setBuildingMasks] = useState<BuildingMask[]>([
    { height: 187, width: 163, x: 136, y: 413 },
    { height: 200, width: 200, x: 230, y: 470 },
    { height: 195, width: 146, x: 0, y: 452 },
  ]);
  const buildingRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {

    dispatch(fetchConfig());
  }, [dispatch]);

  const fetchBalance = async () => {
    if (userId) {

      await getBalance({ clientId: `${userId}` });
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  const isFarmTutorialCompleted = useSelector(
    (state: RootState) => state.farmTutorial.tutorialFarmSave?.save?.completed
  );

  const farmTutorialSave = useSelector(
    (state: RootState) => state.farmTutorial.tutorialFarmSave.save
  );
  const dungeonIsCompleted = useSelector(
    (state: RootState) => state.dungeonCompleted.dungeonCompleted
  );

  const dungeonResources = useSelector(
    (state: RootState) => state.dungeonCompleted.resources
  );

  // let dungeonIsCompleted = true

  // const dungeonResources: Resource[] = [
  //   { resourceType: Resources.experience, value: 100 },
  //   { resourceType: Resources.kitsu, value: 50 },
  //   { resourceType: Resources.stone, value: 30 },
  // ];

  // useEffect(() => {
  //   console.log("getFarmConfig")
  //   getFarmConfig();
  // }, []);

  const [isResoursesShown, setResoursesShown] = useState(false);
  const [isExplousenShown, setExplousenShown] = useState(false);

  useEffect(() => {
    if (dungeonIsCompleted) {
      setTimeout(() => {
        setResoursesShown(true);
      }, 1000);
    }
  }, [dungeonIsCompleted]);

  useEffect(() => {
    if (!farmTutorialSave?.stage) {
      if (userId) {
        dispatch(fetchFarmTutorialProgress(userId));
      }
    }
  }, [userId, dispatch]);

  const dialogueId: number = farmTutorialSave?.dialogueId ?? 1;
  const phrases = t(`farm.dialogues.dialogue${dialogueId}.phrases`, {
    returnObjects: true,
  });

  const handleTypingComplete = () => {
    setIsTypingComplete(true);
  };

  const updateSave = async (save: TutorialFarmSave) => {
    dispatch(saveFarmTutorialProgress({ clientId: userId, save }));
  };

  let selectedIsland = useSelector(
    (state: RootState) => state.selectedIsland.selectedIsland
  );

  // useEffect(() => {
  //   const fetchIslandsData = async () => {
  //     if (userId) {
  //       await getIslands({ clientId: `${userId}` });
  //     }
  //   };

  //   fetchIslandsData();
  // }, [userId]);

  useEffect(() => {
    dispatch(fetchIslands(`${userId}`));
  }, []);

  const { islands } = useFarm();

  const selectedRoom = useSelector((state: RootState) => state.selectedRoom);

  if (!selectedIsland && islands.length > 0) {
    store.dispatch(setSelectedIsland({ island: islands[0] }));
    selectedIsland = islands[0];
  }
  useEffect(() => {
    if (selectedRoom.id !== -1 && selectedRoom.buildingId) {
      setCurrentRoomPopup(selectedRoom.id);
    } else {
      setCurrentRoomPopup(undefined);
      setOpenSpeed(false);
    }
  }, [selectedRoom]);

  useEffect(() => {
    if (islands.length) {
      const count = islands[0].buildings.filter(
        (building) =>
          building.status === RoomStatus.farming ||
          building.status === RoomStatus.builded
      ).length;

      const result = count >= 3;

      if (result) {
        updateSave({
          dialogueId: 999,
          completed: true,
          stage: TutorialFarmStage.finishSecondBuilding,
        });
      }
    }
  }, [islands]);

  // useEffect(() => {
  //   // Перевіряємо, чи дані вже завантажені

  //   if (farmTutorialSave) {
  //     if (!isFarmTutorialCompleted && !farmTutorialSave.dialogueId) {
  //       setCloudCount(6);
  //       return;
  //     }

  //     if (farmTutorialSave.dialogueId! === 2) {
  //       setCloudCount((prevCount) => Math.max(prevCount - 1, 0));
  //       return;
  //     }

  //     if (farmTutorialSave.dialogueId! === 3) {
  //       setCloudCount(5);
  //       return;
  //     }
  //     const initialRoomCount = selectedIsland?.buildings?.length || 0;
  //     setCloudCount(Math.max(6 - initialRoomCount, 0));
  //   }
  // }, [isFarmTutorialCompleted, farmTutorialSave, selectedIsland]);

  // const [cloudCount, setCloudCount] = useState(6);

  const [previousRoomCount, setPreviousRoomCount] = useState(
    () => selectedIsland?.buildings?.length || 0
  );

  // useEffect(() => {
  //   if (selectedIsland?.buildings) {
  //     const currentRoomCount = selectedIsland.buildings.filter(
  //       (room) => room.id
  //     ).length;

  //     if (currentRoomCount !== previousRoomCount) {
  //       if (currentRoomCount > previousRoomCount) {
  //         setCloudCount((prevCount) => {
  //           const newCount = Math.max(
  //             prevCount - (currentRoomCount - previousRoomCount),
  //             0
  //           );
  //           return newCount;
  //         });
  //       }
  //       setPreviousRoomCount(currentRoomCount);
  //     }
  //   }
  // }, [selectedIsland?.buildings, previousRoomCount]);

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
      switch (dialogueId) {
        case 1:
          updateSave({
            dialogueId: dialogueId + 1,
            stage: TutorialFarmStage.start,
          });

          break;
        case 2:
          updateSave({
            dialogueId: dialogueId + 1,
            stage: TutorialFarmStage.building,
          });
          break;
        case 3:
          updateSave({
            dialogueId: dialogueId + 1,
            stage: TutorialFarmStage.battle,
          });

          break;
        case 4:
          updateSave({
            dialogueId: dialogueId + 1,
            stage: TutorialFarmStage.repair,
          });
          break;
        case 7:
          updateSave({
            dialogueId: dialogueId,
            completed: true,
            stage: TutorialFarmStage.finishFirstBuilding,
          });

          break;
        default:
          break;
      }

      setDialogStage(0);
      dispatch(setDialogueInfo({ id: dialogueId + 1 }));
    }
  };

  const [startText, setStartText] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setStartText(true);
    }, 1000);
  }, []);

  const [isResourcesShown, setIsResourcesShown] = useState(false);

  const handleClaimResourcesForCompletedDungeon = () => {
    console.log("start claim resources");
    // dungeonResources.forEach((dungeonResource) => {
    //   const existingResource = resources.find(
    //     (resource) => resource.resourceType === dungeonResource.resourceType
    //   );

    //   const newValue = existingResource
    //     ? existingResource.value + dungeonResource.value
    //     : dungeonResource.value;

    //   dispatch(
    //     setResource({
    //       resource: dungeonResource.resourceType,
    //       newValue,
    //     })
    //   );
    // });
    console.log("we are done setIsResourcesShown");
    dispatch(resetDungeon());
  };

  useEffect(() => {
    if (isResourcesShown) {
      setTimeout(() => {

        dispatch(resetDungeon());
      }, 2500);
    }
  }, [isResourcesShown]);

  const [buildingRects, setBuildingRects] = useState([]);

  useEffect(() => {
    // Після рендерингу отримайте позиції будівель
    const currentIslandConfig = islandsConfigMock.find(
      (island) => island.id === selectedIsland?.id
    );

    // Переконайтеся, що selectedIsland та currentIslandConfig визначені
    if (currentIslandConfig && selectedIsland) {
      const result: BuildingMask[] =
        currentIslandConfig?.scheme.reduce<BuildingMask[]>(
          (acc, schemeItem, index) => {
            const correspondingBuilding = selectedIsland?.buildings[index];
            if (correspondingBuilding) {
              acc.push({
                x: schemeItem.left,
                y: schemeItem.top,
                width: schemeItem.width,
                height: schemeItem.height,
              });
            }
            return acc;
          },
          []
        ) || [];
      // console.log("mask", result);
      // setBuildingMasks(result);
    }
  }, []);

  const [showBuilder, setShowBuilder] = useState(false);

  const handleClickBuilder = () => {
    // console.log("hehrehhehehehe");
    setShowBuilder(true);
  };
  // console.log('farmTutorialSave?.stage && farmTutorialSave?.stage < TutorialFarmStage.finishRepair ', farmTutorialSave?.stage && farmTutorialSave?.stage < TutorialFarmStage.finishRepair )
  return (
    <>
      <PageTransition>
        {currentRoomPopup && !openSpeed && <BuildingPopup />}
        {currentRoomPopup && openSpeed && <SpeedUpPopUp />}
        <main
          className={`absolute min-h-full max-h-full h-full flex min-w-full overflow-hidden  ${
            !isFarmTutorialCompleted ? "z-[53]" : ""
          }`}
        >
          {!isFarmTutorialCompleted &&
            dialogueId !== 3 &&
            dialogueId !== 5 &&
            dialogueId !== 6 &&
            dialogueId < 7 && (
              <div
                className="absolute min-h-full max-h-full h-full flex min-w-full overflow-hidden z-[9999]"
                onClick={next}
              ></div>
            )}

          <div className="w-full h-full overlay-element">
            <CloudAnimation buildingMasks={buildingMasks} />
          </div>
          {dungeonIsCompleted && (
            <>
              {isResoursesShown && (
                <div className="z-[9999]">
                  <OpenLootBox
                    rewards={dungeonResources}
                    openBoxName={"Dungeon Completed"}
                    onClose={handleClaimResourcesForCompletedDungeon}
                  />
                </div>
              )}
              {/* {isExplousenShown && (
                <div className="fixed inset-0 z-[9998]">
                  <div className="absolute top-[10%] w-full h-full inset-x-4 rounded-[2px] p-[2px] left-0">
                    <Explosions />
                  </div>
                </div>
              )} */}
            </>
          )}
          {/* <div className="absolute z-[100] top-[80px] right-2">
            <EventIcon name={"Quests"} link={"/quests"} />
            <EventIcon name={"Hot Deals"} link={"/quests"} />
            <EventIcon name={"Events"} link={"/quests"} />
          </div> */}
          {/* <div className="absolute z-[100] top-[18%] left-2">
            <BuilderIcon onClick={handleClickBuilder} />
          </div> */}

          {showBuilder && (
            <div className="absolute z-[100]">
              <BuilderQueue
                closeDeck={() => {
                  setShowBuilder(false);
                }}
              />
            </div>
          )}
          <div className="absolute w-full max-w-full min-w-full h-full max-h-full min-h-full">
            <img
              className="w-full h-full bg-slate-900"
              src={require("../../../assets/images/islandBgMain.jpg")}
            />
          </div>
          {/* {isFarmTutorialCompleted && (
            <div className="absolute top-[92px] left-5 z-30">
              <HandleBackButton
                onClick={() => {
                  navigateTo("/");
                  dispatch(setSelectedRoom({ id: -1 }));
                }}
              />
            </div>
          )} */}
          {/* {<BuilderOffer />} */}
          {selectedIsland &&
            islandsConfigMock
              .filter((v) => v.id === selectedIsland?.id)[0]
              .scheme.map((scheme, i) => {
                return (
                  <Room
                    key={scheme.id}
                    scheme={scheme}
                    index={i + 1}
                    room={selectedIsland?.buildings[i]}
                  />
                );
              })}

          {!isFarmTutorialCompleted &&
            farmTutorialSave?.stage !== TutorialFarmStage.battle &&
            farmTutorialSave?.stage !== TutorialFarmStage.building &&
            farmTutorialSave?.stage !== TutorialFarmStage.repair &&
            farmTutorialSave?.stage !== TutorialFarmStage.startRepair &&
            farmTutorialSave?.stage !== TutorialFarmStage.finishRepair &&
            farmTutorialSave?.stage !==
              TutorialFarmStage.finishFirstBuilding && (
              <>
                <div
                  className={`${
                    !i18n.exists(
                      `farm.dialogues.dialogue${dialogueId}.phrases.${dialogStage}.person`
                    ) ||
                    (t(
                      `farm.dialogues.dialogue${dialogueId}.phrases.${dialogStage}.person`
                    ) === "" &&
                      "opacity-0")
                  }`}
                >
                  {startText && (
                    <div
                      className={`absolute z-[100] ${
                        "bottom-[25%]" // Стандартне положення
                      } left-[25%]`}
                    >
                      <div className="relative px-5">
                        <img
                          src={require("../../../assets/images/dialog-cloud.png")}
                          className={`w-[200px] ml-auto mr-0`}
                          alt=""
                        />
                        {/* Текст поверх зображення */}
                        <div className="absolute z-10 right-4 top-1 w-[200px] h-[100px]">
                          <p className="w-full p-2 text-wrap leading-[1.2] text-sm">
                            <TypingEffect
                              speed={speed}
                              onComplete={handleTypingComplete}
                              text={t(
                                `farm.dialogues.dialogue${dialogueId}.phrases.${dialogStage}.person`
                              )}
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                (
                <div
                  className={`absolute bottom-0  transition-transform duration-1000 ease-in-out ${
                    "transform translate-x-[0vw] z-[53]" // Лисиця на початковій позиції ліворуч
                  }`}
                >
                  <img
                    src={require("../../../assets/images/tutorialFarmFox.png")}
                    alt="Tutorial Farm Fox"
                    className={`w-[215px] h-auto`}
                  />
                </div>
                )
              </>
            )}
          {!isFarmTutorialCompleted &&
            farmTutorialSave?.stage !== TutorialFarmStage.building &&
            farmTutorialSave?.stage &&
            farmTutorialSave?.stage < TutorialFarmStage.repair && (
              <div
                className={`absolute bottom-0 left-0 h-[175px] w-full max-w-full bg-gradient-to-b from-transparent to-black ${
                  farmTutorialSave?.stage === TutorialFarmStage.finishRepair
                    ? "z-[101]"
                    : "z-[54]"
                }  flex justify-center items-end p-5`}
              >
                <div className="text-center text-white text-lg font-normal leading-[18px]">
                  {t("farm.tapToSkip")}
                </div>
              </div>
            )}
          {/* <div className="absolute bottom-0 left-0 h-[175px] w-full max-w-full">
            <img
              className="w-full h-full"
              src={require("../../../assets/images/bottomIslandBorder.png")}
            />
          </div> */}
        </main>
      </PageTransition>
    </>
  );
};
