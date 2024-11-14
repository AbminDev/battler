import { PropsWithChildren } from "react";

export const Background = (props: PropsWithChildren) => {
  return (
    <main
      className="w-full h-full absolute
                bg-[url('./assets/images/back_pattern.png')]
                bg-repeat bg-[length:138px_138px]"
    >
      <div
        className="pb-24 absolute w-full h-full top-0 left-0
                bg-gradient-to-b from-start-gradient from-start via-middle-gradient via-middle to-start-gradient to-end"
      >
        <div className="pt-4 px-4 overflow-hidden top-0 left-0 w-full select-none">
          {props.children}
        </div>
      </div>
    </main>
  );
};
