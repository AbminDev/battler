import { RoomStatus } from "../enums/buildingStatus";
import { Resources } from "../enums/resources";
import { RoomTypes } from "../enums/roomType";

export interface BuildingConfig {
  id: number;
  title: string;
  description: string;
  maxCount?: number;
  possibleSpots?: RoomTypes[];
  resourceType?: Resources;
  dungeonIds?: {
    dungeonId: number;
  }[];
  lvlInfo: {
    lvl: number;
    kitsune: number;
    createCost: number;
    buildingTimeMs: number;
    resourceAmount?: number;
    gatherDelayMs?: number;
    minTimeMs: number; // Додаємо
    maxTimeMs: number; // Додаємо
    condition?: {
      buildingId: number;
      neededLvl: number;
    }[];
    upgradeData?:
      | {
          title: string;
          value: number;
        }[]
      | null;
  }[];
}

export interface IslandConfig {
  id: number;
  title: string;
  description?: string;
  scheme: IslandSchemeI[];
}

export interface IslandSchemeI {
  id: number;
  left: number;
  top: number;
  buildingId?: number;
  width: number;
  height: number;
  zIndex: number;
}

export interface FarmRoom {
  id: number;
  status: RoomStatus;
  statusUpdateDate: Date;
  buildingId?: number;
  lvl?: number;
  instabuild?: boolean;
}

export interface Island {
  id: number;
  buildings: FarmRoom[];
}
