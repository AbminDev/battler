import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTelegram } from "../../../../hooks/useTelegram";
import { PopupButton } from "../../../PopupButton";
export const CopyButton = () => {
  const { userId } = useTelegram();
  const [copied, setCopied] = useState(false);

  const handleCopyClick = async () => {
    if (!userId) {
      return;
    }

    const urlToCopy = `t.me/DungeonsOfKitsune_bot/game?startapp=ref_${userId}`;
    try {
      await navigator.clipboard.writeText(urlToCopy);
      setCopied(true);
      toast.success("Invite link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy URL.");
    }
  };

  return (
    <>
      <PopupButton
        type={"blue"}
        onClick={handleCopyClick}
      >
        <div className="flex justify-center items-center">
          {copied ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm5.707 7.293l-6 6a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 11.586l5.293-5.293a1 1 0 111.414 1.414z"
                fill="white"
              />
            </svg>
          ) : (
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_5771_25439)">
                <path
                  d="M24 9V27C24 27.2652 23.8946 27.5196 23.7071 27.7071C23.5196 27.8946 23.2652 28 23 28H5C4.73478 28 4.48043 27.8946 4.29289 27.7071C4.10536 27.5196 4 27.2652 4 27V9C4 8.73478 4.10536 8.48043 4.29289 8.29289C4.48043 8.10536 4.73478 8 5 8H23C23.2652 8 23.5196 8.10536 23.7071 8.29289C23.8946 8.48043 24 8.73478 24 9ZM27 4H9C8.73478 4 8.48043 4.10536 8.29289 4.29289C8.10536 4.48043 8 4.73478 8 5C8 5.26522 8.10536 5.51957 8.29289 5.70711C8.48043 5.89464 8.73478 6 9 6H26V23C26 23.2652 26.1054 23.5196 26.2929 23.7071C26.4804 23.8946 26.7348 24 27 24C27.2652 24 27.5196 23.8946 27.7071 23.7071C27.8946 23.5196 28 23.2652 28 23V5C28 4.73478 27.8946 4.48043 27.7071 4.29289C27.5196 4.10536 27.2652 4 27 4Z"
                  fill="#FFEFCB"
                />
                <path
                  d="M24.25 27V9C24.25 8.66848 24.1183 8.35054 23.8839 8.11612C23.6495 7.8817 23.3315 7.75 23 7.75H5C4.66848 7.75 4.35054 7.8817 4.11612 8.11612C3.8817 8.35054 3.75 8.66848 3.75 9V27C3.75 27.3315 3.8817 27.6495 4.11612 27.8839C4.35054 28.1183 4.66848 28.25 5 28.25H23C23.3315 28.25 23.6495 28.1183 23.8839 27.8839C24.1183 27.6495 24.25 27.3315 24.25 27ZM27 3.75H9C8.66848 3.75 8.35054 3.8817 8.11612 4.11612C7.8817 4.35054 7.75 4.66848 7.75 5C7.75 5.33152 7.8817 5.64946 8.11612 5.88388C8.35054 6.1183 8.66848 6.25 9 6.25H25.75V23C25.75 23.3315 25.8817 23.6495 26.1161 23.8839C26.3505 24.1183 26.6685 24.25 27 24.25C27.3315 24.25 27.6495 24.1183 27.8839 23.8839C28.1183 23.6495 28.25 23.3315 28.25 23V5C28.25 4.66848 28.1183 4.35054 27.8839 4.11612C27.6495 3.8817 27.3315 3.75 27 3.75Z"
                  stroke="#1D3874"
                  strokeWidth="0.5"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_5771_25439"
                  x="3"
                  y="2.8"
                  width="25.5"
                  height="25.7"
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
                    result="effect1_dropShadow_5771_25439"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_5771_25439"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          )}
        </div>
      </PopupButton>

      <ToastContainer className={"fixed top-[70px] z-40"} />
    </>
  );
};
