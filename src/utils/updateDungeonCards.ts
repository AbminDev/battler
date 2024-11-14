
import {BattleSaves, DungeonStage, StageType} from "../endpoints/mock";
import {dungeonConfig} from "../endpoints/dungeonMock";

export const updateDungeonCards = ({stages, actualSave}:{stages: DungeonStage[], actualSave: BattleSaves}) => {
  const cardsWithoutBossCard = stages.filter((stage) => stage.type !== StageType.enemy && stage.type !== StageType.boss);
  //@ts-ignore
  cardsWithoutBossCard.push(dungeonConfig[actualSave.dungeonId - 1].stages[actualSave.lastStageId + 1]);
  return cardsWithoutBossCard;
}
