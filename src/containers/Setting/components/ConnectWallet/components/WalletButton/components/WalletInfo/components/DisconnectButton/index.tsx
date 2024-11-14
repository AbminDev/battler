import { useTonConnectUI } from "@tonconnect/ui-react";
import { useTranslation } from "react-i18next";
import { PopupButton } from "../../../../../../../../../../components/PopupButton";

export const DisconnectButton: React.FC = () => {
  const { t } = useTranslation();
  const [tonConnectUI] = useTonConnectUI();
  const onDisconnect = async () => {
    await tonConnectUI.disconnect();
  };

  return (
    <PopupButton onClick={onDisconnect} type={"red"} width="180px">
      {t("profile.disconnect")}
    </PopupButton>
    // <div
    //   className="select-none cursor-pointer w-full h-12 pb-1 bg-red-950 rounded-md shadow-lg  relative transform transition-transform duration-150 active:scale-95"
    //   onClick={onDisconnect}
    // >
    //   <div className="relative inline-flex items-center justify-center w-full h-full bg-gradient-to-b from-[#B43D2F] to-[#893026] rounded-md ">
    //     <div className="w-1.5 h-[22px] relative"></div>
    //     <div className="flex gap-1 items-center justify-center">
    //       <button className="go1487791704">{t("profile.disconnect")}</button>
    //     </div>

    //     <div className="w-1 h-[22px] relative"></div>
    //   </div>
    // </div>
  );
};
