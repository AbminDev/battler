import { generateRequestId } from "../utils/generateRequestId";
import { sendRequestAndGetResponse } from "../Websocket/websocketInit";
import { RequestWebsocket } from "../interfaces/wsInterfaces";
import { useDispatch } from "react-redux";
import { Profile } from "../interfaces/profile";
import { User } from "../interfaces/user";

export const getProfile = async (): Promise<any> => {

  const request: RequestWebsocket = {
    agent: "user",
    lang: "en",
    method: "profile_getProfileInfo",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      //deviceId: clientId
    },
    params: {
      userData: {
        id: "12345678",
        username: "user12345",
        first_name: "Name",
        last_name: "Lastname",
        language_code: "uk",
        is_premium: true,
        allows_write_to_pm: true,
      },
      walletAddress: "xo332o432454345gdfgsdfg",
    },
  };
  try {
    const result = await sendRequestAndGetResponse(request);
    if (result?.value) {
      console.log("SUCCESSFULLY GET Profile");
      return result.value.profile;
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message;
  }
};

export const getProfileInfo = async (params: {
  wallet: string;
  clinetId: string;
}): Promise<any> => {
  const request: RequestWebsocket = {
    agent: "user",
    lang: "en",
    method: "profile_getProfileInfo",
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
      console.log("SUCCESSFULLY GET Profile info");
      return result.value as Profile;
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message;
  }
};

export const createProfile = async (params: User): Promise<any> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-user",
    lang: "en",
    method: "user_createUser",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      deviceId: params.clientId,
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
