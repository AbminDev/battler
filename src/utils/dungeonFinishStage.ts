import {BattleSaves, StageType} from "../endpoints/mock";
import {dungeonConfig} from "../endpoints/dungeonMock";

export const isDungeonFinishStage = ({actualSave}:{actualSave: BattleSaves}) => {
  console.log('isDungeonFinishStage', actualSave);
console.log('%%%%%%%%%%', dungeonConfig[actualSave?.dungeonId! - 1]);
  const stagesLength = dungeonConfig[actualSave.dungeonId! - 1]?.stages?.length;
  const card = dungeonConfig[actualSave.dungeonId! - 1]?.stages[stagesLength-1] as unknown as {
    type: StageType,
    enemyId: number,
    description?: string,
    amount?: number,
    currentAmount?: number
  }

  return actualSave.enemyId === card.enemyId;
}
