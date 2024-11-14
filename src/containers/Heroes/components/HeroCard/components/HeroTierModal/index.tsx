import { PanOnScrollMode, ReactFlow, ReactFlowProvider, useReactFlow, Viewport } from "@xyflow/react";
import { PopupButton } from "../../../../../../components/PopupButton";
import { SkillNode } from "../SkillNode";
import { useTranslation } from "react-i18next";
import CustomEdge from "../CustomEdge";
import { TierLevel } from "../../../../../../interfaces/hero";
import {
  getHeroTierUpgradePrice,
  updateTierLevel,
} from "../../../../../../endpoints/heroEndpoints";
import { useTelegram } from "../../../../../../hooks/useTelegram";
import { useEffect, useRef, useState } from "react";
import { getBalance } from "../../../../../../endpoints/farmMock";
import { HeroRating } from "../../../HeroRating";
import { heroShardMap } from "../../../../../../utils/mapping";
import { HeroShard } from "../../../../../../interfaces/lootBotx";

export const HeroTierModal = ({
  getHeroesList,
  upgradeCards,
  nodes,
  edges,
  onClose,
  rating,
  onNodeClick,
  selectedSkill,
  heroId,
}: {
  getHeroesList: () => void;
  upgradeCards: number;
  nodes: any;
  edges: any;
  onClose?: any;
  rating: { claimedLevels: number; totalLevels: number };
  onNodeClick: any;
  selectedSkill: any;
  heroId: number;
}) => {
  const nodeTypes = {
    customSkillNode: SkillNode,
  };
  const edgeTypes = {
    custom: CustomEdge,
  };
  const { t } = useTranslation();

  const [upgradePrice, setUpgradePrice] = useState<number>();
  const { userId } = useTelegram();


  const updateTierHero = async () => {
    const result = await updateTierLevel({
      clientId: userId,
      heroId: heroId,
      tier: Number(selectedSkill.id),
    });
    await getBalance({
      clientId: userId,
    });
    if (result) {
      getHeroesList();
    }
  };

  useEffect(() => {
    const fetchHeroTierUpgradePrice = async () => {
      try {
        const price = await getHeroTierUpgradePrice({
          clientId: userId,
          heroId: heroId,
        });
        setUpgradePrice(price);
      } catch (error) {}
    };

    fetchHeroTierUpgradePrice();
  }, []);

  const allLevelsClaimed =
    selectedSkill?.data?.levels?.every((level: TierLevel) => level.isClaimed) ||
    false;

  console.log("selectedSkill", selectedSkill);
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className="absolute top-[50px] w-full max-w-4xl pt-2 overflow-hidden "
        style={{ height: "70vh" }}
        
      >
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodesDraggable={false}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodeClick={onNodeClick}
            elementsSelectable={true}
            style={{ backgroundColor: "transparent", height: "100%"}}
            proOptions={{ hideAttribution: true }}
            fitView
            zoomOnScroll={false}
            zoomOnPinch={false}
            panOnScroll={true}
            panOnDrag={false}
            zoomOnDoubleClick={false}
            panOnScrollMode={PanOnScrollMode.Vertical} 
            translateExtent={[[-Infinity,0],[Infinity, 1000]]}
          />
        </ReactFlowProvider>
      </div>
      <div
        className={`w-full absolute h-[30%] left-0 bottom-0  flex flex-col  z-[11] bg-gradient-to-t from-[#201B18] via-[#201B18]/100 via-80% to-transparent to-100%`}
      >
        <div className="absolute w-full top-[15%] flex flex-col">
          <div className="pt-4">
            <HeroRating
              claimedLevels={rating.claimedLevels}
              totalLevels={rating.totalLevels}
              starsWidth={"w-[32px]"}
            />
          </div>

          {selectedSkill && (
            <div className="flex flex-col gap-1 px-4  overflow-auto max-h-24 ">
              {selectedSkill.data.levels?.map((level: TierLevel) => (
                <div
                  key={level.id}
                  className="flex justify-center items-center p-2 relative overflow-hidden flex-shrink-0"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(220, 134, 3, 0.3) 0%, rgba(220, 134, 3, 0) 70%)",
                  }}
                >
                  {/* Верхня Рамка */}
                  <div
                    className="absolute top-0 left-0 w-full h-[2px] pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at center, rgba(220, 134, 3, 0.5), rgba(220, 134, 3, 0) 70%)",
                    }}
                  ></div>

                  {/* Нижня Рамка */}
                  <div
                    className="absolute bottom-0 left-0 w-full h-[2px] pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at center, rgba(220, 134, 3, 0.5), rgba(220, 134, 3, 0) 70%)",
                    }}
                  ></div>
                  {!level.isClaimed && (
                    <div className="w-[28px] h-[28px]">
                      <img
                        className="w-full h-full"
                        src={require("../../../../../../assets/images/heroes/icons/closed.png")}
                      />
                    </div>
                  )}
                  {/* Вміст Елемента */}
                  <div
                    className={`${
                      level.isClaimed
                        ? "text-center text-[#ffefcb] text-xs font-normal leading-3"
                        : "text-center text-[#6a6565] text-xs font-normal leading-3"
                    }  `}
                  >
                    {level.rewards.map((reward, index) => {
                      return (
                        <div
                          key={index}
                          className="flex justify-center items-center"
                        >
                          {t(`bonusTypes.${reward.bonusType}`)}: {reward.value}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-2 justify-center items-center pt-4 pb-5">
            {/* <div className="flex flex-col gap-1">
              <div className="flex gap-2 justify-center items-center">
                <div className="flex gap-1">
                  <div className="text-right text-[#3adc96] text-sm font-black uppercase leading-[14px]">
                    2
                  </div>
                  <div className="text-right text-white text-sm font-black uppercase leading-[14px]">
                    /
                  </div>
                  <div className="text-right text-white text-sm font-black uppercase leading-[14px]">
                    4
                  </div>
                </div>
              </div>
              <PopupButton type={"blue"} height="64px">
                <div className="text-center text-[#ffefcb] text-lg font-normal leading-[18px]">
                  Upgrade Tier
                </div>
              </PopupButton>
            </div> */}

            <div className="flex flex-col gap-1">
              {!allLevelsClaimed ? (
                <div className="flex gap-2 justify-center items-center">
                  <div className="flex gap-1 justify-center items-center">
                    <img src={heroShardMap[heroId as HeroShard].image} className="w-6 h-6"/>
                    <div
                      className={`text-right ${
                        upgradePrice! > upgradeCards
                          ? "text-[#dd5444]"
                          : "text-[#3adc96]"
                      } text-sm font-black uppercase leading-[14px]`}
                    >
                      {upgradeCards}
                    </div>
                    <div className="text-right text-white text-sm font-black uppercase leading-[14px]">
                      /
                    </div>
                    <div className="text-right text-white text-sm font-black uppercase leading-[14px]">
                      {upgradePrice}
                    </div>
                  </div>
                </div>
              ) : null}
              {allLevelsClaimed ? (
                <div className="text-center text-[#ffefcb] text-lg font-normal leading-[18px]">
                  {t("heroes.skillFullClaimed") || "Skill full claimed"}
                </div>
              ) : (
                <PopupButton
                  type={selectedSkill ? "green" : "gray"}
                  disabled={
                    !selectedSkill ||
                    (upgradePrice !== undefined && upgradeCards < upgradePrice)
                  }
                  onClick={selectedSkill ? updateTierHero : () => {}}
                >
                  <div className="text-center text-[#ffefcb] text-lg font-normal leading-[18px]">
                    {t("heroes.upgradeTier")}
                  </div>
                </PopupButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
