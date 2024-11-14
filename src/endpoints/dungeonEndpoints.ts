import { DungeonStage, DungeonStagesResponse, StageType } from "./mock";
import { RequestWebsocket } from "../interfaces/wsInterfaces";
import { generateRequestId } from "../utils/generateRequestId";
import { sendRequestAndGetResponse } from "../Websocket/websocketInit";
import { dungeonConfig } from "./dungeonMock";

// export interface GetTutorialProgressResponse {
//   save: string;
// }

export interface CardsAtDeck {
  cardId: number;
  stars: number;
  cardUid: string;
}

export interface getDungeonProgressByDungeonIdResponse {
  stages: DungeonStagesResponse[];
  currentHp: number;
  currentMana: number;
  gold: number;
  cardsAtDeck: CardsAtDeck[];
  hp: number;
  currentDungeonId: number;
}

export interface Stage {
  id: number;
  type: StageType;
  stageId: number;
  amount: number;
  currentAmount: number;
}
export interface useDungeonCardResponse {
  stages: Stage[];
  currentHp: number;
  currentMana: number;
  gold: number;
  cardsAtDeck: CardsAtDeck[];
}
export interface responseForManyEndpoints {
  currentHp: number;
  currentMana: number;
  gold: number;
  cardsAtDeck: CardsAtDeck[];
}
export interface cancelDungeonCardResponse {
  stages: DungeonStagesResponse[];
}

interface updateCardParams {
  clientId: string;
  cardId: number;
  lvl: number;
}

interface getShopItems {
  clientId: string;
  stageId: number; // stageId (id) from config dung
  dungeonId: number;
}

interface upgradeCardParams {
  clientId: string;
  cardUid: string;
  dungeonId: number;
  stageId: number; // stageId
}

interface getUpgradeCostParams {
  clientId: string;
  stageId: number; // stageId (id) from config dung
  dungeonId: number;
}

interface getShopItemsResponse {
  cards: cardsResponse[];
}

interface cardsResponse {
  cardId: number;
  stars: number;
  cost: number;
}

interface updateCardResponse {
  id: string;
  lvl: number;
  uid: string;
}

interface buyCard {
  cardId: number;
  clientId: string;
  stageId: number;
}

interface resetProgressIF {
  clientId: string;
}

interface chestRewardsResponse {
  cardId: number;
  stars: number;
}

export const getDungeonProgressByDungeonId = async (params: {
  clientId: string;
  buildingId: number;
  heroId: number;
}): Promise<getDungeonProgressByDungeonIdResponse> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-lobby",
    lang: "en",
    method: "lobbyEndpoints_getDungeonProgress",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      deviceId: params.clientId,
    },
    params,
  };
  try {
    const result = await sendRequestAndGetResponse(request);
    if (!result?.value) {
      throw new Error("getDungeonProgressByDungeonId ERROR");
    }
    return result?.value as getDungeonProgressByDungeonIdResponse;
    // return {
    //   currentMana: 2,
    //   currentHp: 20,
    //   gold: 33,
    //   stages: [{cardId: 1, amount: 1, type: StageType.elixir, currentAmount: 0}, {cardId: 2, amount: 1, type: StageType.enemy, currentAmount: 0}, {cardId: 3, amount: 1, type: StageType.shop, currentAmount: 0}],
    // }
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error)
      .message as unknown as getDungeonProgressByDungeonIdResponse;
  }
};

export const startDungeon = async (params: {
  clientId: string;
  dungeonId: number;
  heroId: number;
}): Promise<void> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-lobby",
    lang: "en",
    method: "lobbyEndpoints_startDungeon",
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
      throw new Error("startDungeon ERROR");
    }
    return result?.value as void;
    // return {
    //   currentMana: 2,
    //   currentHp: 20,
    //   gold: 33,
    //   stages: [{cardId: 1, amount: 1, type: StageType.elixir, currentAmount: 0}, {cardId: 2, amount: 1, type: StageType.enemy, currentAmount: 0}, {cardId: 3, amount: 1, type: StageType.shop, currentAmount: 0}],
    // }
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as void;
  }
};

export const usingDungeonCard = async (params: {
  clientId: string;
  dungeonId: number;
  stageId: number;
}): Promise<useDungeonCardResponse> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-lobby",
    lang: "en",
    method: "lobbyEndpoints_useCard",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      deviceId: params.clientId,
    },
    params,
  };
  try {
    const result = await sendRequestAndGetResponse(request);
    if (!result?.value) {
      throw new Error("useDungeonCard ERROR");
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as useDungeonCardResponse;
  }
};

