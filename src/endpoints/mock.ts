export interface BattleInit {
  maxHp: number;
  currentHp: number;
  maxMana: number;
  defense: number;
  heroId: number;
  cardsAtDeck: [
    {
      id: number;
      uid: string;
      lvl: number;
    }
  ];
  cardsAtHand: [
    {
      id: number;
      uid: string;
      lvl: number;
    }
  ];
  actionPoints: number;
  enemy: {
    id: number;
    lvl: number;
    maxHp: number;
    maxMana: number;
    defense: number;
    cardsAtHand: [
      {
        id: number;
        uid: string;
        lvl: number;
      }
    ];
  };
}

export enum ExecutionActionType {
  addEffect, // накалдываем бафф/дебафф
  executeEffect, // исполняется еффект бафф/дебаффа
  removeEffect, // удаляем бафф/дебафф
  executeSkill, // исполняем скилл
  changeParameters, // добавление/уменьшения хп/маны....
  updateCards, // обновляем карты в руке
  discardCards, // сбрасываем карты
  shuffleCards, // перемешиваем карты
}

export enum Opponent {
  hero,
  enemy,
}

export enum Parameter {
  health,
  mana,
  actionPoints,
  defense,
}

export enum CardType {
  atk,
  action,
  equip,
  spell,
}

// export interface MakeAction {
//   type: ExecutionActionType;
//   data: {
//     effectUid?: string;
//     effectId?: number;
//     durationInRounds?: number;
//     skillId?: string;
//     target: Opponent;
//     parameters?: {
//       parameter: Parameter,
//       value: number;
//     }
//   }
// }

export interface HeroCards {
  cardId: number;
  stars: number;
}

export enum HeroType {
  warrior,
  wizard,
}

export const heroConfig: HeroConfig[] = [
  {
    id: 0,
    type: HeroType.warrior,
    hp: 100,
    mana: 100,
    cards: [],
    lvl: 1,
  },
];

export interface HeroConfig {
  id: number;
  type: HeroType;
  hp: number; //начальные х-ки
  mana: number; //начальные х-ки
  cards: HeroCards[];
  lvl: number;
}

export type MakeAction =
  | {
      type: ExecutionActionType;
      effectUid: string;
      effectId: number;
      durationInRounds: number;
      target: Opponent;
    }
  | {
      type: ExecutionActionType;
      parameter: Parameter;
      value: number;
      target: Opponent;
    }
  | {
      type: ExecutionActionType;
      target: Opponent;
      skillId: string;
    }
  | {
      type: ExecutionActionType;
      target: Opponent;
      cardIds: number[];
    }
  | {
      type: ExecutionActionType;
      target: Opponent;
      value: number;
      cardIds: number[];
    }
  | {
      type: ExecutionActionType;
      target: Opponent;
      value: number;
    };

export interface EndTurn {
  steps: {
    cardInfo?: { cardId: number; lvl: number; uid: string };
    actions: MakeAction[];
  }[];
  cardsAtHand: [
    {
      id: number;
      uid: string;
      lvl: number;
    }
  ];
  cardsAtDeck: [
    {
      id: number;
      uid: string;
      lvl: number;
    }
  ];
  enemy: {
    cardsAtHand: [
      {
        id: number;
        uid: string;
        lvl: number;
      }
    ];
  };
}

// enum CardType {
//   atk
// act
// equip
// spell
// }

export enum ConditionParameter {
  health,
  mana,
  actionPoints,
  defense,
}

export enum CalculationMethod {
  percent,
  count,
}

export enum ConditionSide {
  less,
  more,
}

export enum StageType {
  enemy,
  elixir,
  shop,
  forge,
  bonfire,
  tavern,
  boss,
  chest,
  random,
}

export enum AwardType {
  gold,
  card,
  mana,
  health,
}

export interface DungeonStagesResponse {
  id: number;
  stageId: number;
  type: StageType;
  amount: number;
  currentAmount: number;
}

export type DungeonStage =
  | {
      id: number; //хилка
      type: StageType;
      amount: number;
      lvl?: number;
      title: string;
      description: string;
      currentAmount: number;
      percent?: number;
      pool?: StageType[];
      buildingId?: number;
    }
  | {
      //батл
      id: number;
      type: StageType;
      enemyId: number;
      lvl?: number;
      title: "";
      description?: string;
      buildingId?: number;
      pool?: StageType[];
    }
  | {
      id: number; // сундук
      type: StageType;
      awardType: AwardType;
      title: string;
      description?: string;
      buildingId?: number;
      lvl?: number;
      rewardAmount?: number;
      percent?: number;
      pool?: StageType[];
    }
  | {
      id: number; // магазин/кузница/таверна/сундук
      type: StageType;
      title: string;
      description?: string;
      buildingId?: number;
      lvl?: number;
      percent?: number;
      pool?: StageType[];
    }
  | {
      id: number; // random
      type: StageType;
      description?: string;
      lvl?: number;
      buildingId?: number;
      poolId?: StageType[];
    };

export interface DungeonType {
  dungeonId: number;
  description: string;
  stages: DungeonStage[];
}

