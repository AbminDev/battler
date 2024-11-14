import React, { useEffect, useMemo, useRef, useState } from "react";
import { RootState, store } from "../../../../../app/store";
import {
  BuildAnimation,
  LevelUpBuildingAnimation,
} from "../../../../../components";
import { RoomStatus } from "../../../../../enums/buildingStatus";
import { Resources } from "../../../../../enums/resources";
import { BuildingConfig } from "../../../../../interfaces/farm";
import {
  GoldIco,
  KeysIco,
  KitsuIco,
  StoneIco,
  XPIco,
} from "../../../../../layout/components/HeaderFarm/components/ResourceCard";
import { Claim } from "../../interface";
import { UpgradeDataRow } from "../../../../../components/PopupUpgradeTable";
import { PopupWindow } from "../../../../../components/PopupWindow";
import { PopupButton } from "../../../../../components/PopupButton";
import { Boost } from "../../../../../app/features/inventorySlice";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useUtils } from "../../../../../utils/navigateTo";
import ReactDOM from "react-dom";
import { SwordsAnimation } from "../../../../../components/animation/SwordsAnimation";
import { useDispatch, useSelector } from "react-redux";
import { AnimatedResource } from "./components";
import { LevelUpBuilding } from "../../../../../components/LevelUpBuilding";
import { useTranslation } from "react-i18next";
import { useSessionStorage } from "@uidotdev/usehooks";

export const RenderResourceIco = (props: { type?: Resources }) => {
  switch (props.type) {
    case Resources.stone:
      return <StoneIco />;
    case Resources.experience:
      return <XPIco />;
    case Resources.kitsu:
      return <KitsuIco />;
    case Resources.keys:
      console.log("we are hero KeysIco");
      return <KeysIco />;
    default:
      return <div />;
  }
};

