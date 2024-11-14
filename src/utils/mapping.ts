
import { Resources } from "../enums/resources";
import { HeroShard, LootboxId, TimeBoosts, UniversalShard } from "../interfaces/lootBotx";
import i18next from "i18next";


const resourcesMap: Record<Resources, { name: string; image: string }> = {
  [Resources.kitsu]: { name: i18next.t(`quests.resources.${Resources.kitsu}`), image: require('../assets/images/resource/1.png') },
  [Resources.stone]: { name: i18next.t(`quests.resources.${Resources.stone}`), image: require('../assets/images/resource/3.png') },
  [Resources.experience]: { name: i18next.t(`quests.resources.${Resources.experience}`), image: require('../assets/images/resource/4.png') },
  [Resources.none]: { name: i18next.t(`quests.resources.${Resources.none}`), image: '/path/to/none.png' },
  [Resources.keys]: { name: i18next.t(`quests.resources.${Resources.keys}`), image: require('../assets/images/keys.png') },
};


const universalShardMap: Record<UniversalShard, { name: string; image: string }> = {
  [UniversalShard.heroShardUniversal]: { name: i18next.t(`universalShard.${UniversalShard.heroShardUniversal}`), image:  require('../assets/images/heroes/shards/1.png') },
  [UniversalShard.heroShardUniversalRare]: { name: i18next.t(`universalShard.${UniversalShard.heroShardUniversalRare}`), image:  require('../assets/images/heroes/shards/2.png') },
  [UniversalShard.heroShardUniversalLegendary]: { name: i18next.t(`universalShard.${UniversalShard.heroShardUniversalLegendary}`), image:  require('../assets/images/heroes/shards/3.png') },
  [UniversalShard.none]: { name: i18next.t(`universalShard.${UniversalShard.none}`), image: require('../assets/images/heroes/shards/1.png') },
}; 

const timeBoostsMap: Record<TimeBoosts, { name: string; image: string }> = {
    [TimeBoosts.boost1m]: { name: i18next.t(`timeBoosts.${TimeBoosts.boost1m}`), image: require('../assets/images/speedUp.png') },
    [TimeBoosts.boost5m]: { name: i18next.t(`timeBoosts.${TimeBoosts.boost5m}`), image: require('../assets/images/speedUp.png') },
    [TimeBoosts.boost15m]: { name: i18next.t(`timeBoosts.${TimeBoosts.boost15m}`), image: require('../assets/images/speedUp.png') },
    [TimeBoosts.boost1h]: { name: i18next.t(`timeBoosts.${TimeBoosts.boost1h}`), image: require('../assets/images/speedUp.png') },
    [TimeBoosts.boost8h]: { name: i18next.t(`timeBoosts.${TimeBoosts.boost8h}`), image: require('../assets/images/speedUp.png') },
  };

  const heroShardMap: Record<HeroShard, { name: string; image: string }> = {
    [HeroShard.firstHero]: { name: i18next.t(`heroes.${HeroShard.firstHero}`) + " " + i18next.t('heroShard.0'), image:  require('../assets/images/heroes/heroShards/0.png') },
  };

  const lootBoxMap: Record<LootboxId, { name: string; image: string }> = {
    [LootboxId.Regular]: { name: i18next.t(`lootBoxMap.${LootboxId.Regular}`), image: require('../assets/images/inventoryItems/lootBox/0.png') },
    [LootboxId.Rare]: { name: i18next.t(`lootBoxMap.${LootboxId.Rare}`), image: require('../assets/images/inventoryItems/lootBox/1.png') },
    [LootboxId.Legendary]: { name: i18next.t(`lootBoxMap.${LootboxId.Legendary}`), image: require('../assets/images/inventoryItems/lootBox/2.png') },
    [LootboxId.Keys]: { name: i18next.t(`lootBoxMap.${LootboxId.Keys}`), image: '/path/to/none.png' },
  };


export {
  resourcesMap,
  universalShardMap,
  timeBoostsMap,
  heroShardMap, 
  lootBoxMap
};
