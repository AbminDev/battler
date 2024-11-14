import { Card } from "../../components/Card";
import { CardProps } from "../../interfaces/card";

import { HpBarAnimation, SparksLvlup } from "../animation";
import { useTranslation } from "react-i18next";
import { PopupButton } from "../PopupButton";
import {useSoundService} from "../../utils/soundService";

export const LevelUpBanner = ({ text }: { text: string }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full relative rounded-[2px] p-[1px] mx-auto -top-8">
      <div className=" inset-0 flex justify-center items-center">
        <div className="relative flex justify-center items-center z-20">
          <img
            src={require("../../assets/images/rewardDungeon.png")}
            className="w-full h-full"
          />

          <div className="absolute top-3 text-center text-stroke-regular text-white text-[25px] font-normal leading-[25px] tracking-wide">
            {text}
          </div>
        </div>
      </div>
    </div>
  );
};

export const LevelUp = () => {
  const { t } = useTranslation();
  const { playSound } = useSoundService();

  const cardArray: CardProps[] = [
    {
      id: 16,
      lvl: 1,
      uid: "unique-id-1",
      selected: true,
      draggable: false,
      hidden: false,
      isBacklight: true,
    },
    {
      id: 2,
      lvl: 1,
      uid: "unique-id-2",
      selected: false,
      draggable: true,
      hidden: true,
      isBacklight: false,
    },
  ];

  return (
    <div>
      <div className="absolute w-full h-[300px] z-20">
        <SparksLvlup className="absolute w-full h-full z-20" />
      </div>
      <div className="w-full h-full fixed top-0 left-0 bottom-0 right-0 z-10">
        <div className="w-full h-full absolute bg-black opacity-60"></div>
        <div className="absolute top-[20%] inset-x-4 bg-[#554837] border border-[#18191a] rounded-[2px] p-[2px]">
          <img
            src={require("../../assets/images/cards-modal-border.png")}
            className="absolute w-[17.5px] h-[21px] -top-[6px] -left-[5px]"
            alt=""
          />
          {/* <img
            src={require("../../assets/images/cards-modal-border.png")}
            className="absolute w-[17.5px] h-[21px] -bottom-[6.5px] -left-[4.5px] -rotate-90"
            alt=""
          /> */}
          {/* <img
            src={require("../../assets/images/cards-modal-border.png")}
            className="absolute w-[17.5px] h-[21px] -bottom-[5.5px] -right-[4.5px] -rotate-180"
            alt=""
          /> */}
          <img
            src={require("../../assets/images/cards-modal-border.png")}
            className="absolute w-[17.5px] h-[21px] -top-[6px] -right-[5px]  transform scale-x-[-1]"
          ></img>
          <div className=" w-full h-full bg-[#242520] border border-[#18191a] rounded-[2px] p-3 shadow-inner-sm-white">
            <div className="relative w-full h-full bg-[#201b18] rounded-[1px] p-3 pt-7 shadow-inner-sm-black">
              <div className="absolute top-[-20px] left-0 right-0 flex justify-self-center">
                <LevelUpBanner text={t("tutorial.reward")} />
              </div>
              <div className="flex justify-center items-center pt-4 gap-2">
                <div className="text-white text-xl font-normal leading-tight">
                  HP
                </div>
                <div className="h-[16px] w-full  z-10">
                  <HpBarAnimation currentHp={10} maxHp={20} />
                </div>

                <div className="text-base font-light leading-tight whitespace-nowrap">
                  <span className="text-white">{t("maximumHealth")}</span>
                  <span className="text-[#44a178]"> +4</span>
                </div>
              </div>

              <div className="w-full h-px bg-[#584d3c]"></div>

              <div className="relative grid grid-cols-2 gap-7 mb-3 pt-4">
                {cardArray.map((card, index) => (
                  <div className="flex flex-col items-center" key={index}>
                    <Card
                      id={card.id}
                      lvl={card.lvl}
                      uid={card.uid}
                      hidden={false}
                    />
                    <div className="w-full h-[16px]"></div>
                    <PopupButton type="gold" onClick={() => {
                      playSound('button');
                    }} width="auto">
                      {t("get")}
                    </PopupButton>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
