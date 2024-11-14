import { useState } from "react";
import { useTranslation } from "react-i18next";
import { WalletInfo } from "./components";
import { PopupButton } from "../../../../../../components/PopupButton";

export const WalletButton: React.FC = () => {
  const { t } = useTranslation();
  const [isWalletOpen, setWalletOpen] = useState(false);

  const handleWalletOpen = () => {
    setWalletOpen(true);
  };
  const handleWalletClose = () => {
    setWalletOpen(false);
  };
  return (
    <div>
      {isWalletOpen && <WalletInfo closeWalletInfo={handleWalletClose} />}

      <PopupButton onClick={handleWalletOpen} type={"blue"} width="180px">
        {t("profile.wallet")}
      </PopupButton>
      {/* <div className="select-none cursor-pointer w-full h-12 pb-1 bg-blue-950 rounded-md shadow-lg  relative transform transition-transform duration-150 active:scale-95">
        <div
          className="relative inline-flex items-center justify-center w-full h-full bg-gradient-buttons rounded-md "
          onClick={handleWalletOpen}
        >
          <div className="w-7 h-7 p-[2.80px] justify-center items-center flex">
            <div className="w-[22.40px] h-[22.40px] relative"></div>
          </div>
          <div className="w-1.5 h-[22px] relative"></div>

          <div className="flex gap-1 items-center justify-center">
            <button className="go1487791704">{t("profile.wallet")}</button>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_1679_25110)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14 24.5C15.3789 24.5 16.7443 24.2284 18.0182 23.7007C19.2921 23.1731 20.4496 22.3996 21.4246 21.4246C22.3996 20.4496 23.1731 19.2921 23.7007 18.0182C24.2284 16.7443 24.5 15.3789 24.5 14C24.5 12.6211 24.2284 11.2557 23.7007 9.98182C23.1731 8.70791 22.3996 7.55039 21.4246 6.57538C20.4496 5.60036 19.2921 4.82694 18.0182 4.29926C16.7443 3.77159 15.3789 3.5 14 3.5C11.2152 3.5 8.54451 4.60625 6.57538 6.57538C4.60625 8.54451 3.5 11.2152 3.5 14C3.5 16.7848 4.60625 19.4555 6.57538 21.4246C8.54451 23.3938 11.2152 24.5 14 24.5ZM13.7293 18.2467L19.5627 11.2467L17.7707 9.75333L12.754 15.7722L10.1582 13.1752L8.5085 14.8248L12.0085 18.3248L12.9115 19.2278L13.7293 18.2467Z"
                  fill="white"
                />
                <path
                  d="M12.8947 18.8575L12.1853 18.1481L8.86205 14.8248L10.1581 13.5288L12.5772 15.9489L12.7707 16.1425L12.946 15.9322L17.8027 10.1054L19.2106 11.2787L13.5373 18.0866L13.5373 18.0866L12.8947 18.8575ZM14 24.75C15.4117 24.75 16.8096 24.4719 18.1138 23.9317C19.4181 23.3915 20.6032 22.5996 21.6014 21.6014C22.5996 20.6032 23.3915 19.4181 23.9317 18.1138C24.4719 16.8096 24.75 15.4117 24.75 14C24.75 12.5883 24.4719 11.1904 23.9317 9.88615C23.3915 8.5819 22.5996 7.39683 21.6014 6.3986C20.6032 5.40037 19.4181 4.60853 18.1138 4.06829C16.8096 3.52806 15.4117 3.25 14 3.25C11.1489 3.25 8.41462 4.38259 6.3986 6.3986C4.38259 8.41462 3.25 11.1489 3.25 14C3.25 16.8511 4.38259 19.5854 6.3986 21.6014C8.41462 23.6174 11.1489 24.75 14 24.75Z"
                  stroke="black"
                  stroke-width="0.5"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_1679_25110"
                  x="3"
                  y="3"
                  width="22"
                  height="23"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="1" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_1679_25110"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_1679_25110"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>

          <div
            className="absolute inset-0 rounded-md border-b-2 border-black"
            style={{ filter: "blur(2px)" }}
          ></div>
          <div className="w-1 h-[22px] relative"></div>
        </div>
      </div> */}
    </div>
  );
};
