import { Hero } from "../interfaces/hero";
import { RequestWebsocket } from "../interfaces/wsInterfaces";
import { generateRequestId } from "../utils/generateRequestId";
import { sendRequestAndGetResponse } from "../Websocket/websocketInit";

export interface getHeroesResponse {
  heroes: Hero[];
}

export interface heroShardsResponse {
  heroShards: [
    {
      heroId: number;
      amount: number;
    }
  ];
  universalShards: [
    {
      shardId: number;
      amount: number;
    }
  ];
}

export const getHeroes = async (params: {
  clientId: string;
}): Promise<getHeroesResponse> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-lobby",
    lang: "en",
    method: "lobbyEndpoints_getHeroes",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      deviceId: params.clientId,
    },
    params,
  };
  try {
    const result = await sendRequestAndGetResponse(request);
    if (result?.type === "Left") {
      throw new Error("getHeroes ERROR");
    }
    return result?.value as getHeroesResponse;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as getHeroesResponse;
  }
};

export const getCurrentHero = async (params: {
  clientId: string;
}): Promise<{ heroId: number }> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-lobby",
    lang: "en",
    method: "lobbyEndpoints_getCurrentHero",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      deviceId: params.clientId,
    },
    params,
  };
  try {
    const result = await sendRequestAndGetResponse(request);
    if (result?.type === "Left") {
      throw new Error("getCurrentHero ERROR");
    }
    return result?.value as { heroId: number };
    // return {
    //   currentMana: 2,
    //   currentHp: 20,
    //   gold: 33,
    //   stages: [{cardId: 1, amount: 1, type: StageType.elixir, currentAmount: 0}, {cardId: 2, amount: 1, type: StageType.enemy, currentAmount: 0}, {cardId: 3, amount: 1, type: StageType.shop, currentAmount: 0}],
    // }
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as { heroId: number };
  }
};

export const changeHero = async (params: {
  clientId: string;
  heroId: number;
}): Promise<{ heroId: number }> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-lobby",
    lang: "en",
    method: "lobbyEndpoints_changeHero",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      deviceId: params.clientId,
    },
    params,
  };
  try {
    const result = await sendRequestAndGetResponse(request);
    if (result?.type === "Left") {
      throw new Error("getCurrentHero ERROR");
    }
    return result?.value as { heroId: number };
    // return {
    //   currentMana: 2,
    //   currentHp: 20,
    //   gold: 33,
    //   stages: [{cardId: 1, amount: 1, type: StageType.elixir, currentAmount: 0}, {cardId: 2, amount: 1, type: StageType.enemy, currentAmount: 0}, {cardId: 3, amount: 1, type: StageType.shop, currentAmount: 0}],
    // }
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as { heroId: number };
  }
};

export const updateHeroLevel = async (params: {
  clientId: string;
  heroId: number;
}): Promise<boolean> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-lobby",
    lang: "en",
    method: "lobbyEndpoints_updateHeroLevel",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      deviceId: params.clientId,
    },
    params,
  };
  try {
    const result = await sendRequestAndGetResponse(request);
    if (result?.type === "Left") {
      throw new Error("getCurrentHero ERROR");
    }

    return result?.value as boolean;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as boolean;
  }
};

export const updateTierLevel = async (params: {
  clientId: string;
  heroId: number;
  tier: number;
}): Promise<boolean> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-lobby",
    lang: "en",
    method: "lobbyEndpoints_buyUpgradeTier",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      deviceId: params.clientId,
    },
    params,
  };
  try {
    const result = await sendRequestAndGetResponse(request);
    if (result?.type === "Left") {
      throw new Error("getCurrentHero ERROR");
    }

    return result?.value as boolean;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as boolean;
  }
};

export const getHeroTierUpgradePrice = async (params: {
  clientId: string;
  heroId: number;
}): Promise<number> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-lobby",
    lang: "en",
    method: "lobbyEndpoints_getHeroTierUpgradePrice",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      deviceId: params.clientId,
    },
    params,
  };
  try {
    const result = await sendRequestAndGetResponse(request);

    if (result?.type === "Left") {
      throw new Error("getCurrentHero ERROR");
    }

    return result?.value as number;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as number;
  }
};

export const getHeroesShards = async (params: {
  clientId: string;
}): Promise<heroShardsResponse> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-lobby",
    lang: "en",
    method: "lobbyEndpoints_getLobbyBalance",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      deviceId: params.clientId,
    },
    params,
  };
  try {
    const result = await sendRequestAndGetResponse(request);
    if (result?.type === "Left") {
      throw new Error("getHeroes ERROR");
    }
    return result?.value as heroShardsResponse;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as heroShardsResponse;
  }
};
