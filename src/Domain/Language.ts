import { ILanguage, ILocale, ISimplelocalizeData } from "@/Types";
import { toMachineName } from "@/Utils/toMachineName";

// Dataset : https://cdn.simplelocalize.io/public/v1/locales
import simplelocalize from "@/data-sets/simplelocalize.io.json";
import { Locale } from "@/Domain/Locale";

export class Language implements ILanguage {
  public readonly name: string;
  public readonly machine_name: string;
  public readonly iso_639_1: string;
  public readonly iso_639_2: string;
  public readonly iso_639_3: string;

  private constructor(
    value: string,
    field: "iso_639_1" | "iso_639_2" | "iso_639_3",
  ) {
    const entry = (simplelocalize as ISimplelocalizeData[]).find(
      (d) => d.language[field].toLowerCase() === value.toLowerCase(),
    );

    if (!entry) {
      throw new Error(`Unknown language: ${value}`);
    }

    this.iso_639_1 = entry.language.iso_639_1;
    this.iso_639_2 = entry.language.iso_639_2;
    this.iso_639_3 = entry.language.iso_639_3;
    this.name = entry.language.name;
    this.machine_name = toMachineName(entry.language.name);
  }

  public static new(value: { iso_639_1: string }): Language {
    return new Language(value.iso_639_1, "iso_639_1");
  }

  public static fromIso6391(value: { iso_639_1: string }): Language {
    return new Language(value.iso_639_1, "iso_639_1");
  }

  public static fromIso6392(value: { iso_639_2: string }): Language {
    return new Language(value.iso_639_2, "iso_639_2");
  }

  public static fromIso6393(value: { iso_639_3: string }): Language {
    return new Language(value.iso_639_3, "iso_639_3");
  }

  public toLocale(value: { country: string }): ILocale {
    return Locale.new({
      language: this.iso_639_1,
      country: value.country,
    });
  }
}
