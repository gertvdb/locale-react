import { useContext } from "react";
import { LocaleContext } from "@/Context/LocaleContext";
import { ICountry, ILanguage, ILocale } from "@/Types";

export const useLocale = (): {
  locale: ILocale;
  language: ILanguage;
  country: ICountry;
} => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }

  return {
    locale: context,
    language: context.language(),
    country: context.country(),
  };
};
