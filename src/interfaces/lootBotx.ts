export interface LootBoxOpenResult {
  amount: number;
  rewardType: ItemType;
  rewardId: number;
}

export enum LootboxId {
  Regular,
  Rare,
  Legendary,
  Keys,
}

export enum ItemType {
  timeBoosts,
  lootBox,
  farmResource,
  universalShard,
  heroShard,
}

export enum UniversalShard {
  heroShardUniversal,
  heroShardUniversalRare,
  heroShardUniversalLegendary,
  none,
}
export enum HeroShard {
  firstHero,
}
export enum TimeBoosts {
  boost1m,
  boost5m,
  boost15m,
  boost1h,
  boost8h,
}
