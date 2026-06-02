import * as react_jsx_runtime from 'react/jsx-runtime';
import { PropsWithChildren } from 'react';

interface ILocale {
    locale: string;
    language_code: string;
    country_code: string;
    language(): ILanguage;
    country(): ICountry;
    toIntlLocale(): Intl.Locale;
}
interface IContinent {
    name: string;
    machine_name: string;
    alpha2: string;
    countries(): ICountries;
}
interface ICountry {
    name: string;
    machine_name: string;
    alpha2: string;
    alpha3: string;
    numeric: string;
    direct_dialing_code: string;
    languages(): ILanguages;
    borders(): ICountries;
}
declare enum CountryLookUp {
    ALPHA2 = "alpha2",
    ALPHA3 = "alpha3",
    NUMERIC = "numeric"
}
interface ICountries {
    add(country: ICountry): ICountries;
    remove(country: ICountry): ICountries;
    removeBy(by: CountryLookUp, identifiers: string[] | string): ICountries;
    lookUpsBy(by: CountryLookUp, identifiers: string[]): ICountries;
    lookUpBy(by: CountryLookUp, identifiers: string): ICountry | undefined;
    toArray(): ICountry[];
}
interface ILanguage {
    name: string;
    machine_name: string;
    iso_639_1: string;
    iso_639_2: string;
    iso_639_3: string;
}
interface ILanguages {
    add(language: ILanguage): ILanguages;
    remove(language: ILanguage): ILanguages;
    toArray(): ILanguage[];
}
interface ISimplelocalizeData {
    locale: string;
    language: ISimplelocalizeLanguage;
    country: ISimplelocalizeCountry;
}
interface ISimplelocalizeLanguage {
    name: string;
    name_local: string;
    iso_639_1: string;
    iso_639_2: string;
    iso_639_3: string;
}
interface ISimplelocalizeCountry {
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
    iso_3166_1_numeric: number;
    iso_3166_1_alpha2: string;
    iso_3166_1_alpha3: string;
}
interface IRestcountriesData {
    cca2: string;
    idd: IRestcountriesIdd;
    continents: string[];
}
interface IRestcountriesIdd {
    root: string;
    suffixes: string[];
}

declare const SystemLocale: ILocale;

/**
 * Creates an {@link ILocale} from a language code, locale string, or language + region pair.
 *
 * @param value.languageOrLocale - A language code (e.g. `"en"`) or locale string (e.g. `"en-US"`).
 * @param value.country - Optional region code (e.g. `"US"`). Combined with `languageOrLocale` when provided.
 * @returns A new {@link ILocale} instance.
 * @throws If the resulting locale string is invalid.
 *
 * @example
 * createLocale({ languageOrLocale: "en-US" });
 * createLocale({ languageOrLocale: "en", country: "US" });
 */
declare function createLocale(value: {
    languageOrLocale: string;
    country?: string;
}): ILocale;

declare class Locale implements ILocale {
    readonly locale: string;
    readonly language_code: string;
    readonly country_code: string;
    private constructor();
    static new(value: {
        language: string;
        country: string;
    }): Locale;
    static fromLocale(value: {
        locale: string;
    }): Locale;
    static fromIntlLocale(value: {
        locale: Intl.Locale;
    }): Locale;
    language(): ILanguage;
    country(): ICountry;
    toIntlLocale(): Intl.Locale;
}

declare class Language implements ILanguage {
    readonly name: string;
    readonly machine_name: string;
    readonly iso_639_1: string;
    readonly iso_639_2: string;
    readonly iso_639_3: string;
    private constructor();
    static new(value: {
        iso_639_1: string;
    }): Language;
    static fromIso6391(value: {
        iso_639_1: string;
    }): Language;
    static fromIso6392(value: {
        iso_639_2: string;
    }): Language;
    static fromIso6393(value: {
        iso_639_3: string;
    }): Language;
    toLocale(value: {
        country: string;
    }): ILocale;
}

declare class Languages implements ILanguages {
    private readonly values;
    private constructor();
    static empty(): ILanguages;
    add(language: ILanguage): ILanguages;
    remove(language: ILanguage): ILanguages;
    toArray(): ILanguage[];
}

declare class Country implements ICountry {
    readonly name: string;
    readonly machine_name: string;
    readonly alpha2: string;
    readonly alpha3: string;
    readonly numeric: string;
    readonly direct_dialing_code: string;
    private constructor();
    static new(value: {
        code: string;
    }): Country;
    static fromIso31661Alpha2(value: {
        alpha2: string;
    }): Country;
    static fromIso31661Alpha3(value: {
        alpha3: string;
    }): Country;
    static fromIso31661Numeric(value: {
        numeric: number | string;
    }): Country;
    languages(): ILanguages;
    borders(): ICountries;
    toLocale(value: {
        language: string;
    }): ILocale;
}

declare class Countries implements ICountries {
    private readonly values;
    private constructor();
    static new(value: {
        countries: ICountry[];
    }): Countries;
    static empty(): Countries;
    static fromAlpha2(value: {
        alpha2: string[];
    }): Countries;
    static fromAlpha3(value: {
        alpha3: string[];
    }): Countries;
    static fromNumeric(value: {
        numeric: string[];
    }): Countries;
    static benelux(): Countries;
    add(country: ICountry): ICountries;
    remove(country: ICountry): ICountries;
    removeBy(by: CountryLookUp, identifiers: string[] | string): ICountries;
    lookUpsBy(by: CountryLookUp, identifiers: string[]): ICountries;
    lookUpBy(by: CountryLookUp, identifiers: string): ICountry | undefined;
    toArray(): ICountry[];
    get size(): number;
}

declare class Continent implements IContinent {
    readonly name: string;
    readonly machine_name: string;
    readonly alpha2: string;
    private constructor();
    static new(value: {
        alpha2: string;
    }): Continent;
    static africa(): Continent;
    static antarctica(): Continent;
    static asia(): Continent;
    static europe(): Continent;
    static northAmerica(): Continent;
    static oceania(): Continent;
    static southAmerica(): Continent;
    countries(): ICountries;
}

interface LocaleProviderProps extends PropsWithChildren {
    locale: string;
}
declare const LocaleProvider: (props: LocaleProviderProps) => react_jsx_runtime.JSX.Element;

export { Continent, Countries, Country, CountryLookUp, type IContinent, type ICountries, type ICountry, type ILanguage, type ILanguages, type ILocale, type IRestcountriesData, type IRestcountriesIdd, type ISimplelocalizeCountry, type ISimplelocalizeData, type ISimplelocalizeLanguage, Language, Languages, Locale, LocaleProvider, SystemLocale, createLocale };
