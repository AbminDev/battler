import { FooterSelector, HeaderSelector } from "./components";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useEffect } from "react";
import { useSessionStorage } from "@uidotdev/usehooks";
import { AnimatePresence } from "framer-motion";
import { useUtils } from "../utils/navigateTo";

const PAGES_WITHOUT_FOOTER = ["/tutorial", "/battle"];
const PAGES_WITH_HEADER = ["/home", "/play", "/farm", "/room", "/", "/island"];
export const Layout = () => {
  const { activeDiv } = useUtils()
  useEffect(() => {
    //console.log("CURRENT PAGE", activeDiv);
  }, [activeDiv]);

  return (
    <>
      <AnimatePresence mode="wait">
        {PAGES_WITH_HEADER.includes(activeDiv) && (
          <HeaderSelector
            key={`header-${activeDiv}`}
            currentPage={activeDiv}
          />
        )}
      </AnimatePresence>

      <Outlet />

      <AnimatePresence mode="wait">
        {!PAGES_WITHOUT_FOOTER.includes(activeDiv) && (
          <FooterSelector
            key={`footer-${activeDiv}`}
            currentPage={activeDiv}
          />
        )}
      </AnimatePresence>
    </>
  );
};
