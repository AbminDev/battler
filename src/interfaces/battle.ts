import { HeroCards } from "../endpoints/mock";

export interface BattleInit {
  maxHp: number;
  currentHp: number;
  maxMana: number;
  cardsAtDeck: number;
  cardIds: number[];
  enemy: {
    name: string;
    lvl: number;
    maxHp: number;
    maxMana: number;
  };
}

export enum EnemiesPower {
  atk,
}

export interface Enemies {
  id: number;
  lvl: number;
  isBoss: boolean;
  name: string;
  description: string;
  attributes: {
    health: number;
    mana: number;
    defence: number;
    maxHealth: number;
    maxMana: number;
  }[];
  cards: CardsAtDeck[];
  cardsAmountPerRound: number;
  power?: EnemiesPower; //для особых баффов или дебаффов
}

export interface EnemiesConfig {
  id: { value: number };
  lvl: { value: number };
  isBoss: { value: boolean };
  name: { value: string };
  description: { value: string };
  attributes: {
    value: {
      health: { value: number };
      mana: { value: number };
      defence: { value: number };
      maxHealth: { value: number };
      maxMana: { value: number };
    }[];
  };
  cards: { value: CardsAtDeckConfig[] };
  cardsAmountPerRound: { value: number };
  power?: EnemiesPower; //для особых баффов или дебаффов
}

export enum CardIds {
  stone,
  sixRed,
  threeGreen,
  eighteenBlue,
  nineRed,
  twentyBlue,
  threeRed,
  eighteenGreen,
  prank,
  oneRed,
  fifteenRed,
  elevenRed,
  eighteenRed,
  tenRed,
  sixteenRed,
  sevenRed,
  sixGreen,
  twoRed,
  fourRed,
  fiveRed,
  eightRed,
  fourteenRed,
  twelveRed,
  thirteenRed,
  nineteenRed,
  oneGreen,
  twoGreen,
  fourGreen,
  sevenGreen,
  nineGreen,
  elevenGreen,
  thirteenGreen,
  fifteenGreen,
  tenGreen,
  twelveGreen,
  nineBlue,
  seventeenRed,
}

export interface CardsAtDeckConfig {
  cardId: { value: number };
  stars: { value: number };
}
export interface CardsAtDeck {
  cardId: number;
  stars: number;
}

export function parseEnemiesConfig(config: EnemiesConfig[]): Enemies[] {
  console.log("config", config);
  return config.map((enemyConfig: EnemiesConfig) => ({
    id: enemyConfig.id.value,
    lvl: enemyConfig.lvl.value,
    isBoss: enemyConfig.isBoss.value,
    name: enemyConfig.name.value,
    description: enemyConfig.description.value,
    attributes: enemyConfig.attributes.value.map((attributesConfig) => ({
      health: attributesConfig.health.value,
      mana: attributesConfig.mana.value,
      defence: attributesConfig.defence.value,
      maxHealth: attributesConfig.maxHealth.value,
      maxMana: attributesConfig.maxMana.value,
    })),
    cards: enemyConfig.cards.value.map((cardConfig) => ({
      cardId: cardConfig.cardId.value,
      stars: cardConfig.stars.value,
    })),
    cardsAmountPerRound: enemyConfig.cardsAmountPerRound.value,
    power: enemyConfig.power, // якщо потрібно, можна додати додаткову логіку для power
  }));
}

