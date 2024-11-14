import { useDispatch, useSelector } from "react-redux";
import { setSelectedRoom } from "../../../../../app/features/selectedRoom";
import { PopupWindow } from "../../../../../components/PopupWindow";
import { PopupButton } from "../../../../../components/PopupButton";
import { useTranslation } from "react-i18next";
import { UpgradeArrow } from "../../../../Room";
import {
  GoldIco,
  GrayIco,
  KitsuIco,
  StoneIco,
  TimerIco,
} from "../../../../../layout/components/HeaderFarm/components/ResourceCard";
import { RootState, store } from "../../../../../app/store";
import { FarmRoom } from "../../../../../interfaces/farm";
import { upgradeIslandRoom } from "../../../../../app/features/islandsSlice";
import { setResource } from "../../../../../app/features/resourcesSlice";
import { Resources } from "../../../../../enums/resources";
import {
  PopupUpgradeTable,
  UpgradeDataRow,
} from "../../../../../components/PopupUpgradeTable";
import { useEffect, useState } from "react";

import { upgradeBuilding } from "../../../../../endpoints/farmMock";
import { useTelegram } from "../../../../../hooks/useTelegram";

export const BuildingPopup = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { buildingConfigs } = useSelector((state: RootState) => state.config);
  const { userId } = useTelegram();
  const [requiredConditions, setRequiredConditions] = useState<
    {
      condition: string;
      met: boolean;
      buildingId?: number;
      lvl?: number;
    }[]
  >([]);

  const currentRoom = useSelector((state: RootState) => state.selectedRoom);

  const selectedIsland = useSelector(
    (state: RootState) => state.selectedIsland.selectedIsland
  );

  const resources = useSelector(
    (state: RootState) => state.resources.resources
  );

  const selectedRoom = buildingConfigs!.filter(
    (v) => v.id === currentRoom?.buildingId
  )?.[0];

  let maxLvl = Math.max(
    ...(selectedRoom?.lvlInfo.map((info) => info.lvl) || [0])
  );

  if (selectedRoom?.id === 3 || selectedRoom?.id === 7) {
    maxLvl = 5;
  }

  const isMaxLevel = currentRoom.lvl === maxLvl;

  const closePopup = () => {
    dispatch(setSelectedRoom({ id: -1 }));
  };

  const upgradeAvailableInfo = () => {
    const conditions = selectedRoom?.lvlInfo.find(
      (v) => v.lvl === currentRoom.lvl!
    )?.condition;

    let requiredConditions: string[] = [];

    if (!conditions) {
      return requiredConditions;
    }

    const islandsFromRedux = store.getState().islands;
    const allBuildings: FarmRoom[] = islandsFromRedux.islands
      .map((island) => island.buildings.filter((v) => v?.buildingId))
      .flat(1);

    conditions.forEach((condition) => {
      const allBuildingsLvlForCondition = allBuildings
        .filter((v) => v.buildingId === condition.buildingId)
        .map((building) => (building.lvl ? building.lvl : 0))
        .flat(1);
      const maxLvl = Math.max(...allBuildingsLvlForCondition);

      if (!maxLvl || condition.neededLvl > maxLvl) {
        requiredConditions.push(
          "\n" +
            t(
              buildingConfigs!.find((v) => v.id === condition.buildingId)
                ?.title || "Unknown"
            ) +
            " " +
            t("farm.upgrade.requirements", { lvl: condition.neededLvl })
        );
      }
    });

    return requiredConditions;
  };

  useEffect(() => {
    const upgradeConditions = () => {
      if (!selectedRoom) {
        return [];
      }

      const levelInfo = selectedRoom.lvlInfo.find(
        (v) => v.lvl === currentRoom.lvl!
      );

      if (!levelInfo) {
        return [];
      }

      const conditions = levelInfo.condition;

      let requiredConditions: {
        condition: string;
        met: boolean;
        buildingId?: number;
        lvl?: number;
      }[] = [];

      const islandsFromRedux = store.getState().islands;
      const allBuildings: FarmRoom[] = islandsFromRedux.islands
        .map((island) => island.buildings.filter((v) => v?.buildingId))
        .flat(1);

      if (conditions) {
        conditions.forEach((condition) => {
          const allBuildingsLvlForCondition = allBuildings
            .filter((v) => v.buildingId === condition.buildingId)
            .map((building) => building.lvl || 0);

          const maxLvl = Math.max(...allBuildingsLvlForCondition);

          const buildingTitle =
            buildingConfigs!.find((v) => v.id === condition.buildingId)
              ?.title || "Unknown";

          const conditionMet = maxLvl >= condition.neededLvl;

          requiredConditions.push({
            condition: ` ${t("farm.upgrade.requirements", {
              lvl: condition.neededLvl,
            })} ${t(buildingTitle)}`,
            met: conditionMet,
            buildingId: condition.buildingId,
            lvl: maxLvl,
          });
        });
      }

      return requiredConditions;
    };

    const newConditions = upgradeConditions();

    setRequiredConditions(newConditions);
  }, [selectedRoom, currentRoom, resources, t, buildingConfigs]);

  const allConditionsMetNormal = requiredConditions.every((row) => row.met);

  const levelInfo = selectedRoom?.lvlInfo.find(
    (v) => v.lvl === currentRoom.lvl!
  );

  const createCost = levelInfo?.createCost || 0;
  const goldCost = levelInfo?.kitsune || 0;

  const currentKitsu =
    resources.find((v) => v.resourceType === Resources.kitsu)?.value || 0;

  const currentStone =
    resources.find((v) => v.resourceType === Resources.stone)?.value || 0;

  const canUpgradeGold = allConditionsMetNormal && currentKitsu >= goldCost;

  const canUpgradeNormal = allConditionsMetNormal && currentStone >= createCost;

  const upgradeNormalCondition = {
    met: canUpgradeNormal,
    currentAmount: currentStone,
    costAmount: createCost,
  };

  const onClickUpgrade = async (isGoldUpgrade = false) => {
    const levelInfo = selectedRoom?.lvlInfo.find(
      (v) => v.lvl === currentRoom.lvl!
    );

    const currentKitsu =
      resources.find((v) => v.resourceType === Resources.kitsu)?.value || 0;

    const currentStone =
      resources.find((v) => v.resourceType === Resources.stone)?.value || 0;

    let requiredConditions = upgradeAvailableInfo();

    if (requiredConditions.length > 0) {
      window.alert(requiredConditions.join(" "));

      return;
    }

    if (isGoldUpgrade) {
      await upgradeBuilding({
        islandId: selectedIsland?.id!,
        buildingId: currentRoom.id,
        clientId: userId,
        instabuild: true,
      });
    } else {
      await upgradeBuilding({
        islandId: selectedIsland?.id!,
        buildingId: currentRoom.id,
        clientId: userId,
      });
    }

    dispatch(
      setResource({
        resource: isGoldUpgrade ? Resources.kitsu : Resources.stone,
        newValue: isGoldUpgrade
          ? currentKitsu - levelInfo?.kitsune!
          : currentStone - levelInfo?.createCost!,
      })
    );

    closePopup();
  };

  const upgradeData = () => {
    if (selectedRoom) {
      let upgradeData: UpgradeDataRow[] = [];

      const currentLvl = selectedRoom.lvlInfo.find(
        (v) => v.lvl === currentRoom.lvl
      );

      const upgradedLvl = selectedRoom.lvlInfo.find(
        (v) => v.lvl === currentRoom.lvl! + 1
      )?.upgradeData!;

      currentLvl?.upgradeData?.forEach((v, i) => {
        const row = {
          title: v.title,
          nowValue: v.value,
          newValue: upgradedLvl[i].value,
        };
        upgradeData.push(row);
      });

      return upgradeData;
    } else {
      return [];
    }
  };

  const WindowHeader = () => {
    return (
      <div className="flex  w-full items-center justify-start gap-4 mb-2">
        <div className="flex w-[140px] h-[140px] -mt-10">
          {selectedRoom && (
            <img
              src={require(`../../../../../assets/images/buildings/build${selectedRoom?.id}.png`)}
              alt="Building"
            />
          )}
        </div>
        <div className="flex flex-col">
          <p className="text-white text-[20px] text-stroke-small">
            {t(selectedRoom?.title).toUpperCase()}
          </p>
          <div className="flex flex-row items-center justify-center gap-1">
            <p className="text-white text-[17px] text-stroke-small">
              Lvl. {currentRoom?.lvl}
            </p>
            {!isMaxLevel && <UpgradeArrow direction="right" />}
            <p className="text-[#f6a000] text-base font-black leading-none">
              {isMaxLevel ? `MAX` : ` Lvl. ${currentRoom!.lvl! + 1}`}
            </p>
          </div>
        </div>
      </div>
    );
  };

  function msToTime(duration: any) {
    if (!duration) {
      return;
    }
    const milliseconds = Math.floor((duration % 1000) / 100);
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    const hoursStr = hours < 10 ? "0" + hours : hours;
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    const secondsStr = seconds < 10 ? "0" + seconds : seconds;

    return hoursStr + ":" + minutesStr + ":" + secondsStr;
  }
  const preventTimeBug = 15000;

  return (
    <div className="absolute w-full h-full flex justify-center items-center min-w-full max-w-full min-h-full max-h-full z-[9999]">
      <div
        onClick={closePopup}
        className="absolute z-40 h-full w-full bg-[rgba(0,0,0,0.5)]"
      />
      <PopupWindow onClickClose={closePopup} headerElement={<WindowHeader />}>
        {isMaxLevel ? (
          <div className="w-full p-10 text-center text-[#f6a000] text-[28px] font-normal leading-7">
            You have reached the
            <br />
            highest level
          </div>
        ) : (
          <div className="w-full">
            <PopupUpgradeTable
              upgradeData={upgradeData()}
              requiredConditions={requiredConditions}
              upgradeNormalCondition={upgradeNormalCondition}
            />
          </div>
        )}

        {isMaxLevel ? (
          <div></div>
        ) : (
          <div className="flex gap-4 p-8">
            {/* Золота Кнопка Оновлення */}
            <PopupButton
              type={canUpgradeGold ? "gold" : "gray"}
              disabled={!canUpgradeGold}
              onClick={canUpgradeGold ? () => onClickUpgrade(true) : undefined}
              width="140px"
            >
              <div className="flex flex-col w-full items-center p-1 h-full gap-1">
                <div className="flex flex-row justify-center items-center gap-[2px]">
                  <p className="text-center text-white text-sm font-normal leading-[14px]">
                    {t("farm.upgrade.title")}
                  </p>
                </div>
                <div className="flex flex-row justify-center items-center gap-[2px]">
                  <div className="w-5 h-5 flex justify-center items-center">
                    <KitsuIco />
                  </div>

                  <p className="text-white text-sm font-normal leading-[14px]">
                    {goldCost}
                  </p>
                </div>
              </div>
            </PopupButton>
            {/* Повідомлення про недостатній баланс для Золотої Кнопки */}

            {/* Звичайна Кнопка Оновлення */}
            <PopupButton
              type={canUpgradeNormal ? "green" : "gray"}
              disabled={!canUpgradeNormal}
              onClick={
                canUpgradeNormal ? () => onClickUpgrade(false) : undefined
              }
              width="140px"
            >
              <div className="flex flex-col w-full items-center p-1 h-full gap-1">
                <div className="flex flex-row justify-center items-center gap-[2px]">
                  <p className="text-center text-white text-sm font-normal leading-[14px]">
                    {t("farm.upgrade.title")}
                  </p>
                </div>
                <div className="flex flex-row justify-center items-center gap-[2px]">
                  <div className="w-5 h-5 flex justify-center items-center">
                    <TimerIco />
                  </div>

                  <p className="text-white text-sm font-normal leading-[14px]">
                    {msToTime(
                      selectedRoom?.lvlInfo.find(
                        (lvl) => lvl.lvl === currentRoom?.lvl! + 1
                      )?.buildingTimeMs! + preventTimeBug
                    )}
                  </p>
                </div>
              </div>
            </PopupButton>
          </div>
        )}
      </PopupWindow>
    </div>
  );
};
