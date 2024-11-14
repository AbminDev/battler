import { ProgressBar } from "../../../../layout/components/FooterCave/components/ProgressBar";
import { PopupButton } from "../../../PopupButton";

export const ConstructionCard = ({ config }: any) => (
  <div className="flex justify-center items-center bg-[#473c37] w-full rounded shadow-inner border border-[#18191a] p-2 gap-2">
    <div className="min-w-14 h-14 justify-center items-center inline-flex">
      <img
        className="w-[68px] h-[68px]"
        src={require(`../../../../assets/images/${config.image}`)}
        alt="Construction"
      />
    </div>
    <div className="flex flex-col justify-between items-center flex-grow mx-4 gap-2">
      <div className="text-white text-sm font-normal leading-[14px]">
        {config.text}
      </div>
      <div className="relative w-full max-w-[218px] h-4 -ml-1">
        <div className="w-full h-4 bg-[#312d2a] rounded-[3px] shadow-inner border border-black"></div>
        <div
          className={`absolute left-0 top-[1px] h-3.5 ${config.progress.color} rounded-sm inline-flex justify-center items-start px-1 py-0.5`}
          style={{ width: `${config.progress.progressPercentage}%` }} // Динамічна ширина
        >
          <div
            className={`w-full h-[5px] ${config.progress.color} rounded-[50px] blur-[2px]`}
          ></div>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 top-[-2px] text-center text-white text-[17px] font-normal uppercase leading-[17px]">
          {config.progress.timer}
        </div>
      </div>
    </div>
    <div className="ml-auto">
      <PopupButton height="40px" type={config.button.type}>
        <div className="text-center text-white text-[13px] font-normal leading-[13px]">
          {config.button.text}
        </div>
      </PopupButton>
    </div>
  </div>
);
