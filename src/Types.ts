export interface ILocale {
  locale: ILocaleString;
  language: ILanguageString;
  region: IRegionString | undefined;
}

/**
 * Locale string in the format "language-region" (e.g., "nl-be").
 */
export type ILocaleString =
  | `${ILanguageString}-${IRegionString}`
  | (string & {});

/**
 * Region identifier (e.g., "be", "fr").
 */
export type IRegionString =
  | (string & {})
  | "BE" // Belgium
  | "NL" // Netherlands
  | "FR" // France
  | "DE" // Germany
  | "IT" // Italy
  | "ES" // Spain
  | "PT" // Portugal
  | "PL" // Poland
  | "CZ" // Czech Republic
  | "SK" // Slovakia
  | "AT" // Austria
  | "CH" // Switzerland
  | "LU" // Luxembourg
  | "LI" // Liechtenstein
  | "DK" // Denmark
  | "SE" // Sweden
  | "NO" // Norway
  | "FI" // Finland
  | "IS" // Iceland
  | "IE" // Ireland
  | "GB" // United Kingdom
  | "EE" // Estonia
  | "LV" // Latvia
  | "LT" // Lithuania
  | "HU" // Hungary
  | "RO" // Romania
  | "BG" // Bulgaria
  | "GR" // Greece
  | "HR" // Croatia
  | "SI" // Slovenia
  | "RS" // Serbia
  | "BA" // Bosnia and Herzegovina
  | "ME" // Montenegro
  | "MK" // North Macedonia
  | "AL" // Albania
  | "UA" // Ukraine
  | "MD" // Moldova
  | "TR"; // Turkey

/**
 * Language identifier (e.g., "nl", "fr").
 */
export type ILanguageString =
  | (string & {})
  | "sq" // Albanian
  | "de" // German
  | "en" // English
  | "fr" // French
  | "nl" // Dutch
  | "it" // Italian
  | "es" // Spanish
  | "pt" // Portuguese
  | "pl" // Polish
  | "cs" // Czech
  | "sk" // Slovak
  | "sl" // Slovenian
  | "hr" // Croatian
  | "sr" // Serbian
  | "bs" // Bosnian
  | "mk" // Macedonian
  | "bg" // Bulgarian
  | "ro" // Romanian
  | "hu" // Hungarian
  | "el" // Greek
  | "sv" // Swedish
  | "da" // Danish
  | "no" // Norwegian
  | "fi" // Finnish
  | "is" // Icelandic
  | "et" // Estonian
  | "lv" // Latvian
  | "lt" // Lithuanian
  | "ga" // Irish
  | "mt" // Maltese
  | "cy" // Welsh
  | "eu" // Basque
  | "ca" // Catalan
  | "gl"; // Galician
