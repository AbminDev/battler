// Inventory.tsx
import React, { useEffect, useState } from "react";
import { CardItem } from "./components/CardItem";
import { TitleField } from "../Room";
import { HandleBackButton } from "../../layout/components/HeaderCave/components";
import { BonusType, HeroRarity } from "../../interfaces/hero";
import { getMyLootboxes, openLootbox } from "../../endpoints/lootBoxEndpoints";
import { useTelegram } from "../../hooks/useTelegram";
import {
  HeroShard,
  ItemType,
  LootboxId,
  TimeBoosts,
  UniversalShard,
} from "../../interfaces/lootBotx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import {
  BoostsType,
  fetchActiveBoosts,
} from "../../app/features/inventorySlice";
import { OpenLootBox, QuantitySelector } from "./components";
import { PopupButton } from "../../components/PopupButton";
import { useTranslation } from "react-i18next";
import { getHeroesShards } from "../../endpoints/heroEndpoints";
import {
  heroShardMap,
  lootBoxMap,
  timeBoostsMap,
  universalShardMap,
} from "../../utils/mapping";
import { DisplayData, handleLootBoxResult } from "../../utils/lootBoxHandler";

// types.ts
export enum CategoryItem {
  Heroes,
  Items,
}

export interface BaseInventoryItem {
  id: string;
  name: string;
  type: ItemType;
  category: CategoryItem;
  amount: number;
  icon: string;
}

export interface LootBoxItem extends BaseInventoryItem {
  type: ItemType.lootBox;
  lootBoxRarity: LootboxId;
}

export interface BoostItem extends BaseInventoryItem {
  bonusId: number;
  type: ItemType.timeBoosts;
  boostsType: BoostsType;
  duration: number;
}

export interface HeroesItem extends BaseInventoryItem {
  rarity: UniversalShard | HeroShard;
}

export type InventoryItem = LootBoxItem | BoostItem | HeroesItem;

interface Tab {
  id: CategoryItem;
  label: string;
}

interface InventoryProps {
  closeDeck: () => void;
}

