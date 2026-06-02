import type {
  ICountry,
  ILanguage,
  ILocale,
  ISimplelocalizeData,
} from "@/Types";
import { normalizeLocale } from "@/Utils/normalizeLocale";

// Dataset : https://cdn.simplelocalize.io/public/v1/locales
import simplelocalize from "@/data-sets/simplelocalize.io.json";

import { Language } from "@/Domain/Language";
import { Country } from "@/Domain/Country";

export class Locale implements ILocale {
  public readonly locale: string;
  public readonly language_code: string;
  public readonly country_code: string;

  private constructor(language: string, region: string) {
    const normalized = normalizeLocale({ locale: `${language}-${region}` });

    const entry = (simplelocalize as ISimplelocalizeData[]).find(
      (d) => d.locale.toLowerCase() === normalized.toLowerCase(),
    );

    if (!entry) {
      throw new Error(`Unknown locale: ${normalized}`);
    }

    this.locale = entry.locale;

    const [language_code, country_code] = this.locale.split("-");
    this.language_code = language_code;
    this.country_code = country_code;
  }

  public static new(value: { language: string; country: string }): Locale {
    return new Locale(value.language, value.country);
  }

  public static fromLocale(value: { locale: string }): Locale {
    const [language, country] = value.locale.split("-");

    return new Locale(language, country);
  }

  public static fromIntlLocale(value: { locale: Intl.Locale }): Locale {
    const country = value.locale.region;
    if (!country)
      throw new Error(
        `Unsupported Intl.Locale: ${value.locale.toString()}. A country is required.`,
      );

    return new Locale(value.locale.language, country);
  }

  public language(): ILanguage {
    return Language.new({ iso_639_1: this.language_code });
  }

  public country(): ICountry {
    return Country.fromIso31661Alpha2({ alpha2: this.country_code });
  }

  public toIntlLocale(): Intl.Locale {
    return new Intl.Locale(this.locale);
  }
}
