interface ILocale {
    locale: ILocaleString;
    language: ILanguageString;
    region: IRegionString | undefined;
}
/**
 * Locale string in the format "language-region" (e.g., "nl-be").
 */
type ILocaleString = `${ILanguageString}-${IRegionString}` | (string & {});
/**
 * Region identifier (e.g., "be", "fr").
 */
type IRegionString = (string & {}) | "BE" | "NL" | "FR" | "DE" | "IT" | "ES" | "PT" | "PL" | "CZ" | "SK" | "AT" | "CH" | "LU" | "LI" | "DK" | "SE" | "NO" | "FI" | "IS" | "IE" | "GB" | "EE" | "LV" | "LT" | "HU" | "RO" | "BG" | "GR" | "HR" | "SI" | "RS" | "BA" | "ME" | "MK" | "AL" | "UA" | "MD" | "TR";
/**
 * Language identifier (e.g., "nl", "fr").
 */
type ILanguageString = (string & {}) | "sq" | "de" | "en" | "fr" | "nl" | "it" | "es" | "pt" | "pl" | "cs" | "sk" | "sl" | "hr" | "sr" | "bs" | "mk" | "bg" | "ro" | "hu" | "el" | "sv" | "da" | "no" | "fi" | "is" | "et" | "lv" | "lt" | "ga" | "mt" | "cy" | "eu" | "ca" | "gl";

declare const SystemLocale: ILocale;

declare function createLocale(value: {
    languageOrLocale: ILocaleString | ILanguageString;
    region?: IRegionString;
}): ILocale;

export { type ILanguageString, type ILocale, type ILocaleString, type IRegionString, SystemLocale, createLocale };