// export const enemiesConfig: EnemiesConfig[] = [
//   {
//     id: 0,
//     lvl: 1,
//     isBoss: false,
//     name: 'Old Skeleton',
//     description: 'Crack-crack',
//     attributes: {
//       health: 5,
//       mana: 0,
//       defence: 0,
//       maxHealth: 5,
//       maxMana: 0,
//     },
//     cards: [{
//       cardId: 0,
//       stars: 0,
//     }, {
//       cardId: 0,
//       stars: 0,
//     }],
//     cardsAmountPerRound: 2,
//   },{
//     id: 1,
//     lvl: 2,
//     isBoss: false,
//     name: 'Skelet warrior',
//     description: 'Clink-clank',
//     attributes: {
//       health: 20,
//       mana: 0,
//       defence: 0,
//       maxHealth: 20,
//       maxMana: 0,
//     },
//     cards: [{
//       cardId: 0,
//       stars: 0,
//     }, {
//       cardId: 4,
//       stars: 0,
//     }, {
//       cardId: 5,
//       stars: 0,
//     }],
//     cardsAmountPerRound: 2,
//   },{
//     id: 2,
//     lvl: 10,
//     isBoss: true,
//     name: 'Lira',
//     description: 'Is that really the best you can do?',
//     attributes: {
//       health: 50,
//       mana: 0,
//       defence: 0,
//       maxHealth: 50,
//       maxMana: 0,
//     },
//     cards: [{
//       cardId: 6,
//       stars: 0,
//     }, {
//       cardId: 3,
//       stars: 0,
//     }, {
//       cardId: 4,
//       stars: 0,
//     },
//       {
//         cardId: 7,
//         stars: 0,
//       }],
//     cardsAmountPerRound: 4,
//   },{
//     id: 3,
//     lvl: 1,
//     isBoss: false,
//     name: 'Fresh Zombie',
//     description: 'Huuungry...',
//     attributes: {
//       health: 10,
//       mana: 0,
//       defence: 0,
//       maxHealth: 10,
//       maxMana: 0,
//     },
//     cards: [{
//       cardId: CardIds.oneRed,
//       stars: 0,
//     }, {
//       cardId: CardIds.threeGreen,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.fifteenRed,
//         stars: 0,
//       }
//     ],
//     cardsAmountPerRound: 1,
//   }, {
//     id: 4,
//     lvl: 2,
//     isBoss: false,
//     name: 'Dead Dog',
//     description: 'Grrr',
//     attributes: {
//       health: 16,
//       mana: 0,
//       defence: 0,
//       maxHealth: 15,
//       maxMana: 0,
//     },
//     cards: [{
//       cardId: CardIds.elevenRed,
//       stars: 0,
//     }, {
//       cardId: CardIds.eighteenRed,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.eightRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.sixGreen,
//         stars: 0,
//       }
//     ],
//     cardsAmountPerRound: 2,
//   },
//   {
//     id: 5,
//     lvl: 3,
//     isBoss: false,
//     name: 'Townsman Ghost',
//     description: 'Lost... Forever!',
//     attributes: {
//       health: 18,
//       mana: 0,
//       defence: 0,
//       maxHealth: 25,
//       maxMana: 0,
//     },
//     cards: [{
//       cardId: CardIds.tenRed,
//       stars: 0,
//     }, {
//       cardId: CardIds.tenRed,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.fifteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fifteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.oneGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fourGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.oneRed,
//         stars: 0,
//       }
//     ],
//     cardsAmountPerRound: 3,
//   },{
//     id: 6,
//     lvl: 3,
//     isBoss: false,
//     name: 'Living Corpse',
//     description: 'I... still... live...',
//     attributes: {
//       health: 25,
//       mana: 0,
//       defence: 0,
//       maxHealth: 25,
//       maxMana: 0,
//     },
//     cards: [{
//       cardId: CardIds.sixteenRed,
//       stars: 0,
//     }, {
//       cardId: CardIds.seventeenRed,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.threeRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.eighteenGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.eighteenGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.eightRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fourGreen,
//         stars: 0,
//       }
//     ],
//     cardsAmountPerRound: 3,
//   }, {
//     id: 7,
//     lvl: 4,
//     isBoss: false,
//     name: 'Ghost',
//     description: 'Who dares?',
//     attributes: {
//       health: 33,
//       mana: 0,
//       defence: 0,
//       maxHealth: 54,
//       maxMana: 0,
//     },
//     cards: [{
//       cardId: CardIds.fourGreen,
//       stars: 0,
//     }, {
//       cardId: CardIds.fourGreen,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.twoGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.elevenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.elevenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fifteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.sevenRed,
//         stars: 0,
//       }
//     ],
//     cardsAmountPerRound: 4,
//   }, {
//     id: 8,
//     lvl: 4,
//     isBoss: true,
//     name: 'Pepe Assassin',
//     description: 'The shadows never croak',
//     attributes: {
//       health: 66,
//       mana: 0,
//       defence: 0,
//       maxHealth: 54,
//       maxMana: 0,
//     },
//     cards: [{
//       cardId: CardIds.fourteenRed,
//       stars: 0,
//     }, {
//       cardId: CardIds.sixGreen,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.sevenGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.twelveGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.elevenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.eighteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.twoRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.eightRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.eightRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.nineteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.threeRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.tenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fifteenRed,
//         stars: 0,
//       }
//     ],
//     cardsAmountPerRound: 4,
//   },{
//     id: 9,
//     lvl: 4,
//     isBoss: false,
//     name: 'Corpse Insect',
//     description: 'Creeeeak...',
//     attributes: {
//       health: 28,
//       mana: 1,
//       defence: 0,
//       maxHealth: 28,
//       maxMana: 1,
//     },
//     cards: [{
//       cardId: CardIds.oneRed,
//       stars: 0,
//     }, {
//       cardId: CardIds.twelveRed,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.fiveRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.eightRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.eighteenGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.threeGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.nineGreen,
//         stars: 0,
//       },
//     ],
//     cardsAmountPerRound: 2,
//   },{
//     id: 10,
//     lvl: 4,
//     isBoss: false,
//     name: 'Evil Doll',
//     description: 'Play... with... me...',
//     attributes: {
//       health: 34,
//       mana: 2,
//       defence: 0,
//       maxHealth: 34,
//       maxMana: 2,
//     },
//     cards: [{
//       cardId: CardIds.threeRed,
//       stars: 0,
//     }, {
//       cardId: CardIds.sevenRed,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.oneRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.threeRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fiveRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.nineteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fourRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.threeGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.sixGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.twelveGreen,
//         stars: 0,
//       },
//     ],
//     cardsAmountPerRound: 2,
//   },{
//     id: 11,
//     lvl: 4,
//     isBoss: false,
//     name: 'Bones Pile',
//     description: 'Clatter... clatter...',
//     attributes: {
//       health: 40,
//       mana: 2,
//       defence: 0,
//       maxHealth: 40,
//       maxMana: 2,
//     },
//     cards: [{
//       cardId: CardIds.tenRed,
//       stars: 0,
//     }, {
//       cardId: CardIds.tenRed,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.eighteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.sevenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fourGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.twoGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.eightRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fourGreen,
//         stars: 0,
//       },
//     ],
//     cardsAmountPerRound: 2,
//   },{
//     id: 12,
//     lvl: 4,
//     isBoss: false,
//     name: 'Ghoul',
//     description: "Fresh... meat...",
//     attributes: {
//       health: 52,
//       mana: 2,
//       defence: 0,
//       maxHealth: 52,
//       maxMana: 2,
//     },
//     cards: [{
//       cardId: CardIds.threeRed,
//       stars: 0,
//     }, {
//       cardId: CardIds.threeRed,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.nineRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.nineRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.eighteenGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fourteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.eighteenGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fourGreen,
//         stars: 0,
//       },
//     ],
//     cardsAmountPerRound: 3,
//   },{
//     id: 13,
//     lvl: 4,
//     isBoss: false,
//     name: 'Fanatic Vitalik',
//     description: "In the chains, I see the future.",
//     attributes: {
//       health: 60,
//       mana: 2,
//       defence: 0,
//       maxHealth: 60,
//       maxMana: 2,
//     },
//     cards: [{
//       cardId: CardIds.sevenGreen,
//       stars: 0,
//     }, {
//       cardId: CardIds.threeRed,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.threeRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.eighteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.twoRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.eighteenGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.eighteenGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.threeGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.tenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fifteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.sevenGreen,
//         stars: 0,
//       },
//     ],
//     cardsAmountPerRound: 3,
//   },{
//     id: 14,
//     lvl: 4,
//     isBoss: true,
//     name: 'Vampire Lord',
//     description: "Kneel... before me...",
//     attributes: {
//       health: 75,
//       mana: 3,
//       defence: 0,
//       maxHealth: 75,
//       maxMana: 3,
//     },
//     cards: [{
//       cardId: CardIds.sixRed,
//       stars: 0,
//     }, {
//       cardId: CardIds.tenRed,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.tenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.sixteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.nineteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.twoRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.elevenGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.seventeenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fiveRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.twoGreen,
//         stars: 0,
//       },
//     ],
//     cardsAmountPerRound: 3,
//   },{
//     id: 15,
//     lvl: 4,
//     isBoss: false,
//     name: 'Corpsecreep',
//     description: "Ssskrrr... Skreeeek...",
//     attributes: {
//       health: 60,
//       mana: 2,
//       defence: 0,
//       maxHealth: 60,
//       maxMana: 2,
//     },
//     cards: [{
//       cardId: CardIds.sixRed,
//       stars: 0,
//     }, {
//       cardId: CardIds.sixRed,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.sixRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.oneGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.oneRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.sixGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.twelveGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fifteenRed,
//         stars: 0,
//       },
//     ],
//     cardsAmountPerRound: 3,
//   },{
//     id: 16,
//     lvl: 4,
//     isBoss: false,
//     name: 'Gorebug',
//     description: "Clack... Hisss... Crrkk...",
//     attributes: {
//       health: 60,
//       mana: 1,
//       defence: 0,
//       maxHealth: 60,
//       maxMana: 1,
//     },
//     cards: [{
//       cardId: CardIds.tenRed,
//       stars: 0,
//     }, {
//       cardId: CardIds.tenRed,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.fourRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fourRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.tenGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.tenGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.nineteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.sixteenRed,
//         stars: 0,
//       },
//     ],
//     cardsAmountPerRound: 3,
//   },{
//     id: 17,
//     lvl: 4,
//     isBoss: false,
//     name: 'Meatborer',
//     description: "Crunch... Trrrk...",
//     attributes: {
//       health: 66,
//       mana: 1,
//       defence: 0,
//       maxHealth: 66,
//       maxMana: 1,
//     },
//     cards: [{
//       cardId: CardIds.twelveGreen,
//       stars: 0,
//     }, {
//       cardId: CardIds.nineRed,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.nineRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fifteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fifteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.nineteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.seventeenRed,
//         stars: 0,
//       },
//     ],
//     cardsAmountPerRound: 3,
//   },{
//     id: 18,
//     lvl: 4,
//     isBoss: false,
//     name: 'Gorebug',
//     description: "Clank... Clank...",
//     attributes: {
//       health: 70,
//       mana: 2,
//       defence: 0,
//       maxHealth: 70,
//       maxMana: 2,
//     },
//     cards: [{
//       cardId: CardIds.twoGreen,
//       stars: 0,
//     }, {
//       cardId: CardIds.twoGreen,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.nineBlue,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.nineRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.tenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.nineRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.thirteenRed,
//         stars: 0,
//       },
//     ],
//     cardsAmountPerRound: 4,
//   },{
//     id: 19,
//     lvl: 4,
//     isBoss: false,
//     name: 'Rotwing',
//     description: "Brrrr... Ssss...",
//     attributes: {
//       health: 75,
//       mana: 1,
//       defence: 0,
//       maxHealth: 75,
//       maxMana: 1,
//     },
//     cards: [{
//       cardId: CardIds.thirteenRed,
//       stars: 0,
//     }, {
//       cardId: CardIds.thirteenRed,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.thirteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fourGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fourGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fourteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fifteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fifteenRed,
//         stars: 0,
//       },
//     ],
//     cardsAmountPerRound: 4,
//   },{
//     id: 20,
//     lvl: 4,
//     isBoss: true,
//     name: 'Carrion Warden',
//     description: "Rattle...Grind...",
//     attributes: {
//       health: 85,
//       mana: 4,
//       defence: 0,
//       maxHealth: 85,
//       maxMana: 4,
//     },
//     cards: [{
//       cardId: CardIds.twelveGreen,
//       stars: 0,
//     }, {
//       cardId: CardIds.twelveGreen,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.twelveGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.threeGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.seventeenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.seventeenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.seventeenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.nineteenRed,
//         stars: 0,
//       },
//     ],
//     cardsAmountPerRound: 4,
//   },
//   {
//     id: 21,
//     lvl: 4,
//     isBoss: false,
//     name: 'Boll of Bones',
//     description: "Crunch... Crack... Clatter..." ,
//     attributes: {
//       health: 75,
//       mana: 2,
//       defence: 0,
//       maxHealth: 75,
//       maxMana: 2,
//     },
//     cards: [{
//       cardId: CardIds.elevenRed,
//       stars: 0,
//     }, {
//       cardId: CardIds.seventeenRed,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.fiveRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.sixteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.seventeenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.threeRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.threeRed,
//         stars: 0,
//       },
//     ],
//     cardsAmountPerRound: 2,
//   },
//   {
//     id: 22,
//     lvl: 4,
//     isBoss: false,
//     name: 'Lost Mummy',
//     description: "No rest for the dead..." ,
//     attributes: {
//       health: 80,
//       mana: 3,
//       defence: 0,
//       maxHealth: 80,
//       maxMana: 3,
//     },
//     cards: [{
//       cardId: CardIds.oneRed,
//       stars: 0,
//     }, {
//       cardId: CardIds.twelveRed,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.oneRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.twelveRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.eighteenGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fourteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.eighteenGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fourGreen,
//         stars: 0,
//       },
//     ],
//     cardsAmountPerRound: 3,
//   },
//   {
//     id: 23,
//     lvl: 4,
//     isBoss: false,
//     name: 'Gravewoken',
//     description: "Clack... Clack... Clack...",
//     attributes: {
//       health: 86,
//       mana: 1,
//       defence: 0,
//       maxHealth: 86,
//       maxMana: 1,
//     },
//     cards: [{
//       cardId: CardIds.eighteenRed,
//       stars: 0,
//     }, {
//       cardId: CardIds.sevenRed,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.fourGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.twoGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.eightRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.seventeenRed,
//         stars: 0,
//       },
//     ],
//     cardsAmountPerRound: 3,
//   },
//   {
//     id: 24,
//     lvl: 4,
//     isBoss: false,
//     name: 'Hemogolem',
//     description:  "Squelch... Squish...",
//     attributes: {
//       health: 86,
//       mana: 2,
//       defence: 0,
//       maxHealth: 86,
//       maxMana: 2,
//     },
//     cards: [{
//       cardId: CardIds.fifteenRed,
//       stars: 0,
//     }, {
//       cardId: CardIds.nineteenRed,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.seventeenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fourteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.eighteenGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.tenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.sixteenRed,
//         stars: 0,
//       },
//     ],
//     cardsAmountPerRound: 4,
//   },
//   {
//     id: 25,
//     lvl: 4,
//     isBoss: false,
//     name: 'Bonechimera',
//     description: "Bone to dust...",
//     attributes: {
//       health: 90,
//       mana: 4,
//       defence: 0,
//       maxHealth: 90,
//       maxMana: 4,
//     },
//     cards: [{
//       cardId: CardIds.elevenRed,
//       stars: 0,
//     }, {
//       cardId: CardIds.elevenRed,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.fifteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.sevenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.twelveGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.twelveGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.threeGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.nineRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.tenRed,
//         stars: 0,
//       },
//     ],
//     cardsAmountPerRound: 4,
//   },
//   {
//     id: 26,
//     lvl: 4,
//     isBoss: true,
//     name: 'Skull Spider',
//     description: "Crunch...Crunch...",
//     attributes: {
//       health: 100,
//       mana: 2,
//       defence: 0,
//       maxHealth: 100,
//       maxMana: 2,
//     },
//     cards: [{
//       cardId: CardIds.threeRed,
//       stars: 0,
//     }, {
//       cardId: CardIds.eighteenGreen,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.nineRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.sixGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.sevenGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.twelveGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.elevenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.eighteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.twoRed,
//         stars: 0,
//       }
//     ],
//     cardsAmountPerRound: 5,
//   },
//   {
//     id: 27,
//     lvl: 4,
//     isBoss: false,
//     name: 'Death Mage',
//     description: "I see beyond the grave… and now, so shall you.",
//     attributes: {
//       health: 100,
//       mana: 2,
//       defence: 0,
//       maxHealth: 100,
//       maxMana: 2,
//     },
//     cards: [{
//       cardId: CardIds.fiveRed,
//       stars: 0,
//     }, {
//       cardId: CardIds.elevenGreen,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.seventeenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.seventeenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.sixteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.threeRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.threeRed,
//         stars: 0,
//       },
//     ],
//     cardsAmountPerRound: 5,
//   },
//   {
//     id: 28,
//     lvl: 4,
//     isBoss: false,
//     name: 'Skeleton Rider',
//     description: "Ride with me… to your doom! Clop clop",
//     attributes: {
//       health: 120,
//       mana: 3,
//       defence: 0,
//       maxHealth: 120,
//       maxMana: 3,
//     },
//     cards: [{
//       cardId: CardIds.oneRed,
//       stars: 0,
//     }, {
//       cardId: CardIds.oneRed,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.twelveRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.twelveRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.eighteenGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fourteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.eighteenGreen,
//         stars: 0,
//       },
//     ],
//     cardsAmountPerRound: 5,
//   },
//   {
//     id: 29,
//     lvl: 4,
//     isBoss: false,
//     name: ' Skelet Veteran',
//     description: "I’m dying to meet you! Literally!",
//     attributes: {
//       health: 130,
//       mana: 3,
//       defence: 0,
//       maxHealth: 130,
//       maxMana: 3,
//     },
//     cards: [{
//       cardId: CardIds.eighteenRed,
//       stars: 0,
//     }, {
//       cardId: CardIds.sevenRed,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.fourGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.twoGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.eightRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.seventeenRed,
//         stars: 0,
//       },
//     ],
//     cardsAmountPerRound: 6,
//   },
//   {
//     id: 30,
//     lvl: 4,
//     isBoss: false,
//     name: 'Gorebug',
//     description:"Clink... Clonk...",
//     attributes: {
//       health: 150,
//       mana: 3,
//       defence: 0,
//       maxHealth: 150,
//       maxMana: 3,
//     },
//     cards: [{
//       cardId: CardIds.fifteenRed,
//       stars: 0,
//     }, {
//       cardId: CardIds.nineteenRed,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.seventeenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fourteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.eightRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.tenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.sixteenRed,
//         stars: 0,
//       },
//     ],
//     cardsAmountPerRound: 6,
//   },
//   {
//     id: 31,
//     lvl: 4,
//     isBoss: false,
//     name: 'Vampire Prince',
//     description: "Mmm smell of blood",
//     attributes: {
//       health: 160,
//       mana: 6,
//       defence: 0,
//       maxHealth: 160,
//       maxMana: 6,
//     },
//     cards: [{
//       cardId: CardIds.elevenRed,
//       stars: 0,
//     }, {
//       cardId: CardIds.elevenRed,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.fifteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.sevenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.twelveGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.twelveGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.threeGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.nineRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.tenRed,
//         stars: 0,
//       },
//     ],
//     cardsAmountPerRound: 3,
//   },
//   {
//     id: 32,
//     lvl: 4,
//     isBoss: true,
//     name: 'Old Gravewoken',
//     description: "Clack... Clack... Clack...",
//     attributes: {
//       health: 200,
//       mana: 6,
//       defence: 0,
//       maxHealth: 200,
//       maxMana: 6,
//     },
//     cards: [{
//       cardId: CardIds.threeRed,
//       stars: 0,
//     }, {
//       cardId: CardIds.eighteenGreen,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.eighteenGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.nineRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.sixGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.sevenGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.twelveGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.elevenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.eighteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.twoRed,
//         stars: 0,
//       },
//     ],
//     cardsAmountPerRound: 6,
//   },
//   {
//     id: 33,
//     lvl: 4,
//     isBoss: false,
//     name: 'Lost Soul',
//     description: "You will become my doll!",
//     attributes: {
//       health: 200,
//       mana: 3,
//       defence: 0,
//       maxHealth: 200,
//       maxMana: 3,
//     },
//     cards: [{
//       cardId: CardIds.eighteenRed,
//       stars: 0,
//     }, {
//       cardId: CardIds.sevenRed,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.fourGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fourGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.twoGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.twoGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.eightRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.seventeenRed,
//         stars: 0,
//       },
//     ],
//     cardsAmountPerRound: 5,
//   },
//   {
//     id: 34,
//     lvl: 4,
//     isBoss: false,
//     name: 'Ghoul Dog',
//     description: "Grrr...",
//     attributes: {
//       health: 210,
//       mana: 4,
//       defence: 0,
//       maxHealth: 210,
//       maxMana: 4,
//     },
//     cards: [{
//       cardId: CardIds.fourteenRed,
//       stars: 0,
//     }, {
//       cardId: CardIds.sixGreen,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.sevenGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.twelveGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.elevenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.eighteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.twoRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.tenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.nineGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.threeRed,
//         stars: 0,
//       },
//     ],
//     cardsAmountPerRound: 5,
//   },
//   {
//     id: 35,
//     lvl: 4,
//     isBoss: false,
//     name: 'Carrion Warden',
//     description: "Clap clap clap",
//     attributes: {
//       health: 220,
//       mana: 4,
//       defence: 0,
//       maxHealth: 220,
//       maxMana: 4,
//     },
//     cards: [{
//       cardId: CardIds.threeGreen,
//       stars: 0,
//     }, {
//       cardId: CardIds.sixGreen,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.twelveGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.twelveGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fifteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.nineteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.seventeenRed,
//         stars: 0,
//       },
//     ],
//     cardsAmountPerRound: 6,
//   },
//   {
//     id: 36,
//     lvl: 4,
//     isBoss: false,
//     name: 'Undead Hero ',
//     description: "Must... kill...",
//     attributes: {
//       health: 250,
//       mana: 4,
//       defence: 0,
//       maxHealth: 250,
//       maxMana: 4,
//     },
//     cards: [{
//       cardId: CardIds.fourGreen,
//       stars: 0,
//     }, {
//       cardId: CardIds.fourGreen,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.twoGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.elevenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.elevenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fifteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.twoRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.tenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.eightRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.nineGreen,
//         stars: 0,
//       },
//     ],
//     cardsAmountPerRound: 6,
//   },
//   {
//     id: 37,
//     lvl: 4,
//     isBoss: false,
//     name: 'Risen Necromancer',
//     description: "Now you will not win!",
//     attributes: {
//       health: 240,
//       mana: 6,
//       defence: 0,
//       maxHealth: 240,
//       maxMana: 6,
//     },
//     cards: [{
//       cardId: CardIds.threeGreen,
//       stars: 0,
//     }, {
//       cardId: CardIds.fourRed,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.fiveRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.seventeenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.eightRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.nineteenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.oneGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.twoGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.threeGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fourGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.tenGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.tenGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.nineGreen,
//         stars: 0,
//       },
//     ],
//     cardsAmountPerRound: 4,
//   },
//   {
//     id: 38,
//     lvl: 4,
//     isBoss: false,
//     name: 'Lira ',
//     description: "What ? You?! Aren't you dead?",
//     attributes: {
//       health: 300,
//       mana: 6,
//       defence: 0,
//       maxHealth: 300,
//       maxMana: 6,
//     },
//     cards: [{
//       cardId: CardIds.oneGreen,
//       stars: 0,
//     }, {
//       cardId: CardIds.twoGreen,
//       stars: 0,
//     },
//       {
//         cardId: CardIds.twoGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.threeGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.threeGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fourGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.fiveRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.sixGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.sevenGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.eightRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.sevenRed,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.tenGreen,
//         stars: 0,
//       },
//       {
//         cardId: CardIds.tenGreen,
//         stars: 0,
//       },
//     ],
//     cardsAmountPerRound: 6,
//   },
// ]