export interface BattleSaves {
  dungeonId: number;
  stages: DungeonStagesResponse[];
  enemyId?: number;
  currentHp: number;
  currentMana: number;
  gold: number;
  currentStage?: number;
  buildingId: number;
}

//export const dungeonConfig: DungeonType[] = [];
// dungeonId: 1,
//   stages: [
//     {
//       type: StageType.health,
//       amount: 2,
//     },
//     {
//      type: StageType.enemy,
//       enemyId: 0,
//     },
//     {
//       type: StageType.chest,
//      awardType: AwardType.gold,
//       rewardAmount: 10,
//     },
//     {
//       type: StageType.health,
//       amount: 2,
//     },
//     {
//       type: StageType.enemy,
//       enemyId: 0,
//     },
//     {
//       type: StageType.chest,
//       awardType: AwardType.gold,
//       rewardAmount: 10,
//     },
//     {
//       type: StageType.health,
//       amount: 2,
//     },
//     {
//       type: StageType.boss,
//       enemyId: 1,
//     },
//     {
//       type: StageType.chest,
//       awardType: AwardType.gold,
//       rewardAmount: 10,
//     },
//   ]
// }];

export interface CardsConfig {
  id: number;
  data: {
    type: CardType;
    name: string;
    description: string;
    stars: number;
    priceManna?: number;
    actionPoints?: number;
    draggable?: boolean;
    condition?: {
      target: Opponent;
      parameter: ConditionParameter;
      value: number;
      calculationMethod: CalculationMethod;
      conditionSide: ConditionSide;
    };
  };
}

