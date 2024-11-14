import {usingDungeonCard} from "../endpoints/dungeonEndpoints";

export const usingCard = async({dungeonId, cardId, clientId}: {dungeonId: number, clientId: number, cardId: number}) => {
  const usingDungeonCardEndpoint = async () => {
    //@ts-ignore
    const result = await usingDungeonCard({dungeonId, clientId, cardId});
    if (result.stages?.length) {
      return result;
      // const items = [...visibleItems];
      // items[currentIndex] = result.stage[0];
      // setLastStageId(result.stage[0]?.id);
      // setCurrentIndex(result.stage[0]?.id - 1);
      // setNextIndex(result.stage[0]?.id + 1);
      // setCurrentHp(result.currentHp);
      // setCurrentMana(result.currentMana);
      // setGoldAmount(result.gold);
    }
  }
  usingDungeonCardEndpoint();

}
