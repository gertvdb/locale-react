import type { ILocaleString } from "@/Types";

export function normalizeLocale(value: {
  locale: ILocaleString;
}): ILocaleString {
  const { locale } = value;

  const cleaned = locale.trim().replace("_", "-");

  const [language, region] = cleaned.split("-");

  if (!language) {
    throw new Error(`Invalid locale: ${locale}`);
  }

  if (!region) {
    return language.toLowerCase() as ILocaleString;
  }

  return `${language.toLowerCase()}-${region.toUpperCase()}` as ILocaleString;
}
