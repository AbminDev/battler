import { setQuests } from "../app/features/questsSlice";
import { store } from "../app/store";
import { RequestWebsocket } from "../interfaces/wsInterfaces";
import { generateRequestId } from "../utils/generateRequestId";
import { sendRequestAndGetResponse } from "../Websocket/websocketInit";

export const getQuests = async (params: any): Promise<any[]> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-quests",
    lang: "en",
    method: "quests_getCurrentTasks",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      // deviceId: clientId // Розкоментуйте, якщо потрібно
    },
    params: {
      clientId: params.clientId,
    },
  };

  try {
    const result = await sendRequestAndGetResponse(request);
    if (result?.value) {
      // console.log(`SUCCESSFULLY getQuests for User ${params.clientId}`);

      // console.log("result?.value", result.value.quests);

      const sorted = result.value.quests?.sort((a: any, b: any) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
      });

      store.dispatch(setQuests(sorted));

      const response = result.value.quests as any[];

      return response;
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return [] as any[];
  }
};
export const claimQuestReward = async (params: any): Promise<boolean> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-quests",
    lang: "en",
    method: "quests_claimTaskReward",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      // deviceId: clientId // Розкоментуйте, якщо потрібно
    },
    params: {
      clientId:params.clientId,
      questId: params.questId,
    },
  };

  try {
    const result = await sendRequestAndGetResponse(request);
    if (result?.value) {
      // console.log(`SUCCESSFULLY getQuests for User ${params.clientId}`);

      // console.log("result?.value", result.value.quests);

      await getQuests({ clientId: params.clientId });


      return result?.value;
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return true;
  }
};
