import { GoldIco } from "../../../layout/components/HeaderFarm/components/ResourceCard";

export const ActionButton = (props: {
  onClick?: () => void;
  upgradeCost?: number;
  type?: "upgrade" | "claim";
  disabled?: boolean;
}) => {
  const { onClick, upgradeCost, type = "upgrade", disabled = false } = props;

  return (
    <>
      {type === "upgrade" ? (
        <button
          disabled={disabled}
          className="w-[200px] h-[46px] rounded-[4px] border border-[rgba(0,0,0,0.8)] items-start flex"
          style={{ backgroundColor: "#173325" }}
          onClick={onClick}
        >
          <div
            className="w-full h-[42px] rounded-[4px] items-center px-[10px] flex justify-between"
            style={{ backgroundImage: "linear-gradient(#3E8465,#326650)" }}
          >
            <div className="flex flex-row items-center gap-1">
              <UpgradeArrow direction="up" />
              <p className="text-white text-stroke-small">Upgrade</p>
            </div>
            <div className="flex flex-row items-center gap-[2px]">
              <div className="w-[20px] h-[20px]">
                <GoldIco />
              </div>
              <p className="text-white text-stroke-small">{upgradeCost}</p>
            </div>
          </div>
        </button>
      ) : (
        <button
          disabled={disabled}
          className="w-[200px] h-[46px] rounded-[4px] border border-[rgba(0,0,0,0.8)] items-start flex"
          style={
            disabled
              ? { backgroundColor: "#1d1d1d" }
              : { backgroundColor: "#173325" }
          }
          onClick={onClick}
        >
          <div
            className="w-full h-[42px] rounded-[4px] items-center px-[10px] flex justify-center"
            style={
              disabled
                ? { backgroundColor: "#252525" }
                : { backgroundImage: "linear-gradient(#3E8465,#326650)" }
            }
          >
            <div className="flex flex-row items-center gap-1">
              <p className="text-white text-stroke-small">Claim</p>
            </div>
          </div>
        </button>
      )}
    </>
  );
};

const Cross = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.34309 1.29797L3.0956 1.54546L3.34309 1.29797C3.08925 1.04413 2.67769 1.04413 2.42385 1.29797L1.29765 2.42417C1.04381 2.67801 1.04381 3.08957 1.29765 3.34341L5.95424 7.99999L1.29765 12.6566C1.04381 12.9104 1.04381 13.322 1.29765 13.5758L2.42385 14.702C2.67769 14.9559 3.08925 14.9559 3.34309 14.702L7.99967 10.0454L12.6563 14.702C12.9101 14.9559 13.3217 14.9559 13.5755 14.702L14.7017 13.5758C14.9555 13.322 14.9555 12.9104 14.7017 12.6566L10.0451 7.99999L14.7017 3.34341L14.4542 3.09592L14.7017 3.34341C14.9555 3.08957 14.9555 2.67801 14.7017 2.42417L13.5755 1.29797C13.3217 1.04413 12.9101 1.04413 12.6563 1.29797L7.99967 5.95456L3.34309 1.29797ZM7.96432 10.0101L7.96445 10.0102L7.96432 10.0101ZM10.0098 7.96464C10.0098 7.96468 10.0098 7.96473 10.0099 7.96477L10.0098 7.96464Z"
        fill="#D15A4C"
        stroke="#19191B"
        strokeWidth="0.7"
      />
    </svg>
  );
};

interface UpgradeArrowProps {
  direction?: "right" | "up";
  width?: number; // Проп для ширини
  height?: number; // Проп для висоти
}

export const UpgradeArrow = ({
  direction = "right",
  width = 18,
  height = 14,
}: UpgradeArrowProps) => {
  switch (direction) {
    case "right":
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 18 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.89567 13.2996C8.6295 13.2015 8.34018 12.9562 8.34018 12.5736L8.34018 9.74829L1.74381 9.74829C1.23462 9.74829 0.818004 9.39512 0.818004 8.96347L0.818004 5.03938C0.818004 4.60773 1.23462 4.25456 1.74381 4.25456L8.34018 4.25456L8.34018 1.41941C8.34018 1.03681 8.6295 0.801362 8.89567 0.70326C9.16184 0.605157 9.56688 0.585537 9.90248 0.850413L16.8923 6.42262C17.0775 6.57959 17.1816 6.77579 17.1816 7.00143C17.1816 7.22706 17.0775 7.42327 16.8923 7.57042L9.90248 13.1524C9.56688 13.4075 9.16184 13.3977 8.89567 13.2996Z"
            fill="#45B684"
            stroke="#19191B"
            strokeWidth="0.7"
          />
        </svg>
      );
    case "up":
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.2999 10.1041C16.2018 10.3703 15.9566 10.6596 15.574 10.6596H12.7486V17.256C12.7486 17.7652 12.3955 18.1818 11.9638 18.1818H8.03973C7.60808 18.1818 7.25491 17.7652 7.25491 17.256V10.6596H4.41976C4.03716 10.6596 3.80171 10.3703 3.70361 10.1041C3.60551 9.83798 3.58589 9.43294 3.85076 9.09733L9.42298 2.10749C9.57994 1.92233 9.77614 1.81818 10.0018 1.81818C10.2274 1.81818 10.4236 1.92233 10.5708 2.10749L16.1528 9.09733C16.4079 9.43294 16.398 9.83798 16.2999 10.1041Z"
            fill="#45B684"
            stroke="#19191B"
            strokeWidth="0.7"
          />
        </svg>
      );
    default:
      return (
        <svg
          width="18"
          height="14"
          viewBox="0 0 18 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.89567 13.2996C8.6295 13.2015 8.34018 12.9562 8.34018 12.5736L8.34018 9.74829L1.74381 9.74829C1.23462 9.74829 0.818004 9.39512 0.818004 8.96347L0.818004 5.03938C0.818004 4.60773 1.23462 4.25456 1.74381 4.25456L8.34018 4.25456L8.34018 1.41941C8.34018 1.03681 8.6295 0.801362 8.89567 0.70326C9.16184 0.605157 9.56688 0.585537 9.90248 0.850413L16.8923 6.42262C17.0775 6.57959 17.1816 6.77579 17.1816 7.00143C17.1816 7.22706 17.0775 7.42327 16.8923 7.57042L9.90248 13.1524C9.56688 13.4075 9.16184 13.3977 8.89567 13.2996Z"
            fill="#45B684"
            stroke="#19191B"
            strokeWidth="0.7"
          />
        </svg>
      );
  }
};
