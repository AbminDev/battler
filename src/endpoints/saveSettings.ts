import {generateRequestId} from "../utils/generateRequestId";
import {sendRequestAndGetResponse} from "../Websocket/websocketInit";
import {RequestWebsocket} from "../interfaces/wsInterfaces";

export const getUserSettings = async (params: {
  clientId: string,
}): Promise<any> => {
  const request: RequestWebsocket = {
    agent: 'battler-tg-user',
    lang: 'en',
    method: 'userSettings_getSettings',
    id: generateRequestId(),
    auth: {
      type: 'mobileApp',
      //deviceId: params.clientId
    },
    params: {
      clientId: params.clientId
    },
  };
  try {
    const result = await sendRequestAndGetResponse(request);
    return result?.value;

  } catch (e) {
    console.error((e as Error).message);
    //return (e as Error).message;
  }
};

export const saveUserSettings = async (params: {
  clientId: string,
  settings: any
}): Promise<any> => {
  const request: RequestWebsocket = {
    agent: 'battler-tg-user',
    lang: 'en',
    method: 'userSettings_setSettings',
    id: generateRequestId(),
    auth: {
      type: 'mobileApp',
      //deviceId: params.clientId
    },
    params: {
      clientId: params.clientId,
      settings: params.settings
    },
  };
  try {
    const result = await sendRequestAndGetResponse(request);
    return !!result?.value;

  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message;
  }
};
