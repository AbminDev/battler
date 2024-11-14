import useFitText from "use-fit-text";
import {useTranslation} from "react-i18next";
import React from "react";

export const Preloader = ({ loading }: { loading: boolean }) => {
  const { t } = useTranslation();
  const [loaded, setLoaded] = React.useState(false);

  return loading || !loaded ? (
    <div className={`z-[9998] absolute top-0 left-0 right-0 bottom-0 w-full h-full 
      bg-black text-white bg-[url("./assets/images/preloader.jpg")] bg-cover bg-no-repeat bg-center`}
      onClick={() => {if (!loading && !loaded) setLoaded(true)}}>
      <div
        className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-gradient-to-b from-transparent from-40% to-[#070707]"></div>
      <div
        className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-gradient-to-b from-transparent from-40% to-[#070707]"></div>
      <div className="absolute flex items-center justify-center h-full w-full flex-wrap text-center">
        <div>
          {loading ? (
            <>
              <div className="mb-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="83" height="82" viewBox="0 0 83 82" fill="none" className="animate-spin mx-auto"
                  style={{animationDuration: "0.7s"}}>
                  <g filter="url(#filter0_di_1727_15871)">
                    <circle cx="41.5" cy="41" r="36" stroke="#242118" strokeWidth="8" shapeRendering="crispEdges"/>
                  </g>
                  <mask id="path-2-inside-1_1727_15871" fill="white">
                    <path
                      d="M41.5 4.60158C41.5 2.61248 43.1158 0.983168 45.0968 1.16201C51.9841 1.78379 58.6148 4.18326 64.327 8.15299C71.0283 12.81 76.1448 19.4052 78.99 27.0537C81.8352 34.7021 82.273 43.0379 80.2447 50.9423C78.2163 58.8467 73.8189 65.9416 67.6424 71.275C61.4659 76.6084 53.8059 79.9251 45.6902 80.7799C37.5746 81.6348 29.3917 79.9869 22.2395 76.0575C15.0873 72.1281 9.30801 66.1052 5.67722 58.7969C2.58226 52.5671 1.17464 45.6575 1.56312 38.7532C1.67486 36.7673 3.52224 35.4061 5.4901 35.696C7.45797 35.9858 8.79732 37.8179 8.72488 39.8057C8.52645 45.2502 9.68733 50.679 12.1281 55.592C15.1051 61.5843 19.8436 66.5226 25.7079 69.7444C31.5721 72.9662 38.2815 74.3173 44.9357 73.6164C51.5898 72.9155 57.8704 70.1961 62.9347 65.8231C67.9989 61.4502 71.6045 55.6329 73.2676 49.1519C74.9307 42.6709 74.5717 35.8363 72.2389 29.5651C69.906 23.294 65.7108 17.8864 60.2164 14.068C55.7115 10.9373 50.5098 8.99778 45.0944 8.40069C43.1173 8.18269 41.5 6.59067 41.5 4.60158Z"/>
                  </mask>
                  <path
                    d="M41.5 4.60158C41.5 2.61248 43.1158 0.983168 45.0968 1.16201C51.9841 1.78379 58.6148 4.18326 64.327 8.15299C71.0283 12.81 76.1448 19.4052 78.99 27.0537C81.8352 34.7021 82.273 43.0379 80.2447 50.9423C78.2163 58.8467 73.8189 65.9416 67.6424 71.275C61.4659 76.6084 53.8059 79.9251 45.6902 80.7799C37.5746 81.6348 29.3917 79.9869 22.2395 76.0575C15.0873 72.1281 9.30801 66.1052 5.67722 58.7969C2.58226 52.5671 1.17464 45.6575 1.56312 38.7532C1.67486 36.7673 3.52224 35.4061 5.4901 35.696C7.45797 35.9858 8.79732 37.8179 8.72488 39.8057C8.52645 45.2502 9.68733 50.679 12.1281 55.592C15.1051 61.5843 19.8436 66.5226 25.7079 69.7444C31.5721 72.9662 38.2815 74.3173 44.9357 73.6164C51.5898 72.9155 57.8704 70.1961 62.9347 65.8231C67.9989 61.4502 71.6045 55.6329 73.2676 49.1519C74.9307 42.6709 74.5717 35.8363 72.2389 29.5651C69.906 23.294 65.7108 17.8864 60.2164 14.068C55.7115 10.9373 50.5098 8.99778 45.0944 8.40069C43.1173 8.18269 41.5 6.59067 41.5 4.60158Z"
                    stroke="url(#paint0_linear_1727_15871)" strokeWidth="20" mask="url(#path-2-inside-1_1727_15871)"/>
                  <defs>
                    <filter id="filter0_di_1727_15871" x="0.5" y="0" width="82" height="82" filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                     result="hardAlpha"/>
                      <feMorphology radius="1" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_1727_15871"/>
                      <feOffset/>
                      <feComposite in2="hardAlpha" operator="out"/>
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1727_15871"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1727_15871" result="shape"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                      <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect2_innerShadow_1727_15871"/>
                      <feOffset/>
                      <feGaussianBlur stdDeviation="0.5"/>
                      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
                      <feBlend mode="normal" in2="shape" result="effect2_innerShadow_1727_15871"/>
                    </filter>
                    <linearGradient id="paint0_linear_1727_15871" x1="1.5" y1="41" x2="81.5" y2="41" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FFFE2E"/>
                      <stop offset="1" stopColor="#FE8315"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="text-[24px]">{t('loading')}</div>
            </>
            ) : null}
          {!loading && !loaded ? (
            <div className="py-1.5 px-5 text-nowrap text-[28px] font-bold bg-[#d3a17e] text-stroke-small border-[1px] border-b-[4px] border-[#4f3b32] rounded-[5px] shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              onClick={() => setLoaded(true)}>Tap to play</div>
          ) : null}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 w-full px-5">
        <div className="relative w-full mb-10">
          <div className="relative flex justify-center text-nowrap bg-gradient-to-b from-[#FFE8BC]
            to-[#BE7F60] text-transparent font-black game-name_text-shadow text-stroke-small"
            style={{
              WebkitBackgroundClip: 'text',
              whiteSpace: 'nowrap',
              fontSize: "34px"
            }}>Dungeon of KITSU</div>
          <div className="absolute top-0 w-full flex justify-center text-nowrap bg-gradient-to-b
            from-[#FFE8BC] to-[#BE7F60] text-transparent font-black"
            style={{
              WebkitBackgroundClip: 'text',
              whiteSpace: 'nowrap',
              fontSize: "34px"
            }}>Dungeon of KITSU</div>
        </div>
        <div className="relative text-lg text-center text-[#DFD9C4] mb-4">{t('loadingDescription')}</div>
        <div className="relative mb-16 flex justify-center">
          <a href="https://x.com/kitsuneton" target="_blank" rel="noreferrer" className="mr-4">
            <img src={require("../../../assets/images/preloader-x.png")} alt=""/>
          </a>
          <a href="https://t.me/kitsune_ton" target="_blank" rel="noreferrer" className="">
            <img src={require("../../../assets/images/preloader-tg.png")} alt=""/>
          </a>
        </div>
      </div>
    </div>
  ) : null;
}
