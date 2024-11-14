import { useSelector } from "react-redux";
import { RootState, store } from "../../../app/store";
import { RoomTypes } from "../../../enums/roomType";
import { BuildingConfig, FarmRoom, Island } from "../../../interfaces/farm";
import { farmRoomMock } from "../../../mock/buildings";



export const defineAvailableBuildings = (
  type: RoomTypes,
  buildingConfigs: BuildingConfig[],
  islands: Island[]
): BuildingConfig[] => {
  // Filter buildings that have a maxCount defined
  const buildingsWithMaxCount = buildingConfigs.filter((v) => v.maxCount);

  // All buildings on Farm
  const currentBuildings: FarmRoom[] = islands
    .map((island) => island.buildings.filter((v) => v.buildingId))
    .flat();

  // Buildings that have reached their maxCount
  const unavailableBuildings = buildingsWithMaxCount.filter((buildingInfoFromConfig) => {
    const currentCount = currentBuildings.filter(
      (v) => v.buildingId === buildingInfoFromConfig.id
    ).length;

    return currentCount >= (buildingInfoFromConfig.maxCount ?? 0);
  });

  // Buildings that are possible to build in the selected room
  const possibleBuildings = buildingConfigs.filter((v) => {
    const isAvailable = !unavailableBuildings.includes(v);
    const isInPossibleSpots = !v.possibleSpots || v.possibleSpots.includes(type);
    return isAvailable && isInPossibleSpots;
  });

  return possibleBuildings;
};
