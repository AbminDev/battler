import { useTranslation } from "react-i18next";
import {
  ChangeExchange,
  ChangeLanguage,
  ConnectWallet,
  DeleteAccount,
  GameSetting,
} from "./components";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {useEffect} from "react";

export const Setting = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="pt-6 text-center text-white text-2xl font-normal leading-normal">
        {t("profile.setting")}
      </div>
      <div className="mt-2">
        <div className="flex flex-col gap-1">
          <ChangeLanguage />
          <ChangeExchange />
          <DeleteAccount />
          <GameSetting/>
        </div>

        <ConnectWallet />
      </div>
    </div>
  );
};
