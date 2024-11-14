import { CardsAtDeck } from "../endpoints/dungeonEndpoints";
import { HeroCards } from "../endpoints/mock";

export enum EBranch {
  left,
  central,
  right,
}

export enum BonusType {
  dungeonGold,
  dodgeEnemyDamage,
  gainMaxHp,
  armorEveryTwoTurn,
  cardUpdate,
  maxEnergy,
  minusDamageFirstTurn,
  enemyPoisonStartBattle,
  gainMaxHpDungeon,
  addEveryDealDamage,
  doubleFirstDamage,
  drawCards,
  randomATKCard,
  randomArtefactCard,
  additionalDMGeveryATK,
}

export interface Hero {
  boosts: { hp: number; mana: number };
  heroId: number;
  level: number;
  inDungeon: boolean;
  inDungeonId: number;
  upgradeCards: number;
  expToNextLevel: number;
  upgrades: { id: number; level: number }[];
  upgradesCount: number;
  cards: any[];
}

export interface ConfigHero {
  id: { value: number };
  energyAmount: { value: number };
  energyType: { value: number };
  health: { value: number };
  levels: { value: ConfigLevels[] };
  tiers: { value: ConfigTree[] };
}

export interface FullHero extends Hero {
  energyType: number;
  energyAmount: number;
  health: number;
  img: string;
  rating: { claimedLevels: number; totalLevels: number };
  rarity: HeroRarity;
  name: string;
  id: number;
  isAvaillable: boolean;
  tiers: Tree[];
  levels: Levels[];
  nextLevel: Levels | null;
  cardsAmount: number;
  maxLevel: number,
}

export interface ConfigLevels {
  id: { value: number };
  cost: { value: number };
  bonusType: { value: BonusType };
  bonusAmount: { value: number };
}

export interface Levels {
  id: number;
  cost: number;
  bonusType: BonusType;
  bonusAmount: number;
}

export interface ConfigTree {
  id: { value: number };
  levels: { value: ConfigTierLevel[] };
  prev: { value: number };
  type: { value: EBranch };
}

export interface Tree {
  isClaimed: boolean;
  isAvailable: boolean;
  id: number;
  type: EBranch;
  prev?: number;
  levels: TierLevel[];
}
export interface ConfigTierLevel {
  id: { value: number };
  rewards: {
    value: {
      bonusType: { value: BonusType };
      value: { value: number };
    }[];
  };
}
export interface TierLevel {
  isClaimed: boolean;
  id: number;
  rewards: {
    bonusType: BonusType;
    value: number;
  }[];
}
export enum HeroRarity {
  Rare = "rare",
  Epic = "epic",
  Legendary = "legendary",
}

export const heroesConfig = [
  {
    id: 0,
    cards: [],
    attributes: {
      health: 20,
      mana: 20,
      defence: 20,
      attack: 20,
    },
    name: "hero1",
  },
  {
    id: 1,
    cards: [],
    attributes: {
      health: 20,
      mana: 20,
      defence: 20,
      attack: 20,
    },
    name: "hero2",
  },
  {
    id: 2,
    cards: [],
    attributes: {
      health: 20,
      mana: 20,
      defence: 20,
      attack: 20,
    },
    name: "hero3",
  },
  {
    id: 3,
    cards: [],
    attributes: {
      health: 20,
      mana: 20,
      defence: 20,
      attack: 20,
    },
    name: "hero4",
  },
  {
    id: 4,
    cards: [],
    attributes: {
      health: 20,
      mana: 20,
      defence: 20,
      attack: 20,
    },
    name: "hero5",
  },
  {
    id: 5,
    cards: [],
    attributes: {
      health: 20,
      mana: 20,
      defence: 20,
      attack: 20,
    },
    name: "hero6",
  },
];
