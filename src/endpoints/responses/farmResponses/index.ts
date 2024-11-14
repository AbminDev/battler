export interface UpgradeBuildingResponse {
    level: number;
    statusStartDate: Date;
}

export interface CreateBuildingResponse {
    startBuildingDate: Date;
}

export interface AddRoomResponse {
    roomId: number;
}

export interface ClaimBuildingResponse {
    lastGatheredDate: Date;
}

export interface AddIslandResponse {
    islandId: number;
}