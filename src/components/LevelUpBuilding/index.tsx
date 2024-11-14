import { useTranslation } from "react-i18next";
import { UpgradeArrow } from "../../containers/Room";
import { LevelUpBanner } from "../LevelUp";
import { UpgradeDataRow } from "../PopupUpgradeTable";
import { RootState } from "../../app/store";
import { LevelUpRays } from "../animation/LevelUpRays";
import { useSelector } from "react-redux";
import { FriendsButton } from "../FriendsButton";
import { InventoryButton } from "../InventoryButton";
import { QuestsButton } from "../QuestsButton";
import { TutorialFarmStage } from "../../interfaces/tutorial";

export const LevelUpBuilding = ({
  text,
  upgradeData,
  buildingId,
  roomLvl
}: {
  text: string;
  upgradeData: UpgradeDataRow[];
  buildingId?: number;
  roomLvl?: number
}) => {
  const { t } = useTranslation();

  const isFarmTutorialCompleted = useSelector(
    (state: RootState) => state.farmTutorial.tutorialFarmSave?.save?.completed
  );
  const farmTutorialSave = useSelector(
    (state: RootState) => state.farmTutorial.tutorialFarmSave.save
  );


  return (
    <div className="fixed inset-0 z-[999]">
      <div className="w-full h-full absolute bg-gradient-to-b from-black via-black/70 to-black opacity-80"></div>
      <div className="relative top-[35%] w-full h-full inset-x-4 rounded-[2px] p-[2px] left-0">
        <div className="relative top-[-47%] flex w-full h-full">
          <LevelUpRays />
        </div>

        <div className="absolute top-[-20px] left-0 right-0 flex justify-center">
          <LevelUpBanner text={`${t(text)} Level Up!`} />
        </div>
        <div className="absolute top-0 left-0 right-0 w-full flex flex-col justify-center pt-5">
          <div className="w-full max-w-[600px]">
            {upgradeData && upgradeData.length > 0
              ? upgradeData.map((row, i) => (
                  <div
                    className={`w-full flex justify-center items-center px-6 ${
                      i % 2 === 1 ? "py-2.5" : "py-4"
                    }`}
                    key={i}
                  >
                    <p className="text-[18px] text-white w-1/2 pl-6">
                      {t(row.title)}
                    </p>
                    <div className="flex flex-row items-center justify-center gap-1  w-1/2">
                      <p className="text-[16px] text-white">{row.nowValue}</p>
                      <UpgradeArrow direction="right" />
                      <p className="text-[16px] text-[#F6A000]">
                        {row.newValue}
                      </p>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
        {farmTutorialSave?.stage &&
          ((farmTutorialSave.stage < TutorialFarmStage.finish &&
            !isFarmTutorialCompleted) ||
            farmTutorialSave.stage ===
              TutorialFarmStage.finishSecondBuilding && roomLvl  && roomLvl <= 1) &&
          buildingId &&
          (buildingId === 2 || buildingId === 3) && (
            <div className="absolute top-[330px] left-0 right-0 w-full flex flex-col items-center justify-center pt-5 gap-4">
              <div className="w-full flex items-center justify-center ">
                <svg
                  width="88"
                  height="2"
                  viewBox="0 0 88 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="88"
                    height="2"
                    fill="url(#paint0_linear_5389_79693)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_5389_79693"
                      x1="0"
                      y1="1"
                      x2="88"
                      y2="1"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="white" stopOpacity="0" />
                      <stop offset="1" stopColor="white" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="text-white mx-2">New section available</div>

                <svg
                  width="88"
                  height="2"
                  viewBox="0 0 88 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="88"
                    height="2"
                    transform="matrix(-1 0 0 1 88 0)"
                    fill="url(#paint0_linear_5389_79694)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_5389_79694"
                      x1="0"
                      y1="1"
                      x2="88"
                      y2="1"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="white" stopOpacity="0" />
                      <stop offset="1" stopColor="white" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex gap-2">
                {farmTutorialSave?.stage ===
                  TutorialFarmStage.finishFirstBuilding && (
                  <>
                    <div className=" flex items-center justify-center -mt-2 w-24 h-[60px] pb-1 border-t border-r border-b border-black bg-transparent bg-gradient-to-b from-[#1E0400] to-[#452B31] rounded-r-md">
                      <button className="relative flex items-center justify-center w-full h-full  bg-transparent bg-gradient-to-b from-[#FEE7BA] to-[#B6765A] rounded-r-md ">
                        <div className="absolute top-1 right-1 w-[5px] h-[5px] bg-[#864C39] rounded-full z-20"></div>
                        <div className="absolute bottom-1 left-1 w-[11px] h-[11px] bg-[#5B2400] rounded-full opacity-25"></div>
                        <div className="absolute top-2  left-1 w-[3px] h-[3px] bg-[#E4B98F] rounded-full "></div>
                        <div className="relative flex justify-center items-center w-14 h-14 -mt-5">
                          <img
                            src={require("../../assets/images/heroes.png")}
                            className="w-full h-full"
                          />
                          <div className="absolute -bottom-3 flex justify-center items-end z-10 text-white text-2xl font-normal uppercase leading-normal tracking-[3.5px] text-shadow">
                            {t("footer.heroes")}
                          </div>
                        </div>
                      </button>
                    </div>
                    <InventoryButton onClick={() => {}} />
                  </>
                )}

                {farmTutorialSave?.stage ===
                  TutorialFarmStage.finishSecondBuilding && (
                  <>
                    <QuestsButton />
                    <FriendsButton />
                  </>
                )}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};
