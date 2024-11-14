import { generateRequestId } from "../utils/generateRequestId";
import { sendRequestAndGetResponse } from "../Websocket/websocketInit";
import { RequestWebsocket } from "../interfaces/wsInterfaces";
import { parseConfig } from "../utils/farmConfigParser";

export const getAppConfig = async (): Promise<any> => {
  const request: RequestWebsocket = {
    agent: "admin",
    lang: "en",
    method: "config_getConfig",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      // deviceId: clientId
    },
    params: {},
  };
  try {
    console.log('STEP 2')
    const result = await sendRequestAndGetResponse(request);

    if (result?.value) {
      console.log('RESULT', result);
      return JSON.parse(result.value.config);
    }
    console.log('NO RETURN', result);
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message;
  }
};
