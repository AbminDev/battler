import { useSelector } from "react-redux";
import { HeaderIco } from "./components/HeaderIco";
import { ResourceCard } from "./components/ResourceCard";
import { RootState } from "../../../app/store";
import React, { useEffect, useState } from "react";
import { useUtils } from "../../../utils/navigateTo";
import { Shop } from "../../../pages/Shop";
import { useTelegram } from "../../../hooks/useTelegram";
import { getBalance } from "../../../endpoints/farmMock";
import { Resources } from "../../../enums/resources";
import { useSoundService } from "../../../utils/soundService";
import { motion } from "framer-motion"; // Імпорт motion

export const HeaderFarm = () => {
  const { navigateTo } = useUtils();
  const [isShopOpen, setShopOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { playSound } = useSoundService();

  const { tg, userId } = useTelegram();

  const resources = useSelector(
    (state: RootState) => state.resources.resources
  );

  const fetchBalance = async () => {
    if (userId) {
      setIsLoading(true);
      try {
        return await getBalance({ clientId: `${userId}` });
      } catch (error) {
        console.error("Failed to fetch balance:", error);
        // Можливо, встановити стан помилки та відобразити повідомлення користувачу
      } finally {
        setIsLoading(false);
      }
    }
  };



  // console.log('resources', resources)

  useEffect(() => {
    fetchBalance();
  }, []);

  const closeShop = () => {
    setShopOpen(false);
    playSound("button");
  };

  if (isLoading) {
    return <div>Loading...</div>; // Або ваш компонент завантаження
  }

  return resources && resources.length ? (
    <motion.div
      initial={{ opacity: 0, y: -50 }} // Початковий стан: прозорість 0 і зміщення вгору на 50px
      animate={{ opacity: 1, y: 0 }} // Анімація до: прозорість 1 і початкове положення
      transition={{ duration: 0.5, ease: "easeOut" }} // Тривалість анімації 0.5 секунди
      className="fixed pt-2 flex flex-row px-4 pr-0 z-[56] justify-center items-center w-full gap-[12px]
        bg-gradient-to-b from-[#000000cd] from-start to-[#0d0d0d00] to-end"
    >
      <div
        className="cursor-pointer"
        onClick={() => {
          navigateTo("/profile");
          playSound("menuOpen");
        }}
      >
        <HeaderIco lvl={0} />
      </div>
      <div className="flex flex-1 flex-row mb-[14px] gap-2">
        <ResourceCard
          count={resources[Resources.stone]?.value}
          type={resources[Resources.stone].resourceType}
        />
        <ResourceCard
          count={resources[Resources.experience]?.value}
          type={resources[Resources.experience].resourceType}
        />
      </div>
      <button
        className="relative w-[102px]"
        onClick={() => {
          setShopOpen(true);
          playSound("itemUseShop");
        }}
      >
        <img
          src={require("../../../assets/images/header-shop-button.png")}
          alt=""
        />
        <div className="absolute bottom-0 w-full text-center text-white text-stroke-regular flex justify-center">
          {/* <div className="flex justify-center items-center text-center mr-[2px]">
            <img
              src={require("../../../assets/images/kitsu-icon.png")}
              className="w-[18px] h-[18px]"
              alt=""
            />
          </div> */}
          <ResourceCard
            count={resources[Resources.kitsu]?.value}
            type={resources[Resources.kitsu]?.resourceType}
          />
        </div>
      </button>
      {isShopOpen && (
        <Shop
          gold={resources[Resources.kitsu]?.value}
          close={() => closeShop()}
        />
      )}
    </motion.div>
  ) : null;
};
