import { useState } from "react";
import { InfoModal, ProgressBar } from "./components";
import { heroes } from "../../mock/heroes";
import { InfoButton } from "../../components/InfoButton";
import { SkeletonAnimation } from "../../components";

const ARROW_COLOR = "#3A00E5";

export const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModal, setModal] = useState(false);

  function clickSlide(mode: "increase" | "decrease") {
    switch (mode) {
      case "increase":
        if (heroes.length - 1 === currentIndex) {
          setCurrentIndex(0);
        } else {
          setCurrentIndex((currentIndex) => currentIndex + 1);
        }
        break;
      case "decrease":
        if (currentIndex === 0) {
          setCurrentIndex(heroes.length - 1);
        } else {
          setCurrentIndex((currentIndex) => currentIndex - 1);
        }
        break;
      default:
        break;
    }
  }

  return (
    <>
      {isModal ? <InfoModal onClickClose={() => setModal(false)} /> : null}
      <div className="flex-row flex items-center justify-center flex-1">
        {/* <div className="left-10">
          <button onClick={() => clickSlide("decrease")}>
            <svg
              width="22"
              height="42"
              viewBox="0 0 22 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.4117 1.54665C22.0995 2.2345 22.1621 3.31089 21.5993 4.06938L21.4117 4.28669L4.69925 21L21.4117 37.7133C22.0995 38.4012 22.1621 39.4776 21.5993 40.236L21.4117 40.4534C20.7238 41.1412 19.6475 41.2037 18.889 40.641L18.6717 40.4534L0.588319 22.37C-0.0995359 21.6822 -0.162068 20.6058 0.400722 19.8473L0.588319 19.63L18.6717 1.54665C19.4283 0.790008 20.6551 0.790008 21.4117 1.54665Z"
                fill={ARROW_COLOR}
              />
            </svg>
          </button>
        </div> */}
        <div className="w-full mx-10 h-full max-h-[247px] flex-1 items-center content-center justify-center flex flex-row gap-2">
          <SkeletonAnimation />
          {/* <div className="h-full max-h-[247px] w-full pl-9 bg-[url('./assets/images/hero_1.png')] bg-no-repeat bg-center bg-contain">
          </div> */}
          <div className="self-start -ml-10">
            <InfoButton onClick={() => setModal(true)} />
          </div>
        </div>
        {/* <div className="right-10">
          <button onClick={() => clickSlide("increase")}>
            <svg
              width="22"
              height="42"
              viewBox="0 0 22 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.588316 1.54665C-0.0995387 2.2345 -0.162071 3.31089 0.40072 4.06938L0.588317 4.28669L17.3008 21L0.588318 37.7133C-0.0995372 38.4012 -0.162069 39.4776 0.400721 40.236L0.588318 40.4534C1.27617 41.1412 2.35255 41.2037 3.11105 40.641L3.32836 40.4534L21.4117 22.37C22.0995 21.6822 22.1621 20.6058 21.5993 19.8473L21.4117 19.63L3.32836 1.54665C2.57171 0.790008 1.34496 0.790008 0.588316 1.54665Z"
                fill={ARROW_COLOR}
              />
            </svg>
          </button>
        </div> */}
      </div>
      <ProgressBar
        progress={heroes[currentIndex].progress}
        lvl={heroes[currentIndex].lvl}
      />
    </>
  );
};
