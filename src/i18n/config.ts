import { LOCALS } from "../constants";
import en from "./en/index.json";
import ua from "./ua/index.json";
import ru from "./ru/index.json";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

export const resources = {
  [LOCALS.EN]: {
    translation: en,
  },
  [LOCALS.UA]: {
    translation: ua,
  },
  [LOCALS.RU]: {
    translation: ru,
  },
};

i18next.use(initReactI18next).use(LanguageDetector).init({
  debug: true,
  resources,
  fallbackLng: LOCALS.EN,
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
