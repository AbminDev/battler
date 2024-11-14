import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Claim, RoomProps } from "./interface";
import { useDispatch, useSelector } from "react-redux";
import { useUtils } from "../../../utils/navigateTo";
import { AppDispatch, RootState, store } from "../../../app/store";
import { RoomStatus } from "../../../enums/buildingStatus";
import {
  addFarmIsland,
  addIslandRoom,
  claimIslandRoom,
  fetchIslands,
  repairIslandRoom,
  setIslandRoomStatus,
} from "../../../app/features/islandsSlice";
import { setSelectedRoom } from "../../../app/features/selectedRoom";
import { setResource } from "../../../app/features/resourcesSlice";
import { setSelectedIsland } from "../../../app/features/selectedIsland";
import { TICK } from "../../../constants";
import { calculateTimer } from "../../../utils/timer";
import { Boost, usedBoosts } from "../../../app/features/inventorySlice";
import { setDungeonProps } from "../../../app/features/dungeonPropsSlice";
import { useTelegram } from "../../../hooks/useTelegram";
import { claimResourse, finishBuilding, getBalance, getIslands, upgradeBuilding } from "../../../endpoints/farmMock";
import { dungeonConfig } from "../../../endpoints/dungeonMock";
import { updateBattleSave } from "../../../utils/updateBattleSave";
import {TutorialFarmStage, TutorialSave, TutorialStage} from "../../../interfaces/tutorial";
import { fetchFarmTutorialProgress, saveFarmTutorialProgress, setFarmSave } from "../../../app/features/farmTutoralSlice";
import {setSave} from "../../../app/features/tutorialSaveSlice";
import {updateTutorialProgress} from "../../../endpoints/tutorialProgress";
import {getDungeonProgressByDungeonId} from "../../../endpoints/dungeonEndpoints";
import { useSessionStorage } from "@uidotdev/usehooks";
import ReactGA from 'react-ga4';
import * as amplitude from "@amplitude/analytics-browser";
import { useFarm } from "../../../pages/Farm/useFarm";
import {APP_ENV} from "../../../config";

