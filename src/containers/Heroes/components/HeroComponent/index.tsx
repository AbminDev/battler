import React, { useEffect, useState } from "react";
import { HeroRarity } from "../../../../interfaces/hero";
import { TitleField } from "../../../Room";
import { useTranslation } from "react-i18next";
import { HeroRating } from "../HeroRating";
import { getHeroTierUpgradePrice } from "../../../../endpoints/heroEndpoints";
import { useTelegram } from "../../../../hooks/useTelegram";

interface HeroComponentProps {
  id: number;
  name: string;
  img: string;
  lvl: number;
  rating: { claimedLevels: number; totalLevels: number };
  rarity: string;
  selected: boolean;
  available: boolean;
  inDungeon: boolean;
  upgradeCards: number;
  hasLevelUp: boolean;
}

export const HeroComponent: React.FC<HeroComponentProps> = ({
  id,
  name,
  img,
  lvl,
  rating,
  rarity,
  selected,
  inDungeon,
  available,
  hasLevelUp,
  upgradeCards,
}) => {
  const { t } = useTranslation();
  console.log(rarity as HeroRarity);
  const [hasTierUp, setHasTierUp] = useState<boolean>(false);

  const { userId } = useTelegram();
  useEffect(() => {
    const fetchHeroTierUpgradePrice = async () => {
      try {
        const price = await getHeroTierUpgradePrice({
          clientId: userId,
          heroId: id,
        });
        if (price) {
          setHasTierUp(upgradeCards > price);
        }
        return false
      } catch (error) {}
    };

    fetchHeroTierUpgradePrice();
  }, []);

  return (
    <div
      className="relative aspect-[0.75] h-full w-full max-h-[215px] shrink-0 bg-no-repeat p-[2px]"
      style={{
        backgroundImage: `url(${require("../../../../assets/images/heroes/cards/hero-list-border-3.png")})`,
        backgroundSize: "100% 100%",
      }}
    >
      {!available && (
        <div className="absolute z-10 -top-3 w-full left-1/2 -ml-[50%]">
          <TitleField title="COMING SOON" fontSize="14px" />
        </div>
      )}

      {/* {inDungeon && (
        <div className="absolute z-10 -top-3 w-full left-1/2 -ml-[50%]">
          <TitleField title="Dungening" fontSize="14px" />
        </div>
      )}
       */}
      <div
        className="relative h-full w-full bg-no-repeat p-[2px]"
        style={{
          backgroundImage: `url(${require(`../../../../assets/images/heroes/cards/hero-list-border-2-${rarity}.png`)})`,
          backgroundSize: "100% 100%",
        }}
      >
        <div
          className="relative h-full w-full bg-no-repeat p-[3px]"
          style={{
            backgroundImage: `url(${require("../../../../assets/images/heroes/cards/hero-list-border-1.png")})`,
            backgroundSize: "100% 100%",
          }}
        >
          <div className="relative h-full w-full z-0">
            <div className="relative w-full h-full flex items-center justify-center ">
              <img
                className="h-full absolute inset-0 w-full z-10 rounded-lg"
                src={img}
                alt={name}
              />

              <div className="absolute w-full h-[80%] bottom-0 bg-gradient-to-t from-black to-transparent z-20 rounded-lg"></div>

              {lvl > 0 && (
                <div className="absolute top-1.5 left-1.5 text-white text-center text-[10px] leading-[1] z-30">
                  {lvl}
                  <div className="text-[8px]">Lvl</div>
                </div>
              )}

              <div className="absolute w-full bottom-5 text-white text-center text-[12px] z-30">
                {name}
              </div>

              <div className="absolute bottom-2 w-[80%] mx-auto flex justify-center space-x-1 z-30">
                <HeroRating
                  claimedLevels={rating.claimedLevels}
                  totalLevels={rating.totalLevels}
                  starsWidth={"w-[12px]"}
                />
              </div>

              <div
                className="absolute inset-0 h-full w-full bg-no-repeat bg-center z-40"
                style={{
                  backgroundImage: `url(${require(`../../../../assets/images/heroes/cards/hero-list-border-${rarity}.png`)})`,
                  backgroundSize: "100% 100%",
                }}
              ></div>

              {/* Додані зображення */}
              {/* Зображення notification.png у верхньому правому куті */}
              {hasLevelUp && (
                <img
                  className="absolute -top-[6px] -right-[6px] z-50 w-3 h-3"
                  src={require("../../../../assets/images/heroes/cards/notification.png")}
                  alt="Notification"
                />
              )}

              {/* Зображення level-up.png у нижньому правому куті */}
              {hasTierUp && (
                <img
                  className="absolute -bottom-[6px] -right-[6px] z-50 w-3 h-3"
                  src={require("../../../../assets/images/heroes/cards/level-up.png")}
                  alt="Level Up"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {!available && (
        <div className="absolute inset-0 bg-black opacity-50 z-60 rounded-2xl"></div>
      )}
    </div>
  );
};
