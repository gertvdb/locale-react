import type { ILocale, LocalePolicy } from "@/Types";
import { Locale } from "@/Domain/Locale";

/**
 * Creates an {@link ILocale} from a language code, locale string, or language + region pair.
 *
 * @param value.languageOrLocale - A language code (e.g. `"en"`) or locale string (e.g. `"en-US"`).
 * @param value.country - Optional region code (e.g. `"US"`). Combined with `languageOrLocale` when provided.
 * @param value.policy - Matching policy. Accepts a uniform {@link MatchingPolicy} or a per-language
 *   map `{ default: MatchingPolicy, languages: Record<string, MatchingPolicy> }`.
 * @returns A new {@link ILocale} instance.
 * @throws If the resulting locale string is invalid.
 *
 * @example
 * createLocale({ languageOrLocale: "en-US" });
 * createLocale({ languageOrLocale: "en", country: "US" });
 * createLocale({ languageOrLocale: "en", country: "BE", policy: MatchingPolicy.LOOSE });
 * createLocale({
 *   languageOrLocale: "en",
 *   country: "BE",
 *   policy: { default: MatchingPolicy.STRICT, languages: { en: MatchingPolicy.LOOSE } },
 * });
 */
export function createLocale(value: {
  languageOrLocale: string;
  country?: string;
  policy?: LocalePolicy;
}): ILocale {
  if (value.country) {
    return Locale.new({
      language: value.languageOrLocale,
      country: value.country,
      policy: value.policy,
    });
  }

  return Locale.fromLocale({
    locale: value.languageOrLocale,
    policy: value.policy,
  });
}
