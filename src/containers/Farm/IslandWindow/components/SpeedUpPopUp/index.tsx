import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useTelegram } from "../../../../../hooks/useTelegram";
import { useSessionStorage } from "@uidotdev/usehooks";
import { PopupWindow } from "../../../../../components/PopupWindow";
import { AppDispatch, RootState } from "../../../../../app/store";
import { PopupButton } from "../../../../../components/PopupButton";
import { useEffect, useMemo, useState } from "react";
import {
  Boost,
  fetchActiveBoosts,
  usedBoosts,
} from "../../../../../app/features/inventorySlice";
import { setSelectedRoom } from "../../../../../app/features/selectedRoom";
import React from "react";
import { useFarm } from "../../../../../pages/Farm/useFarm";
import { getIslands } from "../../../../../endpoints/farmMock";

const TimerDisplay = React.memo(({ id }: { id: number }) => {
  const [timer, setTimer] = useSessionStorage<any>(`timer-${id}`, "");

  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 top-[-2px] text-center text-white text-[17px] font-normal uppercase leading-[17px]">
      {timer}
    </div>
  );
});

const SpeedHeader = React.memo(
  ({
    currentRoom,
    progressPercentage,
  }: {
    currentRoom: any;
    progressPercentage: any;
  }) => {
    return (
      <>
        <div className="absolute top-[-15px] left-0 right-0 flex justify-self-center z-20">
          <div className="min-w-[120px] bg-[#847a70] border border-[#18191a] rounded-[2px] p-[1px] mx-auto">
            <div
              className="bg-[#351d1e] text-center text-white text-xl p-[7px] leading-none rounded-[1px] border
            border-[#18191a] shadow-inner-sm-black"
            >
              Speed up
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex w-full items-center justify-center mb-2 px-2">
            <div className="flex w-20 h-20 mt-8 z-10">
              {currentRoom && (
                <img
                  src={require(`../../../../../assets/images/buildings/build${currentRoom?.id}.png`)}
                />
              )}
            </div>
            <div className="relative w-full max-w-[218px] h-4 mt-8 -ml-1">
              <div className="w-full h-4 bg-[#312d2a] rounded-[3px] shadow-inner border border-black"></div>
              <div
                className="absolute left-0 top-[1px] h-3.5 bg-[#ff3a3a] rounded-sm inline-flex justify-center items-start px-1 py-0.5"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="w-full h-[5px] bg-[#ff3a3a] rounded-[50px] blur-[2px]"></div>
              </div>
              <TimerDisplay id={currentRoom?.id} />
            </div>
          </div>
        </div>
      </>
    );
  }
);

export const SpeedUpPopUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const [openSpeed, setOpenSpeed] = useSessionStorage<any>("openSpeed", false);

  const { userId } = useTelegram();
  const appConfig = useSelector((state: RootState) => state.appConfig.configs);
  const boosts = useSelector((state: RootState) => state.inventory.boosts);

  const [timer, setTimer] = useSessionStorage<any>("timer", "");

  const [showBoosts, setShowBoosts] = useState(false);
  const [boostsToUse, setBoostsToUse] = useState<Boost[]>([]);

  // Метод для миттєвого прискорення будівництва
  const { buildingConfigs } = useSelector((state: RootState) => state.config);

  const currentRoom = useSelector((state: RootState) => state.selectedRoom);

  const selectedIsland = useSelector(
    (state: RootState) => state.selectedIsland.selectedIsland
  );

  const selectedRoom = buildingConfigs!.filter(
    (v) => v.id === currentRoom?.buildingId
  )?.[0];

  const upgradeData = selectedRoom?.lvlInfo.find(
    (v) => v.lvl === currentRoom.lvl!
  );

  const [buildTime, setBuildTime] = useSessionStorage<number>(
    `buildTime-${selectedRoom?.id}`,
    0
  );

  useEffect(() => {
    if (appConfig && Object.keys(appConfig).length > 0) {
      dispatch(fetchActiveBoosts(userId));
    }
  }, [dispatch, appConfig]);

  const closePopup = () => {
    dispatch(setSelectedRoom({ id: -1 }));

    setOpenSpeed(false);
  };

  const instantBuild = () => {
    if (!upgradeData) return;

    const statusUpdateDateMs =
      new Date(currentRoom?.statusUpdateDate!).getTime() ?? 0;

    const remainingBuildTime =
      statusUpdateDateMs + upgradeData.buildingTimeMs - Date.now();

    const boostsToUse = determineBoosts(remainingBuildTime);

    setShowBoosts(true);
    setBoostsToUse(boostsToUse);
  };

  const confirmInstantBuild = () => {
    setShowBoosts(false);
  };

  const cancelInstantBuild = () => {
    setShowBoosts(false);
  };

  const determineBoosts = (remainingTime: number): Boost[] => {
    let boostsToUse: Boost[] = [];
    let timeToReduce = remainingTime;

    // Сортуємо бусти в порядку зменшення тривалості
    const availableBoosts = boosts
      .filter((boost) => boost.amount > 0)
      .sort((a, b) => b.duration - a.duration)
      .map((boost) => ({ ...boost })); // Копіюємо кожен об'єкт буста

    while (timeToReduce > 0) {
      let bestBoost: Boost | undefined;
      let bestTimeDifference = Infinity;

      // Знаходимо найближчу комбінацію бустів
      availableBoosts.forEach((boost) => {
        if (boost.amount > 0) {
          const timeDifference = Math.abs(timeToReduce - boost.duration);
          if (timeDifference < bestTimeDifference) {
            bestTimeDifference = timeDifference;
            bestBoost = boost;
          }
        }
      });

      if (bestBoost) {
        boostsToUse.push({ ...bestBoost, amount: 1 });
        timeToReduce -= bestBoost.duration;
        bestBoost.amount -= 1;

        if (bestBoost.amount === 0) {
          const index = availableBoosts.findIndex(
            (b) => b.duration === bestBoost!.duration
          );
          if (index !== -1) {
            availableBoosts.splice(index, 1);
          }
        }
      } else {
        break;
      }
    }

    return boostsToUse;
  };

  const usingBoosts = async (boost: Boost) => {
    if (!upgradeData) return;
    // Перевірка, чи переданий один буст або масив бустів
    if (selectedIsland?.id) {
      dispatch(
        usedBoosts({
          clientId: userId,
          buildingId: selectedRoom.id,
          bonusType: boost.bonusType,
          bonusId: boost.bonusId,
          islandId: selectedIsland?.id,
        })
      );
    }
  };

  const progressPercentage = useMemo(() => {
    if (buildTime <= 0 || !upgradeData?.buildingTimeMs) return 100;

    const initialBuildTime = upgradeData.buildingTimeMs;

    // Обчислюємо час, що минув
    const elapsedTime = initialBuildTime - buildTime;

    // Обчислюємо прогрес
    const progress = (elapsedTime / initialBuildTime) * 100;

    return Math.min(Math.max(progress, 0), 100);
  }, [buildTime, upgradeData?.buildingTimeMs, usingBoosts]);

  const SpeedIcon = ({ time }: { time?: string }) => {
    return (
      <div className="relative flex justify-center items-center rounded-full bg-[#5c5040] w-14 h-14">
        <div className="flex justify-center items-center pl-1 rounded-full bg-[#201b18] border-black w-11 h-11">
          <img
            className="w-10 h-10"
            src={require(`../../../../../assets/images/speedUp.png`)}
          />
        </div>
        {time && (
          <>
            <div
              className="absolute bottom-0 flex justify-center items-center w-full h-7"
              style={{
                zIndex: 1,
              }}
            >
              <span className="pt-2 text-xs text-white z-10">{time}</span>
            </div>
            <div
              className="absolute bottom-0 w-14 h-14 bg-[#312d26] opacity-75 rounded-full"
              style={{
                clipPath: "polygon(0% 66%, 100% 66%, 100% 100%, 0% 100%)",
                zIndex: 0,
              }}
            />
          </>
        )}
      </div>
    );
  };

  const headerElement = useMemo(
    () => (
      <SpeedHeader
        currentRoom={currentRoom}
        progressPercentage={progressPercentage}
      />
    ),
    [currentRoom, progressPercentage]
  );
  if (!openSpeed || !selectedRoom || selectedRoom.id === -1) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] w-full h-full flex justify-center items-center min-w-full max-w-full min-h-full max-h-full">
      <div
        onClick={closePopup}
        className="absolute z-40 h-full w-full bg-[rgba(0,0,0,0.5)]"
      />
      <PopupWindow onClickClose={closePopup} headerElement={headerElement}>
        <>
          {boosts.length > 0 &&
            (showBoosts ? (
              <div className="flex flex-col p-2 gap-2 w-full">
                <div className="flex flex-col justify-between bg-[#2a2827] p-3 rounded-sm shadow-inner-sm-white gap-3">
                  <div className="flex gap-3 justify-center items-center">
                    <div className="flex flex-col gap-1 items-center">
                      <div className="text-[#a49a7c] text-sm font-normal leading-[14px]">
                        Selected Boosts
                      </div>
                      <div className="flex flex-col gap-2 text-xs font-light leading-[14.40px]">
                        <span className="text-[#dfd9c4]">
                          These boosts will be used:
                        </span>
                        <div className="flex flex-wrap bg-[#201b18] p-3 rounded-sm shadow-inner-sm-white gap-3">
                          {boostsToUse.map((boost) => (
                            <div
                              key={boost.bonusId}
                              className="flex-1 flex justify-center p-3 gap-3  bg-[#2a2827] rounded-sm shadow-inner-sm-white"
                            >
                              <div className="flex flex-col gap-3 items-center">
                                {boost.bonusId === 1 && (
                                  <SpeedIcon
                                    time={`${Math.floor(
                                      (boost.duration / 1000 / 60) % 60
                                    )}m`}
                                  />
                                )}
                                {boost.bonusId === 2 && (
                                  <SpeedIcon
                                    time={`${Math.floor(
                                      (boost.duration / 1000 / 60) % 60
                                    )}m`}
                                  />
                                )}
                                {boost.bonusId === 3 && (
                                  <SpeedIcon
                                    time={`${Math.floor(
                                      boost.duration / 1000 / 60
                                    )}m`}
                                  />
                                )}
                                <div className="flex gap-1 items-start">
                                  <div className="text-[#a49a7c] text-sm font-normal leading-[14px]">
                                    {boost.bonusId === 1 &&
                                      `${Math.floor(
                                        (boost.duration / 1000 / 60) % 60
                                      )} Min Speed Up`}
                                    {boost.bonusId === 2 &&
                                      `${Math.floor(
                                        (boost.duration / 1000 / 60) % 60
                                      )} Min Quick Boost`}
                                    {boost.bonusId === 3 &&
                                      `${Math.floor(
                                        boost.duration / 1000 / 60
                                      )} Min Mega Boost`}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <PopupButton
                      type={"green"}
                      onClick={confirmInstantBuild}
                      height={"32px"}
                    >
                      <div className="flex flex-col items-center px-2 gap-1 w-full h-full">
                        <div className="flex flex-row justify-center items-center gap-[2px]">
                          <div className="flex items-center justify-center pt-1 text-center w-[66px] h-[22px] text-white text-[10px] font-normal leading-[10px]">
                            Confirm
                          </div>
                        </div>
                      </div>
                    </PopupButton>

                    <div className="ml-2">
                      <PopupButton
                        type={"red"}
                        onClick={cancelInstantBuild}
                        height={"32px"}
                      >
                        <div className="flex flex-col items-center px-2 gap-1 w-full h-full">
                          <div className="flex flex-row justify-center items-center gap-[2px]">
                            <div className="flex items-center justify-center pt-1 text-center w-[66px] h-[22px] text-white text-[10px] font-normal leading-[10px]">
                              Cancel
                            </div>
                          </div>
                        </div>
                      </PopupButton>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col p-2 gap-2 w-full">
                <div className="flex justify-between bg-[#2a2827] p-3 rounded-sm  shadow-inner-sm-white gap-3">
                  <div className="flex gap-3">
                    <SpeedIcon />
                    <div className="flex flex-col jus gap-1 items-center">
                      <div className=" text-[#a49a7c] text-sm font-normal leading-[14px]">
                        Instant Speed Up
                      </div>
                      <div className="text-xs font-light leading-[14.40px]">
                        <span className="text-[#dfd9c4]">
                          Use speed up items
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center items-center">
                    <PopupButton
                      type={"green"}
                      onClick={instantBuild}
                      height={"32px"}
                    >
                      <div className="flex flex-col items-center px-2  gap-1 w-full h-full">
                        <div className="flex flex-row justify-center items-center gap-[2px]">
                          <div className="flex items-center justify-center  text-center w-[66px] h-[22px] text-white  font-normal   leading-[14px]">
                            Instant Speed Up
                          </div>
                        </div>
                      </div>
                    </PopupButton>
                  </div>
                </div>

                {boosts.map((boost) => {
                  console.log("boost", boost);
                  return (
                    <div
                      key={boost.bonusId}
                      className="flex justify-between bg-[#2a2827] p-3 rounded-sm shadow-inner-sm-white gap-3"
                    >
                      <div className="flex gap-3">
                        {boost.bonusId === 1 && (
                          <SpeedIcon
                            time={`${Math.floor(
                              (boost.duration / 1000 / 60) % 60
                            )}m`}
                          />
                        )}
                        {boost.bonusId === 2 && (
                          <SpeedIcon
                            time={`${Math.floor(
                              (boost.duration / 1000 / 60) % 60
                            )}m`}
                          />
                        )}
                        {boost.bonusId === 3 && (
                          <SpeedIcon
                            time={`${Math.floor(boost.duration / 1000 / 60)}m`}
                          />
                        )}

                        <div className="flex flex-col gap-1 items-start">
                          <div className="text-[#a49a7c] text-sm font-normal font-['Londrina Solid'] leading-[14px]">
                            {boost.bonusId === 1 &&
                              `${Math.floor(
                                (boost.duration / 1000 / 60) % 60
                              )} Min Speed Up`}
                            {boost.bonusId === 2 &&
                              `${Math.floor(
                                (boost.duration / 1000 / 60) % 60
                              )} Min Quick Boost`}
                            {boost.bonusId === 3 &&
                              `${Math.floor(
                                boost.duration / 1000 / 60
                              )} Min Mega Boost`}
                          </div>
                          <div className="text-xs font-light font-['Londrina Solid'] leading-[14.40px]">
                            <span className="text-[#dfd9c4]">Use boost</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center items-center">
                        <PopupButton
                          type={"blue"}
                          onClick={() => usingBoosts(boost)}
                          height={"32px"}
                        >
                          <div className="flex flex-col items-center px-2 gap-1 w-full h-full">
                            <div className="flex flex-row justify-center items-center gap-[2px]">
                              <div className="flex items-center justify-center pt-1 text-center w-[66px] h-[22px] text-white  font-normal font-['Londrina Solid'] leading-[10px]">
                                Use
                              </div>
                            </div>
                          </div>
                        </PopupButton>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
        </>
      </PopupWindow>
    </div>
  );
};
