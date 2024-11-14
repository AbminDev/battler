export {};

export interface Map {
  id: number;
  dungeon: Dungeon[];
  image: string;
  name: string;
}

export interface Dungeon {
  roadId: number;
  stageId: number;
  type: DungeonEvent;
}
export enum DungeonEvent {
  enemy,
  boss,
  shop,
  bonus,
}

export const mockedMap: Map[] = [{
  id: 1,
  image: '',
  name: 'chapter1',
  dungeon: [{
    roadId: 1,
    stageId: 1,
    type: DungeonEvent.enemy
  }, {
    roadId: 1,
    stageId: 2,
    type: DungeonEvent.enemy
  }, {
    roadId: 1,
    stageId: 3,
    type: DungeonEvent.bonus,
  }, {
    roadId: 1,
    stageId: 4,
    type: DungeonEvent.enemy
  }, {
    roadId: 1,
    stageId: 5,
    type: DungeonEvent.boss
  },
    {
      roadId: 2,
      stageId: 1,
      type: DungeonEvent.enemy
    }, {
      roadId: 2,
      stageId: 2,
      type: DungeonEvent.enemy
    }, {
      roadId: 2,
      stageId: 3,
      type: DungeonEvent.bonus,
    }, {
      roadId: 1,
      stageId: 4,
      type: DungeonEvent.enemy
    }, {
      roadId: 1,
      stageId: 5,
      type: DungeonEvent.boss
    }, {
      roadId: 3,
      stageId: 1,
      type: DungeonEvent.enemy
    }, {
      roadId: 3,
      stageId: 2,
      type: DungeonEvent.enemy
    }, {
      roadId: 3,
      stageId: 3,
      type: DungeonEvent.bonus,
    }, {
      roadId: 3,
      stageId: 4,
      type: DungeonEvent.enemy
    }, {
      roadId: 1,
      stageId: 5,
      type: DungeonEvent.boss
    }]
}]


