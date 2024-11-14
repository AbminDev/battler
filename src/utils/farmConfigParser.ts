import { Buildings } from "../enums/buildingStatus";
import { RoomTypes } from "../enums/roomType";
import i18next from "../i18n/config";
import { BuildingConfig, Island } from "../interfaces/farm";

// Assuming these enums are defined somewhere in your code
enum Resources {
  Gold = 0,
  Wood = 1,
  Stone = 2,
  Iron = 3,
}

interface LevelInfo {
  lvl: number;
  createCost: number;
  buildingTimeMs: number;
  resourceAmount?: number;
  gatherDelayMs?: number;
  condition?: Condition[];
  upgradeData?: UpgradeData[] | null;
  minTimeMs: number; // Додаємо
  maxTimeMs: number; // Додаємо
  kitsune: number;
}

interface Condition {
  buildingId: number;
  neededLvl: number;
}

interface UpgradeData {
  title: string;
  value: number;
}

function mapConditions(conditions: any[]): Condition[] {
  return conditions.map((cond) => ({
    buildingId: cond.buildingId,
    neededLvl: cond.level,
  }));
}

function mapLevelInfo(levels: any[]): LevelInfo[] {
  return levels.map((level, index) => {
    // Отримуємо наступний рівень
    const nextLevel = levels[index + 1];

    return {
      lvl: level.id,
      createCost: level.cost,
      kitsune: level.kitsune,
      buildingTimeMs: level.buildingDuration,
      resourceAmount: level.farming?.amountPerTick || 0,
      gatherDelayMs: level.farming?.tickDurationMs || 0,
      minTimeMs: level.farming?.minTimeMs || 0,
      maxTimeMs: level.farming?.maxTimeMs || 0,
      condition: level.conditions ? mapConditions(level.conditions) : undefined,
      upgradeData: nextLevel?.farming?.amountPerTick
        ? [
            {
              title: "Resource Amount",
              value: nextLevel?.farming?.amountPerTick,
            },
          ]
        : null, // Встановлюємо значення наступного рівня або null
    };
  });
}
function mapBuildings(buildings: any[]): BuildingConfig[] {
  // console.log("buildings", buildings)
  return buildings.map((building) => {

    return {
      id: building.id,
      dungeonIds: building.dungeonIds,
      title: i18next.t(`buildings.titles.${building.id}`),
      description: i18next.t(`buildings.descriptions.${building.id}`),
      maxCount: 1,
      possibleSpots: [RoomTypes.square], // Map if necessary
      resourceType: building.resourceType,
      lvlInfo: mapLevelInfo(building.levels),
    };
  });
}
function mapIslands(data: any[]): Island[] {
  return data.map((island) => ({
    id: island.id,
    buildings: island.buildings.map(
      (building: {
        id: any;
        buildingId: any;
        level: any;
        instabuild: any;
      }) => ({
        id: building.id,
        status: "Available", // Set appropriate status
        statusUpdateDate: new Date(), // Set appropriate date
        buildingId: building.buildingId,
        lvl: building.level,
        instabuild: building.instabuild,
      })
    ),
  }));
}

export function parseConfig(jsonString: string): {
  islands: Island[];
  buildingConfigs: BuildingConfig[];
} {
  //console.log("jsonString", jsonString)
  const data = JSON.parse(jsonString);

  // Map building configurations
  const buildingConfigs = mapBuildings(data[0].buildings);

  // console.log("buildingConfigs", buildingConfigs);

  // Map islands
  const islands = mapIslands(data);

  // console.log("buildingConfigs", buildingConfigs);
  // console.log("data", data);

  // console.log("islands", islands);
  return { islands, buildingConfigs };
}
