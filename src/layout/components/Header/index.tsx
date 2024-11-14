import React, { useEffect, useState } from "react";
import {
  CHAIN,
  TonConnectButton,
  useTonAddress,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTelegram } from "../../../hooks/useTelegram";
import { useUtils } from "../../../utils/navigateTo";

const NAME = "test 6";
const LVL = "3";
const COINS = "123455";

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useTelegram();
  const [tonConnectUI] = useTonConnectUI();

  const {navigateTo} = useUtils();

  const handleSvgClick = (divLink: string) => {
    navigateTo(divLink);
  };
  const [showShadow, setshowShadow] = useState(false);
  const address = useTonAddress();

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    currentScrollY > 0 ? setshowShadow(true) : setshowShadow(false);
  };

  return (
    <header
      className={`flex items-center justify-center w-full flex-col px-4 py-2 !fixed top-0 z-10 ${
        showShadow ? `drop-shadow-md` : ""
      }`}
    >
      <>
        <Link
          to="/profile"
          className="flex gap-x-12 bg-header w-full py-2 pl-4 pr-4 h-headerHeight rounded-lg justify-between "
          onClick={() => handleSvgClick("/profile")}
        >
          <div className="relative flex items-center">
            <div className="w-10 h-10 bg-[#1A1E32] flex object-contain py-2 px-[5px] justify-center items-center border-[#455175] border rounded-md">
              <img
                className=""
                src={require("../../../assets/images/Kitsune.png")}
              ></img>
            </div>
            <div className="flex-col pl-2.5">
              <p className="text-white text-base font-extrabold leading-[14px]">
                {user ? user.first_name : NAME}
              </p>
              <p className="text-[#949DD3] text-sm font-bold leading-[12px]">
                LVL {LVL}
              </p>
            </div>
          </div>
          <div className="relative flex items-center header_right pl-4">
            <div className="w-10 h-10 bg-[#1A1E32] flex object-contain resize py-2 px-[5px] justify-center items-center border-[#455175] border rounded-md">
              <img
                className=""
                src={require("../../../assets/images/diamond.png")}
              ></img>
            </div>
            <div className="flex-col pl-2.5">
              <p className="text-white text-base font-extrabold leading-[14px]">
                Place 10
              </p>
              <p className="text-[#44DCEA] text-sm font-bold leading-[12px]">
                Diamond
              </p>
            </div>
          </div>
        </Link>
      </>
    </header>
  );
};
