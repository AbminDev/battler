import React, { useEffect, useState } from "react";
import { useSessionStorage } from "@uidotdev/usehooks";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavButton } from "./components/NavButton";
import { useUtils } from "../../../utils/navigateTo";

// import { setCurrentPage } from "../../features/currentPage/currentPagesSlice";
export const Footer = () => {
  const dispatch = useDispatch();
  const [activeDiv, setActiveDiv] = useSessionStorage("page", "/");
  const {navigateTo} = useUtils();

  const handleSvgClick = (divLink: string) => {
    navigateTo(divLink);
  };

  useEffect(() => {
    navigateTo(activeDiv);
  }, []);

  return (
    <>
      <footer className="z-2 w-full fixed bottom-4 px-4 items-center">
        <div className="w-full bg-[#485370] flex justify-around items-center py-1 px-4 rounded-[16px] border-t border-b-2 border-[#62688A]">
          <div className="flex-1">
            <Link to="/heroes">
              <NavButton
                handleClickSvg={() => handleSvgClick("/heroes")}
                activeDiv={activeDiv}
                type={"heroes"}
                textKey="footer.heroes"
              />
            </Link>
          </div>
          <div className="flex-1">
            <Link to="/friends">
              <NavButton
                handleClickSvg={() => handleSvgClick("/friends")}
                activeDiv={activeDiv}
                type={"friends"}
                textKey="footer.friends"
              />
            </Link>
          </div>
          <div className="flex-1">
            <Link to="/">
              <NavButton
                handleClickSvg={() => handleSvgClick("/")}
                activeDiv={activeDiv}
                type={"home"}
                textKey="footer.home"
              />
            </Link>
          </div>
          <div className="flex-1">
            <Link to="/rewards">
              <NavButton
                handleClickSvg={() => handleSvgClick("/rewards")}
                activeDiv={activeDiv}
                type={"rewards"}
                textKey="footer.rewards"
              />
            </Link>
          </div>
          <div className="flex-1">
            <Link to="/profile">
              <NavButton
                handleClickSvg={() => handleSvgClick("/profile")}
                activeDiv={activeDiv}
                type={"profile"}
                textKey="footer.profile"
              />
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};
