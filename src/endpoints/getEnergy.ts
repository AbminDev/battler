import { generateRequestId } from "../utils/generateRequestId";
import { sendRequestAndGetResponse } from "../Websocket/websocketInit";
import { RequestWebsocket } from "../interfaces/wsInterfaces";
import { useDispatch } from "react-redux";

export const getEnergy = async (): Promise<any> => {
  const dispatch = useDispatch();
  const request: RequestWebsocket = {
    agent: "user",
    lang: "en",
    method: "energy_getEnergy",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      //deviceId: clientId
    },
    params: {},
  };
  try {
    const result = await sendRequestAndGetResponse(request);
    if (result?.value) {
      console.log("SUCCESSFULLY GET Energy");
      dispatch(result.value.energy);
      return result.value.energy;
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message;
  }
};