export const RenderRoom = (props: {
  triggerEndBuild: boolean;
  triggerShowLevelUp: boolean;
  status?: RoomStatus;
  isClaim: Claim;
  building?: BuildingConfig;
  id: number;
  roomLvl?: number;
  title?: string;
  boosts: Boost[];
  buildTime: number;
  isConfirmationRequired: boolean;
  confirmBuildingCompletion: () => void;
}) => {
  const {
    status = RoomStatus.inactive,
    isClaim,
    building,
    triggerEndBuild,
    triggerShowLevelUp,
    roomLvl,
    title,
    buildTime,
    isConfirmationRequired,
    confirmBuildingCompletion,

  } = props;

  const [timer, setTimer] = useSessionStorage<any>(`timer-${building?.id}`, "");

  const { navigateTo } = useUtils();
  const { t } = useTranslation();

  const [triggerClose, setTriggerCloseLevelUp] = useSessionStorage(
    "buildingLevelUp",
    false
  );


  const oldData = building?.lvlInfo.find((v) => v.lvl === roomLvl! - 1);
  const upgradeData = building?.lvlInfo.find((v) => v.lvl === roomLvl!);


  const combinedData: UpgradeDataRow[] =
    upgradeData?.upgradeData?.map((upgradeItem) => {
      const oldItem = oldData?.upgradeData?.find(
        (item) => item.title === upgradeItem.title
      );

      return {
        title: upgradeItem.title,
        nowValue: oldItem ? oldItem.value : 0, // Якщо oldData немає або параметра немає, використовуємо 0
        newValue: upgradeItem.value, // Завжди беремо нове значення з upgradeData
      };
    }) || [];


  if (triggerShowLevelUp) {
    setTriggerCloseLevelUp(true);
  }



  const [buildAnimation, setEndBuildAnimation] = useState(true);

  const handleEndBuilding = () => {
    setTimeout(() => {
      setEndBuildAnimation(false);
      setTimeout(() => {
        setEndBuildAnimation(true);
      }, 5000);
    }, 1000);
  };

  useEffect(() => {
    if (triggerEndBuild) {
      handleEndBuilding();
    }
  }, [triggerEndBuild]);

  const [showClaimAnimation, setShowClaimAnimation] = useState(false);

  const previousClaimValueRef = useRef<number | null>(null);
  const [animatedResources, setAnimatedResources] = useState<any>([]);

  const balancePositions = useSelector(
    (state: RootState) => state.resources.positions
  );
  const containerRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !isClaim.isClaim &&
      isClaim.value === 0 &&
      previousClaimValueRef.current !== null
    ) {
      setShowClaimAnimation(true);
      // Приховати анімацію після 3 секунд
      const timer = setTimeout(() => {
        setShowClaimAnimation(false);
        previousClaimValueRef.current = null; // Скинути попереднє значення після анімації
      }, 3000);
      return () => clearTimeout(timer);
    } else if (isClaim.isClaim) {
      // Зберегти попереднє значення перед новим клеймом
      previousClaimValueRef.current = isClaim.value;
    }
  }, [isClaim.isClaim, isClaim.value]);

  useEffect(() => {
    if (
      !isClaim.isClaim &&
      isClaim.value === 0 &&
      previousClaimValueRef.current !== null
    ) {
      setShowClaimAnimation(true);
      // Запуск анімації ресурсів

      const value = previousClaimValueRef.current;
      let iconCount;

      if (value >= 3000) {
        iconCount = 40;
      } else if (value >= 300 && value < 3000) {
        iconCount = 35;
      } else if (value > 100 && value < 300) {
        iconCount = 20;
      } else {
        iconCount = 15;
      }

      // Припустимо, у вас є тип ресурсу, який анімується
      // Наприклад, building.resourceType
      const resourceType = building?.resourceType;

      const newResources = Array.from({ length: iconCount }, (_, index) => ({
        id: `${Date.now()}-${index}`,
        type: resourceType,
        startPosition: {
          x: Math.random() * 200 - 100, // Випадкове розташування навколо центру
          y: Math.random() * 200 - 100,
        },
      }));

      console.log("newResources", newResources);
      setAnimatedResources(newResources);

      // Приховати анімацію після 4 секунд (відповідно до тривалості анімації)
      const timer = setTimeout(() => {
        setShowClaimAnimation(false);
        setAnimatedResources([]); // Видалити анімовані ресурси
        previousClaimValueRef.current = null; // Скинути попереднє значення після анімації
      }, 4000);

      return () => clearTimeout(timer);
    } else if (isClaim.isClaim) {
      // Зберегти попереднє значення перед новим клеймом
      previousClaimValueRef.current = isClaim.value;
    }
  }, [isClaim.isClaim, isClaim.value, building?.resourceType]);

  const handleAnimationComplete = (id: any) => {
    setAnimatedResources((prev: any[]) => prev.filter((res) => res.id !== id));
  };

  // Функція для конвертації абсолютних координат до координат контейнера
  const getRelativePosition = (absolutePosition: { x: number; y: number }) => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      return {
        x: absolutePosition.x - containerRect.left,
        y: absolutePosition.y - containerRect.top,
      };
    }
    return { x: 0, y: 0 };
  };

  switch (status) {
    case RoomStatus.farming:
      return (
        <>
          <div
            ref={containerRef}
            className="w-full h-full flex items-center justify-center relative"
          >
            {isClaim.isClaim && !isClaim.isLimit && (
              <div className="flex absolute top-14 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[54] w-14 h-14 items-center justify-center">
                <div className="absolute z-[54] w-14 h-14">
                  <svg
                    width="36"
                    height="40"
                    viewBox="0 0 36 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                  >
                    <g filter="url(#filter0_dii_2993_11801)">
                      <mask
                        id="path-1-outside-1_2993_11801"
                        maskUnits="userSpaceOnUse"
                        x="1"
                        y="0"
                        width="34"
                        height="38"
                        fill="black"
                      >
                        <rect fill="white" x="1" width="34" height="38" />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M22.0139 32.5758C22.0787 32.5043 22.1632 32.4533 22.2562 32.4277C29.0267 30.564 34 24.3628 34 17C34 8.16344 26.8366 1 18 1C9.16344 1 2 8.16344 2 17C2 24.3628 6.97328 30.564 13.7438 32.4277C13.8368 32.4533 13.9213 32.5043 13.9861 32.5758L17.6297 36.5918C17.8281 36.8106 18.1719 36.8106 18.3703 36.5918L22.0139 32.5758Z"
                        />
                      </mask>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M22.0139 32.5758C22.0787 32.5043 22.1632 32.4533 22.2562 32.4277C29.0267 30.564 34 24.3628 34 17C34 8.16344 26.8366 1 18 1C9.16344 1 2 8.16344 2 17C2 24.3628 6.97328 30.564 13.7438 32.4277C13.8368 32.4533 13.9213 32.5043 13.9861 32.5758L17.6297 36.5918C17.8281 36.8106 18.1719 36.8106 18.3703 36.5918L22.0139 32.5758Z"
                        fill="white"
                      />
                      <path
                        d="M17.6297 36.5918L16.8891 37.2638L17.6297 36.5918ZM18.3703 36.5918L19.1109 37.2638L18.3703 36.5918ZM13.7438 32.4277L14.0092 31.4636L13.7438 32.4277ZM13.9861 32.5758L14.7267 31.9038L13.9861 32.5758ZM22.2562 32.4277L22.5216 33.3919L22.2562 32.4277ZM22.0139 32.5758L21.2733 31.9038L22.0139 32.5758ZM33 17C33 23.9012 28.3386 29.7163 21.9908 31.4636L22.5216 33.3919C29.7148 31.4118 35 24.8244 35 17H33ZM18 2C26.2843 2 33 8.71573 33 17H35C35 7.61116 27.3888 0 18 0V2ZM3 17C3 8.71573 9.71573 2 18 2V0C8.61116 0 1 7.61116 1 17H3ZM14.0092 31.4636C7.66139 29.7163 3 23.9012 3 17H1C1 24.8244 6.28516 31.4118 13.4784 33.3919L14.0092 31.4636ZM18.3703 35.9199L14.7267 31.9038L13.2454 33.2477L16.8891 37.2638L18.3703 35.9199ZM21.2733 31.9038L17.6297 35.9199L19.1109 37.2638L22.7546 33.2477L21.2733 31.9038ZM16.8891 37.2638C17.4844 37.9199 18.5156 37.9199 19.1109 37.2638L17.6297 35.9199C17.8281 35.7012 18.1719 35.7012 18.3703 35.9199L16.8891 37.2638ZM13.4784 33.3919C13.3938 33.3685 13.3117 33.3208 13.2454 33.2477L14.7267 31.9038C14.5308 31.6879 14.2799 31.5381 14.0092 31.4636L13.4784 33.3919ZM21.9908 31.4636C21.7201 31.5381 21.4692 31.6879 21.2733 31.9038L22.7546 33.2477C22.6883 33.3208 22.6062 33.3685 22.5216 33.3919L21.9908 31.4636Z"
                        fill="black"
                        mask="url(#path-1-outside-1_2993_11801)"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_dii_2993_11801"
                        x="0"
                        y="-2"
                        width="36"
                        height="41.7559"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="1" />
                        <feGaussianBlur stdDeviation="0.5" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_2993_11801"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_2993_11801"
                          result="shape"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="3" />
                        <feGaussianBlur stdDeviation="0.5" />
                        <feComposite
                          in2="hardAlpha"
                          operator="arithmetic"
                          k2="-1"
                          k3="1"
                        />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.36 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="shape"
                          result="effect2_innerShadow_2993_11801"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="-2" />
                        <feGaussianBlur stdDeviation="1.5" />
                        <feComposite
                          in2="hardAlpha"
                          operator="arithmetic"
                          k2="-1"
                          k3="1"
                        />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="effect2_innerShadow_2993_11801"
                          result="effect3_innerShadow_2993_11801"
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
                <div className="absolute z-[54] w-8 h-8 top-2">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6">
                      <RenderResourceIco type={building?.resourceType} />
                    </div>
                  </div>
                  <CircularProgressbar
                    value={isClaim.percentage}
                    strokeWidth={50}
                    styles={buildStyles({
                      strokeLinecap: "butt",
                      pathColor: `#45b684`,
                    })}
                  />
                </div>
              </div>
            )}
            {isClaim.isClaim && isClaim.isLimit && (
              <div className="animate-bounce flex absolute top-10 transform -translate-x-1/2 -translate-y-1/2 z-[54] w-14 h-14 items-center justify-center">
                <div className="absolute z-[54] w-14 h-14">
                  <svg
                    width="36"
                    height="40"
                    viewBox="0 0 36 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                  >
                    <svg
                      width="36"
                      height="40"
                      viewBox="0 0 36 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_dii_2993_11069)">
                        <mask
                          id="path-1-outside-1_2993_11069"
                          maskUnits="userSpaceOnUse"
                          x="1"
                          y="0"
                          width="34"
                          height="38"
                          fill="black"
                        >
                          <rect fill="white" x="1" width="34" height="38" />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M22.1132 32.4663C28.9566 30.6511 34 24.4145 34 17C34 8.16344 26.8366 1 18 1C9.16344 1 2 8.16344 2 17C2 24.4145 7.04339 30.6511 13.8868 32.4663L17.6297 36.5918C17.8281 36.8106 18.1719 36.8106 18.3703 36.5918L22.1132 32.4663Z"
                          />
                        </mask>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M22.1132 32.4663C28.9566 30.6511 34 24.4145 34 17C34 8.16344 26.8366 1 18 1C9.16344 1 2 8.16344 2 17C2 24.4145 7.04339 30.6511 13.8868 32.4663L17.6297 36.5918C17.8281 36.8106 18.1719 36.8106 18.3703 36.5918L22.1132 32.4663Z"
                          fill="url(#paint0_linear_2993_11069)"
                        />
                        <path
                          d="M22.1132 32.4663L21.8568 31.4998L21.5712 31.5755L21.3726 31.7944L22.1132 32.4663ZM13.8868 32.4663L14.6274 31.7944L14.4288 31.5755L14.1432 31.4998L13.8868 32.4663ZM17.6297 36.5918L18.3703 35.9199L17.6297 36.5918ZM18.3703 36.5918L17.6297 35.9199H17.6297L18.3703 36.5918ZM33 17C33 23.9497 28.2728 29.7979 21.8568 31.4998L22.3696 33.4329C29.6404 31.5043 35 24.8793 35 17H33ZM18 2C26.2843 2 33 8.71573 33 17H35C35 7.61116 27.3888 0 18 0V2ZM3 17C3 8.71573 9.71573 2 18 2V0C8.61116 0 1 7.61116 1 17H3ZM14.1432 31.4998C7.72718 29.7979 3 23.9497 3 17H1C1 24.8793 6.3596 31.5043 13.6304 33.4329L14.1432 31.4998ZM18.3703 35.9199L14.6274 31.7944L13.1462 33.1383L16.8891 37.2638L18.3703 35.9199ZM17.6297 35.9199C17.8281 35.7012 18.1719 35.7012 18.3703 35.9199L16.8891 37.2638C17.4844 37.9199 18.5156 37.9199 19.1109 37.2638L17.6297 35.9199ZM21.3726 31.7944L17.6297 35.9199L19.1109 37.2638L22.8538 33.1383L21.3726 31.7944Z"
                          fill="black"
                          mask="url(#path-1-outside-1_2993_11069)"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_dii_2993_11069"
                          x="0"
                          y="-2"
                          width="36"
                          height="41.7559"
                          filterUnits="userSpaceOnUse"
                          colorInterpolationFilters="sRGB"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="1" />
                          <feGaussianBlur stdDeviation="0.5" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_2993_11069"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_2993_11069"
                            result="shape"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="3" />
                          <feGaussianBlur stdDeviation="0.5" />
                          <feComposite
                            in2="hardAlpha"
                            operator="arithmetic"
                            k2="-1"
                            k3="1"
                          />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.36 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="shape"
                            result="effect2_innerShadow_2993_11069"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="-2" />
                          <feGaussianBlur stdDeviation="1.5" />
                          <feComposite
                            in2="hardAlpha"
                            operator="arithmetic"
                            k2="-1"
                            k3="1"
                          />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="effect2_innerShadow_2993_11069"
                            result="effect3_innerShadow_2993_11069"
                          />
                        </filter>
                        <linearGradient
                          id="paint0_linear_2993_11069"
                          x1="18"
                          y1="1"
                          x2="18"
                          y2="36.7559"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#FFFE2E" />
                          <stop offset="1" stopColor="#FE8315" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </svg>
                </div>
                <div className="absolute z-[54] w-8 h-8 top-2">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6">
                      <RenderResourceIco type={building?.resourceType} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showClaimAnimation &&
              previousClaimValueRef.current !== null &&
              animatedResources.map(
                (res: {
                  type: string | number;
                  id: any;
                  startPosition: any;
                }) => {
                  const targetPosition = balancePositions[res.type];

                  if (!targetPosition) return null;

                  const relativeEndPosition =
                    getRelativePosition(targetPosition);

                  return (
                    <AnimatedResource
                      key={res.id}
                      iconType={res.type}
                      startPosition={res.startPosition}
                      endPosition={relativeEndPosition}
                      onAnimationComplete={() =>
                        handleAnimationComplete(res.id)
                      }
                    />
                  );
                }
              )}

            {showClaimAnimation && previousClaimValueRef.current !== null && (
              <div className="claim-animation">
                {building?.resourceType === Resources.kitsu
                  ? `+ ${Number(previousClaimValueRef.current.toFixed(2))} `
                  : `+ ${Math.floor(Number(previousClaimValueRef.current))}`}
              </div>
            )}
            {triggerShowLevelUp && (
              <div className="fixed inset-0 z-[999]">
                <div className="w-full h-full absolute bg-gradient-to-b from-black via-black/70 to-black opacity-80"></div>

                <LevelUpBuilding
                  roomLvl={roomLvl}
                  text={title || ""}
                  upgradeData={combinedData}
                  buildingId={building?.id}
                />
              </div>
            )}

            {building && (
              <img
                className="absolute z-[53] opacity-30 w-full h-full flex items-center justify-center object-contain"
                src={require(`../../../../../assets/images/buildings/build${building.id}.png`)}
              />
            )}

            {building && (
              <img
                className="w-full h-full flex items-center justify-center object-contain"
                src={require(`../../../../../assets/images/buildings/build${building.id}.png`)}
              />
            )}

            {/*<img className="flex h-full w-full rounded-[15px] bg-slate-800 bg-opacity-50 z-10"*/}
            {/*     src={building ? require(`../../../../../assets/images/build${building.id}.png`) : require('../../../../../assets/images/inactiveBuild.png')}/>*/}
          </div>
        </>
      );
    case RoomStatus.builded:
      return (
        <>
          <div className="w-full h-full flex items-center justify-center relative">
            {triggerShowLevelUp && (
              <div className="fixed inset-0 z-[999]">
                <div className="w-full h-full absolute bg-gradient-to-b from-black via-black/70 to-black opacity-80"></div>

                {/* <div className="relative z-20 w-full h-full">
                  <LevelUpBuildingAnimation />
                </div> */}
                <LevelUpBuilding
                  roomLvl={roomLvl}
                  text={title || ""}
                  upgradeData={combinedData}
                  buildingId={building?.id}
                />
              </div>
            )}

            {building && (
              <img
                className="absolute z-[53] opacity-30 w-full h-full flex items-center justify-center object-contain"
                src={require(`../../../../../assets/images/buildings/build${building.id}.png`)}
              />
            )}
            {building && (
              <img
                className="w-full h-full flex items-center justify-center object-contain"
                src={require(`../../../../../assets/images/buildings/build${building.id}.png`)}
              />
            )}

            {/*<img className="flex h-full w-full rounded-[15px] bg-slate-800 bg-opacity-50 z-10"*/}
            {/*     src={building ? require(`../../../../../assets/images/build${building.id}.png`) : require('../../../../../assets/images/inactiveBuild.png')}/>*/}
          </div>
        </>
      );
    case RoomStatus.inactive:
      return (
        <>
          {/* <img
            src={
              building
                ? require(`../../../../../assets/images/clouds/cloud${building?.id}.png`)
                : require(`../../../../../assets/images/clouds/cloud1.png`)
            }
            style={{}}
            className="min-w-[200%] min-h-[150%] absolute z-30 -left-16 -top-20"
          /> */}
          <div
            className={`w-full h-full flex items-center justify-center brightness-75`}
          >
            {building && (
              <img
                className={`flex h-full w-full rounded-[15px] object-contain`}
                src={require(`../../../../../assets/images/buildingNeedRepaired/build${building.id}.png`)}
              />
            )}

            {/*<img className="flex h-full w-full rounded-[15px]" src={building ? require(`../../../../../assets/images/build${building.id}.png`) : require('../../../../../assets/images/inactiveBuild.png')}/>*/}
          </div>
        </>
      );
    case RoomStatus.building:
      return (
        <>
          {/* {openSpeed && timer.length && (
            <div className="fixed inset-0 z-[100] w-full h-full flex justify-center items-center min-w-full max-w-full min-h-full max-h-full">
              <div
                onClick={closePopup}
                className="absolute z-40 h-full w-full bg-[rgba(0,0,0,0.5)]"
              />
              <PopupWindow
                onClickClose={closePopup}
                headerElement={<SpeedHeader />}
              >
                <>
                  {boosts.length > 0 &&
                    (showBoosts ? (
                      <div className="flex flex-col p-2 gap-2 w-full">
                        <div className="flex flex-col justify-between bg-[#2a2827] p-3 rounded-sm shadow-inner-sm-white gap-3">
                          <div className="flex gap-3 justify-center items-center">
                            <div className="flex flex-col gap-1 items-center">
                              <div className="text-[#a49a7c] text-sm font-normal leading-[14px]">
                                Selected Boosts
                              </div>
                              <div className="flex flex-col gap-2 text-xs font-light leading-[14.40px]">
                                <span className="text-[#dfd9c4]">
                                  These boosts will be used:
                                </span>
                                <div className="flex flex-wrap bg-[#201b18] p-3 rounded-sm shadow-inner-sm-white gap-3">
                                  {boostsToUse.map((boost) => (
                                    <div
                                      key={boost.id}
                                      className="flex-1 flex justify-center p-3 gap-3  bg-[#2a2827] rounded-sm shadow-inner-sm-white"
                                    >
                                      <div className="flex flex-col gap-3 items-center">
                                        {boost.id === "1" && (
                                          <SpeedIcon
                                            time={`${Math.floor(
                                              (boost.duration / 1000 / 60) % 60
                                            )}m`}
                                          />
                                        )}
                                        {boost.id === "2" && (
                                          <SpeedIcon
                                            time={`${Math.floor(
                                              (boost.duration / 1000 / 60) % 60
                                            )}m`}
                                          />
                                        )}
                                        {boost.id === "3" && (
                                          <SpeedIcon
                                            time={`${Math.floor(
                                              boost.duration / 1000 / 60
                                            )}m`}
                                          />
                                        )}
                                        <div className="flex gap-1 items-start">
                                          <div className="text-[#a49a7c] text-sm font-normal leading-[14px]">
                                            {boost.id === "1" &&
                                              `${Math.floor(
                                                (boost.duration / 1000 / 60) %
                                                  60
                                              )} Min Speed Up`}
                                            {boost.id === "2" &&
                                              `${Math.floor(
                                                (boost.duration / 1000 / 60) %
                                                  60
                                              )} Min Quick Boost`}
                                            {boost.id === "3" &&
                                              `${Math.floor(
                                                boost.duration / 1000 / 60
                                              )} Min Mega Boost`}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-center items-center">
                            <div className="h-[32px] w-[72px]">
                              <PopupButton
                                type={"green"}
                                onClick={confirmInstantBuild}
                                height={"32px"}
                              >
                                <div className="flex flex-col items-center px-2 gap-1 w-full h-full">
                                  <div className="flex flex-row justify-center items-center gap-[2px]">
                                    <div className="flex items-center justify-center pt-1 text-center w-[66px] h-[22px] text-white text-[10px] font-normal leading-[10px]">
                                      Confirm
                                    </div>
                                  </div>
                                </div>
                              </PopupButton>
                            </div>
                            <div className="h-[32px] w-[72px] ml-2">
                              <PopupButton
                                type={"red"}
                                onClick={cancelInstantBuild}
                                height={"32px"}
                              >
                                <div className="flex flex-col items-center px-2 gap-1 w-full h-full">
                                  <div className="flex flex-row justify-center items-center gap-[2px]">
                                    <div className="flex items-center justify-center pt-1 text-center w-[66px] h-[22px] text-white text-[10px] font-normal leading-[10px]">
                                      Cancel
                                    </div>
                                  </div>
                                </div>
                              </PopupButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col p-2 gap-2 w-full">
                        <div className="flex justify-between bg-[#2a2827] p-3 rounded-sm  shadow-inner-sm-white gap-3">
                          <div className="flex gap-3">
                            <SpeedIcon />
                            <div className="flex flex-col jus gap-1 items-center">
                              <div className=" text-[#a49a7c] text-sm font-normal leading-[14px]">
                                Instant Speed Up
                              </div>
                              <div className="text-xs font-light leading-[14.40px]">
                                <span className="text-[#dfd9c4]">
                                  Use speed up items
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-center items-center">
                            <div className="h-[32px] w-[72px]">
                              <PopupButton
                                type={"green"}
                                onClick={instantBuild}
                                height={"32px"}
                              >
                                <div className="flex flex-col items-center px-2  gap-1 w-full h-full">
                                  <div className="flex flex-row justify-center items-center gap-[2px]">
                                    <div className="flex items-center justify-center pt-1 text-center w-[66px] h-[22px] text-white text-[10px] font-normal leading-[10px]">
                                      Instant Speed Up
                                    </div>
                                  </div>
                                </div>
                              </PopupButton>
                            </div>
                          </div>
                        </div>

                        {boosts.map((boost) => (
                          <div
                            key={boost.id}
                            className="flex justify-between bg-[#2a2827] p-3 rounded-sm shadow-inner-sm-white gap-3"
                          >
                            <div className="flex gap-3">
                              {boost.id === "1" && (
                                <SpeedIcon
                                  time={`${Math.floor(
                                    (boost.duration / 1000 / 60) % 60
                                  )}m`}
                                />
                              )}
                              {boost.id === "2" && (
                                <SpeedIcon
                                  time={`${Math.floor(
                                    (boost.duration / 1000 / 60) % 60
                                  )}m`}
                                />
                              )}
                              {boost.id === "3" && (
                                <SpeedIcon
                                  time={`${Math.floor(
                                    boost.duration / 1000 / 60
                                  )}m`}
                                />
                              )}

                              <div className="flex flex-col gap-1 items-start">
                                <div className="text-[#a49a7c] text-sm font-normal leading-[14px]">
                                  {boost.id === "1" &&
                                    `${Math.floor(
                                      (boost.duration / 1000 / 60) % 60
                                    )} Min Speed Up`}
                                  {boost.id === "2" &&
                                    `${Math.floor(
                                      (boost.duration / 1000 / 60) % 60
                                    )} Min Quick Boost`}
                                  {boost.id === "3" &&
                                    `${Math.floor(
                                      boost.duration / 1000 / 60
                                    )} Min Mega Boost`}
                                </div>
                                <div className="text-xs font-light leading-[14.40px]">
                                  <span className="text-[#dfd9c4]">
                                    Use boost
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-center items-center">
                              <div className="h-[32px] w-[72px]">
                                <PopupButton
                                  type={"blue"}
                                  onClick={() => usingBoosts(boost)}
                                  height={"32px"}
                                >
                                  <div className="flex flex-col items-center px-2 gap-1 w-full h-full">
                                    <div className="flex flex-row justify-center items-center gap-[2px]">
                                      <div className="flex items-center justify-center pt-1 text-center w-[66px] h-[22px] text-white  font-normal leading-[10px]">
                                        Use
                                      </div>
                                    </div>
                                  </div>
                                </PopupButton>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                </>
              </PopupWindow>
              )
            </div>
          )} */}

          <div
            className="w-full h-full flex items-center justify-center"
            onClick={() => {
              if (!timer.length) {
                confirmBuildingCompletion();
              }
            }}
          >
            {isConfirmationRequired && !timer.length && (
              <div className="flex absolute top-10   z-[54] w-14 h-14 items-center justify-center pulse-animation ">
                <div className="absolute z-[54] w-14 h-14 ">
                  <svg
                    width="40"
                    height="48"
                    viewBox="0 0 40 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                  >
                    <g filter="url(#filter0_d_3189_36290)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M25.985 39.0891C34.107 36.5452 40 28.9608 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 28.9608 5.89303 36.5452 14.015 39.0891L19.622 45.5636C19.8214 45.7938 20.1786 45.7938 20.378 45.5636L25.985 39.0891Z"
                        fill="#E9FFDC"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_3189_36290"
                        x="0"
                        y="0"
                        width="40"
                        height="47.7362"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0.119963 0 0 0 0 0.270455 0 0 0 0 0.187204 0 0 0 1 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_3189_36290"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_3189_36290"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
                <div className="absolute z-[54] w-10 h-10 top-1 rounded-full bg-[#4BC560] shine-animation">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-7 h-7 flex items-center justify-center">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.8193 14.1458C22.682 14.5185 22.3386 14.9235 21.803 14.9235H17.8475V24.1584C17.8475 24.8713 17.3531 25.4546 16.7488 25.4546H11.255C10.6507 25.4546 10.1563 24.8713 10.1563 24.1584V14.9235H6.18708C5.65144 14.9235 5.32181 14.5185 5.18447 14.1458C5.04713 13.7732 5.01966 13.2061 5.39048 12.7363L13.1916 2.95051C13.4113 2.69129 13.686 2.54547 14.0019 2.54547C14.3178 2.54547 14.5925 2.69129 14.7985 2.95051L22.6133 12.7363C22.9704 13.2061 22.9567 13.7732 22.8193 14.1458Z"
                          fill="white"
                          stroke="#3F6E54"
                          strokeWidth="0.7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {buildAnimation && !isConfirmationRequired && (
              <div className="absolute w-full h-full flex items-center justify-center z-[54]">
                <BuildAnimation triggerHit={triggerEndBuild} />
              </div>
            )}

            <div className="absolute flex flex-col items-center justify-center">
              <p className="text-white text-[16px] text-stroke-small z-[53]">
                {timer}
              </p>
            </div>
            <button className="w-full h-full items-center flex justify-center flex-col p-1">
              {building && (
                <img
                  className="absolute z-[53] opacity-30 flex h-full w-full rounded-[15px] brightness-[30%] object-contain"
                  src={require(`../../../../../assets/images/buildings/build${building.id}.png`)}
                />
              )}
              {building && (
                <img
                  className="flex h-full w-full rounded-[15px] brightness-[30%] object-contain"
                  src={require(`../../../../../assets/images/buildings/build${building.id}.png`)}
                />
              )}
            </button>
          </div>
          {triggerShowLevelUp && (
            <div className="fixed inset-0 z-[999]">
              <div className="w-full h-full absolute bg-gradient-to-b from-black via-black/70 to-black opacity-80"></div>

              {/* <div className="relative z-20 w-full h-full">
                <LevelUpBuildingAnimation />
              </div> */}
              <LevelUpBuilding
                roomLvl={roomLvl}
                text={title || ""}
                upgradeData={combinedData}
                buildingId={building?.id}
              />
            </div>
          )}
        </>
      );
    case RoomStatus.battle:
      return (
        <>
          <div className="absolute flex brightness-100 z-[54] w-[75%] h-[75%]">
            <SwordsAnimation />
          </div>

          {building && (
            <img
              className={`absolute flex h-full w-full rounded-[15px]  bg-opacity-50 opacity-30 z-[53] object-contain`}
              src={require(`../../../../../assets/images/buildingNeedRepaired/build${building.id}.png`)}
            />
          )}
          {building && (
            <img
              className={`flex h-full w-full rounded-[15px]  bg-opacity-50 object-contain`}
              src={require(`../../../../../assets/images/buildingNeedRepaired/build${building.id}.png`)}
            />
          )}
        </>
      );
    case RoomStatus.empty:
      return (
        <div className="w-full h-full items-center flex justify-center flex-col p-1 ">
          <img
            src={require("../../../../../assets/images/farmIcons/buildIco.png")}
            className="absolute object-contain"
          />
          <div className="absolute z-30 self-end mr-[-20px]">
            <Arrow />
          </div>
          <div className="w-full h-full bg-slate-800 rounded-[12px]" />
        </div>
      );
    case RoomStatus.repair:
      return (
        <div className="w-full h-full flex items-center justify-center p-1 relative ">
          <div className="flex absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[54] w-12 h-12 items-center justify-center">
            <div className="absolute z-[54] w-12 h-12">
              <svg
                width="36"
                height="40"
                viewBox="0 0 36 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full "
              >
                <svg
                  width="36"
                  height="40"
                  viewBox="0 0 36 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_dii_2993_11069)">
                    <mask
                      id="path-1-outside-1_2993_11069"
                      maskUnits="userSpaceOnUse"
                      x="1"
                      y="0"
                      width="34"
                      height="38"
                      fill="black"
                    >
                      <rect fill="white" x="1" width="34" height="38" />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M22.1132 32.4663C28.9566 30.6511 34 24.4145 34 17C34 8.16344 26.8366 1 18 1C9.16344 1 2 8.16344 2 17C2 24.4145 7.04339 30.6511 13.8868 32.4663L17.6297 36.5918C17.8281 36.8106 18.1719 36.8106 18.3703 36.5918L22.1132 32.4663Z"
                      />
                    </mask>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22.1132 32.4663C28.9566 30.6511 34 24.4145 34 17C34 8.16344 26.8366 1 18 1C9.16344 1 2 8.16344 2 17C2 24.4145 7.04339 30.6511 13.8868 32.4663L17.6297 36.5918C17.8281 36.8106 18.1719 36.8106 18.3703 36.5918L22.1132 32.4663Z"
                      fill="url(#paint0_linear_2993_11069)"
                    />
                    <path
                      d="M22.1132 32.4663L21.8568 31.4998L21.5712 31.5755L21.3726 31.7944L22.1132 32.4663ZM13.8868 32.4663L14.6274 31.7944L14.4288 31.5755L14.1432 31.4998L13.8868 32.4663ZM17.6297 36.5918L18.3703 35.9199L17.6297 36.5918ZM18.3703 36.5918L17.6297 35.9199H17.6297L18.3703 36.5918ZM33 17C33 23.9497 28.2728 29.7979 21.8568 31.4998L22.3696 33.4329C29.6404 31.5043 35 24.8793 35 17H33ZM18 2C26.2843 2 33 8.71573 33 17H35C35 7.61116 27.3888 0 18 0V2ZM3 17C3 8.71573 9.71573 2 18 2V0C8.61116 0 1 7.61116 1 17H3ZM14.1432 31.4998C7.72718 29.7979 3 23.9497 3 17H1C1 24.8793 6.3596 31.5043 13.6304 33.4329L14.1432 31.4998ZM18.3703 35.9199L14.6274 31.7944L13.1462 33.1383L16.8891 37.2638L18.3703 35.9199ZM17.6297 35.9199C17.8281 35.7012 18.1719 35.7012 18.3703 35.9199L16.8891 37.2638C17.4844 37.9199 18.5156 37.9199 19.1109 37.2638L17.6297 35.9199ZM21.3726 31.7944L17.6297 35.9199L19.1109 37.2638L22.8538 33.1383L21.3726 31.7944Z"
                      fill="black"
                      mask="url(#path-1-outside-1_2993_11069)"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_dii_2993_11069"
                      x="0"
                      y="-2"
                      width="36"
                      height="41.7559"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="1" />
                      <feGaussianBlur stdDeviation="0.5" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2993_11069"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2993_11069"
                        result="shape"
                      />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="3" />
                      <feGaussianBlur stdDeviation="0.5" />
                      <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                      />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.36 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="shape"
                        result="effect2_innerShadow_2993_11069"
                      />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="-2" />
                      <feGaussianBlur stdDeviation="1.5" />
                      <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                      />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="effect2_innerShadow_2993_11069"
                        result="effect3_innerShadow_2993_11069"
                      />
                    </filter>
                    <linearGradient
                      id="paint0_linear_2993_11069"
                      x1="18"
                      y1="1"
                      x2="18"
                      y2="36.7559"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FFFE2E" />
                      <stop offset="1" stopColor="#FE8315" />
                    </linearGradient>
                  </defs>
                </svg>
              </svg>
            </div>
            <div className="absolute z-[54] w-[30px] h-[30px] top-1 ">
              <img
                src={require("../../../../../assets/images/farmIcons/buildIco.png")}
                className="absolute z-[54] w-full h-full object-contain"
              />
            </div>
          </div>
          {building && (
            <img
              className={`absolute z-[53] opacity-30 flex h-full w-full rounded-[15px]  bg-opacity-50 object-contain`}
              src={require(`../../../../../assets/images/buildingNeedRepaired/build${building.id}.png`)}
            />
          )}
          {building && (
            <img
              className={`flex h-full w-full rounded-[15px]  bg-opacity-50 object-contain`}
              src={require(`../../../../../assets/images/buildingNeedRepaired/build${building.id}.png`)}
            />
          )}

          {/*<img className="flex h-full w-full rounded-[15px] bg-slate-800 bg-opacity-50" src={building ? require(`../../../../../assets/images/build${building.id}.png`) : require('../../../../../assets/images/inactiveBuild.png')}/>*/}
        </div>
      );
    case RoomStatus.repairing:
      return (
        <div className="w-full h-full flex items-center justify-center p-1 relative">
          <div className="absolute w-full h-full flex items-center justify-center z-10">
            <BuildAnimation triggerHit={triggerEndBuild} />
          </div>
          <p className="absolute bottom-[48px] text-white text-[16px] text-stroke-small z-20">
            {timer}
          </p>

          {building && (
            <img
              className="flex h-full w-full rounded-[15px]  bg-opacity-50 object-contain"
              src={require(`../../../../../assets/images/buildingNeedRepaired/build${building.id}.png`)}
            />
          )}

          {/*<img className="flex h-full w-full rounded-[15px] bg-slate-800 bg-opacity-50" src={building ? require(`../../../../../assets/images/build${building.id}.png`) : require('../../../../../assets/images/inactiveBuild.png')}/>*/}
        </div>
      );
    default:
      return <div />;
  }
  // } else {
  //     return(
  //       <div/>
  //     )
  //   }
};

const borders = {
  square: require("../../../../../assets/images/stone-frame-square.png"),
  horizontal: require("../../../../../assets/images/stone-frame-horizontal.png"),
  vertical: require("../../../../../assets/images/stone-frame-vertical.png"),
};

const Arrow = () => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_932_9357)">
        <path
          d="M40.0003 18V30H24.0003V39.68L8.32031 24L24.0003 8.32001V18H40.0003Z"
          fill="#A2FFFD"
        />
        <path
          d="M24.0003 18.25H39.7503V29.75H24.0003H23.7503V30V39.0765L8.67387 24L23.7503 8.92356V18V18.25H24.0003Z"
          stroke="#19191B"
          strokeWidth="0.5"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_932_9357"
          x="4.32031"
          y="4.32001"
          width="39.6797"
          height="39.36"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_932_9357"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_932_9357"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
