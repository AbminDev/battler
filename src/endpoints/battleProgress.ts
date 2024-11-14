import {BattleInit, BattleSaves} from "./mock";
import {RequestWebsocket} from "../interfaces/wsInterfaces";
import {generateRequestId} from "../utils/generateRequestId";
import {sendRequestAndGetResponse} from "../Websocket/websocketInit";
import {TutorialSave} from "../interfaces/tutorial";

// export interface GetTutorialProgressResponse {
//   save: string;
// }

export const getBattleProgress = async (params: {
  clientId: string,
}): Promise<BattleSaves> => {
  const request: RequestWebsocket = {
    agent: 'battler-tg-user-progress',
    lang: 'en',
    method: 'userProgressEndpoints_getUserBattleProgress',
    id: generateRequestId(),
    auth: {
      type: 'mobileApp',
      deviceId: params.clientId
    },
    params,
  };
  try {
    const result = await sendRequestAndGetResponse(request);
    if (result?.value?.save) {
      return JSON.parse(result?.value?.save) as BattleSaves;
    }
    return {
      stage: '',
    } as unknown as BattleSaves;

  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as BattleSaves;
  }
};

export const updateBattleProgress = async (params: {
  clientId: string,
  save: string,
}): Promise<void> => {
  const request: RequestWebsocket = {
    agent: 'battler-tg-user-progress',
    lang: 'en',
    method: 'userProgressEndpoints_saveBattleProgress',
    id: generateRequestId(),
    auth: {
      type: 'mobileApp',
      deviceId: params.clientId
    },
    params,
  };
  try {
    const result = await sendRequestAndGetResponse(request);
    return result?.value;

  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as void;
  }
};
