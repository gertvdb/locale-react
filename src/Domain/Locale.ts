import type {
  ILanguageString,
  ILocale,
  ILocaleString,
  IRegionString,
} from "@/Types";
import { normalizeLocale } from "@/Utils/normalizeLocale";

export class Locale implements ILocale {
  public readonly locale: ILocaleString;
  public readonly language: ILanguageString;
  public readonly region: IRegionString | undefined;

  private constructor(
    languageOrLocale: ILocaleString | ILanguageString,
    region?: IRegionString,
  ) {
    const locale = normalizeLocale({
      locale: languageOrLocale + (region ? "-" + region : ""),
    });
    try {
      const intlLocale = new Intl.Locale(locale);
      this.locale = locale;
      this.language = intlLocale.language;
      this.region = intlLocale.region;
    } catch (e: unknown) {
      throw new Error("Invalid ILocale", { cause: e });
    }
  }

  public static new(value: {
    languageOrLocale: ILocaleString | ILanguageString;
    region?: IRegionString;
  }) {
    const { languageOrLocale, region } = value;
    return new Locale(languageOrLocale, region);
  }
}
