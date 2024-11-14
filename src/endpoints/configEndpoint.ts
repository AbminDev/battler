import { generateRequestId } from "../utils/generateRequestId";
import { sendRequestAndGetResponse } from "../Websocket/websocketInit";
import { RequestWebsocket } from "../interfaces/wsInterfaces";
import { useDispatch } from "react-redux";
import { parseConfig } from "../utils/farmConfigParser";
import { BuildingConfig, Island } from "../interfaces/farm";

// export const getConfig = async (): Promise<any> => {

//   const request: RequestWebsocket = {
//     agent: "config",
//     lang: "en",
//     method: "config_getConfig",
//     id: generateRequestId(),
//     auth: {
//       type: "mobileApp",
//       //deviceId: clientId
//     },
//     params: {},
//   };
//   try {
//     const result = await sendRequestAndGetResponse(request);
//     if (result?.value) {
//       console.log("SUCCESSFULLY GET Config");
//       return result.value.config;
//     }
//     return result?.value;
//   } catch (e) {
//     console.error((e as Error).message);
//     return (e as Error).message;
//   }
// };


export const getFarmConfig = async (): Promise<{ islands: Island[]; buildingConfigs: BuildingConfig[] } | string> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-farm",
    lang: "en",
    method: "farm_getConfig",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      // deviceId: clientId
    },
    params: {},
  };
  try {
    const result = await sendRequestAndGetResponse(request);
    // console.log("result getFarmConfig", result);
    
    if (result?.value) {
      //console.log("SUCCESSFULLY GET Config");
      const parsedConfig = parseConfig(result.value.config);

      // console.log("parsedConfig", parsedConfig)
      return parsedConfig;
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message;
  }
};
