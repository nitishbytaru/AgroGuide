import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import te from "./locales/te.json";
import hi from "./locales/hi.json";
import or from "./locales/or.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    resources: {
      en: { translation: en },
      te: { translation: te },
      hi: { translation: hi },
      or: { translation: or },
    },
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
