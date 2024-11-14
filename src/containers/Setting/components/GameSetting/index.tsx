import { useTranslation } from "react-i18next";
import { Setting } from "./components";
import {saveUserSettings} from "../../../../endpoints/saveSettings";
import {useEffect, useState} from "react";
import {useTelegram} from "../../../../hooks/useTelegram";
import {RootState, store} from "../../../../app/store";
import {setUserSettings} from "../../../../app/features/userSettings";
import {useSelector} from "react-redux";
import {useSoundService} from "../../../../utils/soundService";

export const GameSetting = () => {
  const { t } = useTranslation();
  const { userId } = useTelegram();
  const settings = useSelector((state: RootState) => state.settings.settings);
  const { pausedSounds, pausedMusic } = useSoundService();

  const settingKeys = [
    "vibration",
    "sound",
    "music"
  ];

  useEffect(() => {
    // console.log(settings);
  }, [settings]);

  const handleSettingChange = async (name: string, value: boolean) => {
    if (name === 'sound' && !value) {
      pausedSounds();
    }

    if (name === 'music' && !value) {
      pausedMusic();
    }

    const updatedSettings = {
      ...settings,
      [name]: value,
    };

    store.dispatch(setUserSettings(updatedSettings));

    await saveUserSettings({ clientId: userId, settings: updatedSettings })
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {settingKeys.map((name, index) => (
        <Setting
          key={index}
          name={t('profile.gameSettings.'+name)}
          data={settings[name] as boolean}
          onSettingChange={(value) => handleSettingChange(name, value)}/>
      ))}
    </div>
  );
};
