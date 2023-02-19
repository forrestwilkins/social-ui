import { Namespace, TFunction } from "react-i18next";
import { Time } from "../constants/common.constants";

export const getFormattedExpiresAt = (expiresAt: number | "") => {
  if (expiresAt === "") {
    return null;
  }
  return new Date(Date.now() + expiresAt * 1000);
};

export const getExpiresAtOptions = (
  t: TFunction<Namespace<"ns1">, undefined>
) => [
  {
    message: t("invites.form.expiresAtOptions.oneDay"),
    value: Time.Day,
  },
  {
    message: t("invites.form.expiresAtOptions.sevenDays"),
    value: Time.Week,
  },
  {
    message: t("invites.form.expiresAtOptions.oneMonth"),
    value: Time.Month,
  },
  {
    message: t("invites.form.expiresAtOptions.never"),
    value: "",
  },
];
