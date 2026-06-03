import {ILocale, LocaleOverrides} from "@/Types";
import { Locale } from "@/Domain/Locale";
import { normalizeLocale } from "@/Utils/normalizeLocale";


/**
 * Resolves a locale to the best match within a list of supported locale strings.
 *
 * Resolution order:
 * 1. Exact match in supported list
 * 2. Exact override key match (e.g. "en-GB": "nl-BE")
 * 3. Wildcard override key match using * syntax (e.g. "en-*": "nl-BE" matches any en-* locale)
 * 4. First supported locale with the same language (e.g. "nl-DE" → "nl-NL")
 * 5. Catch-all override "*" (required — guarantees a locale is always returned)
 */
export function resolveLocale(value : {
  detected: ILocale,
  supported: string[],
  overrides: LocaleOverrides,
}): ILocale {

  const { detected, supported, overrides } = value;

  const key = detected.locale;
  const normalizedSupported = supported.map((s) => normalizeLocale({ locale: s }));
  const normalizedOverrides = Object.fromEntries(
    Object.entries(overrides).map(([k, v]) => [
      k.includes("*") ? k : normalizeLocale({ locale: k }),
      normalizeLocale({ locale: v }),
    ]),
  ) as LocaleOverrides;

  if (normalizedSupported.includes(key)) {
    return detected;
  }

  const overridden = normalizedOverrides[key];
  if (overridden) {
    return Locale.fromLocale({ locale: overridden });
  }

  const wildcardMatch = Object.entries(normalizedOverrides).find(([pattern]) => {
    if (pattern === "*" || !pattern.includes("*")) return false;
    const regex = new RegExp("^" + pattern.replace(/\*/g, ".+") + "$", "i");
    return regex.test(key);
  });

  if (wildcardMatch) {
    return Locale.fromLocale({ locale: wildcardMatch[1] });
  }

  const byLanguage = normalizedSupported.find((s) =>
    s.toLowerCase().startsWith(detected.language_code.toLowerCase() + "-"),
  );

  if (byLanguage) {
    return Locale.fromLocale({ locale: byLanguage });
  }

  return Locale.fromLocale({ locale: normalizedOverrides["*"] });
}
