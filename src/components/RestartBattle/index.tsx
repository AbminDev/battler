// RestartBattle.tsx
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useUtils } from "../../utils/navigateTo";
import { useSoundService } from "../../utils/soundService";
import { PopupButton } from "../PopupButton";

interface RestartBattleProps {
  onClose: () => void;
  handleHeroInDungeon: (dungeonId: number, heroIdInDungeon: number) => void;
  inDungeonId: number;
  heroIdInDungeon: number
}

export const RestartBattle = ({ onClose, handleHeroInDungeon, inDungeonId, heroIdInDungeon }: RestartBattleProps) => {
  const { navigateTo } = useUtils();
  const { t } = useTranslation();
  const { playSound } = useSoundService();

  const dispatch = useDispatch();

  const heroesListRef = useRef<HTMLDivElement>(null);
  const [heroesListScroll, setHeroesListScroll] = useState(false);

  const selectedHeroUid = useSelector(
    (state: RootState) => state.selectedHero.uid
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

  const handleRetry = () => {
    handleHeroInDungeon(inDungeonId, heroIdInDungeon);
    playSound("button");
    onClose();
  };

  const handleContinue = () => {
    handleHeroInDungeon(inDungeonId, heroIdInDungeon);
    playSound("button");
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[55]">
        {/* Overlay */}
        <div className="absolute inset-0" onClick={onClose}></div>

        {/* Модальне Вікно */}
        <div
          className="relative bg-[#241e1a] border-t-[#473730] border-t-[1px] shadow-[inset_0_0_3px_1px_rgba(255,255,255,0.2)] p-6 w-11/12 max-w-md z-60"
          onClick={(e) => e.stopPropagation()} // Запобігає закриттю при кліку всередині модалки
        >
          <div className="flex flex-col justify-center items-center text-center text-[#ffefcb] text-xl font-normal uppercase leading-tight gap-2 p-4">
            <div>{t("You have already started this dungeon.")}</div>
            <div>
              {t("Would you like to start over or continue?")}
            </div>
          </div>
          <div className="flex justify-center items-center gap-4 p-4">
            <div className="flex justify-center mt-3 z-10">
              <PopupButton
                type={"blue"}
                width="auto"
                onClick={handleRetry}
              >
                {t("Retry")}
              </PopupButton>
            </div>
            <div className="flex justify-center mt-3 z-10">
              <PopupButton
                type={"green"}
                width="auto"
                onClick={handleContinue}
              >
                {t("Continue")}
              </PopupButton>
            </div>
          </div>

          {/* Декоративні Края */}
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

          {/* Кнопка Закриття */}
          <button
            className="absolute -top-2 -right-2 z-10 w-7 h-7 bg-gradient-to-b from-[#B43D2F] to-[#893026] border border-[#18191a] rounded-full flex items-center justify-center"
            onClick={onClose}
          >
            <img
              src={require("../../assets/images/smithy-modal-close.png")}
              className="w-full h-full"
              alt="Close"
            />
          </button>
        </div>
      </div>
    </>
  );
};
