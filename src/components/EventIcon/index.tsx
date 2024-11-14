import { useTranslation } from "react-i18next";
import { useUtils } from "../../utils/navigateTo";

export const EventIcon = ({ name, link }: { name: string; link?: string }) => {
  const { t } = useTranslation();
  const { navigateTo } = useUtils();

  const handleClick = () => {
    if (link) {
      navigateTo(link);
    }
  };

  return (
    <div className="relative w-16 h-16 " onClick={() => handleClick()}>
      {/* SVG елемент */}
      <div className="absolute flex justify-center items-center top-0 left-0 w-full h-full z-10">
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-14 h-14"
        >
          <circle
            cx="28"
            cy="28"
            r="27.5625"
            fill="url(#paint0_linear_2037_9986)"
            stroke="black"
            strokeWidth="0.875"
          />
          <defs>
            <linearGradient
              id="paint0_linear_2037_9986"
              x1="28"
              y1="0"
              x2="28"
              y2="56"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.025" stopColor="#E7E6EB" />
              <stop offset="1" stopColor="#8A9AA9" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute flex justify-center items-center w-full h-full z-[15] ">
        <div className="w-12 h-12">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full "
          >
            <g filter="url(#filter0_i_2037_9987)">
              <circle cx="24" cy="24" r="22.75" fill="#1A273C" />
            </g>
            <circle
              cx="24"
              cy="24"
              r="23.1875"
              stroke="black"
              strokeWidth="0.875"
            />
            <defs>
              <filter
                id="filter0_i_2037_9987"
                x="0.375"
                y="0.375"
                width="47.25"
                height="47.25"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="2.1875" />
                <feComposite
                  in2="hardAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
                />
                <feBlend
                  mode="normal"
                  in2="shape"
                  result="effect1_innerShadow_2037_9987"
                />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute flex justify-center items-center w-full h-full z-[15] ">
        <div className="w-[49px] h-[49px]">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full "
          >
            <g filter="url(#filter0_i_2037_9987)">
              <circle cx="24" cy="24" r="22.75" fill="#1A273C" />
            </g>
            <circle
              cx="24"
              cy="24"
              r="23.1875"
              stroke="black"
              strokeWidth="0.875"
            />
            <defs>
              <filter
                id="filter0_i_2037_9987"
                x="0.375"
                y="0.375"
                width="47.25"
                height="47.25"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="2.1875" />
                <feComposite
                  in2="hardAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
                />
                <feBlend
                  mode="normal"
                  in2="shape"
                  result="effect1_innerShadow_2037_9987"
                />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      {/* Картинка */}
      <div className="absolute -top-1 left-1 w-full h-full z-20 flex justify-center items-center">
        <img
          src={require("../../assets/images/eventIcon.png")}
          alt="Event Icon"
          className="w-16 h-16 object-contain"
        />
      </div>
      <div className="absolute bottom-1 z-30 flex justify-center items-center w-full text-center text-[#ebedf8] text-[17px] font-light leading-[13px] text-outline-black">
        {name}
      </div>
    </div>
  );
};
