import { InventoryButton } from "../../../components/InventoryButton";
import { ChatButton } from "../../../components/ChatButton";
import { useUtils } from "../../../utils/navigateTo";
import { useTranslation } from "react-i18next";
import { AllianceButton, FriendsButton } from "../../../components";
import { CardsModal } from "../../../pages/Battle/CardsModal";
import React, { useEffect, useRef, useState } from "react";
import { Inventory, Smithy } from "../../../containers";
import { mockCards } from "../../../endpoints/mock";
import { PopupButton } from "../../../components/PopupButton";
import { HandleBackButton } from "../HeaderCave/components";
import { Resources } from "../../../enums/resources";
import { setSelectedHero } from "../../../app/features/selectedHero";
import { useDispatch, useSelector } from "react-redux";
import { useSessionStorage } from "@uidotdev/usehooks";
import { RootState } from "../../../app/store";
import { useSoundService } from "../../../utils/soundService";
import { setHeroesList } from "../../../app/features/heroesSlice";
import {
  ConfigHero,
  FullHero,
  Hero,
  HeroRarity,
} from "../../../interfaces/hero";
import { parseFullHero } from "../../../utils/heroParser";
import { getHeroes } from "../../../endpoints/heroEndpoints";
import { useTelegram } from "../../../hooks/useTelegram";
import { HeroRating } from "../../../containers/Heroes/components/HeroRating";
import { resetCurrentDungeon } from "../../../endpoints/dungeonEndpoints";

