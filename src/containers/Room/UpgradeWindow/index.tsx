import React from "react";

interface UpgradeData {
  label: string;
  nowValue: number;
  upgradeValue: number;
}

interface UpgradeWindowProps {
  data: UpgradeData[];
  totalStars?: number;
  rating?: number;
}

export const UpgradeWindow: React.FC<UpgradeWindowProps> = ({
  data,
  rating,
  totalStars,
}) => {
  let fullStars;
  let emptyStars;

  if (rating && totalStars) {
    fullStars = Array(rating).fill(0);
    emptyStars = Array(totalStars - rating).fill(0);
  }

  return (
    <>
      {fullStars && emptyStars && (
        <div className="flex justify-center mb-4">
          {fullStars.map((_, index) => (
            <img key={`full-${index}`} src={require('../../../assets/images/card-star.png')} className="w-6 mx-[2px]"
              alt=""/>
          ))}
          {emptyStars.map((_, index) => (
            <img key={`empty-${index}`} src={require('../../../assets/images/emptyStar.png')}
              className="w-6 mx-[2px]" alt=""/>
          ))}
        </div>
      )}
      <div className="px-4 py-2 bg-[#302824] rounded-[2px]">
        <table className="table w-full text-white">
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="py-2">{item.label}</td>
                <td className="text-center text-[#DFD9C4] font-[300] text-[20px] min-w-5">{item.nowValue}</td>
                <td className="text-center">
                  <img src={require("../../../assets/images/green-arrow-right.png")} className="mx-auto w-6" alt=""/>
                </td>
                <td className="text-center text-[#47C77A] font-[300] text-[20px] min-w-5">{item.upgradeValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
