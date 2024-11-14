import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useTonConnectUI, useTonAddress } from "@tonconnect/ui-react";
import { WalletButton } from "./components";
import { PopupButton } from "../../../../components/PopupButton";
import { useTranslation } from "react-i18next";
import {toast} from "react-toastify";
import {useSoundService} from "../../../../utils/soundService";

export const ConnectWallet: React.FC = () => {
  const [openedModal, setOpenedModal] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const address = useTonAddress();
  const [copied, setCopied] = useState(false);
  const { playSound } = useSoundService();

  const [tonConnectUI] = useTonConnectUI();

  const handleConnect = () => {
    tonConnectUI.openModal();
  };

  const handleDisconnect = () => {
    tonConnectUI.disconnect();
  };

  function formatAddress(address: string) {
    if (address.length <= 12) {
      return address;
    }
    const start = address.slice(0, 7);
    const end = address.slice(-8);
    return `${start}...${end}`;
  }

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

  return (
    <>
      <div className="flex mt-4 justify-center items-center text-nowrap">
        {address ? (
          <WalletButton/>
        ) : (
          <PopupButton type={"blue"} size={"medium"} width="200px" onClick={() => {
            playSound('notification');
            setOpenedModal(true);
          }}>{t("profile.connect")}</PopupButton>
        )}
      </div>
      <div className={`absolute transform transition-transform duration-200 z-10 left-0 right-0 p-5 h-[282px] 
      -bottom-[282px] bg-no-repeat bg-[length:100%_100%] bg-[url('./assets/images/shop-buy-modal-background.png')] 
      ${openedModal ? "-translate-y-full" : "translate-y-0"}`}>
        <button className="absolute z-10 w-5 h-5 top-3.5 right-3.5 flex items-center justify-center"
          onClick={() => setOpenedModal(false)}>
          <img src={require("../../../../assets/images/shop-modal-close.png")} className="w-5 h-5" alt=""/>
        </button>
        <div
          className="text-[30px] leading-[1.2] mb-2 text-[#19191B] text-center">
          {!address ? t("profile.connectTitle") : t("profile.walletinfo.walletConnected")}
        </div>
        {address ? (
          <>
            <div className="text-center mb-2">{t("profile.walletinfo.disconnectOrCopy")}</div>
            <div className="px-[30px]">
              <div className=" bg-stone-900 rounded shadow-inner border border-stone-700">
                <div className="flex justify-between items-center px-2 py-2">
                  <div className="text-white text-lg font-light leading-[18px]">
                    {formatAddress(address)}
                  </div>
                  <button className="w-8 h-8" onClick={handleCopyClick}>
                    <div className="flex justify-center items-center w-8 h-8 bg-stone-700 border border-zinc-900">
                      <div className="flex justify-center items-center w-6 h-6 bg-stone-500 border border-zinc-900">
                        {copied ? (
                          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm5.707 7.293l-6 6a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 11.586l5.293-5.293a1 1 0 111.414 1.414z"
                              fill="#554837"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.1875 2.25H6.1875C6.03832 2.25 5.89524 2.30926 5.78975 2.41475C5.68426 2.52024 5.625 2.66332 5.625 2.8125V5.625H2.8125C2.66332 5.625 2.52024 5.68426 2.41475 5.78975C2.30926 5.89524 2.25 6.03832 2.25 6.1875V15.1875C2.25 15.3367 2.30926 15.4798 2.41475 15.5852C2.52024 15.6907 2.66332 15.75 2.8125 15.75H11.8125C11.9617 15.75 12.1048 15.6907 12.2102 15.5852C12.3157 15.4798 12.375 15.3367 12.375 15.1875V12.375H15.1875C15.3367 12.375 15.4798 12.3157 15.5852 12.2102C15.6907 12.1048 15.75 11.9617 15.75 11.8125V2.8125C15.75 2.66332 15.6907 2.52024 15.5852 2.41475C15.4798 2.30926 15.3367 2.25 15.1875 2.25ZM14.625 11.25H12.375V6.1875C12.375 6.03832 12.3157 5.89524 12.2102 5.78975C12.1048 5.68426 11.9617 5.625 11.8125 5.625H6.75V3.375H14.625V11.25Z"
                              fill="#352A21"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : null}
        <div className={`flex justify-center ${!address ? 'mt-8' : 'mt-2'}`}>
          {address ? (
            <PopupButton type="red" width="180px" onClick={handleDisconnect}>
              {t("profile.disconnect")}
            </PopupButton>
          ) : (
            <div className="mt-5">
              <PopupButton type="blue" width="200px" onClick={handleConnect}>
                {t("profile.connect")}
              </PopupButton>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
