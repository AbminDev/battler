import { useTranslation } from "react-i18next";
import { HandleBackButton } from "../../layout/components/HeaderCave/components";
import { TitleField } from "../../containers/Room";

export const InviteText = () => {
  const { t } = useTranslation();
  return (
    <div className="relative">
      <div className="absolute top-1">
        <HandleBackButton />
      </div>
      <div className="w-full flex-col justify-start items-center gap-3 inline-flex">
        <TitleField title ={`${t("rewards.mainTitle")}`}/>
        <div className="text-white text-base font-light leading-tight">
          {t("rewards.mainDescription")}
        </div>
      </div>
    </div>
  );
};
