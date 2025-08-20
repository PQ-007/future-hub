import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend) // loads translations from /public/locales/{{lng}}/{{ns}}.json
  .use(LanguageDetector) // detects browser language
  .use(initReactI18next) // passes i18n instance to react-i18next
  .init({
    fallbackLng: "en", // default language
    supportedLngs: ["en", "ja", "mn"],
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
