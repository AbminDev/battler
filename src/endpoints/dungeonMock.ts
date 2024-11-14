import {DungeonType, StageType} from "./mock";


export const getTitleForStages = (stageType: StageType) => {
  switch (stageType) {
    case StageType.forge:
      return 'Forge';
    case StageType.shop:
      return 'Shop';
    case StageType.tavern:
      return 'Tavern';
    default:
      return 'Here should be a text';
  }
}

export const dungeonConfig: DungeonType[] = [{
  dungeonId: 1,
  description: 'Character 1',
  stages: [
    {
      id: 1,
      type: StageType.enemy,
      enemyId: 3,
      lvl: 1,
      description: 'Mock text enemy',
    },
    {
      id: 2,
      type: StageType.elixir,
      amount: 2,
      description: 'Mock text elixir',
    },
    {
      id: 3,
      type: StageType.random,
      pool: [StageType.shop, StageType.forge, StageType.tavern],
      description: 'Mock text shop',
    },
    {
      id: 4,
      type: StageType.enemy,
      lvl: 2,

      enemyId: 4,
      description: 'Mock text enemy',
    },
    {
      id: 5,
      type: StageType.random,
      pool: [StageType.shop, StageType.forge, StageType.tavern],
      description: 'Mock text shop',

    },
    {
      id: 6,
      type: StageType.random,
      pool: [StageType.shop, StageType.forge, StageType.tavern],
      description: 'Mock text shop',
    },
    {
      id: 7,
      type: StageType.random,
      pool: [StageType.shop, StageType.forge, StageType.tavern],
      description: 'Mock text shop',

    },
    {
      id: 8,
      type: StageType.enemy,
      lvl: 3,
      enemyId: 5,
      description: 'Mock text enemy',

    },
    {
      id: 9,
      type: StageType.enemy,
      lvl: 3,

      enemyId: 6,
      description: 'Mock text enemy',
    },
    {
      id: 10,
      type: StageType.random,
      pool: [StageType.shop, StageType.forge, StageType.tavern],
      description: 'Mock text shop',

    },
    {
      id: 11,
      type: StageType.enemy,
      lvl: 4,
      enemyId: 7,
      description: 'Mock text enemy',

    },
    {
      id: 12,
      type: StageType.boss,
      lvl: 4,
      buildingId: 1,
      enemyId: 8,
      description: 'Mock text boss',
    },
  ],
}, {
  dungeonId: 2,
  description: 'Chapter 2',
  stages: [
    {
      id: 1,
      type: StageType.enemy,
      enemyId: 9, //Corpse Insect
      title: '',
      description: '',
    },
    {
      id: 2,
      type: StageType.elixir,
      amount: 2,
      title: 'Elixir',
      percent: 100,
      description: '',
    },
    {
      id: 3,
      type: StageType.random,
      pool: [StageType.shop, StageType.forge, StageType.tavern],
      description: 'Mock text shop',
    },
    {
      id: 4,
      type: StageType.enemy,
      enemyId: 10,// Evil Doll
      title: '',
      description: '',
    },
    {
      id: 5,
      type: StageType.random,
      pool: [StageType.shop, StageType.forge, StageType.tavern],
      description: 'Mock text shop',
    },
    {
      id: 6,
      type: StageType.enemy,
      enemyId: 11, // Bones Pile
      title: '',
      description: '',
    },
    {
      id: 7,
      type: StageType.enemy,
      enemyId: 12, //Ghoul
      title: '',
      description: '',
    },
    {
      id: 8,
      type: StageType.random,
      pool: [StageType.shop, StageType.forge, StageType.tavern],
      description: 'Mock text shop',
    },
    {
      id: 9,
      type: StageType.bonfire,
      title: 'Bonfire',
      description: '',
    },
    {
      id: 10,
      type: StageType.enemy,
      enemyId: 13, // Undead Hero
      title: '',
      description: '',
    },
    {
      id: 12,
      type: StageType.boss,
      enemyId: 14, // Vampire Lord
      buildingId: 2,
      description: '',
    },
  ],
}, {
  dungeonId: 3,
  description: 'Chapter 3',
  stages: [
    {
      id: 1,
      type: StageType.enemy,
      enemyId: 15, //Corpsecreep
      title: '',
      description: '',
    },
    {
      id: 2,
      type: StageType.elixir,
      amount: 2,
      title: 'Elixir',
      percent: 100,
      description: '',
    },
    {
      id: 3,
      type: StageType.random,
      pool: [StageType.shop, StageType.forge, StageType.tavern],
      description: 'Mock text shop',
    },
    {
      id: 4,
      type: StageType.enemy,
      enemyId: 16,// Gorebug
      title: '',
      description: '',
    },
    {
      id: 5,
      type: StageType.enemy,
      enemyId: 17, // Meatborer
      title: '',
      description: '',
    },
    {
      id: 6,
      type: StageType.random,
      pool: [StageType.shop, StageType.forge, StageType.tavern],
      description: 'Mock text shop',
    },
    {
      id: 7,
      type: StageType.enemy,
      enemyId: 18, //Gorebug
      title: '',
      description: '',
    },
    {
      id: 8,
      type: StageType.bonfire,
      title: 'Bonfire',
      description: '',
    },
    {
      id: 9,
      type: StageType.enemy,
      enemyId: 19, // Rotwing
      title: '',
      description: '',
    },
    {
      id: 10,
      type: StageType.random,
      pool: [StageType.shop, StageType.forge, StageType.tavern],
      description: 'Mock text shop',
    },
    {
      id: 11,
      type: StageType.boss,
      enemyId: 20, // Carrion Warden
      buildingId: 3,
      description: '',
    },
  ],
}, {
  dungeonId: 4,
  description: 'Chapter 4',
  stages: [
    {
      id: 1,
      type: StageType.enemy,
      enemyId: 21, //Ball of Bones
      title: '',
      description: '',
    },
    {
      id: 2,
      type: StageType.elixir,
      amount: 2,
      title: 'Elixir',
      percent: 100,
      description: '',
    },
    {
      id: 3,
      type: StageType.random,
      pool: [StageType.shop, StageType.forge, StageType.tavern],
      description: 'Mock text shop',
    },
    {
      id: 4,
      type: StageType.enemy,
      enemyId: 22,// Lost Mummy
      title: '',
      description: '',
    },
    {
      id: 5,
      type: StageType.random,
      pool: [StageType.shop, StageType.forge, StageType.tavern],
      description: 'Mock text shop',
    },
    {
      id: 6,
      type: StageType.enemy,
      enemyId: 23, // Gravewoken
      title: '',
      description: '',
    },
    {
      id: 7,
      type: StageType.enemy,
      enemyId: 24, //Hemogolem
      title: '',
      description: '',
    },
    {
      id: 8,
      type: StageType.random,
      pool: [StageType.shop, StageType.forge, StageType.tavern],
      description: 'Mock text shop',
    },
    {
      id: 9,
      type: StageType.bonfire,
      title: 'Bonfire',
      description: '',
    },
    {
      id: 10,
      type: StageType.enemy,
      enemyId: 25, // Bonechimera
      title: '',
      description: '',
    },
    {
      id: 11,
      type: StageType.random,
      pool: [StageType.shop, StageType.forge, StageType.tavern],
      description: 'Mock text shop',
    },
    {
      id: 12,
      type: StageType.boss,
      enemyId: 26, // Skull Spider
      buildingId: 4,
      description: '',
    },
  ],
},{
  dungeonId: 5,
  description: 'Chapter 5',
  stages: [
    {
      id: 1,
      type: StageType.enemy,
      enemyId: 27, //Ball of Bones
      title: '',
      description: '',
    },
    {
      id: 2,
      type: StageType.elixir,
      amount: 2,
      title: 'Elixir',
      percent: 100,
      description: '',
    },
    {
      id: 3,
      type: StageType.random,
      pool: [StageType.shop, StageType.forge, StageType.tavern],
      description: 'Mock text shop',
    },
    {
      id: 4,
      type: StageType.enemy,
      enemyId: 22,// Lost Mummy
      title: '',
      description: '',
    },
    {
      id: 5,
      type: StageType.random,
      pool: [StageType.shop, StageType.forge, StageType.tavern],
      description: 'Mock text shop',
    },
    {
      id: 6,
      type: StageType.enemy,
      enemyId: 23, // Gravewoken
      title: '',
      description: '',
    },
    {
      id: 7,
      type: StageType.enemy,
      enemyId: 24, //Hemogolem
      title: '',
      description: '',
    },
    {
      id: 8,
      type: StageType.random,
      pool: [StageType.shop, StageType.forge, StageType.tavern],
      description: 'Mock text shop',
    },
    {
      id: 9,
      type: StageType.bonfire,
      title: 'Bonfire',
      description: '',
    },
    {
      id: 10,
      type: StageType.enemy,
      enemyId: 25, // Bonechimera
      title: '',
      description: '',
    },
    {
      id: 11,
      type: StageType.random,
      pool: [StageType.shop, StageType.forge, StageType.tavern],
      description: 'Mock text shop',
    },
    {
      id: 12,
      type: StageType.boss,
      enemyId: 26, // Skull Spider
      title: '',
      description: '',
    },
  ],
}];
