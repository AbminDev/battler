import { useTranslation } from "react-i18next";
import { useUtils } from "../../utils/navigateTo";

export const AllianceButton = () => {
  const { t } = useTranslation();
  const { navigateTo } = useUtils();
  return (
    <div className="select-none cursor-pointer w-14 h-10 pb-1 bg-[#1e0400] rounded-md shadow-lg  relative transform transition-transform duration-150 active:scale-95">
      <div
        className="w-full h-full  rounded-lg  flex justify-center items-center bg-gradient-to-b from-[#FEE7BA] to-[#B6765A]   border-2 p-1 border-black relative"
        onClick={() => {}}
      >
        <div className=" relative flex flex-col items-center w-7 h-7">
          <div className="relative w-full flex justify-center items-center overflow-visible">
            <img
              src={require("../../assets/images/alliance.png")}
              className="absolute -top-3 w-[34px] h-9 max-w-none"
            />
          </div>
          <div className="absolute -top-2.5 text-center text-white text-xs font-light leading-3 mt-8">
            {t("footer.alliance")}
          </div>
        </div>
      </div>
    </div>
  );
};
