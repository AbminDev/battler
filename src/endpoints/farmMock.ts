import { useDispatch } from "react-redux";
import { Island } from "../interfaces/farm";
import { RequestWebsocket } from "../interfaces/wsInterfaces";
import { generateRequestId } from "../utils/generateRequestId";
import { sendRequestAndGetResponse } from "../Websocket/websocketInit";
import {
  setIslandRoomBuilding,
  setIslands,
  upgradeIslandRoom,
  addIslandRoom,
  claimIslandRoom,
  addFarmIsland,
  setIslandRoomStatus,
} from "../app/features/islandsSlice";
import {
  AddIslandResponse,
  AddRoomResponse,
  ClaimBuildingResponse,
  CreateBuildingResponse,
  UpgradeBuildingResponse,
} from "./responses/farmResponses";
import { farmRoomMock } from "../mock/buildings";
import { store } from "../app/store";
import { RoomStatus } from "../enums/buildingStatus";
import { setResource, setResources } from "../app/features/resourcesSlice";
import { Resources } from "../enums/resources";
import { Resource } from "../mock/resources";

export const getIslands = async (params: {
  clientId: string;
}): Promise<Island[]> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-farm",
    lang: "en",
    method: "farm_getIslands",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      //deviceId: clientId
    },
    params: params,
  };
  try {
    //mock response

    const result = await sendRequestAndGetResponse(request);

    console.log("getIslands");

    let response = result?.value;

    if (!response.length) {
      response = farmRoomMock;
    }
    // const response = [
    //   {
    //     id: 1,
    //     buildings: [],
    //   },
    //   {
    //     id: 2,
    //     buildings: [],
    //   },
    //   {
    //     id: 3,
    //     buildings: [],
    //   },
    // ];
    const sortedIslands = sortIslandsAndBuildings(response);

    // console.log("response", sortedIslands);
    store.dispatch(setIslands(sortedIslands));
    return sortedIslands;

    // const result = await sendRequestAndGetResponse(request);
    // if (result?.value) {
    //   console.log(`SUCCESSFULLY GET user's ${params.clientId} islands`);
    //   const response = result.value.islands as Island[];
    //   dispatch(setIslands(response));
    //   return response;
    // }
    // return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as Island[];
  }
};

function sortIslandsAndBuildings(islands: Island[]): Island[] {
  // Копіюємо масив, щоб уникнути мутації оригінального
  return (
    [...islands]
      // Сортуємо острови за id
      .sort((a, b) => a.id - b.id)
      // Для кожного острова сортуємо його будівлі за id
      .map((island) => ({
        ...island,
        buildings: [...island.buildings].sort((a, b) => a.id - b.id),
      }))
  );
}

// startBuildingDate set to now Date
// lvl set to lvl + 1 if not max lvl
export const upgradeBuilding = async (params: {
  clientId: string;
  buildingId: number; // roomID
  islandId: number;
  instabuild?: boolean;
}): Promise<UpgradeBuildingResponse> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-farm",
    lang: "en",
    method: "farm_upgradeBuilding",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      //deviceId: clientId
    },
    params: params,
  };
  try {
    const result = await sendRequestAndGetResponse(request);
    if (result?.value) {
      // console.log(
      //   `SUCCESSFULLY UPGRADE BUILDING at ROOM ${params.buildingId} on ISLAND ${params.islandId}`
      // );
      const response = result.value as UpgradeBuildingResponse;

      // console.log("response farm_upgradeBuilding", response)
      store.dispatch(
        upgradeIslandRoom({
          islandId: params.islandId,
          roomId: params.buildingId,
          lvl: response.level,
          startBuilding: response.statusStartDate,
          instabuild: params.instabuild,
        })
      );

      return response;
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as UpgradeBuildingResponse;
  }
};

export const finishBuilding = async (params: {
  clientId: string;
  buildingId: number; // roomID
  islandId: number;
  isFarming: boolean;
}): Promise<UpgradeBuildingResponse> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-farm",
    lang: "en",
    method: "farm_finishBuilding",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      //deviceId: clientId
    },
    params: {
      clientId: params.clientId,
      buildingId: params.buildingId,
      islandId: params.islandId,
    },
  };
  try {
    const result = await sendRequestAndGetResponse(request);

    if (result?.value) {
      console.log(
        `SUCCESSFULLY BUILD BUILDING at ROOM ${params.buildingId} on ISLAND ${params.islandId}`
      );

      const response = result.value as UpgradeBuildingResponse;

      store.dispatch(
        setIslandRoomStatus({
          islandId: params.islandId,
          roomId: params.buildingId,
          status: params.isFarming ? RoomStatus.farming : RoomStatus.builded,
        })
      );

      store.dispatch(
        claimIslandRoom({
          islandId: params.islandId,
          roomId: params.buildingId,
        })
      );

      return response;
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as UpgradeBuildingResponse;
  }
};

