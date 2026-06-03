export enum MatchingPolicy {
  /**
   * The language-country combination must exist as an entry in the dataset.
   */
  STRICT = "strict",
  /**
   * The language and the country must each exist somewhere in the dataset,
   * but they do not need to appear together as a combination.
   */
  LOOSE = "loose",
}

/**
 * A uniform policy or a rule map with a required default.
 *
 * The `locales` map uses the same `*` wildcard syntax as `resolveLocale` overrides.
 * Resolution order: exact match → language wildcard (`en-*`) → country wildcard (`*-BE`) → default.
 *
 * @example
 * // uniform
 * MatchingPolicy.STRICT
 *
 * @example
 * // exact combination
 * { default: MatchingPolicy.STRICT, locales: { 'en-BE': MatchingPolicy.LOOSE } }
 *
 * @example
 * // language wildcard — en loose for any country
 * { default: MatchingPolicy.STRICT, locales: { 'en-*': MatchingPolicy.LOOSE } }
 *
 * @example
 * // country wildcard — any language loose in BE
 * { default: MatchingPolicy.STRICT, locales: { '*-BE': MatchingPolicy.LOOSE } }
 */
export type LocalePolicy =
  | MatchingPolicy
  | { default: MatchingPolicy; locales: Record<string, MatchingPolicy> };

export interface ILocale {
  locale: string;
  language_code: string;
  country_code: string;
  language(): ILanguage;
  languages(): ILanguages;
  country(): ICountry;
  toIntlLocale(): Intl.Locale;
}

export interface IContinent {
  name: string;

  // This can be used for translations, as it provides a machine-readable identifier for the country in a stable format for translations.
  machine_name: string;

  // ISO 3166-1
  // https://nl.wikipedia.org/wiki/ISO_3166-1
  alpha2: string;

  countries(): ICountries;
}

export interface ICountry {
  name: string;

  // This can be used for translations, as it provides a machine-readable identifier for the country in a stable format for translations.
  machine_name: string;

  // ISO 3166-1
  // https://nl.wikipedia.org/wiki/ISO_3166-1
  alpha2: string;
  alpha3: string;
  numeric: string;

  // International Direct Dialing
  // https://en.wikipedia.org/wiki/List_of_telephone_country_codes
  direct_dialing_code: string;

  languages(): ILanguages;
  borders(): ICountries;
}

export enum CountryCodeFormat {
  ALPHA2 = "alpha2",
  ALPHA3 = "alpha3",
  NUMERIC = "numeric",
}

export interface ICountries {
  add(country: ICountry): ICountries;
  remove(country: ICountry): ICountries;
  removeBy(by: CountryCodeFormat, identifiers: string[] | string): ICountries;
  lookUpsBy(by: CountryCodeFormat, identifiers: string[]): ICountries;
  lookUpBy(by: CountryCodeFormat, identifiers: string): ICountry | undefined;
  toArray(): ICountry[];
  //sortLocale(translate: (value: string) => string): ICountry;
  //spokenLanguages(): ICountryLanguageCollection;
}

export enum LanguageCodeFormat {
  ALPHA2 = "alpha2",
  ALPHA3 = "alpha3",
}

export interface ILanguage {
  name: string;

  // This can be used for translations, as it provides a machine-readable identifier for the country in a stable format for translations.
  machine_name: string;

  alpha2: string;
  alpha3: string;
}

export interface ILanguages {
  add(language: ILanguage): ILanguages;
  remove(language: ILanguage): ILanguages;
  toArray(): ILanguage[];
}

export interface IDatasetLanguage {
  name: string;
  name_local: string;
  iso_639_1: string;
  iso_639_2: string;
  iso_639_3: string;
}

export interface IDatasetCountry {
  name: string;
  name_local: string;
  iso_3166_1_alpha2: string;
  iso_3166_1_alpha3: string;
  iso_3166_1_numeric: number;
  continent: string;
  region: string;
  capital: string;
  direct_dialing_code: string;
  currency_code: string;
  currency_symbol: string;
  flag: string;
  timezones: string[];
  borders: string[];
  languages: IDatasetLanguage[];
}

export interface IDatasetEntry {
  locale: string;
  language: IDatasetLanguage;
  country: IDatasetCountry;
}

export type LocaleOverrides = { "*": string } & Record<string, string>;
