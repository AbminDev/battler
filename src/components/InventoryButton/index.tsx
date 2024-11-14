import { useTranslation } from "react-i18next";

export const InventoryButton = ({ onClick }: { onClick: () => void }) => {
  const { t } = useTranslation();

  return (
    <div className="select-none cursor-pointer w-14 h-10 pb-1 bg-[#1e0400] rounded-md shadow-lg  relative transform transition-transform duration-150 active:scale-95">
      <div
        className="w-full h-full  rounded-lg  flex justify-center items-center bg-gradient-to-b from-[#FEE7BA] to-[#B6765A]   border-2 p-1 border-black relative"
        onClick={onClick}
      >
        <div className="relative flex flex-col items-center ">
          <div className="relative w-full flex justify-center items-center overflow-visible">
            <img
              src={require("../../assets/images/inventory.png")}
              className="absolute -top-6 w-[34px] h-[34px] max-w-none"
            />
          </div>
          <div className="absolute -top-[23px] text-center text-white text-xs font-light leading-3 mt-8">
            {t("inventory.name")}
          </div>
        </div>
      </div>
    </div>
  );
};
