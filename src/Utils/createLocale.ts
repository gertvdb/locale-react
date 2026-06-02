import type {
  ILocale,
} from "@/Types";
import { Locale } from "@/Domain/Locale";

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
export function createLocale(value: {
  languageOrLocale: string;
  country?: string;
}): ILocale {

  if (value.country) {
    return Locale.new({
      language: value.languageOrLocale,
      country: value.country
    });
  }

  return Locale.fromLocale({
    locale: value.languageOrLocale
  });
}
