import {useTranslation} from "react-i18next";

export const HeaderIco = (props: {lvl: number}) => {
  const { t } = useTranslation();

  return (
      <>
          <div className="flex-row flex justify-between absolute w-[60px] ml-[-2px] mt-[-2px]">
              <div className="flex w-[8px] h-[8px] bg-[#454545] border-[0.3px] border-black rounded-[1px] items-center justify-center">
                  <div className="rounded-[50%] w-[2px] h-[2px] bg-[#2C2C2E] border-[0.1px] border-black [box-shadow:0px_0px_1px_0px_rgba(255,255,255,0.6)]"/>
              </div>
              <div className="flex w-[8px] h-[8px] bg-[#454545] border-[0.3px] border-black rounded-[1px] items-center justify-center">
                  <div className="rounded-[50%] w-[2px] h-[2px] bg-[#2C2C2E] border-[0.1px] border-black [box-shadow:0px_0px_1px_0px_rgba(255,255,255,0.6)]"/>
              </div>
          </div>
          <div className="w-[56px] h-[56px] bg-[#50493F] p-[3px] items-center justify-center rounded-[2px] flex border-[1px] border-black">
              <div className="bg-[#7C7D43] w-full h-full border-[1px] rounded-[1px] border-black items-center justify-center text-center flex">
                  <img src={require('../../../../../assets/images/Kitsune.png')}/>
              </div>
          </div>
          <div className="flex-row flex justify-between absolute w-[60px] ml-[-2px] mt-[-6px]">
              <div className="flex w-[8px] h-[8px] bg-[#454545] border-[0.3px] border-black rounded-[1px] items-center justify-center">
                  <div className="rounded-[50%] w-[2px] h-[2px] bg-[#2C2C2E] border-[0.1px] border-black [box-shadow:0px_0px_1px_0px_rgba(255,255,255,0.6)]"/>
              </div>
              <div className="flex w-[8px] h-[8px] bg-[#454545] border-[0.3px] border-black rounded-[1px] items-center justify-center">
                  <div className="rounded-[50%] w-[2px] h-[2px] bg-[#2C2C2E] border-[0.1px] border-black [box-shadow:0px_0px_1px_0px_rgba(255,255,255,0.6)]"/>
              </div>
          </div>
          <div className="w-[40px] h-[14px] bg-[rgba(0,0,0,0.40)] ml-[8px] rounded-[0_0_2px_2px] text-center">
              <p className="text-[10px] text-[#F6A000]">{t('level', {lvl: props.lvl})}</p>
          </div>
      </>
  );
};
