import { generateRequestId } from "../../utils/generateRequestId";
import { sendRequestAndGetResponse } from "../../Websocket/websocketInit";
import { RequestWebsocket } from "../../interfaces/wsInterfaces";
import { useDispatch } from "react-redux";
import { Hero } from "../../interfaces/hero";
import { getIslands } from "../farmMock";
import { Boost, BoostsType } from "../../app/features/inventorySlice";

export const getInventory = async (params: {
  clientId: number;
}): Promise<any> => {
  const request: RequestWebsocket = {
    agent: "inventory",
    lang: "en",
    method: "inventory_getInventoryInfo",
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
      console.log("SUCCESSFULLY GET Inventory");

      return result.value as Hero[];
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message;
  }
};

export const getActiveBoosts = async (params: {
  clientId: string;
}): Promise<any> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-bonuses",
    lang: "en",
    method: "boosts_getActiveBoosts",
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
      console.log("SUCCESSFULLY GET Inventory");
      return result.value;
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message;
  }
};

export const usingBoosts = async (params: {
  clientId: string;
  buildingId: number;
  bonusType: BoostsType;
  bonusId: number;
  islandId: number;
}): Promise<any> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-farm",
    lang: "en",
    method: "farm_useBoost",
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
      console.log("SUCCESSFULLY GET Inventory");

      await getIslands({
        clientId: params.clientId,
      });
      
      await getActiveBoosts({
        clientId: params.clientId,
      });
      
      return result?.value;
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message;
  }
};
