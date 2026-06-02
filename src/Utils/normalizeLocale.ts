/**
 * Normalizes a locale string to the format `language` or `language-REGION`.
 *
 * Trims whitespace, replaces underscores with hyphens, lowercases the language,
 * and uppercases the region.
 *
 * @param value.locale - The locale string to normalize.
 * @returns The normalized locale string.
 * @throws If the locale string has no language part.
 *
 * @example
 * normalizeLocale({ locale: "EN_us" }); // "en-US"
 * normalizeLocale({ locale: "FR-FR" });    // "fr-FR"
 */
export function normalizeLocale(value: { locale: string }): string {
  const { locale } = value;

  const cleaned = locale.trim().replace("_", "-");

  const [language, country] = cleaned.split("-");

  if (!language) {
    throw new Error(`Invalid language: ${locale}`);
  }

  if (!country) {
    throw new Error(`Invalid country: ${locale}`);
  }

  return `${language.toLowerCase()}-${country.toUpperCase()}`;
}
