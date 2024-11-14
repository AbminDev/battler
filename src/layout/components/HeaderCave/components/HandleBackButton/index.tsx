import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "@uidotdev/usehooks";
import { useUtils } from "../../../../../utils/navigateTo";
import {useSoundService} from "../../../../../utils/soundService";

interface HandleBackButtonProps {
  onClick?: () => void;
}

export const HandleBackButton: React.FC<HandleBackButtonProps> = ({
  onClick,
}) => {
  const { goBack } = useUtils();
  const { playSound } = useSoundService();

  return (
    <div
      className="flex items-center justify-center w-8 h-8 bg-stone-700 border border-zinc-900 cursor-pointer"
      onClick={() => {
        playSound('button');
        onClick ? onClick() : goBack();
    }}>
      <div className="flex items-center justify-center w-[24px] h-[24px] bg-stone-500 border border-zinc-900">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.75 11.1477V12.8523H8.52273L13.2102 17.5398L12 18.75L5.25 12L12 5.25L13.2102 6.46023L8.52273 11.1477H18.75Z"
            fill="#352A21"
          />
        </svg>
      </div>
    </div>
  );
};