export const mockCards: CardsConfig[] = [
  {
    id: 0,
    data: {
      type: CardType.atk,
      name: "Stone",
      description: "Deal 3 dmg. Kill: Gain 2 max health.",
      stars: 0,
      draggable: true,
    },
  },
  {
    id: 8, // DOUBLE ID
    data: {
      type: CardType.atk,
      name: "PrankCard",
      description: "Prank",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 9,
    data: {
      type: CardType.atk,
      name: "1Red",
      description: "Deal 3 dmg. Kill: Gain 2 max health.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 17,
    data: {
      type: CardType.atk,
      name: "2Red",
      description: "Deal 3 dmg +1 per for 5 lost HP.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 6,
    data: {
      type: CardType.atk,
      name: "3Red",
      description: "Deal 9 dmg. 2 self-pierce.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 18,
    data: {
      type: CardType.atk,
      name: "4Red",
      description: "Exiled. Deal 5 damage. Get a level 3 Basic Attack.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 19,
    data: {
      type: CardType.atk,
      name: "5Red",
      description: "Deal 2 dmg per equipped item.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 1,
    data: {
      type: CardType.atk,
      name: "6Red",
      description: "Deal 1 dmg. Repeats 3 times.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 15,
    data: {
      type: CardType.atk,
      name: "7Red",
      description: "Deal 12 damage.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 20,
    data: {
      type: CardType.atk,
      name: "8Red",
      description: "Shuffle 2 Pranks into enemy deck.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 4,
    data: {
      type: CardType.atk,
      name: "9Red",
      description: "Deal 2 dmg. If <30% HP, deal 20 dmg.",
      stars: 0,
      priceManna: 0,
      condition: {
        target: Opponent.enemy,
        parameter: ConditionParameter.health,
        value: 30,
        calculationMethod: CalculationMethod.percent,
        conditionSide: ConditionSide.less,
      },
    },
  },
  {
    id: 13,
    data: {
      type: CardType.atk,
      name: "10Red",
      description: "Draw 2 cards. Next turn: -1 card.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 11,
    data: {
      type: CardType.atk,
      name: "11Red",
      description: "Deal 3 dmg. Both draw 1 less card.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 22,
    data: {
      type: CardType.atk,
      name: "12Red",
      description: "Deal 4 lightning dmg. +1 dmg this turn.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 23,
    data: {
      type: CardType.atk,
      name: "13Red",
      description: "Deal 5  dmg. Take 1 less dmg till next turn.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 21,
    data: {
      type: CardType.atk,
      name: "14Red",
      description: "Deal 6  piercing damage.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 10,
    data: {
      type: CardType.atk,
      name: "15Red",
      description: "Deal 3 damage. Draw 1 card.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 14,
    data: {
      type: CardType.atk,
      name: "16Red",
      description: "Deal 3 dmg. Restore same HP.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 36,
    data: {
      type: CardType.atk,
      name: "17Red",
      description: "Copy previous attack card's effects.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 12,
    data: {
      type: CardType.atk,
      name: "18Red",
      description: "Deal 2 damage and draw 2 cards.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 24,
    data: {
      type: CardType.atk,
      name: "19Red",
      description: "Negate enemy attack. 2 dmg. Draw 1 card.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 25,
    data: {
      type: CardType.spell,
      name: "1Green",
      description: "Deal dmg equal to 25% of your health.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 26,
    data: {
      type: CardType.spell,
      name: "2Green",
      description: "Gain Armor x8, take 1 pierce dmg.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 2,
    data: {
      type: CardType.spell,
      name: "3Green",
      description: "Gain 4 Armor. Draw a card.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 27,
    data: {
      type: CardType.spell,
      name: "4Green",
      description: "Gain 8 Armor.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 288,
    data: {
      type: CardType.spell,
      name: "5Green",
      description: "Exiled. View 3 cards, keep 1 permanently.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 16,
    data: {
      type: CardType.spell,
      name: "6Green",
      description: "Draw 2 cards. Cost -1 Action  per power.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 28,
    data: {
      type: CardType.spell,
      name: "7Green",
      description: "Exiled. +1 Action, 1 pierce dmg, draw 1 card.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 311,
    data: {
      type: CardType.spell,
      name: "8Green",
      description: "Exiled. This turn, draw 1 card per use ATC card.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 29,
    data: {
      type: CardType.spell,
      name: "9Green",
      description: "Copy all attack cards, shuffle into deck. Draw 1 card.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 33,
    data: {
      type: CardType.spell,
      name: "10Green",
      description: "Each draws 3. Enemy discards non-attacks.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 30,
    data: {
      type: CardType.spell,
      name: "11Green",
      description: "Deal 20 fire dmg. Exile this card.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 34,
    data: {
      type: CardType.spell,
      name: "12Green",
      description: "Draw 1 card. Gain random temp attack.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 31,
    data: {
      type: CardType.spell,
      name: "13Green",
      description: "Next card dmg is doubled this turn.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 366,
    data: {
      type: CardType.spell,
      name: "14Green",
      description: "View 3 your cards, copy 1 to hand.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 32,
    data: {
      type: CardType.spell,
      name: "15Green",
      description: "Exiled. Gain Armor x2. -2 dmg for 2 turns.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 38,
    data: {
      type: CardType.spell,
      name: "16Green",
      description:
        "1 star: Armor x4, 2 star: Armor x5. Transform leftmost attack to copy.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 39,
    data: {
      type: CardType.spell,
      name: "17Green",
      description: "Exiled. Shuffle 3 temp copies of attack into deck.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 7,
    data: {
      type: CardType.spell,
      name: "18Green",
      description:
        "Shuffle 2 Pranks into enemy deck. Enemy discards 1 next turn.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 70,
    data: {
      type: CardType.spell,
      name: "20Green",
      description: "",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 41,
    data: {
      type: CardType.equip,
      name: "1Blue",
      description: "When use 2 attacks: Deal 1 dmg.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 42,
    data: {
      type: CardType.equip,
      name: "2Blue",
      description: "Take dmg: Next your dmg is doubled.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 43,
    data: {
      type: CardType.equip,
      name: "3Blue",
      description: "Start turn: Take 1 pierce dmg, gain 3 armor.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 44,
    data: {
      type: CardType.equip,
      name: "4Blue",
      description: "Start turn: Copy 1 random card to hand.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 45,
    data: {
      type: CardType.equip,
      name: "5Blue",
      description: "When use attacks: Deal 1 lightning dmg.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 46,
    data: {
      type: CardType.equip,
      name: "6Blue",
      description: "Start turn: Take 1 pierce dmg, draw 1 card.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 47,
    data: {
      type: CardType.equip,
      name: "7Blue",
      description:
        "When Use Action: Next attack deals double dmg, +1 Action next turn.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 48,
    data: {
      type: CardType.equip,
      name: "8Blue",
      description: "Start turn: Enemy gets basic attack, you draw 1.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 35,
    data: {
      type: CardType.equip,
      name: "9Blue",
      description: "Each time enemy ATK: Deal pierce dmg = hand size.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 50,
    data: {
      type: CardType.equip,
      name: "10Blue",
      description: "Start Enemy turn: +2 all dmg.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 51,
    data: {
      type: CardType.equip,
      name: "11Blue",
      description: "Enemy uses an attack card: Takes 2 fire dmg.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 52,
    data: {
      type: CardType.equip,
      name: "12Blue",
      description: "Play Basic Attack: Add temp copy to hand.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 53,
    data: {
      type: CardType.equip,
      name: "13Blue",
      description: "Restore 1 health for every 4 damage you deal.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 54,
    data: {
      type: CardType.equip,
      name: "14Blue",
      description: "Start turn: Draw armor card, +1 Action.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 55,
    data: {
      type: CardType.equip,
      name: "15Blue",
      description: "Attacks take effect twice, discard left-most card.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 56,
    data: {
      type: CardType.equip,
      name: "16Blue",
      description: "End turn: Equip random item, become Wind-Up Knight.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 57,
    data: {
      type: CardType.equip,
      name: "17Blue",
      description: "You take -1 damage.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 3,
    data: {
      type: CardType.equip,
      name: "18Blue",
      description: "End turn: 1 dmg per power.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 58,
    data: {
      type: CardType.equip,
      name: "19Blue",
      description: "Start turn: Gain +2 armor.",
      stars: 0,
      actionPoints: 0,
    },
  },
  {
    id: 5,
    data: {
      type: CardType.equip,
      name: "20Blue",
      description: "At the start of your turn gain Armor x2.",
      stars: 0,
      actionPoints: 0,
    },
  },
  // last id: 58
];
