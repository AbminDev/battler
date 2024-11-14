import { ProgressBar } from "../../../layout/components/FooterCave/components/ProgressBar";
import { LevelUpBanner } from "../../LevelUp";
import { PopupButton } from "../../PopupButton";

interface BuilderQueueProps {}

export const BuilderOffer: React.FC<BuilderQueueProps> = () => {
  return (
    <div className="fixed inset-0 z-[999] flex justify-center items-center flex-col p-4">
      {/* Title */}
      <div className="relative top-[50px]">
        <LevelUpBanner text={"Construction queue 2"} />
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Modal */}
      <div className="relative bg-[#554837] border border-[#18191a] rounded-md p-1 max-w-lg w-full mx-4 sm:mx-6 md:mx-8 lg:mx-10">
        {/* Close Button */}

        <img
          src={require("../../../assets/images/cards-modal-border.png")}
          className="absolute w-[17.5px] h-[21px] -bottom-[6.5px] -left-[4.5px] -rotate-90"
          alt=""
        />
        <img
          src={require("../../../assets/images/cards-modal-border.png")}
          className="absolute w-[17.5px] h-[21px] -bottom-[5.5px] -right-[4.5px] -rotate-180"
          alt=""
        />

        {/* Modal Content */}
        <div className="w-full h-full bg-[#242520] border border-[#18191a] rounded-md p-3 shadow-inner-sm-white">
          <div className="relative w-full h-full bg-[#201b18] rounded-sm shadow-inner-sm-black">
            <img
              className="p-8 absolute  top-[-67px]"
              src={require("../../../assets/images/offers/builder/builder-offer.png")}
            />

            <img
              className=""
              src={require("../../../assets/images/offers/builder/bg.png")}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-b from-transparent via-gray-700 via-gray-600 to-black  justify-center items-center w-full"
            >
              <div className="absolute bottom-4 flex flex-col w-full gap-2">
                <div className="px-2 text-center text-white text-base font-light leading-none ">
                  Permamently unlock the Construction Queue 2 for advanced
                  progress
                </div>
                <div className="flex justify-center items-center gap-5">
                  <PopupButton type={"blue"}> Rent</PopupButton>
                  <PopupButton type={"gold"}> Buy</PopupButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
