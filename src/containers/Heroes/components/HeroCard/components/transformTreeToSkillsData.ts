import { EBranch, TierLevel, Tree } from "../../../../../interfaces/hero";

// Визначте тип для skillsData
export interface SkillData {
  id: string;
  image: string;
  isClaimed: boolean;
  isAvailable: boolean;
  size: "large" | "small";
  position: { x: number; y: number };
  children: string[];
  levels: TierLevel[];
}

// Мапінг між EBranch та координатами X

const branchXMap: Record<EBranch, number> = {
  [EBranch.left]: 100,
  [EBranch.central]: 250,
  [EBranch.right]: 400,
};

const largeBranchImageMap: Record<EBranch, string[]> = {
  [EBranch.left]: [
    "first-left-skill.png",
    "second-left-skill.png",
    "third-left-skill.png",
  ],
  [EBranch.central]: ["first-skill.png", "second-skill.png"],
  [EBranch.right]: [
    "first-right-skill.png",
    "second-right-skill.png",
    "third-right-skill.png",
  ],
};

// Функція для перетворення Tree[] у skillsData[]
export const transformTreeToSkillsData = (trees: Tree[]): SkillData[] => {
  // Сортування дерев за ієрархією
  const sortedTrees = sortTrees(trees);

  console.log("sortedTrees", sortedTrees);

  const largeNodeCounters: Record<EBranch, number> = {
    [EBranch.left]: 0,
    [EBranch.central]: 0,
    [EBranch.right]: 0,
  };

  const skillsData: SkillData[] = sortedTrees.map((tree) => {
    const isLarge = tree.levels.length > 1;
    const size: "large" | "small" = isLarge ? "large" : "small";

    // Визначення зображення
    let image = "defaultSkillIcon.png";

    if (isLarge) {
      largeNodeCounters[tree.type] += 1;
      const count = largeNodeCounters[tree.type];

      // Вибір зображення на основі лічильника та типу гілки
      const images = largeBranchImageMap[tree.type];
      image = images[count - 1] || "defaultLargeSkill.png"; // Якщо більше зображень, ніж визначено, використовується дефолтне
    } else {
      if (tree.type === EBranch.left) image = "default-skill-left.png";
      else if (tree.type === EBranch.central)
        image = "default-skill-center.png";
      else if (tree.type === EBranch.right) image = "default-skill-right.png";
    }

    // Визначення глибини вузла (level)
    const depth = getDepth(trees, tree.id);

    // Визначення координат
    const xBase = branchXMap[tree.type];
    const yBase = depth * 100; // Наприклад, кожен рівень на 100px нижче

    // Компенсація для маленьких вузлів
    const offset = isLarge ? 0 : 24; // Відступ для вирівнювання малих вузлів

    const position = {
      x: xBase + offset,
      y: yBase, // Додатковий відступ для вертикального вирівнювання
    };

    // Визначення дітей
    const children = trees
      .filter((t) => t.prev === tree.id)
      .map((child) => child.id.toString());

    return {
      id: tree.id.toString(),
      image,
      size,
      position,
      children,
      levels: tree.levels,
      isClaimed: tree.isClaimed,
      isAvailable: tree.isAvailable,
    };
  });

  return skillsData;
};

// Допоміжна функція для сортування дерев за глибиною
const sortTrees = (trees: Tree[]): Tree[] => {
  const sorted: Tree[] = [];
  const map = new Map<number, Tree>();
  trees.forEach((tree) => map.set(tree.id, tree));

  const traverse = (id: number) => {
    const node = map.get(id);

    // Якщо node не знайдено, припиняємо рекурсію
    if (!node) {
      return;
    }

    // Якщо попередній id не 0, продовжуємо рекурсію
    if (node.prev !== undefined && node.prev !== 0) {
      traverse(node.prev);
    }

    // Додаємо node до sorted лише якщо його ще немає
    if (!sorted.find((t) => t.id === id)) {
      sorted.push(node);
    }
  };

  trees.forEach((tree) => traverse(tree.id));

  return sorted;
};

// Допоміжна функція для визначення глибини вузла
const getDepth = (trees: Tree[], id: number): number => {
  let depth = 0;
  let current = trees.find((tree) => tree.id === id);
  while (current && current.prev !== undefined && current.prev !== null) {
    depth += 1;
    current = trees.find((tree) => tree.id === current!.prev);
  }
  return depth;
};
