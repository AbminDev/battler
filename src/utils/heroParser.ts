import {
  ConfigHero,
  ConfigLevels,
  ConfigTierLevel,
  ConfigTree,
  FullHero,
  Hero,
  Levels,
  TierLevel,
  Tree,
  BonusType,
  EBranch,
  HeroRarity,
} from "../interfaces/hero";

/**
 * Перетворює ConfigTierLevel у TierLevel
 * @param configTierLevel - Об'єкт ConfigTierLevel
 * @param upgrades - Масив оновлень користувача
 * @returns TierLevel
 */
const parseTierLevel = (
  configTierLevel: ConfigTierLevel,
  upgrades: { id: number; level: number }[],
  treeId: number
): TierLevel => {
  const upgrade = upgrades.find((u) => u.id === treeId);


  const isClaimed =
    upgrade !== undefined &&
    upgrade.id === treeId &&
    upgrade.level >= configTierLevel.id.value;

  return {
    isClaimed: isClaimed,
    id: configTierLevel.id.value,
    rewards: configTierLevel.rewards.value.map((reward) => ({
      bonusType: reward.bonusType.value,
      value: reward.value.value,
    })),
  };
};

/**
 * Перетворює ConfigTree у Tree
 * @param configTree - Об'єкт ConfigTree
 * @param upgrades - Масив оновлень користувача
 * @param claimedTreeIds - Набір вже заявлених Tree id
 * @returns Tree
 */
const parseTree = (
  configTree: ConfigTree,
  upgrades: { id: number; level: number }[],
  claimedTreeIds: Set<number>
): Tree => {
  const isClaimed = upgrades.some(
    (u) => u.id === configTree.id.value && u.level >= 1
  );

  const isAvailable =
    configTree.prev.value === 0 || claimedTreeIds.has(configTree.prev.value);

  const tree: Tree = {
    isClaimed: isClaimed,
    isAvailable: isAvailable,
    id: configTree.id.value,
    type: configTree.type.value,
    prev: configTree.prev.value,
    levels: configTree.levels.value.map((configTierLevel: ConfigTierLevel) =>
      parseTierLevel(configTierLevel, upgrades, configTree.id.value)
    ),
  };

  if (isClaimed) {
    claimedTreeIds.add(configTree.id.value);
  }

  return tree;
};

/**
 * Перетворює ConfigLevels у Levels
 * @param configLevel - Об'єкт ConfigLevels
 * @param heroLevel - Поточний рівень героя
 * @returns Levels або null, якщо рівень перевищує поточний рівень героя
 */
const parseLevels = (
  configLevel: ConfigLevels,
  heroLevel: number
): Levels | null => {
  if (configLevel.id.value <= heroLevel) {
    return {
      id: configLevel.id.value,
      cost: configLevel.cost.value,
      bonusType: configLevel.bonusType.value,
      bonusAmount: configLevel.bonusAmount.value,
    };
  }
  return null;
};

/**
 * Функція для оновлення рівнів та визначення наступного рівня
 * @param configLevels - Масив ConfigLevels
 * @param currentLevel - Поточний рівень героя
 * @returns Об'єкт з масивом Levels та наступним рівнем
 */
const updateLevel = (
  configLevels: ConfigLevels[],
  currentLevel: number
): { levels: Levels[]; nextLevel: Levels | null; maxLevel: number } => {
  
  if (!configLevels || configLevels.length === 0) {
    return { levels: [], nextLevel: null, maxLevel: 0 };
  }

  const maxLevel = Math.max(...configLevels.map((level) => level.id.value));
  const nextLevelId = currentLevel;
  const effectiveNextLevelId = nextLevelId > maxLevel ? maxLevel : nextLevelId;

  const levels: Levels[] = configLevels
    .map((configLevel: ConfigLevels) => parseLevels(configLevel, currentLevel))
    .filter((level): level is Levels => level !== null);

  const nextLevelConfig = configLevels.find(
    (level) => level.id.value === effectiveNextLevelId
  );
  const nextLevel: Levels | null = nextLevelConfig
    ? parseLevels(nextLevelConfig, effectiveNextLevelId)
    : null;

  return { levels, nextLevel, maxLevel };
};




interface LevelCounts {
  totalLevels: number;
  claimedLevels: number;
}

const calculateLevelCounts = (
  configTrees: ConfigTree[],
  upgrades:  { id: number; level: number }[]
): LevelCounts => {
  let totalLevels = 0;
  let claimedLevels = 0;
  const claimedTreeIds = new Set<number>();

  configTrees.forEach((configTree) => {
    const tree = parseTree(configTree, upgrades, claimedTreeIds);
    totalLevels += tree.levels.length;
    tree.levels.forEach((tierLevel) => {
      if (tierLevel.isClaimed) {
        claimedLevels += 1;
      }
    });
  });

  return { totalLevels, claimedLevels };
};

/**
 * Перетворює ConfigHero та Hero у FullHero
 * @param configHero - Об'єкт ConfigHero
 * @param heroData - Об'єкт Hero
 * @returns FullHero
 */
export const parseFullHero = (
  configHero: ConfigHero,
  heroData: Hero
): Omit<FullHero, "name"> => {
  const upgrades = heroData.upgrades; // Масив { id: number; level: number }[]

  const { levels, nextLevel, maxLevel } = updateLevel(
    configHero.levels.value,
    heroData.level
  );

  const claimedTreeIds = new Set<number>();

  const tiers: Tree[] = configHero.tiers.value.map((configTree: ConfigTree) =>
    parseTree(configTree, upgrades, claimedTreeIds)
  );

  const totalLevels = calculateLevelCounts(configHero.tiers.value, upgrades);
  console.log("totalLevels", totalLevels)
  const fullHero: Omit<FullHero, "name"> = {
    ...heroData, // Розгортаємо дані з Hero
    rarity: HeroRarity.Rare, // Встановіть значення відповідно до вашої логіки
    id: configHero.id.value,
    isAvaillable: true,
    tiers,
    levels,
    maxLevel,
    img: require(`../assets/images/heroes/cards/hero-${configHero.id.value}.png`),
    rating: totalLevels,
    energyAmount: configHero.energyAmount.value + heroData.boosts.mana,
    health: configHero.health.value + heroData.boosts.hp,
    energyType: configHero.energyType.value,
    nextLevel,
    cardsAmount: heroData.cards.length,
    cards: heroData.cards,
  };

  console.log("fullHero", fullHero);
  return fullHero;
};