export interface RoomDisplay {
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

export function useRoom(props: RoomProps) {
  const { room, index, scheme } = props;

  const [Claim, setClaim] = useState<Claim>({
    isClaim: false,
    isLimit: false,
    value: 0,
    percentage: 0,
  });

  const [timer, setTimer] = useSessionStorage<any>(`timer-${room?.id}`, '');
  const [roomDisplay, setRoomDisplay] = useState<RoomDisplay>({
    x: scheme.left,
    y: scheme.top,
    width: scheme.width,
    height: scheme.height,
    zIndex: scheme.zIndex,
  });
  const { buildingConfigs } = useSelector((state: RootState) => state.config);
  const [startSelectHero, setStartSelectHero] = useSessionStorage(
    "startSelectHero",
    false
  );
  const [isDungeonStart, setIsDungeonStart] = useSessionStorage(
    "isDungeonStart",
    false
  );

  const [currentDungeonId, setCurrentDungeonId] = useSessionStorage(
    "currentDungeonId",
    0
  );
  const { islands } = useFarm();
  const dispatch = useDispatch<AppDispatch>();
  const { navigateTo } = useUtils();
  const updateSave = ({save}: {save: TutorialSave}) => {
    // const save = { stage: TutorialStage.stone }
    dispatch(setSave(save));
    const updatingSave = async () => {
      await updateTutorialProgress({clientId: userId, save: JSON.stringify(save)});
    }
    updatingSave();
  }
  const { tg, userId } = useTelegram();
  const hasBuildingCompletedRef = useRef(false);

  useEffect(() => {
    updateSave({save: {completed: true}});
  }, []);

  // const fetchIslands = async () => {
  //   if (userId) {

  //     console.log('getIslands 1', )
  //     await getIslands({ clientId: `${userId}` });
  //   }
  // };

  const fetchBalance = async () => {
    if(userId) {
      console.log("getBalance room")
      await getBalance({clientId: `${userId}`})
    }
  }

  // useEffect(() => {
  //   fetchBalance();
  // }, []);


  const heroData = useSelector((state: RootState) => state.heroData);

  const { heroId } = heroData.hero;
  // const islands = useSelector((state: RootState) => state.islands.islands);
  const selectedIsland = useSelector(
    (state: RootState) => state.selectedIsland.selectedIsland
  );
  const selectedRoom = useSelector((state: RootState) => state.selectedRoom);

  const resources = useSelector(
    (state: RootState) => state.resources.resources
  );

  const building = useMemo(() => {
    if (!buildingConfigs) return undefined; // Return undefined if buildingConfigs is null

    return scheme.buildingId
      ? buildingConfigs.find((v) => v.id === scheme.buildingId)
      : buildingConfigs.find((v) => v.id === room?.buildingId);
  }, [scheme.buildingId, room?.buildingId, buildingConfigs]);


  // useEffect(() => { fetchAndMapFarmConfig() },[])

  const buildingLvlConfig = useMemo(
    () => building?.lvlInfo.find((lvl) => lvl.lvl === room?.lvl),
    [building, room?.lvl]
  );

  const windowDimensions = useMemo(
    () => ({ width: window.innerWidth, height: window.innerHeight }),
    []
  );

  const calculateRoomDisplay = useCallback(() => {
    const bgWidth = 1024;
    const bgHeight = 1792;

    const xk = windowDimensions.width / bgWidth;
    const yk = windowDimensions.height / bgHeight;

    return {
      x: scheme.left * xk,
      y: scheme.top * yk,
      width: scheme.width * xk,
      height: scheme.height * yk,
      zIndex: scheme.zIndex,
    };
  }, [scheme, windowDimensions]);

  useEffect(() => {
    setRoomDisplay(calculateRoomDisplay());
  }, [calculateRoomDisplay]);

  useEffect(() => {
    dispatch(
      setSelectedIsland({
        island: islands.find((v) => v.id === selectedIsland?.id)!,
      })
    );
  }, [dispatch, islands, selectedIsland?.id]);

  useEffect(() => {
    if (!building) return; // Add this line

    const intervalID = setInterval(() => {
      getTimer();
      isClaimAvailable();
    }, 1000);

    return () => clearInterval(intervalID);
  }, [selectedIsland, timer, building]);

  const [triggerEndBuild, setTriggerEndBuild] = useState(false);

  const sessionKey = room?.buildingId ? `buildingLevelUp_${room?.buildingId}` : 'buildingLevelUp_default';

  const [triggerShowLevelUp, setTriggerShowLevelUp] = useSessionStorage(
    sessionKey,
    false
  );

  // if(room?.buildingId === 3) {
  //   setTriggerShowLevelUp(true)
  // }
  useEffect(() => {
    if (room && room.status === RoomStatus.farming) {
      const interval = setInterval(isClaimAvailable, 5000);
      return () => clearInterval(interval);
    }
  }, [room]);

  useEffect(() => {
    if (!building || !room) return;

    // If the room status is not 'building' anymore, reset the ref
    if (room.status !== RoomStatus.building && hasBuildingCompletedRef.current) {
      hasBuildingCompletedRef.current = false;
    }
  }, [room?.status]);



  const [isConfirmationRequired, setIsConfirmationRequired] = useState(false);

  const handleBuildingCompletion = useCallback(async () => {

    if (!building || hasBuildingCompletedRef.current) return;

    hasBuildingCompletedRef.current = true;

    if (building) {

      setTriggerEndBuild(true);

      setTimeout(() => {
        setIsConfirmationRequired(true);
      }, 500)


      if(room!.id === 2 && !isFarmTutorialCompleted) {
        dispatch(
          saveFarmTutorialProgress({
            clientId: userId,
            save: {
              dialogueId: dialogueId + 3,
              stage: TutorialFarmStage.finishFirstBuilding,
            },
          })
        );
        if (APP_ENV === 'production') {
          ReactGA.event({category: 'Farm', action: 'Repair 1 building'});
          amplitude.track('Repair 1 building', {group: 'Farm'});
        }
      }

      if(room!.id === 3 && !isFarmTutorialCompleted) {
        dispatch(
          saveFarmTutorialProgress({
            clientId: userId,
            save: {
              dialogueId: dialogueId + 4,
              completed: true,
              stage: TutorialFarmStage.finishSecondBuilding,
            },
          })
        );
        if (APP_ENV === 'production') {
          ReactGA.event({category: 'Farm', action: 'Repair 2 building'});
          amplitude.track('Repair 2 building', {group: 'Farm'});
        }
      }
      // if (!isFarmTutorialCompleted) {


      // const isFarming = !!building.lvlInfo[0].gatherDelayMs;


      // const data = await finishBuilding({
      //   clientId: userId,
      //   buildingId: room!.id,
      //   islandId: selectedIsland?.id!,
      //   isFarming
      // })

      // if(data) {

      //   setTriggerEndBuild(true);
      //   setOpenSpeed(false);

      //   await new Promise((resolve) => setTimeout(resolve, 1000));

      //   await new Promise((resolve) => setTimeout(resolve, 2000));
      //   setTriggerEndBuild(false);

      //   dispatch(
      //     saveFarmTutorialProgress({
      //       clientId: userId,
      //       save: {
      //         dialogueId: dialogueId + 3,
      //         completed: true,
      //         stage: TutorialFarmStage.finish,
      //       },
      //     })
      //   );

      // }


      // fetchIslands();

      // return;

      // } else {
      // // Встановлюємо прапор, щоб показати, що потрібно підтвердження користувача
      // setIsConfirmationRequired(true);
      // }


    }
  }, [building]);
  const [triggerClose, setTriggerCloseLevelUp] = useSessionStorage(
    "buildingLevelUp",
    false
  );

  const confirmBuildingCompletion = useCallback(async () => {
    if (building) {
      // console.log("User confirmed building completion");


      setTriggerEndBuild(false);

      const isFarming = !!building.lvlInfo[0].gatherDelayMs;


      const result = await finishBuilding({
        clientId: userId,
        buildingId: room!.id,
        islandId: selectedIsland?.id!,
        isFarming
      })


      if(result) {

        await new Promise((resolve) => setTimeout(resolve, 200));

        setTriggerShowLevelUp(true);
        // console.log("Level up animation triggered");

        await new Promise((resolve) => setTimeout(resolve, 2000));

        setTriggerShowLevelUp(false);
        setTriggerCloseLevelUp(false)

      }


      dispatch(fetchIslands(`${userId}`));

      // dispatch(
      //   setIslandRoomStatus({
      //     islandId: selectedIsland?.id!,
      //     roomId: room!.id,
      //     status: isFarming ? RoomStatus.farming : RoomStatus.builded,
      //   })
      // );

      // dispatch(
      //   claimIslandRoom({
      //     islandId: selectedIsland!.id,
      //     roomId: room!.id,
      //   })
      // );

      hasBuildingCompletedRef.current = false

      // Скидаємо прапор після підтвердження
      setIsConfirmationRequired(false);
    }
  }, [building, selectedIsland, room, dispatch]);



  const [buildTime, setBuildTime] = useSessionStorage<number>(`buildTime-${selectedRoom.id}`, 0);



  const getTimer = useCallback(() => {
      if (!building || !room || hasBuildingCompletedRef.current) return;

    if (
      room &&
      (room.status === RoomStatus.building ||
        room.status === RoomStatus.repairing)
    ) {
      switch (room.status) {
        case RoomStatus.building:

          if (room.instabuild) {
            setTimeout(() => {
              handleBuildingCompletion();
            }, 1000);

            break;
          }
          const preventTimeBug = 15000
          // console.log("room", room)
          let updatedStartTime =
              new Date(room.statusUpdateDate).getTime() +
              (buildingLvlConfig?.buildingTimeMs || 0) + preventTimeBug;



          const timerStr = calculateTimer(
            updatedStartTime,
            handleBuildingCompletion
          );

          // console.log("data update");
          setBuildTime(updatedStartTime - Date.now());

          setTimer(timerStr);

          break;

        case RoomStatus.repairing:
          const isFarming = !!building?.lvlInfo[0].gatherDelayMs;
          // const handleRepairCompletion = async () => {
          //   setTriggerEndBuild(true);

          //   await new Promise((resolve) => setTimeout(resolve, 1000));
          //   setTriggerEndBuild(false);

          //   if (!isFarmTutorialCompleted) {
          //     dispatch(
          //       setFarmSave({
          //         dialogueId: dialogueId + 1,
          //         stage: TutorialFarmStage.finishRepair,
          //       })
          //     );
          //   }

          // await finishBuilding({
          //   clientId: userId,
          //   buildingId: room!.id,
          //   islandId: selectedIsland?.id!,
          //   isFarming
          // })

          //   // dispatch(
          //   //   setIslandRoomStatus({
          //   //     islandId: selectedIsland?.id!,
          //   //     roomId: index,
          //   //     status: isFarming ? RoomStatus.farming : RoomStatus.builded,
          //   //   })
          //   // );

          // };

          // const startTimeRepairing =
          //   Date.parse(room.statusUpdateDate.toUTCString()) + 5000;

          // const repairTimer = calculateTimer(
          //   startTimeRepairing,
          //   handleRepairCompletion
          // );
          // setTimer(repairTimer);
          break;

        default:
          break;
      }
    }
  }, [
    room,
    selectedIsland,
    selectedRoom,
    handleBuildingCompletion,
  ]);

  // Стан туторіалу: чи завершено
  const isFarmTutorialCompleted = useSelector(
    (state: RootState) => state.farmTutorial.tutorialFarmSave.save?.completed
  );

  // useEffect(() => {dispatch(fetchFarmTutorialProgress(userId))}, [])

  // Стадія туторіалу
  const farmTutorialSave = useSelector(
    (state: RootState) => state.farmTutorial.tutorialFarmSave.save
  );

  const isBattle = useCallback(() => {
    const currentIsland = store.getState().selectedIsland.selectedIsland;

    if (!isFarmTutorialCompleted && scheme.id === 2) {
      // console.log(room?.status)
      // console.log('we are here stage', farmTutorialSave)
      if (room?.status === RoomStatus.repairing) {
        // console.log('we are here 1')
        return room.status;
      }
      if (room?.status === RoomStatus.builded) {
        // console.log('we are here 2')
        return room.status;
      }

      if (farmTutorialSave?.stage === TutorialFarmStage.repair) {
        // console.log('we are here 3')
        return RoomStatus.repair;
      }

      if (farmTutorialSave?.stage === TutorialFarmStage.startRepair) {
        // console.log('we are here 4')
        return RoomStatus.building;
      }

      if(!farmTutorialSave?.dialogueId)
      {
        // console.log('we are here 5')
        return RoomStatus.inactive;
      }

      if (farmTutorialSave?.stage !== TutorialFarmStage.building && farmTutorialSave?.dialogueId! <= 2 ) {
        // console.log('we are here 6')
        return RoomStatus.inactive;
      }
      // console.log('we are here 7')
      return room?.status ? room.status : RoomStatus.battle;
    }

    if (currentIsland?.buildings.length) {

      const lastRoomId =
        currentIsland?.buildings[currentIsland.buildings.length - 1].id;

      const lastRoomStatus =
        currentIsland?.buildings[currentIsland.buildings.length - 1].status;

      if (
        lastRoomId + 1 === scheme.id &&
        lastRoomStatus !== RoomStatus.battle && lastRoomStatus !== RoomStatus.farming && lastRoomStatus !== RoomStatus.builded
      ) {
        return RoomStatus.battle;
      } else {
        return room?.status ? room.status : RoomStatus.inactive;
      }
    } else {
      return index === 1 ? RoomStatus.battle : RoomStatus.inactive;
    }
  }, [index, room?.status, scheme.id, farmTutorialSave?.stage]);

  const onClickZoom = useCallback(() => {
    dispatch(
      setSelectedRoom({
        id: index,
        buildingId: room?.buildingId,
        lvl: room?.lvl,
        type: 1
      })
    );
  }, [dispatch, index, room?.buildingId, room?.lvl]);

  const isClaimAvailable = useCallback(() => {
    if (!buildingLvlConfig || !room) return;

    if (room.status === RoomStatus.building) {
      setClaim({ isClaim: false, isLimit: false, value: 0, percentage: 0 });
      return;
    }

    if (
      room &&
      buildingLvlConfig &&
      buildingLvlConfig.gatherDelayMs &&
      buildingLvlConfig.resourceAmount &&
      buildingLvlConfig.minTimeMs !== undefined &&
      buildingLvlConfig.maxTimeMs !== undefined
    ) {
      const timeDifference = Date.now() - new Date(room.statusUpdateDate).getTime();

      // Перевіряємо, чи пройшов мінімальний час для клейму
      if (timeDifference < buildingLvlConfig.minTimeMs) {
        setClaim({ isClaim: false, isLimit: false, value: 0, percentage: 0 });
        return;
      }

      // Розраховуємо максимальну кількість ресурсів, яку можна зібрати
      const maxGatheredValue =
        (buildingLvlConfig.maxTimeMs / buildingLvlConfig.gatherDelayMs) *
        buildingLvlConfig.resourceAmount;

      // Розраховуємо фактичну зібрану кількість ресурсів
      const gatheredValue = Math.min(
        (timeDifference / buildingLvlConfig.gatherDelayMs) *
          buildingLvlConfig.resourceAmount,
        maxGatheredValue
      );

      // Розраховуємо відсоток зібраних ресурсів відносно максимуму
      const percentage = Math.min(
        (gatheredValue / maxGatheredValue) * 100,
        100
      );

      setClaim({
        isClaim: gatheredValue > 0,
        isLimit: gatheredValue >= maxGatheredValue,
        value: gatheredValue,
        percentage,
      });
    } else {
      setClaim({ isClaim: false, isLimit: false, value: 0, percentage: 0 });
    }
  }, [room, buildingLvlConfig]);

  const onClickClaim = useCallback(async () => {

    if (room?.status === RoomStatus.building) {
      return;
    }

    if (building && building.resourceType != null) {
      const resource = resources.find((v) => v.resourceType === building.resourceType);
      if (resource) {
        await claimResourse({
          clientId: userId,
          buildingId: room!.id,
          islandId: selectedIsland!.id,
          resource: building.resourceType
        })

        // dispatch(
        //   setResource({
        //     resource: building.resourceType,
        //     newValue: resource.value + Claim.value,
        //   })
        // );
        // dispatch(
        //   claimIslandRoom({ islandId: selectedIsland!.id, roomId: room!.id })
        // );

        setClaim({ isClaim: false, isLimit: false, value: 0, percentage: 0 });
      }
    }
  }, [dispatch, building, resources, Claim.value, selectedIsland, room]);

  const onClickBattle = useCallback(() => {
    // const result = window.confirm("Battle victory?");
    // if (result) {
    // dispatch(
    //   addIslandRoom({
    //     islandId: selectedIsland?.id!,
    //     roomId: index,
    //     status: scheme.buildingId ? RoomStatus.repair : RoomStatus.empty,
    //     buildingId: scheme.buildingId,
    //   })
    // );
    // if (
    //   index ===
    //   islandsConfigMock.find((island) => island.id === selectedIsland?.id)!
    //     .scheme.length
    // ) {
    //   dispatch(addFarmIsland({}));
    // }

      const getDungeonSaveOrStartDungeon = async () => {
        //@ts-ignore
        const progress = await getDungeonProgressByDungeonId({clientId: userId, buildingId: building?.id, heroId: heroId});

        if (progress?.stages?.length) {
          // console.log('PROGRESS!!!!', progress);
          // setVisibleItems(progress.stages);
          // setLastStageId(progress.stages[progress.stages.length - 1].cardId);
          // setCurrentIndex(progress.stages[progress.stages.length - 1].cardId - 1);
          // setNextIndex(progress.stages[progress.stages.length - 1].cardId + 1);
          // setCurrentHp(progress.currentHp);
          // setCurrentMana(progress.currentMana);
          // setGoldAmount(progress.gold);
          if(progress.currentDungeonId && building?.id) {
            updateBattleSave({save: {gold: progress.gold, currentHp: progress.currentHp, currentMana: progress.currentMana, stages: progress.stages, dungeonId: progress.currentDungeonId, buildingId: building?.id}, clientId: userId})
            navigateTo("/dungeon");
          };
        }
      }
      // @ts-ignore
      getDungeonSaveOrStartDungeon({clientId: userId, dungeonId: props?.dungeon?.dungeonId});
    // updateBattleSave({
    //   save: {
    //     gold: 10,
    //     currentHp: 20,
    //     currentMana: 2,
    //     stages: [],
    //     dungeonId: 1,
    //   },
    //   clientId: userId,
    // });
    // navigateTo("/dungeon");
    // if (result) {
    //   dispatch(
    //     addIslandRoom({
    //       islandId: selectedIsland?.id!,
    //       roomId: index,
    //       status: scheme.buildingId ? RoomStatus.repair : RoomStatus.empty,
    //       buildingId: scheme.buildingId,
    //     })
    //   );
    //   if (
    //     index ===
    //     islandsConfigMock.find((island) => island.id === selectedIsland?.id)!
    //       .scheme.length
    //   ) {
    //     dispatch(addFarmIsland({}));
    //   }
    // }
   setTimeout(() => {
    setStartSelectHero(false);
    setIsDungeonStart(false);
  }, 500)
  }, [dispatch, index, scheme.buildingId, selectedIsland, building?.id]);


  const getDungeonSave = async () => {
    // console.log("building", building)
    // console.log("building?.dungeonId", building?.dungeonId);

    try {
        //@ts-ignore
      const progress = await getDungeonProgressByDungeonId({clientId: userId, buildingId: building?.id, heroId: heroId});
      console.log("getDungeonProgressByDungeonId 2")
      console.log("buildingId: building?.id" ,building?.id)
      if (progress) {
        setCurrentDungeonId(progress.currentDungeonId)
        // console.log("PROGRESS!!!!", progress);
        const maxStageId = Math.max(...progress.stages.map(stage => stage.stageId));

        // Знаходимо об'єкт з цим stageId
        const maxStage = progress.stages.find(stage => stage.stageId === maxStageId);
        // console.log("maxStage", maxStage)
        // Перевіряємо, чи id цього об'єкта більше за 3
        return maxStage ? maxStage.stageId > 3 : false;
      }
      return false;
    } catch (error) {
      console.error("Error fetching dungeon progress:", error);
      return false;
    }
  };

  const getDungeonSaveResult = async () => {
    // console.log("here");
    const result = await getDungeonSave();
    // console.log("result", result);
    setIsDungeonStart(result);
    return result;
  };
  const onClickBuild = useCallback(() => {
    if (selectedRoom.id === -1 || selectedRoom.id !== room?.id) {
      dispatch(setSelectedRoom({ id: index, buildingId: room?.buildingId }));
    } else {
      dispatch(setSelectedRoom({ id: -1 }));
    }
  }, [dispatch, index, room?.buildingId, selectedRoom.id]);

  const dialogueId: number = farmTutorialSave?.dialogueId ?? 1;

  const onClickRepair = useCallback(async () => {


    // dispatch(
    //   repairIslandRoom({ islandId: selectedIsland?.id!, roomId: index })
    // );

    if (building) {


      const data = await upgradeBuilding({
        islandId: selectedIsland?.id!,
        buildingId: index,
        clientId: userId,
      });

      if(!isFarmTutorialCompleted && farmTutorialSave?.stage && farmTutorialSave?.stage < TutorialFarmStage.startRepair){
        dispatch(
          saveFarmTutorialProgress({
            clientId: userId,
            save: {
              dialogueId: dialogueId + 2,
              stage: TutorialFarmStage.startRepair,
            },
          })
        );
      }


      // console.log("data update", data)

      // const isFarming = !!building?.lvlInfo[0].gatherDelayMs;


      // const handleRepairCompletion = async () => {
      //   setTriggerEndBuild(true);

      //   await new Promise((resolve) => setTimeout(resolve, 1000));
      //   setTriggerEndBuild(false);


      // if (!isFarmTutorialCompleted) {
      //     dispatch(
      //       setFarmSave({
      //         dialogueId: dialogueId + 1,
      //         stage: TutorialFarmStage.finishRepair,
      //       })
      //     );
      // }

      // await finishBuilding({
      //   clientId: userId,
      //   buildingId: room!.id,
      //   islandId: selectedIsland?.id!,
      //   isFarming
      // })
      // };

      // const startTimeRepairing = Date.parse(new Date().toUTCString()) +
      // new Date(data.statusStartDate).getTime() + 1000;

      // const repairTimer = calculateTimer(
      //   startTimeRepairing,
      //   handleRepairCompletion
      // );

      // setTimer(repairTimer);

    }
  }, [dispatch, index, building, selectedIsland?.id]);




  const onClickOpenSpeedUpMenu = () => {
    console.log("romm", room)
      if (selectedRoom.id === -1 || selectedRoom.id !== room?.id) {
        setOpenSpeed(true)
        dispatch(
          setSelectedRoom({
            id: index,
            buildingId: room?.buildingId,
            lvl: room?.lvl,
            type: 1,
            statusUpdateDate: room?.statusUpdateDate
          })
        );
      }
  }

  const onClick = useCallback(async () => {
    switch (isBattle()) {
      case RoomStatus.battle:

        dispatch(setSelectedRoom({ id: index }));
        const dungeonStarted = await getDungeonSaveResult();

        if (dungeonStarted) {
          return null;
        }

        if(building?.id === 2 || building?.id === 3) {
          return onClickBattle()
        }
        return setStartSelectHero(true);
      case RoomStatus.empty:
        return onClickBuild();
      case RoomStatus.farming:
        // console.log('building', building);
        // console.log("Claim.isClaim", Claim.isClaim)
        return Claim.isClaim ? onClickClaim() : onClickZoom();
      case RoomStatus.builded:
        // console.log('building', building);
        return onClickZoom();
      case RoomStatus.building:
        console.log('buildTime', buildTime)
       return buildTime > 0 && !isConfirmationRequired ? onClickOpenSpeedUpMenu() :  null
      case RoomStatus.inactive:
        return;
      case RoomStatus.repair:
        return onClickRepair();
      default:
        return;
    }
  }, [
    isBattle,
    onClickBuild,
    onClickClaim,
    onClickRepair,
    onClickZoom,
    onClickOpenSpeedUpMenu,
    Claim.isClaim,
  ]);

  const boosts = useSelector((state: RootState) => state.inventory.boosts);


  const [openSpeed, setOpenSpeed] = useSessionStorage<any>("openSpeed", false);



  useEffect(() => {
    getTimer();
  }, []);




  const heroesListRef = useRef<HTMLDivElement>(null);
  const [heroesListScroll, setHeroesListScroll] = useState(false);
  const [selectedHeroUid, setSelectedHeroUid] = useState<string | null>(null);

  useEffect(() => {
    const checkHorizontalScroll = () => {
      const container = heroesListRef.current;
      if (container) {
        const hasScroll = container.scrollWidth > container.clientWidth;
        setHeroesListScroll(hasScroll);
      }
    };

    checkHorizontalScroll();
    window.addEventListener('resize', checkHorizontalScroll);

    return () => {
      window.removeEventListener('resize', checkHorizontalScroll);
    };
  }, []);

  return {
    isDungeonStart,
    getDungeonSave,
    startSelectHero,
    onClickBattle,
    setStartSelectHero,
    isConfirmationRequired,
    confirmBuildingCompletion,
    setOpenSpeed,
    openSpeed,
    boosts,
    triggerShowLevelUp,
    triggerEndBuild,
    onClick,
    building,
    Claim,
    timer,
    isBattle,
    roomDisplay,
    buildTime,
    heroesListRef,
    heroesListScroll,
    selectedHeroUid,
    setSelectedHeroUid
  };
}