export const claimResourse = async (params: {
  clientId: string;
  buildingId: number; // roomID
  islandId: number;
  resource: Resources;
}): Promise<UpgradeBuildingResponse> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-farm",
    lang: "en",
    method: "farm_claim",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      //deviceId: clientId
    },
    params: {
      clientId: params.clientId,
      buildingId: params.buildingId,
      islandId: params.islandId,
    },
  };
  try {
    const result = await sendRequestAndGetResponse(request);
    if (result?.value) {
      console.log(
        `SUCCESSFULLY BUILD BUILDING at ROOM ${params.buildingId} on ISLAND ${params.islandId}`
      );
      store.dispatch(
        setResource({
          resource: params.resource,
          newValue: result.value.newValue,
        })
      );
      store.dispatch(
        claimIslandRoom({
          islandId: params.islandId,
          roomId: params.buildingId,
        })
      );

      const response = result.value as UpgradeBuildingResponse;

      return response;
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as UpgradeBuildingResponse;
  }
};

export const getBalance = async (params: {
  clientId: string;
}): Promise<Resource[]> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-farm",
    lang: "en",
    method: "resource_getBalance",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      //deviceId: clientId
    },
    params: {
      clientId: params.clientId,
    },
  };
  try {
    const result = await sendRequestAndGetResponse(request);
    console.log("getBalance farmMOck")
    if (result?.value) {
      // console.log(`SUCCESSFULLY getBalance for User ${params.clientId}`);

      // console.log("result?.value", result?.value.resources);

      const sorted = result?.value.resources?.sort((a: { resourceType: number; }, b: { resourceType: number; }) => {
        if (a.resourceType < b.resourceType) return -1;
        if (a.resourceType > b.resourceType) return 1;
        return 0;
      });

      store.dispatch(setResources(sorted));

      const response = result.value as Resource[];

      return response;
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as Resource[];
  }
};
// startBuildingDate set to now Date
// lvl set to 1
// endTimer => lastGathered = new Date(Date.now()), startBuildingDate = undefined;
export const createBuilding = async (params: {
  clientId: string;
  roomId: number;
  islandId: number;
  buildingId: number;
}): Promise<CreateBuildingResponse> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-farm",
    lang: "en",
    method: "farm_createBuilding",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      //deviceId: clientId
    },
    params: params,
  };
  try {
    const result = await sendRequestAndGetResponse(request);
    if (result?.value) {
      console.log(
        `SUCCESSFULLY CREATE BUILDING ${params.buildingId} at ROOM ${params.roomId} on ISLAND ${params.islandId}`
      );
      const response = result.value as CreateBuildingResponse;
      store.dispatch(
        setIslandRoomBuilding({
          islandId: params.islandId,
          roomId: params.roomId,
          buildingId: params.buildingId,
          startBuilding: response.startBuildingDate,
        })
      );
      return response;
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as CreateBuildingResponse;
  }
};

// roomId set to id+1 (autoIncrement);
export const addRoom = async (params: {
  clientId: string;
  islandId: number;
}): Promise<AddRoomResponse> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-farm",
    lang: "en",
    method: "farm_addRoom",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      //deviceId: clientId
    },
    params: params,
  };
  try {
    const result = await sendRequestAndGetResponse(request);
    if (result?.value) {
      const response = result.value as AddRoomResponse;
      console.log(
        `SUCCESSFULLY ADD ROOM at ISLAND ${params.islandId} with ID ${response.roomId}`
      );
      store.dispatch(
        addIslandRoom({
          islandId: params.islandId,
          roomId: response.roomId,
          status: RoomStatus.empty,
        })
      );
      return response;
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as AddRoomResponse;
  }
};

// lastGatheredDate set to now Date
// resources + with number in config
export const claimBuilding = async (params: {
  clientId: string;
  roomId: number;
  islandId: number;
}): Promise<ClaimBuildingResponse> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-farm",
    lang: "en",
    method: "farm_claimBuilding",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      //deviceId: clientId
    },
    params: params,
  };
  try {
    const result = await sendRequestAndGetResponse(request);
    if (result?.value) {
      const response = result.value as ClaimBuildingResponse;
      console.log(`SUCCESSFULLY CLAIM ROOM ${params.roomId}`);
      store.dispatch(
        claimIslandRoom({
          islandId: params.islandId,
          roomId: params.roomId,
          lastGathered: response.lastGatheredDate,
        })
      );
      return response;
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as ClaimBuildingResponse;
  }
};

// islandId set to id+1 (autoIncrement);
export const addIsland = async (params: {
  clientId: string;
}): Promise<AddIslandResponse> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-farm",
    lang: "en",
    method: "farm_addIsland",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      //deviceId: clientId
    },
    params: params,
  };
  try {
    const result = await sendRequestAndGetResponse(request);
    if (result?.value) {
      const response = result.value as AddIslandResponse;
      console.log(`SUCCESSFULLY ADD ISLAND ${response.islandId}`);
      store.dispatch(addFarmIsland({ islandId: response.islandId }));
      return response;
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as AddIslandResponse;
  }
};
