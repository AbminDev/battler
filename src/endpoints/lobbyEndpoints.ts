import { error } from "console";
import { Resources } from "../enums/resources";
import { RequestWebsocket } from "../interfaces/wsInterfaces";
import { Resource } from "../mock/resources";
import { generateRequestId } from "../utils/generateRequestId";
import { sendRequestAndGetResponse } from "../Websocket/websocketInit";
import { BattleInit, EndTurn, MakeAction } from "./mock";
import { DisplayData } from "../utils/lootBoxHandler";
import { LootBoxOpenResult } from "../interfaces/lootBotx";

export type BattleRewards = { coins: number; bossRewards: LootBoxOpenResult[] };


export const startBattle = async (params: {
  dungeonId: number;
  cardId: number;
  clientId: string;
  buildingId: number;
}): Promise<BattleInit | false> => { // Змінено тип повернення
  const request: RequestWebsocket = {
    agent: "battler-tg",
    lang: "en",
    method: "game_battleInit",
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
      return false;
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return false;
  }
};


export const makeAction = async (params: {
  clientId: string;
  cardUid: string;
}): Promise<MakeAction[]> => {
  const request: RequestWebsocket = {
    agent: "battler-tg",
    lang: "en",
    method: "game_makeAction",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      deviceId: params.clientId,
    },
    params,
  };
  try {
    const result = await sendRequestAndGetResponse(request);
    return result?.value as MakeAction[];
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as MakeAction[];
  }
};

export const endTurn = async (params: {
  clientId: string;
}): Promise<EndTurn> => {
  const request: RequestWebsocket = {
    agent: "battler-tg",
    lang: "en",
    method: "game_endTurn",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      deviceId: params.clientId,
    },
    params,
  };
  try {
    const result = await sendRequestAndGetResponse(request);
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as EndTurn;
  }
};

export const getRewardsAfterBattle = async (params: {
  clientId: string;
  dungeonId: number;
  stageId: number;
}): Promise<BattleRewards> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-lobby",
    lang: "en",
    method: "lobbyEndpoints_getRewardsAfterBattle",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      deviceId: params.clientId,
    },
    params,
  };
  try {
    const result = await sendRequestAndGetResponse(request);
    if (result?.type === "Right") {
      return result?.value;
    }
    return { coins: 2, bossRewards: [] };
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as BattleRewards;
  }
};
