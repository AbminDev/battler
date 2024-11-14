import { useTranslation } from "react-i18next";
import { StatsBlock } from "./components";

export const Balance = () => {
  const { t } = useTranslation();
  return (

    <div>
     <div className="pt-6 text-center text-white text-2xl font-normal leading-normal">
        {t("profile.balance")}
      </div>
      <div className="gap-4 flex flex-col mt-2">
        <StatsBlock textKey="profile.kitsune" value="120K" />
        <StatsBlock textKey="profile.currentBalance" value="23K" />
      </div>
    </div>
  );
};
