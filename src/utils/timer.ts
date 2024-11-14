import i18next from "../i18n/config";

export const calculateTimer = (
  startTimeUTC: number,
  finishAction: () => void
) => {
  const time = startTimeUTC - Date.now();

  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((time / 1000 / 60) % 60);
  const seconds = Math.floor((time / 1000) % 60);

  if (time <= 0) {
    console.log("END TIMER!");
    finishAction();
    return void 0;
  } else {
    let timerStr = "";
    timerStr += days > 0 ? days + i18next.t("timer.day") + " " : "";
    timerStr += hours > 0 ? hours + i18next.t("timer.hour") + " " : "";
    timerStr += minutes > 0 ? minutes + i18next.t("timer.minute") + " " : "";
    timerStr += seconds > 0 ? seconds + i18next.t("timer.second") : "";
    return timerStr;
  }
};
