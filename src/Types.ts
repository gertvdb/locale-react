export interface ILocale {
  locale: string;
  language_code: string;
  country_code: string;
  language(): ILanguage;
  country(): ICountry;
}

export interface IContinent {
  name: string;

  // ISO 3166-1
  // https://nl.wikipedia.org/wiki/ISO_3166-1
  alpha2: string;

  countries(): ICountry[];
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

  continent: IContinent;

  languages(): ILanguage[]
  borders(): ICountry[]

}

export interface ILanguage {
  name: string;

  // This can be used for translations, as it provides a machine-readable identifier for the country in a stable format for translations.
  machine_name: string;

  iso_639_1: string;
  iso_639_2: string;
  iso_639_3: string;

}

export interface ISimplelocalizeData {
  locale: string;
  language: ISimplelocalizeLanguage;
  country: ISimplelocalizeCountry;
}

export interface ISimplelocalizeLanguage {
  name: string;
  name_local: string;
  iso_639_1: string;
  iso_639_2: string;
  iso_639_3: string;
}

export interface ISimplelocalizeCountry {
  name: string;
  name_local: string;
  code: string;
  area_sq_km: number;
  continent: string;
  region: string;
  capital_name: string;
  capital_latitude: number;
  capital_longitude: number;
  currency: string;
  currency_local: string;
  currency_code: string;
  currency_symbol: string;
  currency_numeric: number;
  currency_subunit_value: number;
  currency_subunit_name: string;
  languages: ISimplelocalizeLanguage[];
  flag: string;
  timezones: string[];
  borders: string[];
  is_landlocked: boolean;
  tld: string;
  iso_3166_1_numeric: number,
  iso_3166_1_alpha2: string,
  iso_3166_1_alpha3: string,
}

export interface IRestcountriesData {
  cca2: string;
  idd: IRestcountriesIdd;
}

export interface IRestcountriesIdd {
  root: string;
  suffixes: string[];
}

