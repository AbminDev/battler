export interface RequestWebsocket {
  agent: string;
  auth: {
    type: string;
    deviceId?: string;
    token?: string;
    appId?: number;
  };
  lang: string;
  method: string;
  params: any;
  id: string;
}
export interface ResponseWebsocket {
  result: {
    request: RequestWebsocket;
    response: {
      type: 'Right' | 'Left';
      value: any;
    };
  };
}

// export type TSessionInfo = {
//   userId?: string;
//   providerId?: string;
//   username?: string;
//   isNeed2fa?: boolean;
//   isNeedCode?: boolean;
//   /** milliseconds */
//   sessionTime?: number;
//   accessToken?: string;
//   /** == Date.now() */
//   sessionStart?: number;
//   /** == Date.now() */
//   sessionEnd?: number;
// };
