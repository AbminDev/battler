// components/QuantitySelector.tsx
import React from "react";
import Slider from "rc-slider";
import  Handle from "rc-slider";
import "rc-slider/assets/index.css";
import { PopupButton } from "../../../../components/PopupButton";

interface QuantitySelectorProps {
  max: number;
  value: number;
  onChange: (value: number) => void;
}

const CustomHandle: React.FC<any> = (props) => {
  const { value, dragging, index, ...rest } = props;
  return (
    <Handle
      value={value}
      {...rest}
      style={{
        ...rest.style,
        height: 24,
        width: 12,
        backgroundColor: "blue",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  max,
  value,
  onChange,
}) => {
  const handleIncrease = () => {
    if (value < max) onChange(value + 1);
  };

  const handleDecrease = () => {
    if (value > 0) onChange(value - 1);
  };

  const handleSliderChange = (val: number | number[]) => {
    if (typeof val === "number") {
      onChange(val);
    }
    // Якщо слайдер буде використовуватися як діапазон, можна додати додаткову обробку тут
  };

  return (
    <div className="flex items-center space-x-2">
      <PopupButton onClick={handleDecrease} disabled={value === 0} type="blue">
        -
      </PopupButton>

      <div className="flex-1 min-w-0">
        <Slider
          min={0}
          max={max}
          value={value}
          onChange={handleSliderChange}
          styles={{
            track: { backgroundColor: "#4caf50", height: 8 },
            handle: {
              height: 24,
              width: 12,
              backgroundColor: "#407FB7",
              border: "2px solid black",
              borderRadius: "4px",
              cursor: "pointer",
              transform: "translate(-50%, -20%)",
              opacity:100
            },
            rail: { backgroundColor: "#ddd", height: 8 },
          }}
          className="w-full"
        />
      </div>

      <PopupButton
        onClick={handleIncrease}
        disabled={value === max}
        type="blue"
      >
        +
      </PopupButton>

      <input
        type="text"
        value={value}
        readOnly
        className="w-12 h-8 bg-[#1b1817] text-center rounded shadow-inner border border-[#554837] text-white text-base font-normal font-['Londrina Solid'] leading-none"
      />
    </div>
  );
};
