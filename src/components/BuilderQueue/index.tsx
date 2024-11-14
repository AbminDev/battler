import { ProgressBar } from "../../layout/components/FooterCave/components/ProgressBar";
import { PopupButton } from "../PopupButton";
import {
  BuilderRentedCard,
  BuilderUnavailableCard,
  ConstructionCard,
} from "./components";

interface BuilderQueueProps {
  closeDeck: () => void;
}

export const uiConfig = [
  {
    type: "construction",
    image: "buildings/build2.png",
    text: "LVL. 6 Shrine Upgrade in progress",
    progress: {
      progressPercentage: 10,
      timer: "04:02:12",
      color: "bg-gradient-to-b from-[#fffe2e] to-[#fe8315]",
    },
    button: { text: "Speed Up", type: "blue" },
  },
  {
    type: "builderRented",
    image: "builderIcon.png",
    name: "Greg",
    button: { text: "Construct", type: "blue" },
    timer: "04:02:12",
  },
  {
    type: "builderUnavailable",
    image: "builderIcon.png",
    name: "Unavailable",
    message: "Buy the Pack to permanently unlock the queue.",
    button: { text: "Activate Queue", type: "gold", size: "10px" },
  },
  {
    type: "builderUnavailable",
    image: "builderIcon.png",
    name: "Unavailable",
    message: "Buy the Pack to permanently unlock the queue.",
    button: { text: "Activate Queue", type: "gold", size: "10px" },
  },
];

const renderCard = (config: { type: any }, index: any) => {
  switch (config.type) {
    case "construction":
      return <ConstructionCard key={index} config={config} />;
    case "builderRented":
      return <BuilderRentedCard key={index} config={config} />;
    case "builderUnavailable":
      return <BuilderUnavailableCard key={index} config={config} />;
    default:
      return null;
  }
};

export const BuilderQueue: React.FC<BuilderQueueProps> = ({ closeDeck }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Modal */}
      <div className="relative bg-[#554837] border border-[#18191a] rounded-md p-1 max-w-lg w-full mx-4 sm:mx-6 md:mx-8 lg:mx-10">
        {/* Close Button */}
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
        <button
          className="absolute top-0 right-0 w-7 h-7 bg-gradient-to-b from-[#B43D2F] to-[#893026] border border-[#18191a] rounded-full flex items-center justify-center z-10"
          onClick={closeDeck}
        >
          <img
            src={require("../../assets/images/smithy-modal-close.png")}
            className="w-full h-full"
            alt="Close"
          />
        </button>

        {/* Modal Content */}
        <div className="w-full h-full bg-[#242520] border border-[#18191a] rounded-md p-3 shadow-inner-sm-white">
          {/* Title */}
          <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 flex justify-center">
            <div className="min-w-[120px] bg-[#847a70] border border-[#18191a] rounded-sm p-1">
              <div className="bg-[#351d1e] text-center text-white text-xl p-2 leading-none rounded-sm border border-[#18191a] shadow-inner-sm-black">
                Building Queue
              </div>
            </div>
          </div>
          {/* Description */}
          <div className="flex justify-center gap-x-4 my-4">
            <div className="text-center text-[#a49a7c] text-sm font-light leading-4">
              Commander, manage your Building Queues here. Enhance development
              speed by hiring more queues or accelerating building
            </div>
          </div>
          <div className="relative w-full h-full bg-[#201b18] rounded-sm p-3 pt-7 shadow-inner-sm-black">
            <div className="flex flex-col justify-center items-center gap-2">
              {uiConfig.map((config, index) => renderCard(config, index))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
