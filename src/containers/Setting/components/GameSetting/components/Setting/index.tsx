import {useEffect, useState} from "react";

interface CustomSwitchProps {
  data: boolean;
  onSettingChange: (value: boolean) => void;
}

const CustomSwitch = ({ data, onSettingChange }: CustomSwitchProps) => {
  const [isChecked, setIsChecked] = useState(data);

  useEffect(() => {
    if (isChecked !== data) { // Оновлюємо стан лише якщо дані змінилися
      setIsChecked(data);
    }
    // console.log('switcher data updated:', data);
  }, [data]);

  const handleChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onSettingChange(newValue);
  };

  return (
    <div
      className={`flex items-center w-12 h-6 transition duration-200 ease-in ${
        isChecked ? "bg-gray-800" : "bg-gray-800"
      } rounded-full border-2 border-[#554837]`}
      onClick={handleChange}
    >
      <div
        className={`w-[25px] h-[25px] rounded-full transition-transform duration-200 ease-in transform ${
          isChecked
            ? "translate-x-6 bg-gradient-to-b from-[#3E8465] to-[#326650]"
            : "translate-x-0 bg-gradient-to-b from-[#B43D2F] bg-[#893026]"
        }`}
      ></div>
    </div>
  );
};


export const Setting = ({ name, data, onSettingChange }: { name: string, data: boolean, onSettingChange: (value: boolean) => void }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="text-stone-300 text-base font-normal leading-none">
        {name}
      </div>
      <CustomSwitch data={data} onSettingChange={onSettingChange}/>
    </div>
  );
};
