import React from "react";

interface PopupButtonProps {
  type?: "green" | "red" | "gold" | "gray" | "blue";
  onClick?: () => void;
  children: React.ReactNode;
  height?: string;
  width?: string;
  className?: string;
  size?: "small" | "medium" | "big";
  disabled?: boolean;
}

export const PopupButton = (props: PopupButtonProps) => {
  const {
    type = "gray",
    onClick,
    children,
    height = "",
    width = "auto",
    className = "",
    size = "small",
    disabled = false,
  } = props;

  const colors = {
    gold: {
      1: "bg-[#FFCB3B] text-shadow-[-0.5px_-0.5px_0px_#623E00] text-stroke-[#623E00] shadow-[inset_0_0_1px_0_#FFCF88]",
      2: "from-[#FF9F18] via-[#EAA000] to-[#FFBC00]",
      3: "bg-[#322000]",
    },
    green: {
      1: "bg-[#4C905F] text-shadow-[-0.5px_-0.5px_0px_#1D4A3F] text-stroke-[#1D4A3F] shadow-[inset_0_0_1px_0_#66B280]",
      2: "from-[#275F53] via-[#2F6A56] to-[#488B5E]",
      3: "bg-[#0E2822]",
    },
    red: {
      1: "bg-[#B32B18] text-shadow-[-0.5px_-0.5px_0px_#4F110E] text-stroke-[#4F110E] shadow-[inset_0_0_1px_0_#CD3A20]",
      2: "from-[#7E1A18] via-[#A72519] to-[#CA3821]",
      3: "bg-[#310300]",
    },
    gray: {
      1: "bg-[#B0B0B0] text-shadow-[-0.5px_-0.5px_0px_#353535] text-stroke-[#353535] shadow-[inset_0_0_1px_0_#EDEDED]",
      2: "from-[#676767] via-[#959595] to-[#A2A2A2]",
      3: "bg-[#262626]",
    },
    blue: {
      1: "bg-[#407FB7] text-shadow-[-0.5px_-0.5px_0px_#1D3874] text-stroke-[#1D3874] shadow-[inset_0_0_1px_0_#57A7CD]",
      2: "from-[#2B457E] via-[#31548C] to-[#407EB6]",
      3: "bg-[#0B142F]",
    },
  }

  return (
  <button
    onClick={onClick} style={{
      borderRadius: size === 'small' ? '8px' : '12px',
      fontSize: size === 'small' ? '16px' : size === "medium" ? '18px' : '20px',
      padding: size === 'small' ? '1px' : '2px',
      paddingBottom: size === 'small' ? '2px' : size === "medium" ? '3px' : '4px',
    }} disabled={disabled}
    className={`relative cursor-pointer select-none bg-[#250F12] text-[#FFEFCB] border-0 ${className} 
      ${!disabled ? "transform transition-transform duration-150 active:scale-95" : ""}`}>
    <div className={`border-[#5B382E] bg-gradient-to-b from-[#8A5545] to-[#5B382E]`} style={{
      borderRadius: size === 'small' ? '7px' : '10px',
      padding: size === 'small' ? '1px' : '2px',
      borderWidth: size === 'small' ? '1px' : '2px',
    }}>
      <div className={`p-[1px] ${colors[type][3]}`} style={{
        paddingBottom: size === 'small' ? '1px' : size === 'medium' ? '2px' : '3px',
        borderRadius: size === 'small' ? '6px' : '7px'
      }}>
        <div style={{
          paddingBottom: size === 'small' ? '2px' : size === 'medium' ? '3px' : '4px',
          borderRadius: size === 'small' ? '5px' : '6px'
        }} className={`p-[2px] text-center bg-gradient-to-t ${colors[type][2]}`}>
          <div style={{
            minHeight: height,
            minWidth: width,
            borderRadius: size === 'small' ? '2px' : '3px',
            paddingTop: size === 'small' ? '5px' : size === 'medium' ? '9px' : '10px',
            paddingBottom: size === 'small' ? '5px' : size === 'medium' ? '9px' : '10px'
          }} className={`leading-[1] ${colors[type][1]} text-stroke-small px-[7px]`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  </button>
  );
};
