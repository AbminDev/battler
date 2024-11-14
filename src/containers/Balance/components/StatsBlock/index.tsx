import { useTranslation } from "react-i18next";

interface StatsBlockProps {
  textKey: string;
  value: string;
}

export const StatsBlock = (props: StatsBlockProps) => {
  const { textKey, value } = props;
  const { t } = useTranslation();

  return (
    <div className="flex items-center text-center bg-stone-900 rounded shadow-inner border border-stone-700 justify-between p-4">
      <p className="text-stone-300 text-base font-normal leading-none">
        {t(textKey)}
      </p>
      <div className="flex items-center gap-x-1">
        <div className="w-7 h-7">
          <img src={require("../../../../assets/images/lobby_ico.png")} />
        </div>
        <p className="text-right text-white text-[28px] font-black leading-7">
          {value}
        </p>
      </div>
    </div>
  );
};
