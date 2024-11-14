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
import { resetCurrentDungeon } from "../../../endpoints/dungeonEndpoints";
import { useTelegram } from "../../../hooks/useTelegram";

export const FooterRestartBattle = ({
  id,
  onClickRestartBattle,
}: {
  id: string;
  onClickRestartBattle: () => void;
}) => {
  const { navigateTo } = useUtils();
  const { t } = useTranslation();
  const { playSound } = useSoundService();

  const dispatch = useDispatch();
  const { userId } = useTelegram();
  const heroesListRef = useRef<HTMLDivElement>(null);
  const [heroesListScroll, setHeroesListScroll] = useState(false);

  const selectedHeroUid = useSelector(
    (state: RootState) => state.selectedHero.uid
  );

  const [startSelectHero, setStartSelectHero] = useSessionStorage(
    "startSelectHero",
    false
  );

  const [isDungeonStart, setIsDungeonStart] = useSessionStorage(
    "isDungeonStart",
    false
  );

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

  const actualSaves = useSelector(
    (state: RootState) => state.battleSave.battleSave.save
  );

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
        className="flex flex-col fixed bottom-0 pb-5 w-full z-[55] "
      >
        <div
          className="absolute bottom-0 w-full  p-2 bg-[#241e1a] border-t-[#473730] border-t-[1px]
          shadow-[inset_0_0_3px_1px_rgba(255,255,255,0.2)] "
        >
          <div className="flex flex-col justify-center items-center text-center text-[#ffefcb] text-xl font-normal leading-tight gap-2 p-4">
            <div>You have already started this dungeon.</div>
            <div>Would you like to start over or start from the beginning?</div>
          </div>
          <div className="flex justify-center items-center gap-4 p-4">
            <div className="flex justify-center mt-3 z-10">
              <PopupButton
                type={"blue"}
                width="auto"
                onClick={() => {
                  handleRetry();
                  playSound("button");
                }}
              >
                Retry
              </PopupButton>
            </div>
            <div className="flex justify-center mt-3 z-10">
              <PopupButton
                type={"green"}
                width="auto"
                onClick={() => {
                  onClickRestartBattle();
                  playSound("button");
                }}
              >
                Continue
              </PopupButton>
            </div>
          </div>

          <button
            className="absolute top-[-1px] right-0 z-10 w-7 h-7 bg-gradient-to-b from-[#B43D2F] to-[#893026] border border-[#18191a] rounded-full flex items-center justify-center"
            onClick={() => setIsDungeonStart(false)}
          >
            <img
              src={require("../../../assets/images/smithy-modal-close.png")}
              className="w-full h-full"
              alt="Close"
            />
          </button>
        </div>
      </footer>
    </>
  );
};