export const Inventory: React.FC<InventoryProps> = ({ closeDeck }) => {
  const [activeTab, setActiveTab] = useState<CategoryItem>(CategoryItem.Items);
  const { userId } = useTelegram();
  const [data, setData] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  // Визначаємо масив табів
  const tabs: Tab[] = [
    {
      id: CategoryItem.Items,
      label: t(`inventory.category.${CategoryItem.Items}`),
    },
    {
      id: CategoryItem.Heroes,
      label: t(`inventory.category.${CategoryItem.Heroes}`),
    },
  ];

  const boosts = useSelector((state: RootState) => state.inventory.boosts);

  const fetchData = async (type: CategoryItem) => {
    setLoading(true);
    try {
      if (type === CategoryItem.Items) {
        // Замість цього URL вставте ваш API endpoint
        const responseLootboxes = await getMyLootboxes({
          clientId: userId,
        });
        const mapedLootBoxes: LootBoxItem[] = responseLootboxes.map(
          (item, index) => {
            return {
              id: `lootBox-${item.lootBoxId}-${index}`,
              type: ItemType.lootBox,
              name: lootBoxMap[item.lootBoxId as LootboxId].name,
              lootBoxRarity: item.lootBoxId,
              category: CategoryItem.Items,
              amount: item.amount,
              icon: lootBoxMap[item.lootBoxId as LootboxId].image,
            };
          }
        );

        const mapedBoosts: BoostItem[] = boosts.map((item, index) => {
          return {
            id: `boost-${item.bonusId}-${index}`,
            type: ItemType.timeBoosts,
            category: CategoryItem.Items,
            name: timeBoostsMap[item.bonusId as TimeBoosts].name,
            bonusId: item.bonusId,
            boostsType: item.bonusType,
            duration: item.duration,
            amount: item.amount,
            icon: timeBoostsMap[item.bonusId as TimeBoosts].image,
          };
        });

        setData([...mapedLootBoxes, ...mapedBoosts]);
      }
      if (type === CategoryItem.Heroes) {
        const responseHeroesShards = await getHeroesShards({
          clientId: userId
        });

        const mappedHeroesShards: HeroesItem[] =
          responseHeroesShards.heroShards.map((item, index) => {
            return {
              id: `heroShards-${item.heroId}-${index}`,
              type: ItemType.heroShard,
              name: heroShardMap[item.heroId as HeroShard].name,
              category: CategoryItem.Heroes,
              amount: item.amount,
              icon: heroShardMap[item.heroId as HeroShard].image,
              rarity: item.heroId,
            };
          });

        const mappedUniversalShards: HeroesItem[] =
          responseHeroesShards.universalShards.map((item, index) => {
            return {
              id: `universalShards-${item.shardId}-${index}`,
              type: ItemType.universalShard,
              name: universalShardMap[item.shardId as UniversalShard].name,
              category: CategoryItem.Heroes,
              amount: item.amount,
              icon: universalShardMap[item.shardId as UniversalShard].image,
              rarity: item.shardId,
            };
          });

        setData([...mappedHeroesShards, ...mappedUniversalShards]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectItem = (item: InventoryItem) => {
    console.log("we are here");
    setSelectedItem(item);
  };

  const handleCloseItem = () => {
    setSelectedItem(null);
  };

  useEffect(() => {
    if (activeTab === CategoryItem.Items) {
      dispatch(fetchActiveBoosts(userId));
    }
    fetchData(activeTab);
  }, [activeTab]);

  // Функція для фільтрації даних за типом
  const getTabContent = (type: CategoryItem) => {
    if (loading) {
      return (
        <div className="flex items-center justify-center w-full text-2xl text-white pb-12">
          Loading...
        </div>
      );
    }

    if (data.length === 0) {
      return (
        <div className="flex items-center justify-center w-full text-2xl text-white pb-12">
          Empty
        </div>
      );
    }

    return (
      <div className="flex flex-wrap gap-4 justify-start">
        {data.map((item) => (
          <CardItem
            key={item.id}
            item={item}
            onSelect={handleSelectItem}
            selected={item.id === selectedItem?.id}
          />
        ))}
      </div>
    );
  };

  const [quantity, setQuantity] = useState<number>(0);

  const [rewards, setRewards] = useState<DisplayData[]>([]);
  const [openBoxName, setOpenBoxName] = useState<string | null>(null);
  const handleUse = async () => {
    if (selectedItem?.type === ItemType.lootBox) {
      const lootBoxItem = selectedItem as LootBoxItem;

      const result = await openLootbox({
        clientId: userId,
        lootBoxId: lootBoxItem.lootBoxRarity,
        amount: quantity,
      });

      setOpenBoxName(lootBoxItem.name);
      if (result) {
        const displayData: DisplayData[] = result
          .map(handleLootBoxResult)
          .filter((data): data is DisplayData => data !== null);

        setRewards(displayData);
      }
    }
    // Реалізуйте логіку використання лутбоксів
    console.log(`Використано ${quantity} лутбоксів`);
    // Наприклад, викликайте API або оновлюйте стан
  };
  const handleClose = () => {
    setOpenBoxName(null);
    setRewards([]);
    fetchData(activeTab);
  };

  return (
    <div className="w-full h-full fixed top-0 left-0 z-[56]  bg-[#554837] border border-[#18191a] rounded-[2px] p-[2px]">
      {/* Основий контент модального вікна */}
      <div className="w-full h-full bg-[#242520] border border-[#18191a] rounded-md p-4 shadow-inner">
        <div className="relative w-full h-full bg-[#201b18] rounded-md p-4  shadow-inner-sm-black">
          {/* Заголовок Inventory */}
          <div className="top-4 left-4 absolute z-[2]">
            <HandleBackButton onClick={closeDeck} />
          </div>
          <div className="flex justify-center pb-2">
            <TitleField title="Inventory" />
          </div>

          {/* Таби */}
          <div className="flex justify-center flex-wrap gap-2 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`border border-[#18191a] bg-[#4c3f2f] rounded-md p-1 shadow-inner ${
                  activeTab !== tab.id ? "opacity-40" : "opacity-100"
                } hover:opacity-80 transition`}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className="px-4 py-2 bg-[#272018] rounded-md text-white text-sm">
                  {tab.label}
                </div>
              </button>
            ))}
          </div>

          {/* Контент табів */}
          <div className="flex-1 relative">
            <div className="overflow-y-auto h-full pl-[11px]">
              {tabs.map((tab) =>
                activeTab === tab.id ? (
                  <div
                    key={tab.id}
                    className="scrollable-element transition-opacity duration-300"
                  >
                    {getTabContent(tab.id)}
                  </div>
                ) : null
              )}
            </div>
            {/* Вікно з описом вибраного елемента */}
          </div>
          {selectedItem && (
            <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
              <div className="w-full h-[3px] bg-[#3b332e]"></div>

              <div className="flex justify-between items-center mb-2 pt-2">
                <h2 className="text-xl font-bold text-white">
                  {selectedItem.name}
                </h2>
              </div>

              {selectedItem.type === ItemType.lootBox && (
                <>
                  <div className="w-[334px] text-[#dfd9c4] text-[15px] font-light font-['Londrina Solid'] leading-[18px] pb-2">
                    Use the Scroll to receive rewards.
                  </div>
                  <QuantitySelector
                    max={selectedItem.amount}
                    value={quantity}
                    onChange={setQuantity}
                  />
                  <div className="flex justify-center items-center">
                    <PopupButton
                      disabled={quantity === 0}
                      onClick={handleUse}
                      type={quantity === 0 ? "gray" : "blue"}
                    >
                      <div className="text-center text-[#ffefcb] text-lg font-normal font-['Londrina Solid'] leading-[18px]">
                        Use
                      </div>
                    </PopupButton>
                  </div>
                </>
              )}
            </div>
          )}
          {rewards.length && openBoxName ? (
            <OpenLootBox
              rewards={rewards}
              onClose={handleClose}
              openBoxName={openBoxName}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
