import { PopupButton } from "../../../PopupButton";

export const BuilderRentedCard = ({ config }: any) => (
  <div className="flex justify-center items-center bg-[#473c37] w-full rounded shadow-inner border border-[#18191a] p-2 gap-2">
    <div className="min-w-14 min-h-14 justify-center rounded-full items-center inline-flex border border-black bg-[#5c5040]">
      <div className="w-11 h-11 bg-[#312d26] rounded-full border border-black justify-center">
        <img
          className="w-full h-full rounded-full"
          src={require(`../../../../assets/images/${config.image}`)}
          alt={config.name}
        />
      </div>
    </div>
    <div className="text-white text-sm font-normal leading-[14px]">
      {config.name}
    </div>
    <div className="flex flex-col justify-center items-center ml-auto gap-1">
      <PopupButton height="40px" type={config.button.type}>
        <div className="text-center text-white text-[13px] font-normal leading-[13px]">
          {config.button.text}
        </div>
      </PopupButton>
      <div className="flex justify-center items-center gap-1">
        <img
          className="w-full h-full rounded-full"
          src={require("../../../../assets/images/times-icon.png")}
          alt="Timer Icon"
        />
        <div className="text-right text-[#e44a38] text-md font-normal uppercase leading-3">
          {config.timer}
        </div>
      </div>
    </div>
  </div>
);
