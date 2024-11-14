import {
  GoldIco,
  XPIco,
} from "../../../../layout/components/HeaderFarm/components/ResourceCard";
import { UpgradeArrow, UpgradeWindow } from "../../../Room";
import { PopupButton } from "../../../../components/PopupButton";
import { HandleBackButton } from "../../../../layout/components/HeaderCave/components";
import { useTranslation } from "react-i18next";
import { HeaderCave } from "../../../../layout/components/HeaderCave";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactFlow, Node, Edge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useWindowSize } from "@uidotdev/usehooks";
import {
  GenerateNodesAndEdges,
  HeroInfoModal,
  HeroTierModal,
  transformTreeToSkillsData,
} from "./components";
import { SkillData } from "./components/transformTreeToSkillsData";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { Tree, EBranch, BonusType, Levels } from "../../../../interfaces/hero";
import { Resources } from "../../../../enums/resources";
import { updateHeroLevel } from "../../../../endpoints/heroEndpoints";
import { useTelegram } from "../../../../hooks/useTelegram";
import { getBalance } from "../../../../endpoints/farmMock";
import { CardProps } from "../../../../interfaces/card";
import { HeroRating } from "../HeroRating";

interface HeroSkills {
  label: string;
  nowValue: number;
  upgradeValue: number;
}

interface HeroCardProps {
  id: number;
  img: string;
  rating: { claimedLevels: number; totalLevels: number }; // Number of full stars
  totalStars?: number; // Total number of stars (default is 5)
  name: string;
  level: number;
  description: string;
  heroData: HeroSkills[];
  handlePrevious: () => void;
  handleNext: () => void;
  handleClose: () => void;
  treesData: Tree[];
  skills: Levels[];
  health: number;
  mana: number;
  manaType: number;
  price: number;
  nextLevel: Levels | null;
  upgradeCards: number;
  getHeroesList: () => void;
  cardsAmount: number;
  cards: CardProps[];
  maxLevel: number;
}

