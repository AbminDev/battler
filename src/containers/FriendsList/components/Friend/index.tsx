import React from "react";

export const Friend = ({
  name,
  description,
  imgSrc,
}: {
  name: string;
  description: string;
  imgSrc: string;
}) => {
  return (
    <div className="w-full h-[72px]  bg-zinc-800 rounded shadow-inner-sm-white border border-stone-700 flex gap-2 justify-start p-2">
      <div className="flex items-center justify-center w-14 h-14 bg-stone-600 rounded-full border border-black">
        <img
          className="w-10 h-10  rounded-full border-[1px] border-black"
          src={imgSrc}
        />
      </div>

      <div className="h-full flex flex-col justify-center gap-2">
        <div className="text-white text-sm font-normal leading-[14px]">
          {name}
        </div>
        <div className="text-stone-400 text-xs font-light leading-[14.40px]">
          {description}
        </div>
      </div>
    </div>
  );
};
