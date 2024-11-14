import { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";

export const Playground = (props: PropsWithChildren) => {
  const location = useLocation();
  return (
    <div
      id={`app-scrollable-${location.pathname}`}
      className="absolute pt-4 px-4 w-full h-full bg-dark-gray"
    >
      {props.children}
    </div>
  );
};