export const cancelDungeonCard = async (params: {
  clientId: string;
  dungeonId: number;
  stageId: number;
}): Promise<cancelDungeonCardResponse> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-lobby",
    lang: "en",
    method: "lobbyEndpoints_cancelCard",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      deviceId: params.clientId,
    },
    params,
  };
  try {
    const result = await sendRequestAndGetResponse(request);
    if (!result?.value) {
      throw new Error("cancelDungeonCard ERROR");
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as cancelDungeonCardResponse;
  }
};

export const updateCard = async (
  params: updateCardParams
): Promise<updateCardResponse> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-lobby",
    lang: "en",
    method: "lobbyEndpoints_updateCard",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      deviceId: params.clientId,
    },
    params,
  };

  try {
    const result = await sendRequestAndGetResponse(request);
    if (!result?.value) {
      throw new Error("updateCard ERROR");
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as updateCardResponse;
  }
};

export const getShopItems = async (
  params: getShopItems
): Promise<getShopItemsResponse> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-lobby",
    lang: "en",
    method: "lobbyEndpoints_getShopItems",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      deviceId: params.clientId,
    },
    params,
  };

  try {
    const result = await sendRequestAndGetResponse(request);
    if (!result?.value) {
      throw new Error("updateCard ERROR");
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as getShopItemsResponse;
  }
};

export const buyCard = async (
  params: buyCard
): Promise<responseForManyEndpoints> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-lobby",
    lang: "en",
    method: "lobbyEndpoints_buyCard",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      deviceId: params.clientId,
    },
    params,
  };

  try {
    const result = await sendRequestAndGetResponse(request);
    if (!result?.value) {
      throw new Error("updateCard ERROR");
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as responseForManyEndpoints;
  }
};

export const getUpgradePrice = async (
  params: getUpgradeCostParams
): Promise<{ price: number }> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-lobby",
    lang: "en",
    method: "lobbyEndpoints_getUpgradePrice",
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
      throw new Error("getUpgradePrice ERROR");
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as { price: number };
  }
};

export const upgradeCard = async (
  params: upgradeCardParams
): Promise<responseForManyEndpoints> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-lobby",
    lang: "en",
    method: "lobbyEndpoints_upgradeCard",
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
      throw new Error("upgradeCard ERROR");
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as responseForManyEndpoints;
  }
};

export const getRemovePrice = async (
  params: getUpgradeCostParams
): Promise<{ price: number }> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-lobby",
    lang: "en",
    method: "lobbyEndpoints_getRemovePrice",
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
      throw new Error("getRemovePrice ERROR");
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as { price: number };
  }
};

export const removeCard = async (
  params: upgradeCardParams
): Promise<responseForManyEndpoints> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-lobby",
    lang: "en",
    method: "lobbyEndpoints_removeCard",
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
      throw new Error("removeCard ERROR");
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as responseForManyEndpoints;
  }
};

export const purchaseTelegram = async (params: {
  offerId: string;
  offerType: number;
  title: string;
  description: string;
  label: string;
}): Promise<any> => {
  const request: RequestWebsocket = {
    agent: "tg-battler-bot",
    lang: "en",
    method: "payments_getInvoiceLink",
    id: generateRequestId(),
    params,
    auth: {
      type: "webSite",
    },
  };

  try {
    const result = await sendRequestAndGetResponse(request);
    if (!result?.value) {
      throw new Error("purchase ERROR");
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as void;
  }
};

export const getChestRewards = async (params: {
  clientId: string;
  stageId: number;
}): Promise<chestRewardsResponse[]> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-lobby",
    lang: "en",
    method: "lobbyEndpoints_openChest",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      deviceId: params.clientId,
    },
    params,
  };

  try {
    const result = await sendRequestAndGetResponse(request);
    if (!result?.value) {
      throw new Error("getChestRewards ERROR");
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as chestRewardsResponse[];
  }
};
//getRewardCard

export const takeChestReward = async (
  params: buyCard
): Promise<responseForManyEndpoints> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-lobby",
    lang: "en",
    method: "lobbyEndpoints_takeChestReward",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      deviceId: params.clientId,
    },
    params,
  };

  try {
    const result = await sendRequestAndGetResponse(request);
    if (!result?.value) {
      throw new Error("getRewardCard ERROR");
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as responseForManyEndpoints;
  }
};

export const resetCurrentDungeon = async (params: {
  clientId: string;
  heroId: number;
}): Promise<responseForManyEndpoints> => {
  const request: RequestWebsocket = {
    agent: "battler-tg-lobby",
    lang: "en",
    method: "lobbyEndpoints_resetCurrentDungeon",
    id: generateRequestId(),
    auth: {
      type: "mobileApp",
      deviceId: params.clientId,
    },
    params,
  };

  try {
    const result = await sendRequestAndGetResponse(request);
    if (!result?.value) {
      throw new Error("resetCurrentDungeon ERROR");
    }
    return result?.value;
  } catch (e) {
    console.error((e as Error).message);
    return (e as Error).message as unknown as responseForManyEndpoints;
  }
};
