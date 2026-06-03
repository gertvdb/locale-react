import { useContext } from "react";
import { LocaleContext } from "@/Context/LocaleContext";
import { ICountry, ILanguage, ILocale } from "@/Types";

export const useLocale = (): {
  locale: ILocale;
  language: ILanguage;
  language_code: string;
  country: ICountry;
  country_code: string;
} => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }

  return {
    locale: context,
    language_code: context.language_code,
    country_code: context.country_code,
    language: context.language(),
    country: context.country(),
  };
};
