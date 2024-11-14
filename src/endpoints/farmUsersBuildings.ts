import { RequestWebsocket } from "../interfaces/wsInterfaces";
import { generateRequestId } from "../utils/generateRequestId";
import { sendRequestAndGetResponse } from "../Websocket/websocketInit";
import { RoomTypes } from "../enums/roomType";

export const getUserBuildings = async (params: {
    clientId: string,
  }): Promise<any> => {
    const request: RequestWebsocket = {
      agent: "battler-tg-farm",
      lang: "en",
      method: "farm_getBuildings",
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
        console.log("SUCCESSFULLY GET user's buildings");
        return result.value;
      }
      return result?.value;
    } catch (e) {
      console.error((e as Error).message);
      return (e as Error).message;
    }
  };

export const createUserBuilding = async (params: {
    clientId: string,
    buildingId: number,
    stage: number,
    roomType: RoomTypes,
    position: number,
  }): Promise<any> => {
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
      if (result?.value.id) {
        console.log("SUCCESSFULLY PUT user's building");
        return result.value.id;
      }
      return result?.value.id;
    } catch (e) {
      console.error((e as Error).message);
      return (e as Error).message;
    }
  };

export const removeBuilding = async (params: {
    id: number,
    clientId: string,
  }): Promise<any> => {
    const request: RequestWebsocket = {
      agent: "battler-tg-farm",
      lang: "en",
      method: "farm_removeBuilding",
      id: generateRequestId(),
      auth: {
        type: "mobileApp",
      },
      params: params,
    };
    try {
      await sendRequestAndGetResponse(request);
      console.log(`SUCCESSFULLY REMOVE user's ${params.clientId} building ${params.id}`);
    } catch (e) {
      console.error((e as Error).message);
      return (e as Error).message;
    }
  };
