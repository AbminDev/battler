// HeroesList.tsx
import { useEffect, useState } from "react";
import { HeroCard, HeroComponent } from "./components";
import { CardDisappear, LevelUp, Startbattle } from "../../components";
import { TitleField } from "../Room";
import { PopupButton } from "../../components/PopupButton";
import {
  getHeroes,
  getHeroTierUpgradePrice,
} from "../../endpoints/heroEndpoints";
import { useTelegram } from "../../hooks/useTelegram";
import {
  ConfigHero,
  FullHero,
  Hero,
  heroesConfig,
  HeroRarity,
} from "../../interfaces/hero";
import { RecruitModal } from "../../containers/Heroes/components/Recruit";
import { HandleBackButton } from "../../layout/components/HeaderCave/components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { parseFullHero } from "../../utils/heroParser";
import { useTranslation } from "react-i18next";
import { updateBattleSave } from "../../utils/updateBattleSave";
import { useUtils } from "../../utils/navigateTo";
import { RestartBattle } from "../../components/RestartBattle";
import { getDungeonProgressByDungeonId } from "../../endpoints/dungeonEndpoints"; // Переконайтеся, що цей імпорт правильний
import { setHeroesList } from "../../app/features/heroesSlice";
import { Resources } from "../../enums/resources";

interface HeroesListProps {
  dungeon?: {
    dungeonId: number;
  };
}

