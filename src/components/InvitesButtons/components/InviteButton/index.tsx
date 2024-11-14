import { useTranslation } from "react-i18next";
import { useTelegram } from "../../../../hooks/useTelegram";
import { PopupButton } from "../../../PopupButton";

export const InviteButton = ({ width = "180px" }: { width?: string }) => {
  const { tg, userId } = useTelegram();
  const { t } = useTranslation();
  const handleInviteClick = () => {
    const tg = window.Telegram.WebApp;

    const url = `t.me/DungeonsOfKitsune_bot/game?startapp=ref_${userId}`;

    if (tg) {
      tg.openTelegramLink(`https://t.me/share/url?url=${url}`);
    }
  };

  return (
    <PopupButton
      type={"blue"}
      onClick={handleInviteClick}
      width={width}
    >
      <div className="flex gap-1 items-center justify-center">
        <button className="text-center text-[#ffefcb] text-xl font-normal leading-tight">
          {t("friends.invite")}
        </button>
        <svg
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_5771_25697)">
            <path
              d="M18.3333 14.1666V15.8333H8.33333V14.1666C8.33333 14.1666 8.33333 10.8333 13.3333 10.8333C18.3333 10.8333 18.3333 14.1666 18.3333 14.1666ZM15.8333 6.66663C15.8333 6.17217 15.6867 5.68882 15.412 5.2777C15.1373 4.86658 14.7469 4.54615 14.29 4.35693C13.8332 4.16771 13.3306 4.1182 12.8456 4.21466C12.3607 4.31113 11.9152 4.54923 11.5656 4.89886C11.2159 5.24849 10.9778 5.69395 10.8814 6.1789C10.7849 6.66385 10.8344 7.16652 11.0236 7.62334C11.2129 8.08015 11.5333 8.4706 11.9444 8.7453C12.3555 9.02 12.8389 9.16663 13.3333 9.16663C13.9964 9.16663 14.6323 8.90323 15.1011 8.43439C15.5699 7.96555 15.8333 7.32967 15.8333 6.66663ZM9.16667 8.33329H6.66667V5.83329H5V8.33329H2.5V9.99996H5V12.5H6.66667V9.99996H9.16667V8.33329Z"
              fill="#FFEFCB"
            />
            <path
              d="M18.3333 16.1833H18.6833V15.8333V14.1666H18.3333C18.6833 14.1666 18.6833 14.1664 18.6833 14.1661L18.6833 14.1654L18.6833 14.164L18.6833 14.16L18.6831 14.1486C18.6829 14.1394 18.6824 14.127 18.6817 14.1117C18.6801 14.0811 18.6772 14.0387 18.6716 13.9861C18.6603 13.8811 18.6382 13.7348 18.5948 13.5609C18.5079 13.2135 18.3346 12.7517 17.9883 12.29C17.2837 11.3504 15.9187 10.4833 13.3333 10.4833C10.7479 10.4833 9.383 11.3504 8.67833 12.29C8.33206 12.7517 8.15875 13.2135 8.07191 13.5609C8.02844 13.7348 8.00634 13.8811 7.99509 13.9861C7.98946 14.0387 7.98652 14.0811 7.98499 14.1117C7.98423 14.127 7.98381 14.1394 7.98359 14.1486L7.98338 14.16L7.98334 14.164L7.98334 14.1654L7.98333 14.1661C7.98333 14.1664 7.98333 14.1666 8.33333 14.1666H7.98333V15.8333V16.1833H8.33333H18.3333ZM9.51667 8.33329V7.98329H9.16667H7.01667V5.83329V5.48329H6.66667H5H4.65V5.83329V7.98329H2.5H2.15V8.33329V9.99996V10.35H2.5H4.65V12.5V12.85H5H6.66667H7.01667V12.5V10.35H9.16667H9.51667V9.99996V8.33329ZM16.1833 6.66663C16.1833 6.10295 16.0162 5.55193 15.703 5.08325C15.3899 4.61457 14.9447 4.24928 14.424 4.03357C13.9032 3.81786 13.3302 3.76142 12.7773 3.87139C12.2245 3.98136 11.7167 4.25279 11.3181 4.65137C10.9195 5.04995 10.6481 5.55777 10.5381 6.11062C10.4281 6.66347 10.4846 7.23651 10.7003 7.75727C10.916 8.27804 11.2813 8.72315 11.75 9.03631C12.2186 9.34948 12.7697 9.51663 13.3333 9.51663C14.0892 9.51663 14.8141 9.21636 15.3486 8.68188C15.8831 8.1474 16.1833 7.42249 16.1833 6.66663Z"
              stroke="#1D3874"
              strokeWidth="0.7"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_5771_25697"
              x="1.30078"
              y="2.76661"
              width="17.7324"
              height="13.7667"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="-0.5" dy="-0.7" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.113725 0 0 0 0 0.219608 0 0 0 0 0.454902 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_5771_25697"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_5771_25697"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </PopupButton>
  );
};
