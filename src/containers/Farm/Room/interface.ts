import { RoomTypes } from "../../../enums/roomType";
import { FarmRoom, IslandSchemeI } from "../../../interfaces/farm";

export interface RoomProps {
  index: number;
  room?: FarmRoom;
  scheme: IslandSchemeI;
}

export interface Claim {
  isClaim: boolean;
  isLimit: boolean;
  value: number;
  percentage: number;
}