export const HeroesList = (props: HeroesListProps) => {
  const { userId } = useTelegram();
  const [selectedHeroId, setSelectedHeroId] = useState<number | null>(null);
  const [heroIdInDungeon, setHeroIdInDungeon] = useState<number | null>(null);
  const [recruitModalOpen, setRecruitModalOpen] = useState(false);
  const { t } = useTranslation();
  const appConfig = useSelector((state: RootState) => state.appConfig.configs);

  const dispatch = useDispatch();
  const allHeroes: ConfigHero[] = appConfig.heroes.variables;

  const heroesList = useSelector((state: RootState) => state.heroes.heroesList);

  // const [heroesList, setHeroesList] = useState<FullHero[]>([]);
  const { navigateTo } = useUtils();

  const [showDungeonMenu, setShowDungeonMenu] = useState(false);
  const [selectedInDungeonId, setSelectedInDungeonId] = useState<number | null>(
    null
  ); // Новий стан

  const handleHeroInDungeon = async (
    buildingId: number,
    heroIdInDungeon: number
  ) => {
    try {
      const progress = await getDungeonProgressByDungeonId({
        clientId: userId,
        buildingId: buildingId,
        heroId: heroIdInDungeon,
      });

      if (progress) {
        console.log("PROGRESS!!!!", progress);
        updateBattleSave({
          save: {
            gold: progress.gold,
            currentHp: progress.currentHp,
            currentMana: progress.currentMana,
            stages: progress.stages,
            dungeonId: progress.currentDungeonId,
            buildingId,
          },
          clientId: userId,
        });
      }

      navigateTo("/dungeon");
    } catch (error) {
      console.error("Error handling dungeon:", error);
    }
  };

  const closedHeroImage = require("../../assets/images/heroes/cards/closed-hero.png");
  const getHeroesList = async () => {
    try {
      // Отримання даних з API
      const result = await getHeroes({ clientId: userId });

      if (result?.heroes?.length) {
        // Створюємо мапу для швидкого пошуку Hero за heroId
        const heroMap: Record<number, Hero> = {};
        result.heroes.forEach((hero: Hero) => {
          heroMap[hero.heroId] = hero;
        });

        // Перетворюємо доступних героїв у FullHero[]
        const heroes: FullHero[] = allHeroes.map((configHero: ConfigHero) => {
          const heroData: Hero | undefined = heroMap[configHero.id.value];

          if (heroData) {
            const hero = parseFullHero(configHero, heroData);

            console.log("hero", hero);
            return {
              ...hero,
              name: `${t(`heroes.${configHero.id.value}`)}`,
            };
          } else {
            return {
              heroId: configHero.id.value,
              boosts: { hp: 0, mana: 0 },
              level: 0,
              inDungeon: false,
              upgradeCards: 0,
              expToNextLevel: 0,
              upgrades: [{ id: 1, level: 1 }],
              upgradesCount: 0,
              id: configHero.id.value,
              isAvaillable: false,
              tiers: [],
              levels: [],
              img: require(`../../assets/images/heroes/cards/hero-${configHero.id.value}.png`),
              name: "",
              rarity: HeroRarity.Rare,
              rating: { claimedLevels: 1, totalLevels: 30 },
              energyType: 0,
              energyAmount: 0,
              health: 0,
              nextLevel: null,
              cardsAmount: 0,
              cards: [],
              inDungeonId: 0,
              maxLevel: 1,
            };
          }
        });

        dispatch(setHeroesList(heroes));
      }
    } catch (error) {
      console.error("Error fetching heroes:", error);
    }
  };

  useEffect(() => {
    getHeroesList();
  }, [userId]);

  const selectedHero = heroesList.find((hero) => hero.id === selectedHeroId);

  // Функція для переходу до наступного героя
  const handleNext = () => {
    if (selectedHeroId === null) return;
    const currentIndex = heroesList.findIndex(
      (hero) => hero.id === selectedHeroId
    );
    const nextIndex = (currentIndex + 1) % heroesList.length;
    setSelectedHeroId(heroesList[nextIndex].id);
  };

  // Функція для переходу до попереднього героя
  const handlePrevious = () => {
    if (selectedHeroId === null) return;
    const currentIndex = heroesList.findIndex(
      (hero) => hero.id === selectedHeroId
    );
    const previousIndex =
      (currentIndex - 1 + heroesList.length) % heroesList.length;
    setSelectedHeroId(heroesList[previousIndex].id);
  };
  const resources = useSelector(
    (state: RootState) => state.resources.resources
  );

  const currentValue = resources.find(
    (v) => v.resourceType === Resources.experience
  )!.value;

  return (
    <>
      {!recruitModalOpen && !selectedHero && (
        <div className="absolute pt-5 pl-5 z-[3]">
          <HandleBackButton />
        </div>
      )}
      <div className="flex flex-col min-h-screen overflow-auto z-[2]">
        <div className="flex justify-center items-center pt-3">
          {selectedHero ? (
            <div className="text-center text-white text-2xl font-normal leading-normal">
              {selectedHero.name}
            </div>
          ) : (
            <TitleField title={"Hero list"} />
          )}
        </div>
        {showDungeonMenu &&
          selectedInDungeonId !== null &&
          heroIdInDungeon !== null && (
            <RestartBattle
              onClose={() => {
                setShowDungeonMenu(false);
                setSelectedInDungeonId(null); // Скидання selectedInDungeonId
              }}
              handleHeroInDungeon={handleHeroInDungeon} // Передача функції
              inDungeonId={selectedInDungeonId} // Передача inDungeonId
              heroIdInDungeon={heroIdInDungeon} // Передача inDungeonId
            />
          )}
        <div className="flex-grow py-10">
          {selectedHero && (
            <HeroCard
              cards={selectedHero.cards}
              cardsAmount={selectedHero.cardsAmount}
              getHeroesList={getHeroesList}
              upgradeCards={selectedHero.upgradeCards}
              nextLevel={selectedHero.nextLevel}
              health={selectedHero.health}
              price={selectedHero.expToNextLevel}
              mana={selectedHero.energyAmount}
              manaType={selectedHero.energyType}
              id={selectedHero.id}
              rating={selectedHero.rating}
              img={selectedHero.img}
              name={selectedHero.name}
              level={selectedHero.level}
              maxLevel={selectedHero.maxLevel}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              handleClose={() => setSelectedHeroId(null)}
              description={""}
              heroData={[]}
              treesData={selectedHero.tiers}
              skills={selectedHero.levels}
            />
          )}
        </div>

        {!selectedHero && (
          <div className="absolute top-16 bottom-24 inset-x-4 bg-[#554837] border border-[#18191a] rounded-[2px] p-[2px]">
            {/* Верхні кути рамки */}
            <img
              src={require("../../assets/images/cards-modal-border.png")}
              className="absolute w-[17.5px] h-[21px] -top-[6px] -left-[5px]"
              alt=""
            />
            <img
              src={require("../../assets/images/cards-modal-border.png")}
              className="absolute w-[17.5px] h-[21px] -bottom-[6.5px] -left-[4.5px] -rotate-90"
              alt=""
            />
            <img
              src={require("../../assets/images/cards-modal-border.png")}
              className="absolute w-[17.5px] h-[21px] -bottom-[5.5px] -right-[4.5px] -rotate-180"
              alt=""
            />
            <img
              src={require("../../assets/images/cards-modal-border.png")}
              className="absolute w-[17.5px] h-[21px] -top-[6px] -right-[5px] transform scale-x-[-1]"
              alt=""
            />
            <div className="w-full h-full bg-[#242520] border border-[#18191a] rounded-[2px] p-3 shadow-inner-sm-white">
              <div className="relative w-full h-full bg-[#201b18] rounded-[1px] p-3 pt-3 shadow-inner-sm-black">
                {heroesList.length ? (
                  // Додаємо обгортку для прокручування
                  <div className="relative h-full overflow-y-auto">
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {heroesList.map((hero) => {
                        return (
                          <div
                            key={hero.id}
                            onClick={() => {
                              if (hero.isAvaillable) {
                                setSelectedHeroId(hero.id);
                                // if (hero.inDungeon) {
                                //   setSelectedInDungeonId(hero.inDungeonId); // Встановлюємо inDungeonId
                                //   setShowDungeonMenu(true);
                                //   setHeroIdInDungeon(hero.id);
                                // } else {
                                //   setSelectedHeroId(hero.id);
                                // }
                              }
                            }}
                            className="cursor-pointer mt-[15px]"
                          >
                            <HeroComponent
                              inDungeon={hero.inDungeon}
                              id={hero.id}
                              name={hero.name}
                              img={hero.img || closedHeroImage}
                              available={hero.isAvaillable}
                              lvl={hero.level}
                              rating={hero.rating}
                              rarity={hero.rarity}
                              selected={selectedHeroId === hero.id}
                              hasLevelUp={hero.expToNextLevel < currentValue && hero.maxLevel > hero.level}
                              upgradeCards={hero.upgradeCards}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full w-full text-2xl text-white pb-12">
                    Empty
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {selectedHero && (
          <div className="absolute top-[55%] flex justify-between space-x-4 mt-4 w-full">
            {/* Optional Back Button */}
          </div>
        )}

        {!selectedHero && (
          <div className="absolute bottom-8 w-full px-28 flex justify-center items-center">
            <PopupButton
              width="auto"
              type={"blue"}
              onClick={() => setRecruitModalOpen(true)}
            >
              <div className="flex justify-center items-center z-10">
                {t("heroes.recruitHeroes")}
              </div>
            </PopupButton>
          </div>
        )}

        {recruitModalOpen && (
          <RecruitModal close={() => setRecruitModalOpen(false)} />
        )}
      </div>
    </>
  );
};