export const HeroCard = (props: HeroCardProps) => {
  const {
    maxLevel,
    cards,
    getHeroesList,
    upgradeCards,
    nextLevel, 
    cardsAmount,
    id,
    img,
    rating,
    totalStars = 5,
    heroData,
    name,
    level,
    description,
    handlePrevious,
    handleNext,
    handleClose,
    treesData,
    skills,
    health,
    mana,
    manaType,
    price,
  } = props;

  const { userId } = useTelegram();
  console.log("skills", skills);

  const resources = useSelector(
    (state: RootState) => state.resources.resources
  );

  const currentValue = resources.find(
    (v) => v.resourceType === Resources.experience
  )!.value;
  
  const { t } = useTranslation();
  const backgroundHeroes = require(`../../../../assets/images/heroes/backgrounds/hero-${id}.png`);

  const [isShowHeroInfo, setIsShowHeroInfo] = useState(false);
  const [isShowHeroTier, setIsShowHeroTier] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const variants = {
    hidden: { opacity: 0, y: 50 }, // Початковий стан: прозорість 0, зміщення вниз
    visible: { opacity: 1, y: 0 }, // Кінцевий стан: прозорість 1, без зміщення
    exit: { opacity: 0, y: 0 }, // Вихідний стан: прозорість 0, зміщення вниз
  };

  const handleLevelUp = async () => {
    const result = await updateHeroLevel({
      clientId: userId,
      heroId: id,
    });

    await getBalance({
      clientId: userId,
    });

    if (result) {
      setIsVisible(true);

      getHeroesList();
      setTimeout(() => {
        setIsVisible(false);
      }, 500);
    }
  };
  console.log("nextLevel", nextLevel);
  useEffect(() => {
    console.log("treesData", treesData);
  }, [treesData]);

  const skillsData: SkillData[] = transformTreeToSkillsData(treesData);

  const [selectedSkillId, setSelectedSkillId] = useState(null);

  const handleNodeClick = (event: any, node: any) => {
    console.log("node", node);
    console.log(
      `Ви натиснули на вузол з ID: ${node.id} та назвою: ${node.alt}`
    );
    setSelectedSkillId(node.id);
  };

  const [nodes, setNodes] = useState<any>([]);
  const [edges, setEdges] = useState<any>([]);

  const selectedSkill =
    nodes.find((node: any) => node.id === selectedSkillId) || null;

  useEffect(() => {
    const { nodes, edges } = GenerateNodesAndEdges(skillsData, selectedSkillId);
    setNodes(nodes);
    setEdges(edges);
  }, [selectedSkillId, treesData]);

  return (
    <>
      <div className="absolute w-full z-[45] top-0">
        <HeaderCave
          cards={cards}
          pageName={
            level >= maxLevel
              ? `${name} Lvl ${level} MAX`
              : `${name} Lvl ${level}`
          }
          onClick={handleClose}
        />
      </div>

      <img
        className="w-full absolute left-0 top-[30px]"
        src={backgroundHeroes}
      ></img>

      {isShowHeroInfo && (
        <HeroInfoModal
          skills={skills}
          onClose={() => setIsShowHeroInfo(false)}
        />
      )}
      {isShowHeroTier && (
        <HeroTierModal
          getHeroesList={getHeroesList}
          upgradeCards={upgradeCards}
          nodes={nodes}
          edges={edges}
          rating={rating}
          onNodeClick={handleNodeClick}
          selectedSkill={selectedSkill}
          heroId={id}
        />
      )}
      {!isShowHeroTier && (
        <div
          className={`w-full absolute h-[50%] left-0 bottom-0 flex flex-col  overflow-hidden z-[11] bg-gradient-to-t from-[#201B18] via-[#201B18]/100 via-70% to-transparent to-90%`}
        >
          <AnimatePresence>
            {isVisible && (
              <motion.div
                className="p-2 relative top-[15%] overflow-hidden flex-shrink-0"
                style={{
                  background:
                    "radial-gradient(circle, rgba(250, 186, 60, 0.9) 0%, rgba(250, 186, 60, 0) 70%)",
                }}
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                {/* Верхня Рамка */}
                <div
                  className="absolute top-0 left-0 w-full h-[2px] pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(250, 186, 60, 0) 70%)",
                  }}
                ></div>

                {/* Нижня Рамка */}
                <div
                  className="absolute bottom-0 left-0 w-full h-[2px] pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(250, 186, 60, 0) 70%)",
                  }}
                ></div>

                {/* Вміст Елемента */}
                {nextLevel && (
                  <div className="flex justify-center items-center gap-2">
                    <div className="text-center text-[#ffefcb] text-base font-black leading-none">
                      {t(`bonusTypes.${nextLevel.bonusType}`)}:{" "}
                      {nextLevel.bonusAmount}
                    </div>
                    <img
                      className="w-[18px] h-[18px]"
                      src={require("../../../../assets/images/heroes/upgradeIcons/up.png")}
                      alt="Upgrade Icon"
                    />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute w-full top-1/4 flex flex-col ">
            <div className="flex gap-4 justify-center items-end pb-6">
              <div className="relative" onClick={() => setIsShowHeroInfo(true)}>
                <img
                  src={require("../../../../assets/images/heroes/icons/buttonIcon.png")}
                  alt="Button Icon"
                  className="w-9 h-9"
                />
                <div className="absolute bottom-2 inset-x-0 flex justify-center items-center">
                  <img
                    className="w-[10px] h-[22px]"
                    src={require("../../../../assets/images/heroes/icons/info.png")}
                    alt="Info Icon"
                  />
                </div>
              </div>

              <HeroRating
                claimedLevels={rating.claimedLevels}
                totalLevels={rating.totalLevels}
                starsWidth={"w-[32px]"}
              />

              <div className="relative" onClick={() => setIsShowHeroTier(true)}>
                <img
                  src={require("../../../../assets/images/heroes/icons/buttonIcon.png")}
                  alt="Button Icon"
                  className="w-9 h-9"
                />
                <div className="absolute bottom-2 inset-x-0 flex justify-center items-center">
                  <img
                    className="w-[20px] h-[20px]"
                    src={require("../../../../assets/images/heroes/icons/up.png")}
                    alt="Info Icon"
                  />
                </div>
              </div>
            </div>
            <div className="relative bg-[#332b26] rounded-tl-[1px] rounded-tr-[1px] rounded-br shadow-inner-sm-black border border-[#18191a] mx-8 flex items-center mb-6">
              <img
                src={require("../../../../assets/images/cards-modal-border.png")}
                className="absolute w-[17.5px] h-[21px] -top-[6px] -left-[5px]"
                alt=""
              />
              <img
                src={require("../../../../assets/images/cards-modal-border.png")}
                className="absolute w-[17.5px] h-[21px] -top-[6px] -right-[5px] transform scale-x-[-1]"
                alt=""
              />
              <div className="flex-1 flex flex-col items-center py-1 gap-1">
                <div className="text-[#dfd9c4] text-sm font-light leading-[14px]">
                  {t("heroes.stats.mana")}
                </div>
                <div className="flex gap-1 justify-center items-center">
                  <img
                    src={require("../../../../assets/images/heroes/icons/mana.png")}
                    alt="Mana Icon"
                    className="w-5 h-5"
                  />
                  <div className="text-white text-xl font-normal leading-tight">
                    {mana}
                  </div>
                </div>
              </div>

              <div className="w-[1px] self-stretch bg-gradient-to-b from-transparent via-[#bea681] to-transparent"></div>

              <div className="relative flex-1 flex flex-col items-center py-1 gap-1">
                <div className="text-center text-[#dfd9c4] text-sm font-light leading-[14px] z-10">
                  {t("heroes.stats.health")}
                </div>
                <div className="flex gap-1 justify-center items-center z-10">
                  <img
                    src={require("../../../../assets/images/heroes/icons/health.png")}
                    alt="Health Icon"
                    className="w-5 h-5"
                  />
                  <div className="text-white text-[25.01px] font-normal leading-[25.01px]">
                    {health}
                  </div>
                </div>
                <div
                  className="absolute -bottom-5 left-0 w-full h-6 bg-[#332b26] border-b border-[#18191a]"
                  style={{ clipPath: "polygon(50% 80%, 0 0, 100% 0)" }}
                ></div>
              </div>
              <div className="w-[1px] self-stretch bg-gradient-to-b from-transparent via-[#bea681] to-transparent"></div>

              <div className="flex-1 flex flex-col items-center py-1 gap-1">
                <div className="text-center text-[#dfd9c4] text-sm font-light leading-[14px]">
                  {t("heroes.stats.cardsHeld")}
                </div>
                <div className="flex gap-1 justify-center items-center">
                  <img
                    src={require("../../../../assets/images/heroes/icons/cards.png")}
                    alt="Cards Icon"
                    className="w-5 h-5"
                  />
                  <div className="text-white text-xl font-normal leading-tight">
                    {cardsAmount}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 justify-center items-center">
              <div className="w-6 h-6">
                <XPIco />
              </div>
              <div className="flex gap-1">
                <div
                  className={`text-right ${
                    price > currentValue ? "text-[#dd5444]" : "text-[#3adc96]"
                  }   text-sm font-normal uppercase leading-[14px]`}
                >
                  {currentValue}
                </div>
                <div className="text-right text-white text-sm font-normal uppercase leading-[14px]">
                  /
                </div>
                <div className="text-right text-white text-sm font-normal uppercase leading-[14px]">
                  {price}
                </div>
              </div>
            </div>

            <div className="w-full h-14 px-20 flex justify-center items-center">
              <PopupButton
                type={
                  level >= maxLevel || price > currentValue ? "gray" : "green"
                }
                width="auto"
                disabled={level >= maxLevel || price > currentValue}
                onClick={
                  level >= maxLevel || price > currentValue
                    ? () => {}
                    : handleLevelUp
                }
              >
                <div className="text-center text-[#ffefcb] text-xl font-normal leading-tight">
                  {t("heroes.upgrade")}
                </div>
              </PopupButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
