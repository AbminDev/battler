import { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";

export const Playground = (props: PropsWithChildren) => {
  const location = useLocation();
  return (

    <main
      className="w-full h-full absolute
                bg-[url('./assets/images/playground1.png')]
                bg-no-repeat bg-cover"
    >
      <div
        className="absolute w-full h-full top-0 left-0
                bg-[linear-gradient(180deg,rgba(7,7,7,1)9.08%,rgba(7,7,7,0.10)25.17%,rgba(7,7,7,0.05)51.99%,rgba(7,7,7,0.10)74.97%,rgba(7,7,7,0.50)99.94%)]"
      >
        <div className="pt-4 px-4 pb-16 overflow-scroll top-0 left-0 w-full h-full select-none">
          {props.children}
        </div>
      </div>
    </main>
  );
};