export const FooterSelectHero = ({
  id,
  onClickBattle,
}: {
  id: string;
  onClickBattle: () => void;
}) => {
  const { navigateTo } = useUtils();
  const { userId } = useTelegram();
  const { t } = useTranslation();
  const { playSound } = useSoundService();
  const appConfig = useSelector((state: RootState) => state.appConfig.configs);
  
  const allHeroes: ConfigHero[] = appConfig.heroes.variables;
  const dispatch = useDispatch();

  const heroesListRef = useRef<HTMLDivElement>(null);
  const [heroesListScroll, setHeroesListScroll] = useState(false);

  const selectedHeroUid = useSelector(
    (state: RootState) => state.selectedHero.uid
  );

  const [currentDungeonId, setCurrentDungeonId] = useSessionStorage(
    "currentDungeonId",
    0
  );

  const [startSelectHero, setStartSelectHero] = useSessionStorage(
    "startSelectHero",
    false
  );

  const heroesList = useSelector((state: RootState) => state.heroes.heroesList);

  console.log("heroesList", heroesList);
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
              img: require(`../../../assets/images/heroes/cards/hero-${configHero.id.value}.png`),
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
        dispatch(setSelectedHero({
          uid: heroesList.filter((hero) => hero.isAvaillable)[0].id.toString(),
          lvl: heroesList.filter((hero) => hero.isAvaillable)[0].level,
        }))
      }
    } catch (error) {
      console.error("Error fetching heroes:", error);
    }
  };

  useEffect(() => {
    const checkHorizontalScroll = () => {
      const container = heroesListRef.current;
      if (container) {
        const hasScroll = container.scrollWidth > container.clientWidth;
        setHeroesListScroll(hasScroll);
      }
    };

    checkHorizontalScroll();
    window.addEventListener("resize", checkHorizontalScroll);

    return () => {
      window.removeEventListener("resize", checkHorizontalScroll);
    };
  }, []);

  useEffect(() => {
    getHeroesList();
  }, [userId]);

  const currentRoom = useSelector((state: RootState) => state.selectedRoom);

  const { buildingConfigs } = useSelector((state: RootState) => state.config);

  const selectedRoom = buildingConfigs!.filter(
    (v) => v.id === currentRoom?.id
  )?.[0];

  const [isDungeonStart, setIsDungeonStart] = useSessionStorage(
    "isDungeonStart",
    false
  );

  const actualSaves = useSelector(
    (state: RootState) => state.battleSave.battleSave.save
  );



  const sortedDungeonIds = selectedRoom?.dungeonIds
  ?.slice()
  .sort((a, b) => b.dungeonId - a.dungeonId);

  enum DungeonStatus {
    completed,
    available,
    notAvailable,
  }

  const dungeonStatuses = sortedDungeonIds?.map((dungeon) => {
    let status;
    if (dungeon.dungeonId < currentDungeonId) {
      status = DungeonStatus.completed;
    } else if (dungeon.dungeonId === currentDungeonId) {
      status = DungeonStatus.available;
    } else {
      status = DungeonStatus.notAvailable;
    }
    return { dungeonId: dungeon.dungeonId, status };
  });

  console.log("dungeonStatuses", dungeonStatuses);

  const handleRetry = async () => {
    await resetCurrentDungeon({ clientId: userId, heroId: 1 });
    setIsDungeonStart(false);
    if (actualSaves) {
      if (actualSaves.dungeonId !== 2 && actualSaves.dungeonId !== 1) {
        setStartSelectHero(true);
      }
    }
  };

  return (
    <>
      <footer
        id={id}
        className="flex flex-col fixed bottom-0 pb-5 w-full z-[55] h-full"
      >
        {/* Задній фон для закриття вибору героя */}
        <div
          className="absolute w-full h-full"
          onClick={() => setStartSelectHero(false)}
        ></div>

        <div className="absolute top-1/2 left-1/2">
          <div className="w-full fixed top-0 pt-7 pb-4 left-0 bottom-[130px] right-0 z-5 flex justify-center items-center">
            <div className="w-full h-full absolute bg-black opacity-60 top-0"></div>
            <div className="relative w-[90%] bg-[#554837] border border-[#18191a] rounded-[2px] p-[2px]">
              <img
                src={require("../../../assets/images/cards-modal-border.png")}
                className="absolute w-[17.5px] h-[21px] -top-[6px] -left-[5px]"
                alt=""
              />
              <img
                src={require("../../../assets/images/cards-modal-border.png")}
                className="absolute w-[17.5px] h-[21px] -bottom-[6.5px] -left-[4.5px] -rotate-90"
                alt=""
              />
              <img
                src={require("../../../assets/images/cards-modal-border.png")}
                className="absolute w-[17.5px] h-[21px] -bottom-[5.5px] -right-[4.5px] -rotate-180"
                alt=""
              />
              <button
                className="absolute z-10 w-7 h-7 -top-2 -right-2 flex items-center justify-center"
                onClick={() => {
                  setStartSelectHero(false);
                  setIsDungeonStart(false);
                }}
              >
                <img
                  src={require("../../../assets/images/shop-modal-close.png")}
                  className="w-7 h-7"
                  alt=""
                />
              </button>
              <div className=" w-full h-full bg-[#242520] border border-[#18191a] rounded-[2px] p-3 shadow-inner-sm-white">
                <div
                  className="relative w-full h-full bg-[#201b18] rounded-[1px] p-3 shadow-inner-sm-black
                    overflow-auto max-h-[calc(100vh-206px)]"
                >
                  {dungeonStatuses &&
                    dungeonStatuses.map(({ dungeonId, status }, index) => (
                      <div key={index}>
                        {status === DungeonStatus.notAvailable && (
                          <div className="bg-[#161311] p-[2px] rounded-[2px] h-[160px] relative">
                            <div
                              className="border-[1px] border-[#828282] rounded-[1px] h-full w-full
                      bg-[url('./assets/images/dungeon-stage-example-bg.jpg')] bg-cover bg-center"
                            >
                              {/* Мітка Boss */}
                              <img
                                src={require("../../../assets/images/dungeon-boss-label.png")}
                                className="absolute w-12 h-10 top-2 left-2.5"
                                alt=""
                              />

                              {/* Складність */}
                              <div className="absolute top-[60px] left-3 flex max-w-[80px] leading-[1] items-center">
                                <img
                                  src={require("../../../assets/images/dungeon-difficulty-icon.png")}
                                  className="w-[15px] h-[15px]"
                                  alt=""
                                />
                                <div className="ml-[2px] text-[10px] text-stroke-small text-[#FF3A3A]">
                                  Level up to at least level 10
                                </div>
                              </div>

                              {/* Cheast */}
                              <div className="bottom-3.5 right-3 absolute">
                                <img
                                  src={require("../../../assets/images/dungeon-chest-icon.png")}
                                  className="w-[34px] h-[30px]"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {status === DungeonStatus.available && (
                          <div className="bg-[#161311] p-[2px] rounded-[2px] h-[160px] relative mt-[10px]">
                            <div
                              className="border-[1px] border-[#828282] rounded-[1px] h-full w-full
                        bg-[url('./assets/images/dungeon-stage-example-bg.jpg')] bg-cover bg-center"
                            >
                              <div className="absolute text-stroke-small text-white text-[16px] mt-3 ml-3 leading-[1]">
                                Hemogolem
                              </div>
                              <div className="absolute text-[10px] text-[#F6A000] text-stroke-small mt-7 ml-3">
                                Magic damage +50%
                              </div>

                              {/* Складність */}
                              <div className="absolute top-[50px] left-3 flex max-w-[80px] leading-[1] items-center">
                                <img
                                  src={require("../../../assets/images/dungeon-difficulty-icon.png")}
                                  className="w-[15px] h-[15px]"
                                  alt=""
                                />
                                <div className="ml-[2px] text-[10px] text-stroke-small text-[#3ADC96]">
                                  Easy to win
                                </div>
                              </div>

                              {/* Монети */}
                              <div className="top-3.5 right-3 absolute flex items-center">
                                <img
                                  src={require("../../../assets/images/kitsu-icon.png")}
                                  className="w-[30px] h-[30px] -mr-3"
                                  alt=""
                                />
                                <div className="text-white text-stroke-small text-[14px] font-[800] z-1">
                                  +50
                                </div>
                              </div>

                              {/* Кнопки */}
                              <div className="absolute bottom-3 right-1/2 z-10 mr-[3px]">
                                <PopupButton
                                  type={
                                    !!selectedHeroUid && isDungeonStart
                                      ? "red"
                                      : "gray"
                                  }
                                  width="auto"
                                  disabled={
                                    !isDungeonStart && selectedHeroUid === null
                                  }
                                  onClick={() => {
                                    handleRetry();
                                    playSound("button");
                                  }}
                                >
                                  Retreat
                                </PopupButton>
                              </div>
                              <div className="absolute bottom-3 left-1/2 z-10 ml-[3px]">
                                <PopupButton
                                  type={!!selectedHeroUid ? "green" : "gray"}
                                  width="auto"
                                  disabled={selectedHeroUid === null}
                                  onClick={() => {
                                    onClickBattle();
                                    playSound("button");
                                  }}
                                >
                                  <div className="py-0.5">Play now</div>
                                </PopupButton>
                              </div>

                              {/* Cheast */}
                              <div className="bottom-3.5 right-3 absolute">
                                <img
                                  src={require("../../../assets/images/dungeon-chest-icon.png")}
                                  className="w-[34px] h-[30px]"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        {status === DungeonStatus.completed && (
                          <div className="bg-[#161311] p-[2px] rounded-[2px] h-[160px] relative mt-[10px]">
                            <div
                              className="border-[1px] border-[#828282] rounded-[1px] h-full w-full
                                              bg-[url('./assets/images/dungeon-stage-example-bg.jpg')] bg-cover bg-center"
                            >
                              {/* Dungeon Completed */}
                              <div className="flex justify-center items-center w-full h-full">
                                <img
                                  src={require("../../../assets/images/dungeon-completed-mark.png")}
                                  className="w-[234px] mt-4"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Основний контейнер вибору героя */}
        <div
          className="absolute bottom-0 w-full h-[130px] p-2 bg-[#241e1a] border-t-[#473730] border-t-[1px]
            shadow-[inset_0_0_3px_1px_rgba(255,255,255,0.2)] z-[1]"
        >
          <div
            ref={heroesListRef}
            style={{
              justifyContent: heroesListScroll ? "flex-start" : "center",
            }}
            className="flex justify-center bg-[#362d28] rounded-[3px] border-[1px] border-black p-2 pt-[17px]
                h-[92px] overflow-x-auto"
          >
            {/* Динамічне відображення доступних героїв */}
            {heroesList
              .filter((hero) => hero.isAvaillable)
              .map((hero: FullHero) => (
                <button
                  key={hero.heroId}
                  className="relative w-16 min-w-16 shrink-0 h-16 mx-1"
                  onClick={() =>
                    dispatch(
                      setSelectedHero({
                        uid: hero.id.toString(),
                        lvl: hero.level,
                      })
                    )
                  }
                >
                  {/* Перевага героя */}
                  <div
                    className="absolute bottom-full w-full left-0 text-[#3ADC96] text-stroke-small text-center
                      text-[10px] leading-[1.2]"
                  >
                    +50% DMG
                  </div>

                  {/* Обкладинка з border */}
                  <div
                    className={`w-full h-full relative z-[2] border-[1px] border-[#19191B] rounded-[3px] p-[3px]
                      ${
                        selectedHeroUid === hero.id.toString()
                          ? "bg-[#3adc96]"
                          : "bg-[#1f1713]"
                      }`}
                  >
                    <div
                      className="border-[1px] w-full h-full border-[#19191B] rounded-[2px] bg-cover bg-no-repeat
                        bg-center relative"
                      style={{ backgroundImage: `url(${hero.img})` }}
                    >
                      <div
                        className="absolute left-0 right-0 bottom-0 h-[24px] rounded-b-[1px]
                          bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,rgba(0,0,0,0.50)_36.01%,#000_100%)]"
                      >
                        {/* Відображення рівня героя */}
                        <div
                          className="absolute w-full bottom-2.5 left-0 text-white text-center text-stroke-small
                            text-[10px]"
                        >
                          {t("level", { lvl: hero.level })}
                        </div>

                        {/* Відображення рейтингу зірок */}
                        <div className="absolute bottom-[5px] left-0 w-full flex justify-center">
                          <HeroRating
                            claimedLevels={hero.rating.claimedLevels}
                            totalLevels={hero.rating.totalLevels}
                            starsWidth="w-[8px]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </footer>
    </>
  );
};
