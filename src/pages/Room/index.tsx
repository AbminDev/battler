import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../../app/store";
import { HandleBackButton } from "../../layout/components/HeaderCave/components";
import { useTelegram } from "../../hooks/useTelegram";
import { TitleField, UpgradeWindow, UpgradeArrow } from "../../containers/Room";
import { DestroyButton } from "../../containers/Room/DestroyButton";
import { upgradeIslandRoom } from "../../app/features/islandsSlice";
import { setResource } from "../../app/features/resourcesSlice";
import { ActionButton } from "../../containers/Room/ActionButton";
import { useUtils } from "../../utils/navigateTo";
import { Resources } from "../../enums/resources";
import { setSelectedRoom } from "../../app/features/selectedRoom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { FarmRoom } from "../../interfaces/farm";

export const RoomPage = () => {
  const dispatch = useDispatch();
  const {navigateTo} = useUtils();
  const { user } = useTelegram();
  const {t} = useTranslation();
  const [isMaxLvl, setIsMaxLvl] = useState<boolean>();

  const { buildingConfigs } = useSelector((state: RootState) => state.config);

  const currentRoom = useSelector(
    (state: RootState) => state.selectedRoom
  );

  const selectedIsland = useSelector(
    (state: RootState) => state.selectedIsland.selectedIsland
  );

  const resources = useSelector(
    (state: RootState) => state.resources.resources
  );
  
  const selectedRoom = buildingConfigs!.filter(v => v.id === currentRoom?.buildingId)?.[0];

  useEffect(() => {
    defineMaxLvl();
  }, [])

  const defineMaxLvl = () => {
    setIsMaxLvl(currentRoom.lvl === selectedRoom.lvlInfo[selectedRoom.lvlInfo.length - 1].lvl
        ? true
        : false
    )
  }

  const upgradeAvailableInfo = () => {
    const conditions = selectedRoom.lvlInfo.filter(v => v.lvl === currentRoom.lvl!+1)[0].condition;
    let requiredConditions: string[] = [];

    if (!conditions) {
      return;
    }

      const islandsFromRedux = store.getState().islands;
      const allBuildings: FarmRoom[] = islandsFromRedux.islands.map(island => {
        return island.buildings.filter(v => v?.buildingId);
      }).flat(1);

      conditions.forEach(condition => {
        const allBuildingsLvlForCondition = allBuildings.filter(v => v.buildingId === condition.buildingId).map(building => {return building.lvl ? building.lvl : 0}).flat(1);
        const maxLvl = Math.max(...allBuildingsLvlForCondition);
        
        if (!maxLvl || condition.neededLvl > maxLvl) {
          requiredConditions.push("\n"+t(buildingConfigs!.filter(v => v.id === condition.buildingId)[0].title)+" "+t('farm.upgrade.requirements', {lvl: condition.neededLvl}));
        };
      });
      return requiredConditions;
  }

  const onClickUpgrade = () => {
    const upgradeCost = selectedRoom.lvlInfo.find(v => v.lvl === (currentRoom.lvl! + 1))?.createCost!;
    const currentValue = resources.find(v => v.resourceType === Resources.kitsu)!.value;
    let requiredConditions = upgradeAvailableInfo();

    if ( currentValue < upgradeCost ) {
      requiredConditions?.push("\nNot enough gold!");
    }
    
    if (!requiredConditions?.length) {
        navigateTo('/island');
        dispatch(upgradeIslandRoom({islandId: selectedIsland?.id!, roomId: currentRoom.id, lvl: currentRoom.lvl! + 1}))
        dispatch(setResource({resource: Resources.kitsu, newValue: currentValue - upgradeCost}));
        dispatch(setSelectedRoom({id: -1}));
      } else {
        window.alert(requiredConditions);
        console.log(requiredConditions);
      };
  };

  const upgradeData = () => {
    return [];
  }

  return (
    <div
      className="absolute min-h-full min-w-full flex flex-col px-4 justify-between items-start pb-4 pt-[92px] bg-center bg-cover bg-no-repeat backdrop-brightness-50"
      style={
        selectedRoom
          ? { backgroundImage: `url(${require(`../../assets/images/build${selectedRoom.id}.png`)})` }
          : { backgroundImage: require("../../assets/images/placeholder.png") }
      }
    >
      <div className="absolute z-0 bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-black via-[30%] via-black to-transparent"/>
      <div className=" flex flex-col items-center justify-center w-full">
        <div className="flex flex-row items-start w-full justify-center">
          <div className="left-5 absolute gap-2 flex flex-col">
            <HandleBackButton onClick={() => {navigateTo("/island"); dispatch(setSelectedRoom({id: -1}))}} />
            <DestroyButton onClick={() => void 0} />
          </div>
          <TitleField title={t(selectedRoom.title!)} />
        </div>
        <div className="flex flex-row items-center justify-center w-full gap-2">
          <p className="text-white text-[17px] text-stroke-small">
            Lvl. {currentRoom?.lvl}
          </p>
          <UpgradeArrow direction="right" />
          <p className="text-[#F6A000] text-[17px] text-stroke-small">
            Lvl. {currentRoom!.lvl! + 1}
          </p>
        </div>
      </div>
      <div className="w-full z-10 px-[20px] mb-20 gap-4 flex-col flex items-center">
        <UpgradeWindow data={upgradeData()} />
        <div className="flex items-center justify-center flex-col">
          <ActionButton
            onClick={onClickUpgrade}
            upgradeCost={selectedRoom?.lvlInfo.find(lvl => lvl.lvl === (currentRoom?.lvl! + 1))?.createCost}
          />
          <p className="text-[16px] text-white text-stroke-small brightness-75">{selectedRoom?.lvlInfo.find(lvl => lvl.lvl === (currentRoom?.lvl! + 1))?.buildingTimeMs! / 1000 / 3600} h</p>
        </div>
      </div>
    </div>
  );
};
