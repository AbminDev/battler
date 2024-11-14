import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// Define the type for the context value
interface ScrollContextValue {
  setScrollable: (
    scrollable: boolean,
    ref?: React.RefObject<HTMLDivElement>
  ) => void;
}

// Define the initial value for the context
const ScrollContext = createContext<ScrollContextValue>({
  setScrollable: () => {},
});

// Define the type for the props
interface ScrollProviderProps {
  children: React.ReactNode;
}

export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
  const [scrollableEl, setScrollableEl] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    // const overflow = 100;
    // document.body.style.overflowY = "hidden";
    // document.body.style.marginTop = `${overflow}px`;
    // document.body.style.height = window.innerHeight + overflow + "px";
    // document.body.style.paddingBottom = `${overflow}px`;
    // window.scrollTo(0, overflow);
    //
    // let ts: number | undefined;
    //
    // const onTouchStart = (e: TouchEvent) => {
    //   ts = e.touches[0].clientY;
    // };
    //
    // const onTouchMove = (e: TouchEvent) => {
    //   if (scrollableEl) {
    //     const scroll = scrollableEl.scrollTop;
    //     const scrollHeight = scrollableEl.scrollHeight;
    //     const clientHeight = scrollableEl.clientHeight;
    //     const te = e.changedTouches[0].clientY;
    //
    //     if (
    //       (scroll <= 0 && ts! < te) ||
    //       (scroll + clientHeight >= scrollHeight && ts! > te)
    //     ) {
    //       e.preventDefault();
    //     }
    //   } else {
    //     e.preventDefault();
    //   }
    // };
    //
    // document.documentElement.addEventListener("touchstart", onTouchStart, {
    //   passive: false,
    // });
    // document.documentElement.addEventListener("touchmove", onTouchMove, {
    //   passive: false,
    // });
    //
    // return () => {
    //   document.documentElement.removeEventListener("touchstart", onTouchStart);
    //   document.documentElement.removeEventListener("touchmove", onTouchMove);
    // };
  }, [scrollableEl]);

  const setScrollable = (
    scrollable: boolean,
    ref?: React.RefObject<HTMLDivElement>
  ) => {
    if (scrollable && ref?.current) {
      setScrollableEl(ref.current);
    } else {
      setScrollableEl(null);
    }
  };

  return (
    <ScrollContext.Provider value={{ setScrollable }}>
      {children}
    </ScrollContext.Provider>
  );
};

// Custom hook to use the scroll context
export const useScroll = () => {
  return useContext(ScrollContext);
};
