import { useTranslation } from "react-i18next";
import { PopupButton } from "../PopupButton";

export const SaveButton = () => {
  const handleClick = () => {};
  const { t } = useTranslation();

  return (
    <PopupButton onClick={handleClick} type={"blue"}>{t("save")}</PopupButton>
    // <div className="select-none cursor-pointer w-full h-12 pb-1 bg-blue-950 rounded-md shadow-lg  relative transform transition-transform duration-150 active:scale-95">
    //   <div
    //     className="relative inline-flex items-center justify-center w-full h-full bg-gradient-buttons rounded-md "
    //     onClick={handleClick}
    //   >
    //     <div className="flex gap-1 items-center justify-center">
    //       <button className="go1487791704">{t('save')}</button>
    //     </div>

    //     <div
    //       className="absolute inset-0 rounded-md border-b-2 border-black"
    //       style={{ filter: "blur(2px)" }}
    //     ></div>
    //     <div className="w-1 h-[22px] relative"></div>
    //   </div>
    // </div>
  );
};
