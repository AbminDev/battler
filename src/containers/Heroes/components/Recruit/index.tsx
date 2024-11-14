import React, { useState } from "react";
import { PopupButton } from "../../../../components/PopupButton";
import { HeaderCave } from "../../../../layout/components/HeaderCave";
import { OpenRecruitCards, RecruitCardsModal } from "./components";
import { KeysIco } from "../../../../layout/components/HeaderFarm/components";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { getBalance } from "../../../../endpoints/farmMock";
import { useTelegram } from "../../../../hooks/useTelegram";
import { openLootbox } from "../../../../endpoints/lootBoxEndpoints";
import { LootboxId, LootBoxOpenResult } from "../../../../interfaces/lootBotx";
import { Resources } from "../../../../enums/resources";
import {
  DisplayData,
  handleLootBoxResult,
} from "../../../../utils/lootBoxHandler";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export const RecruitModal = ({ close }: { close: () => void }) => {
  const [recruitCardsModalOpen, setRecruitCardsModalOpen] = useState(false);
  const [recruitHero, setRectuirHero] = useState(false);

  const [rewards, setRewards] = useState<DisplayData[]>([]);

  const { userId } = useTelegram();

  const resources = useSelector(
    (state: RootState) => state.resources.resources
  );

  const currentKeys =
    resources.find((v) => v.resourceType === Resources.keys)?.value || 0;

  const [openLootBox, setOpenLootBox] = useState(false);
  const handleRecruiteHero = async (amount: number) => {
    setOpenLootBox(true);
    setRectuirHero(true);

    const result = await openLootbox({
      clientId: userId,
      lootBoxId: LootboxId.Keys,
      amount: amount,
    });

    if (result) {
      const displayData: DisplayData[] = result
        .map(handleLootBoxResult)
        .filter((data): data is DisplayData => data !== null);

      await getBalance({
        clientId: userId,
      });

      setRewards(displayData);
    }
  };

  return (
    <>
      <div className="z-20 absolute w-full h-full left-0 top-0">
        <div className="absolute w-full z-[12] top-0">
          <HeaderCave keys={currentKeys} pageName="Summon" onClick={close} />
        </div>
        {!recruitHero ? (
          <div
            className={`absolute inset-0 bg-[url('./assets/images/summon-bg.png')] bg-contain bg-center bg-no-repeat flex flex-col overflow-hidden`}
          >
            <div
              className="absolute left-5 right-5 top-[80px] bg-[red] h-[64px] rounded-[4px] border border-[#372C25] z-[2]
          bg-gradient-to-r from-[#E4E180] to-[#FD8D4D] shadow-[0px_4px_2px_0px_rgba(0,0,0,0.3),_0px_0px_3px_1px_rgba(255,255,255,0.2)_inset]"
            >
              <img
                src={require("../../../../assets/images/offers/recruit-offer-label-background.png")}
                className="absolute right-[-8px] top-[-8px] w-[72px]"
                alt=""
              />
              <div
                className="absolute right-[-8px] top-[-8px] w-[65px] h-[18px] flex justify-center items-center text-white
            text-[12px] text-stroke-small"
              >
                100% value
              </div>
              <div className="flex justify-between items-center">
                <img
                  src={require("../../../../assets/images/offers/recruit-offer-coffer.png")}
                  className="w-[81px] h-auto mt-[-6px] mr-3"
                  alt=""
                />
                <div className="text-[#4A4432] text-[12px] leading-[1.2] w-full">
                  Lorem ipsum.
                  <br />
                  Lorem ipsum lorem ipsum.
                </div>
                <div className="mt-3 mr-2 ml-3">
                  <PopupButton type="gold" width="100px" >
                    4,99 USD
                  </PopupButton>
                </div>
              </div>
            </div>

            <div
              className="absolute top-[168px] right-5 w-[40px] h-[40px] border-[4px] border-[#00141b] rounded-full flex
          items-center justify-center z-[2] bg-[rgba(1,1,1,0.2)]"
              // onClick={() => setRecruitCardsModalOpen(true)}
              data-tooltip-id="HeroSummon"
              data-tooltip-content="Summon x more time to receive a new Hero or Hero shard."
            >
              <img
                src={require("../../../../assets/images/recruit-cards-icon.png")}
                className="w-[18px] mt-[-3px]"
                alt=""
              />
              <div className="absolute -bottom-1 text-white text-center text-[12px] leading-[1] text-stroke-small">
                0/50
              </div>
              <Tooltip
                id="HeroSummon"
                place="bottom-end"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  border: "1px solid #000000",
                  borderRadius: "8px",
                  padding: "8px",
                  textAlign: "center",
                  maxWidth: "160px",
                  wordWrap: "break-word",
                }}
              />
            </div>

            <div className="absolute bottom-0 w-full h-[45vh] bg-gradient-to-b from-transparent via-[rgba(27,27,27,0.97)] to-[#201b18]"></div>
            <div className="z-[2] absolute w-full bottom-0 pb-14">
              <div className="flex justify-center">
                <div className="relative mr-3">
                  <PopupButton
                    disabled={currentKeys < 1}
                    type={currentKeys >= 1 ? "green" : "gray"}
                    height="52px"
                    onClick={
                      currentKeys >= 1 ? () => handleRecruiteHero(1) : () => {}
                    }
                    width="auto"
                  >
                    <div className="leading-[1.2] text-[14px] text-stroke-small">
                      Summon x1
                      <br />
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5">
                          <KeysIco />
                        </div>
                        <div className="ml-1">1</div>
                      </div>
                    </div>
                  </PopupButton>
                  {/* <div className="absolute text-white text-[12px] w-full text-center text-nowrap leading-[1] mt-2.5">
                    Free in: 2d 14:56:12
                  </div> */}
                </div>
                <div>
                  <PopupButton
                  disabled={currentKeys < 10}
                  
                    type={currentKeys >= 10 ? "gold": "gray"}
                    height="52px"
                    onClick={currentKeys >= 10 ? () => handleRecruiteHero(10) : () => {}}
                    width="auto"
                  >
                    <div className="leading-[1.2] text-[14px] text-stroke-small">
                      Summon x10
                      <br />
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5">
                          <KeysIco />
                        </div>
                        <div className="ml-1">10</div>
                      </div>
                    </div>
                  </PopupButton>
                </div>
              </div>
            </div>
          </div>
        ) : openLootBox ? (
          <OpenRecruitCards
            cardData={rewards}
            keys={currentKeys}
            onRecruit={handleRecruiteHero}
          />
        ) : null}
      </div>
      {recruitCardsModalOpen && (
        <RecruitCardsModal close={() => setRecruitCardsModalOpen(false)} />
      )}
    </>
  );
};
