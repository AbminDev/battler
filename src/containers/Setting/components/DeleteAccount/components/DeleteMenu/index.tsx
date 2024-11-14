import React, {useEffect, useState} from "react";

import { useTonAddress } from "@tonconnect/ui-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { PopupWindow } from "../../../../../../components/PopupWindow";
import { PopupButton } from "../../../../../../components/PopupButton";

export const DeleteInfo = ({
  closeDeleteMenu,
}: {
  closeDeleteMenu: () => void;
}) => {
  const [openedModal, setOpenedModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const address = useTonAddress();
  const { t } = useTranslation();

  const handleCopyClick = async () => {
    if (!address) return;
    const urlToCopy = address;
    try {
      await navigator.clipboard.writeText(urlToCopy);
      setCopied(true);
      toast.success("Wallet copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy URL.");
    }
  };
  function formatAddress(address: string) {
    if (address.length <= 12) {
      return address;
    }
    const start = address.slice(0, 7);
    const end = address.slice(-8);
    return `${start}...${end}`;
  }

  useEffect(() => {
    setOpenedModal(true);
  }, []);

  return (
    <div className={`absolute transform transition-transform duration-200 z-10 left-0 right-0 p-5 h-[282px] 
      -bottom-[282px] bg-no-repeat bg-[length:100%_100%] bg-[url('./assets/images/shop-buy-modal-background.png')] 
      ${openedModal ? "-translate-y-full" : "translate-y-0"}`}>
      <button className="absolute z-10 w-5 h-5 top-3.5 right-3.5 flex items-center justify-center"
        onClick={closeDeleteMenu}>
        <img src={require("../../../../../../assets/images/shop-modal-close.png")} className="w-5 h-5" alt=""/>
      </button>
      <div className="text-[30px] leading-[1.2] mt-3 mb-2 text-[#19191B] text-center">{t("profile.deleteAccount.areUSure")}</div>
      {t("profile.deleteAccount.AllYourData")}
      <div className="flex justify-center mt-6">
        <PopupButton type="red" width="auto" className="mr-4">
          {t("profile.deleteAccount.delete")}
        </PopupButton>
        <PopupButton type="green" width="auto" onClick={closeDeleteMenu}>
          {t("profile.deleteAccount.cancel")}
        </PopupButton>
      </div>
    </div>
  );
};
