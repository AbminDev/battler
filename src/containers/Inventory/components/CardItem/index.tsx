// components/CardItem.tsx
import React from "react";
import { BoostItem, HeroesItem, InventoryItem, LootBoxItem } from "../..";
import { HeroRarity } from "../../../../interfaces/hero";
import classNames from "classnames";
import {
  ItemType,
  TimeBoosts,
  UniversalShard,
} from "../../../../interfaces/lootBotx";
import { timeBoostsMap } from "../../../../utils/mapping";

interface CardItemProps {
  item: InventoryItem;
  onSelect: (item: InventoryItem) => void;
  selected: boolean; // Новий пропс
}

const cardBackground: Record<number, string> = {
  [0]: "#005e86",
  [1]: "#4f2587",
  [2]: "#b16008",
};

const getItemBackGroundColor = (item: InventoryItem): string => {
  if (item.type === ItemType.lootBox) {
    const lootBoxItem = item as LootBoxItem;
    return cardBackground[lootBoxItem.lootBoxRarity];
  } else if (item.type === ItemType.timeBoosts) {
    return "#5a60ff";
  } else if (item.type === ItemType.universalShard) {
    const heroItem = item as HeroesItem;
    return cardBackground[heroItem.rarity];
  } else if (item.type === ItemType.heroShard) {
    const heroItem = item as HeroesItem;
    return cardBackground[heroItem.rarity];
  }
  return "#5BDFA4";
};

export const CardItem: React.FC<CardItemProps> = ({
  item,
  onSelect,
  selected,
}) => {
  const handleClick = () => {
    onSelect(item);
  };

  const isBoostItem = (item: InventoryItem): item is BoostItem => {
    return item.type === ItemType.timeBoosts;
  };

  return (
    <div
      onClick={handleClick}
      className={classNames(
        "relative flex flex-col items-center justify-center p-1 rounded-md shadow-lg w-[72px] h-[72px]"
      )}
      style={{ backgroundColor: getItemBackGroundColor(item) }}
    >
      {isBoostItem(item) && (
        <div className="absolute top-0 w-full flex justify-center items-center">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="p-1 w-full z-10 text-center text-white text-base font-normal font-['Londrina Solid'] leading-none">
            {item.name}
          </div>
        </div>
      )}
      <img
        src={item.icon}
        alt={`${item.type} icon`}
        className="w-[40px] h-[40px] object-contain"
      />

      <div className="absolute bottom-0 right-0 text-white px-1 text-xs font-semibold">
        <p>{item.amount}</p>
      </div>

      {selected && (
        <div className="absolute inset-0 rounded-md border-2 border-yellow-500"></div>
      )}
    </div>
  );
};
