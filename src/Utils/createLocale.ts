import type {
  ILanguageString,
  IRegionString,
  ILocaleString,
  ILocale,
} from "@/Types";
import { Locale } from "@/Domain/Locale";

export function createLocale(value: {
  languageOrLocale: ILocaleString | ILanguageString;
  region?: IRegionString;
}): ILocale {
  return Locale.new(value);
}
