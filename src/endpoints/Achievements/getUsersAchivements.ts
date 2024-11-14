import { generateRequestId } from "../../utils/generateRequestId";
import { sendRequestAndGetResponse } from "../../Websocket/websocketInit";
import { RequestWebsocket } from "../../interfaces/wsInterfaces";
import { useDispatch } from "react-redux";

export const getUsersAchivements = async (params: {
    userId: string;
    }): Promise<any> => {
  const dispatch = useDispatch();
  const request: RequestWebsocket = {
    agent: "achievements",
    lang: "en",
    method: "achievement_getUsersAchievements",
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
      console.log("SUCCESSFULLY GET USER'S", params.userId, "ACHIEVEMENTS");
      // status: int; Achievements: Array<string>;
      dispatch(result.value.Achievements);
      return result.value.Achievements;
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message;
  }
};
