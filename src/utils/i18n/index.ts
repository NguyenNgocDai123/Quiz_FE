import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import vn from "./locales/vn.json"; // đổi tên file cho thống nhất

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    vn: { translation: vn },
  },
  lng: "vn",
  fallbackLng: "vn",
  interpolation: { escapeValue: false },
});

export default i18n;
