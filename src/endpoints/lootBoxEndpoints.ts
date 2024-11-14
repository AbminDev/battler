import { LootboxId, LootBoxOpenResult } from "../interfaces/lootBotx";
import { RequestWebsocket } from "../interfaces/wsInterfaces";
import { generateRequestId } from "../utils/generateRequestId";
import { sendRequestAndGetResponse } from "../Websocket/websocketInit";

export const openLootbox = async (params: {
    clientId: string;
    lootBoxId: LootboxId
    amount : number
  }): Promise<LootBoxOpenResult[]> => {
    const request: RequestWebsocket = {
      agent: "battler-tg-lootboxes", 
      lang: "en",
      method: "lootboxesEndpoints_openLootbox",
      id: generateRequestId(),
      auth: {
        type: "mobileApp",
        deviceId: params.clientId,
      },
      params,
    };
    try {
      const result = await sendRequestAndGetResponse(request);
      if (result?.type === "Left") {
        throw new Error("openLootbox ERROR");
      }
      return result?.value as LootBoxOpenResult[];
    } catch (e) {
      console.error((e as Error).message);
      return (e as Error).message as unknown as LootBoxOpenResult[];
    }
  };

export const getMyLootboxes = async (params: {
    clientId: string;
  }): Promise<{ amount: number, lootBoxId: LootboxId }[]> => {
    const request: RequestWebsocket = {
      agent: "battler-tg-lootboxes", 
      lang: "en",
      method: "lootboxesEndpoints_getMyLootboxes",
      id: generateRequestId(),
      auth: {
        type: "mobileApp",
        deviceId: params.clientId,
      },
      params,
    };
    try {
      const result = await sendRequestAndGetResponse(request);
      if (result?.type === "Left") {
        throw new Error("openLootbox ERROR");
      }
      return result?.value as { amount: number, lootBoxId: LootboxId }[];
    } catch (e) {
      console.error((e as Error).message);
      return (e as Error).message as unknown as { amount: number, lootBoxId: LootboxId }[];
    }
  };