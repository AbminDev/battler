// lootBoxHandler.ts

import { Resources } from "../enums/resources";
import {
  HeroShard,
  ItemType,
  LootboxId,
  LootBoxOpenResult,
  TimeBoosts,
  UniversalShard,
} from "../interfaces/lootBotx";
import {
  resourcesMap,
  universalShardMap,
  timeBoostsMap,
  heroShardMap,
  lootBoxMap,
} from "./mapping";

export interface DisplayData {
  name: string;
  image: string;
  type: ItemType;
  amount: number;
  rarity: UniversalShard | LootboxId | Resources
}

const handleLootBoxResult = (result: LootBoxOpenResult): DisplayData | null => {
  const { amount, rewardType, rewardId } = result;

  switch (rewardType) {
    case ItemType.farmResource:
      const resource = resourcesMap[rewardId as Resources];
      return resource
        ? { ...resource, type: ItemType.farmResource, amount, rarity: rewardId === Resources.kitsu ? 2 : 1  }
        : null;

    case ItemType.universalShard:
      const shard = universalShardMap[rewardId as UniversalShard];
      return shard ? { ...shard, type: ItemType.universalShard, amount, rarity: rewardId  } : null;

    case ItemType.timeBoosts:
      const timeBoost = timeBoostsMap[rewardId as TimeBoosts];
      return timeBoost
        ? { ...timeBoost, type: ItemType.timeBoosts, amount, rarity: 4 }
        : null;

    case ItemType.heroShard:
      const heroShard = heroShardMap[rewardId as HeroShard];
      return heroShard
        ? { ...heroShard, type: ItemType.heroShard, amount, rarity: 3 }
        : null;

    case ItemType.lootBox:
      const lootBox = lootBoxMap[rewardId as LootboxId];
      return lootBox ? { ...lootBox, type: ItemType.lootBox, amount, rarity: rewardId } : null;

    default:
      return null;
  }
};

export { handleLootBoxResult };

