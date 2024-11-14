import { useEffect } from "react";
import { TELEGRAM_CLIENT_ID } from "../config";

const tg = window.Telegram?.WebApp;

export function useTelegram() {
  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
      tg.disableVerticalSwipes();
      tg.enableClosingConfirmation();
    }
  }, []);

  return {
    tg,
    user: tg?.initDataUnsafe?.user,
    isExpanded: tg?.isExpanded,
    userId: tg?.initDataUnsafe?.user?.id?.toString() ?? TELEGRAM_CLIENT_ID,
    startParam: tg.initDataUnsafe?.start_param,
  }
}
