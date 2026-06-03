import type {
  ICountry,
  ILanguage,
  ILocale,
  ISimplelocalizeData,
  LocalePolicy,
} from "@/Types";
import { MatchingPolicy } from "@/Types";
import { normalizeLocale } from "@/Utils/normalizeLocale";

// Dataset : https://cdn.simplelocalize.io/public/v1/locales
import simplelocalize from "@/Datasets/simplelocalize.io.json";

import { Language } from "@/Domain/Language";
import { Country } from "@/Domain/Country";
import { resolvePolicy } from "@/Utils/resolvePolicy";

const dataset = simplelocalize as ISimplelocalizeData[];

export class Locale implements ILocale {
  public readonly locale: string;
  public readonly language_code: string;
  public readonly country_code: string;

  private constructor(language: string, region: string, policy: LocalePolicy = MatchingPolicy.STRICT) {
    const normalized = normalizeLocale({ locale: `${language}-${region}` });
    const [lang, country] = normalized.split("-");
    const effectivePolicy = resolvePolicy(policy, lang);

    if (effectivePolicy === MatchingPolicy.STRICT) {
      const entry = dataset.find(
        (d) => d.locale.toLowerCase() === normalized.toLowerCase(),
      );

      if (!entry) {
        throw new Error(`Unknown locale: ${normalized}`);
      }

      this.locale = entry.locale;
    } else {
      const languageExists = dataset.some(
        (d) => d.language.iso_639_1.toLowerCase() === lang.toLowerCase(),
      );
      if (!languageExists) {
        throw new Error(`Unknown language in locale: ${normalized}`);
      }

      const countryExists = dataset.some(
        (d) => d.country.iso_3166_1_alpha2.toLowerCase() === country.toLowerCase(),
      );
      if (!countryExists) {
        throw new Error(`Unknown country in locale: ${normalized}`);
      }

      this.locale = normalized;
    }

    const [language_code, country_code] = this.locale.split("-");
    this.language_code = language_code;
    this.country_code = country_code;
  }

  public static new(value: { language: string; country: string; policy?: LocalePolicy }): Locale {
    return new Locale(value.language, value.country, value.policy);
  }

  public static fromLocale(value: { locale: string; policy?: LocalePolicy }): Locale {
    const [language, country] = value.locale.split("-");

    return new Locale(language, country, value.policy);
  }

  public static fromIntlLocale(value: { locale: Intl.Locale; policy?: LocalePolicy }): Locale {
    const country = value.locale.region;
    if (!country)
      throw new Error(
        `Unsupported Intl.Locale: ${value.locale.toString()}. A country is required.`,
      );

    return new Locale(value.locale.language, country, value.policy);
  }

  public language(): ILanguage {
    return Language.new({ code: this.language_code });
  }

  public country(): ICountry {
    return Country.from({ code: this.country_code });
  }

  public toIntlLocale(): Intl.Locale {
    return new Intl.Locale(this.locale);
  }
}
