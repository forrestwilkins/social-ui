import "react-i18next";
import en from "../i18n/locales/en.json";

declare module "react-i18next" {
  interface CustomTypeOptions {
    resources: {
      ns1: typeof en;
    };
  }
}
