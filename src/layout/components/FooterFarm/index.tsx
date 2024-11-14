import { InventoryButton } from "../../../components/InventoryButton";
import { ChatButton } from "../../../components/ChatButton";
import { useUtils } from "../../../utils/navigateTo";
import { useTranslation } from "react-i18next";
import {
  AllianceButton,
  FriendsButton,
  QuestsButton,
} from "../../../components";
import { CardsModal } from "../../../pages/Battle/CardsModal";
import React, { useEffect, useRef, useState } from "react";
import { Inventory, Smithy } from "../../../containers";
import { mockCards } from "../../../endpoints/mock";
import { PopupButton } from "../../../components/PopupButton";
import { HandleBackButton } from "../HeaderCave/components";
import { Resources } from "../../../enums/resources";
import { InventoryItem } from "../../../containers/Inventory";
import { TutorialFarmStage } from "../../../interfaces/tutorial";
import { motion, AnimatePresence } from "framer-motion"; // Імпорт Framer Motion
import { HeroRarity } from "../../../interfaces/hero";

export const FooterFarm = ({ tutorialSave }: { tutorialSave?: any }) => {
  const { navigateTo } = useUtils();
  const { t } = useTranslation();
  const [isCardsModalOpen, setIsCardsModalOpen] = useState(false);

  const openCardsModal = () => {
    setIsCardsModalOpen(true);
  };

  const closeCardsModal = () => {
    setIsCardsModalOpen(false);
  };

  const data: InventoryItem[] = [
    // {
    //   id: "1",
    //   type: TypeItem.Resource,
    //   amount: 1000,
    //   icon: Resources.stone,
    //   rarity: HeroRarity.Epic,
    // },
    // {
    //   id: "2",
    //   type: TypeItem.Resource,
    //   amount: 500,
    //   icon: Resources.experience,
    //   rarity: HeroRarity.Epic,
    // },
    // {
    //   id: "3",
    //   type: TypeItem.Spesial,
    //   amount: 200,
    //   icon: Resources.stone, // Замініть на відповідну іконку
    //   rarity: HeroRarity.Rare,
    // },
    // {
    //   id: "4",
    //   type: TypeItem.Hero,
    //   amount: 1,
    //   icon: Resources.experience, // Замініть на відповідну іконку
    //   rarity: HeroRarity.Legendary,
    // },
  ];

  // Варіанти анімації для футера
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  };

  // Варіанти анімації для внутрішніх елементів
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <>
      <AnimatePresence>
        {isCardsModalOpen && (
          <motion.div
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // exit={{ opacity: 0, scale: 0.95 }}
            // transition={{ duration: 0.1 }}
          >
            <Inventory closeDeck={closeCardsModal} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Футер з анімацією */}
      <AnimatePresence>
        {tutorialSave?.stage && tutorialSave.dialogueId >= 2 && (
          <motion.footer
            variants={footerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col fixed bottom-0 pb-5 w-full z-[55]"
          >
            <AnimatePresence>
              {tutorialSave?.stage >= TutorialFarmStage.finishFirstBuilding && (
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-3 items-end self-end w-full z-10 mb-7 mr-2"
                >
                  {/* <AllianceButton/> */}
                  {tutorialSave?.stage >=
                    TutorialFarmStage.finishSecondBuilding && <FriendsButton />}
                  <motion.div
                    variants={itemVariants}
                    className={`${
                      tutorialSave?.stage >=
                      TutorialFarmStage.finishSecondBuilding
                        ? "flex justify-between w-full"
                        : ""
                    }`}
                  >
                    {tutorialSave?.stage >=
                      TutorialFarmStage.finishSecondBuilding && (
                      <motion.div variants={itemVariants} className="ml-4">
                        <QuestsButton />
                      </motion.div>
                    )}

                    <InventoryButton onClick={openCardsModal} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {tutorialSave?.stage >= TutorialFarmStage.finishRepair && (
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div
                  className="absolute w-full h-[calc(100%+34px)] bg-[#2a2827] opacity-50 border-t-black border-[1px] -bottom-[34px]"
                  style={{
                    boxShadow: "inset 0 2px 8px rgba(255, 255, 255, 0.6)",
                  }}
                ></div>
                {/* Ваши інші елементи тут */}

                <motion.div
                  variants={itemVariants}
                  className="flex justify-between"
                >
                  <motion.div
                    variants={itemVariants}
                    className="flex items-center justify-center -mt-2 w-24 h-[60px] pb-1 border-t border-r border-b border-black bg-transparent bg-gradient-to-b from-[#1E0400] to-[#452B31] rounded-r-md"
                  >
                    <button
                      className="relative flex items-center justify-center w-full h-full bg-transparent bg-gradient-to-b from-[#FEE7BA] to-[#B6765A] rounded-r-md"
                      onClick={() => navigateTo("/heroes")}
                    >
                      <div className="absolute top-1 right-1 w-[5px] h-[5px] bg-[#864C39] rounded-full z-20"></div>
                      <div className="absolute bottom-1 left-1 w-[11px] h-[11px] bg-[#5B2400] rounded-full opacity-25"></div>
                      <div className="absolute top-2 left-1 w-[3px] h-[3px] bg-[#E4B98F] rounded-full"></div>
                      <div className="relative flex justify-center items-center w-14 h-14 -mt-5">
                        <img
                          src={require("../../../assets/images/heroes.png")}
                          className="w-full h-full"
                          alt=""
                        />
                        <div className="absolute -bottom-3 flex justify-center items-end z-10 text-white text-xl font-normal uppercase leading-normal tracking-[3.5px] text-shadow">
                          {t("footer.heroes")}
                        </div>
                      </div>
                    </button>
                  </motion.div>

                  {/* Додаткові кнопки можуть бути анімовані аналогічно */}
                </motion.div>
              </motion.div>
            )}
          </motion.footer>
        )}
      </AnimatePresence>
    </>
  );
};
