import { generateRequestId } from "../../utils/generateRequestId";
import { sendRequestAndGetResponse } from "../../Websocket/websocketInit";
import { RequestWebsocket } from "../../interfaces/wsInterfaces";
import { useDispatch } from "react-redux";

export const setCompleteAchievement = async (params:{
    achievementKey: string;
    userId: string;
    }): Promise<any> => {
  const dispatch = useDispatch();
  const request: RequestWebsocket = {
    agent: "achievements",
    lang: "en",
    method: "achievement_achievementComplete",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      //deviceId: clientId
    },
    params: params,
  };
  try {
    const result = await sendRequestAndGetResponse(request);
    if (result?.value) {
      console.log("SUCCESSFULLY SET COMPLETE ACHIEVEMENT", params.achievementKey, "TO USER", params.userId);
      // status: int; Key: string;
      dispatch(result.value.status);
      return result.value.status;
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message;
  }
};
