import { RequestWebsocket } from "../interfaces/wsInterfaces";
import { generateRequestId } from "../utils/generateRequestId";
import { sendRequestAndGetResponse } from "../Websocket/websocketInit";



export const claimReferralTask = async (params: {
    clientId: string;
    referralTaskId: number;
    isPremium: boolean
  }): Promise<any> => {
    const request: RequestWebsocket = {
      agent: 'battler-tg-user',
      lang: 'en',
      method: 'user_claimReferralTask',
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
      return (e as Error).message as unknown as any;
    }
  };

export const claimRevShare = async (params: {
    clientId: string
  }): Promise<any> => {
    const request: RequestWebsocket = {
      agent: 'battler-tg-farm',
      lang: 'en',
      method: 'farm_claimAllSum',
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
      return (e as Error).message as unknown as any;
    }
  };

  export const getRewardsToClaim = async (params: {
    clientId: string
  }): Promise<any> => {
    const request: RequestWebsocket = {
      agent: 'battler-tg-user',
      lang: 'en',
      method: 'user_getRewardsToClaim',
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
      return (e as Error).message as unknown as any;
    }
  };

  export const getUserReferrals = async (params: {
    clientId: string
  }): Promise<any> => {
    const request: RequestWebsocket = {
      agent: 'battler-tg-user',
      lang: 'en',
      method: 'user_getMyReferrals',
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
      return (e as Error).message as unknown as any;
    }
  };