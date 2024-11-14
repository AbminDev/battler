import { useTranslation } from "react-i18next";
import { UpgradeArrow } from "../../containers/Room";
import { PopupButton } from "../PopupButton";
import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedRoom } from "../../app/features/selectedRoom";
import { StoneIco } from "../../layout/components/HeaderFarm/components";

export interface UpgradeDataRow {
  title: string;
  nowValue: number;
  newValue: number;
}

export const PopupUpgradeTable = (props: {
  upgradeData?: UpgradeDataRow[];
  requiredConditions?: {
    condition: string;
    met: boolean;
    buildingId?: number;
    lvl?: number;
  }[];
  upgradeNormalCondition: {
    met: boolean;
    currentAmount: number;
    costAmount: number;
  };
}) => {
  const { upgradeData, requiredConditions, upgradeNormalCondition } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <div className="w-full">
      {/* Upgrade Data Section */}
      <div className="w-full">
        {upgradeData?.map((row, i) => (
          <div key={i} className="w-full flex flex-col bg-transparent">
            <div className="flex flex-row items-center justify-between py-4 px-6">
              {/* Title */}
              <p className="text-[18px] text-white">{t(row.title)}</p>

              {/* Values with Arrow */}
              <div className="flex flex-row items-center justify-end gap-2">
                <p className="text-[16px] text-white">{row.nowValue}</p>
                <UpgradeArrow direction="right" />
                <p className="text-[16px] text-[#F6A000]">{row.newValue}</p>
              </div>
            </div>

            {/* Separator */}
            {i < upgradeData.length - 1 && (
              <div className="h-px bg-[#584d3c] mx-6"></div>
            )}
          </div>
        ))}
      </div>

      {/* Divider Between Sections */}
      <div className="w-full px-4 mt-4">
        <div className="w-full h-[3px] bg-[#181615] mb-1"></div>
        <div className="w-full h-[3px] bg-[#3b332e]"></div>
      </div>

      {/* Required Conditions Section */}
      <div className="w-full">
        {requiredConditions?.map((row, i) => (
          <React.Fragment key={i}>
            <div className="w-full flex flex-col bg-transparent">
              <div className="flex flex-row items-center justify-between py-4 px-6">
                {/* Condition Text */}
                <p
                  className={`text-[18px] ${
                    row.met ? "text-white" : "text-red-600"
                  }`}
                >
                  {row.condition}
                </p>

                {/* Status or Action */}
                <div className="flex flex-row items-center justify-end gap-1.25 pr-6">
                  {row.met ? (
                    <div className="w-6 h-6">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.35355 9.64645L6 9.29289L5.64645 9.64645L3.64645 11.6464L3.29289 12L3.64645 12.3536L9.64645 18.3536L10 18.7071L10.3536 18.3536L20.3536 8.35355L20.7071 8L20.3536 7.64645L18.3536 5.64645L18 5.29289L17.6464 5.64645L10 13.2929L6.35355 9.64645Z"
                          fill="#45B684"
                          stroke="#19191B"
                        />
                      </svg>
                    </div>
                  ) : row.buildingId ? (
                    row.lvl !== -Infinity && row.lvl! > 0 ? (
                      <PopupButton type="green">
                        <div className="flex justify-center items-center w-full ">
                          <div
                            className="flex justify-center items-center w-[58px] h-[22px] text-center text-white text-base font-normal leading-none cursor-pointer"
                            onClick={() => {
                              dispatch(
                                setSelectedRoom({
                                  id: row.buildingId ?? 1,
                                  buildingId: row.buildingId,
                                  lvl: row.lvl,
                                  type: 1,
                                })
                              );
                            }}
                          >
                            Build
                          </div>
                        </div>
                      </PopupButton>
                    ) : (
                      <div className="text-white">You need to repair it</div>
                    )
                  ) : row.lvl !== -Infinity ? (
                    <div className="text-white">You need to repair it</div>
                  ) : (
                    <div className="w-6 h-6">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.9268 6.99662L19.1036 6.81984L18.9268 6.64307L17.3569 5.07322L17.1802 4.89645L17.0034 5.07322L12 10.0766L6.99662 5.07322L6.81984 4.89645L6.64307 5.07322L5.07322 6.64307L4.89645 6.81984L5.07322 6.99662L10.0766 12L5.07322 17.0034L4.89645 17.1802L5.07322 17.3569L6.64307 18.9268L6.81984 19.1036L6.99662 18.9268L12 13.9234L17.0034 18.9268L17.1802 19.1036L17.3569 18.9268L18.9268 17.3569L19.1036 17.1802L18.9268 17.0034L13.9234 12L18.9268 6.99662Z"
                          fill="#F04444"
                          stroke="black"
                          strokeWidth="0.5"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* Separator */}
              {i < requiredConditions.length - 1 && (
                <div className="h-px bg-[#584d3c] mx-6"></div>
              )}
            </div>
          </React.Fragment>
        ))}
        {
          <div className="flex flex-row items-center justify-between py-4 px-6">
            <div className="flex gap-2 justify-center items-center">
              <div className="w-5 h-5">
                <StoneIco />
              </div>
              <div className="text-[18px] text-white">
                {upgradeNormalCondition.currentAmount}/
                {upgradeNormalCondition.costAmount}
              </div>
            </div>

            {upgradeNormalCondition.met}

            <div className="flex flex-row items-center justify-end gap-1.25 pr-6">
              {upgradeNormalCondition.currentAmount >
              upgradeNormalCondition.costAmount ? (
                <div className="w-6 h-6">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.35355 9.64645L6 9.29289L5.64645 9.64645L3.64645 11.6464L3.29289 12L3.64645 12.3536L9.64645 18.3536L10 18.7071L10.3536 18.3536L20.3536 8.35355L20.7071 8L20.3536 7.64645L18.3536 5.64645L18 5.29289L17.6464 5.64645L10 13.2929L6.35355 9.64645Z"
                      fill="#45B684"
                      stroke="#19191B"
                    />
                  </svg>
                </div>
              ) : (
                <div className="w-6 h-6">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.9268 6.99662L19.1036 6.81984L18.9268 6.64307L17.3569 5.07322L17.1802 4.89645L17.0034 5.07322L12 10.0766L6.99662 5.07322L6.81984 4.89645L6.64307 5.07322L5.07322 6.64307L4.89645 6.81984L5.07322 6.99662L10.0766 12L5.07322 17.0034L4.89645 17.1802L5.07322 17.3569L6.64307 18.9268L6.81984 19.1036L6.99662 18.9268L12 13.9234L17.0034 18.9268L17.1802 19.1036L17.3569 18.9268L18.9268 17.3569L19.1036 17.1802L18.9268 17.0034L13.9234 12L18.9268 6.99662Z"
                      fill="#F04444"
                      stroke="black"
                      strokeWidth="0.5"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        }
      </div>
    </div>
  );
};
