import { useState } from "react";
import { DisconnectButton } from "./components";
import { useTonAddress } from "@tonconnect/ui-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
export const WalletInfo = ({
  closeWalletInfo,
}: {
  closeWalletInfo: () => void;
}) => {
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

  return (
    <div>
      <div className="w-full h-full fixed top-0 left-0 bottom-0 right-0 z-10 flex items-center justify-center">
        <div className="w-full h-full absolute bg-black opacity-60"></div>
        <div className="absolute inset-x-4 bg-[#554837] border border-[#18191a] rounded-[2px] p-[2px]">
          <img
            src={require("../../../../../../../../assets/images/cards-modal-border.png")}
            className="absolute w-[17.5px] h-[21px] -top-[6px] -left-[5px]"
            alt=""
          />
          <img
            src={require("../../../../../../../../assets/images/cards-modal-border.png")}
            className="absolute w-[17.5px] h-[21px] -bottom-[6.5px] -left-[4.5px] -rotate-90"
            alt=""
          />
          <img
            src={require("../../../../../../../..//assets/images/cards-modal-border.png")}
            className="absolute w-[17.5px] h-[21px] -bottom-[5.5px] -right-[4.5px] -rotate-180"
            alt=""
          />
          <button
            className="absolute z-10 w-7 h-7 -top-2 -right-2 bg-[#4a4549] border border-[#18191a] rounded-[2px] flex items-center justify-center"
            onClick={closeWalletInfo}
          >
            <img
              src={require("../../../../../../../../assets/images/cards-modal-close.png")}
              className="w-4 h-4"
              alt=""
            />
          </button>
          <div className="w-full  bg-[#242520] border border-[#18191a] rounded-[2px] p-3 shadow-inner-sm-white">
            <div className="relative w-full  bg-[#201b18] rounded-[1px] p-3 pt-7 shadow-inner-sm-black">
              <div className="flex flex-col justify-center gap-2 mb-4">
                <div className="text-center text-white text-[32px] font-normal leading-9">
                  {t("profile.walletinfo.walletConnected")}
                </div>
                <div className="text-center text-stone-400 text-[15px] font-light leading-none">
                  {t("profile.walletinfo.disconnectOrCopy")}
                </div>

                <div className="px-[30px] pb-10">
                  <div className=" bg-stone-900 rounded shadow-inner border border-stone-700">
                    <div className="flex justify-between items-center px-2 py-2">
                      <div className="text-white text-lg font-light leading-[18px]">
                        {formatAddress(address)}
                      </div>
                      <button className="w-8 h-8" onClick={handleCopyClick}>
                        <div className="flex justify-center items-center w-8 h-8 bg-stone-700 border border-zinc-900">
                          <div className="flex justify-center items-center w-6 h-6 bg-stone-500 border border-zinc-900">
                            {copied ? (
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
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
                <div className="flex justify-center items-center">
                  <DisconnectButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer className={"fixed top-[70px] z-40"} />
    </div>
  );
};
