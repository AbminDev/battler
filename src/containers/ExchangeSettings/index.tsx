import React from "react";
import { useSelector } from "react-redux";
import { EXCHANGES, LOCALS } from "../../constants";
import { ExchangeCard } from "./components";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HandleBackButton } from "../../layout/components/HeaderCave/components";
import { TitleField } from "../Room";
import {RootState, store} from "../../app/store";
import { SaveButton } from "../../components";
import {useSoundService} from "../../utils/soundService";
import {setUserSettings} from "../../app/features/userSettings";
import {saveUserSettings} from "../../endpoints/saveSettings";
import {useTelegram} from "../../hooks/useTelegram";

export const ExchangeSettings: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { userId } = useTelegram();
  const settings = useSelector((state: RootState) => state.settings.settings);
  const { playSound } = useSoundService();

  const changeLanguage = async (exchange: string) => {
    playSound('button');
    const updatedSettings = {
      ...settings,
      ['exchange']: exchange,
    };

    store.dispatch(setUserSettings(updatedSettings));
    await saveUserSettings({ clientId: userId, settings: updatedSettings })
  };

  return (
    <>
      <div className="absolute pt-5 pl-5 z-10">
        <HandleBackButton onClick={() => navigate(-1)} />
      </div>
      <div className="p-4 bg-[#201B18] min-h-screen relative">
        <div className="flex items-center">
          <div className="flex-1 text-center">
            <TitleField title={t("changeExchange")} />
          </div>
        </div>

        <div className="flex flex-col pt-4 gap-y-1">
          {Object.keys(EXCHANGES).map((key) => (
            <ExchangeCard
              key={key}
              exchange={EXCHANGES[key]}
              isSelected={settings['exchange'] === EXCHANGES[key]}
              onSelect={changeLanguage}
            />
          ))}
        </div>
        {/*<div className="absolute bottom-4 left-0 w-full flex justify-center items-center">*/}
        {/*  <div className="relative px-4">*/}
        {/*    <SaveButton />*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </>
  );
};
