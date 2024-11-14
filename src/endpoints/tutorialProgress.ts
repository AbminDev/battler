import {BattleInit} from "./mock";
import {RequestWebsocket} from "../interfaces/wsInterfaces";
import {generateRequestId} from "../utils/generateRequestId";
import {sendRequestAndGetResponse} from "../Websocket/websocketInit";
import {TutorialFarmSave, TutorialSave} from "../interfaces/tutorial";

// export interface GetTutorialProgressResponse {
//   save: string;
// }

export const getTutorialProgress = async (params: {
  clientId: string,
}): Promise<TutorialSave> => {
  const request: RequestWebsocket = {
    agent: 'battler-tg-user-progress',
    lang: 'en',
    method: 'userProgressEndpoints_getUserTutorialProgress',
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
      return JSON.parse(result?.value?.save) as TutorialSave;
    }
    return {
      stage: '',
    } as unknown as TutorialSave;

  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as TutorialSave;
  }
};

export const updateTutorialProgress = async (params: {
  clientId: string,
  save: string,
}): Promise<void> => {
  const request: RequestWebsocket = {
    agent: 'battler-tg-user-progress',
    lang: 'en',
    method: 'userProgressEndpoints_saveTutorialProgress',
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

export const getFarmTutorialProgress = async (params: {
  clientId: string,
}): Promise<TutorialFarmSave> => {
  const request: RequestWebsocket = {
    agent: 'battler-tg-user-progress',
    lang: 'en',
    method: 'farm_getTutorialProgress',
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
      return JSON.parse(result?.value?.save) as TutorialFarmSave;
    }
    return {
      stage: '',
    } as unknown as TutorialFarmSave;

  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as TutorialFarmSave;
  }
};

export const updateFarmTutorialProgress = async (params: {
  clientId: string,
  save: string,
}): Promise<void> => {
  const request: RequestWebsocket = {
    agent: 'battler-tg-user-progress',
    lang: 'en',
    method: 'farm_updateTutorialProgress',
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
