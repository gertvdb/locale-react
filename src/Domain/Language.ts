import { IDatasetEntry, ILanguage, ILocale, LanguageCodeFormat } from "@/Types";
import { toMachineName } from "@/Utils/toMachineName";

import dataset from "@/Dataset/dataset.json";
import { Locale } from "@/Domain/Locale";

const entries = dataset as IDatasetEntry[];

export class Language implements ILanguage {
  public readonly name: string;
  public readonly machine_name: string;
  public readonly alpha2: string;
  public readonly alpha3: string;

  private constructor(value: string, format: LanguageCodeFormat) {
    let entry: IDatasetEntry | undefined;

    if (format === LanguageCodeFormat.ALPHA2) {
      entry = entries.find(
        (d) => d.language.iso_639_1.toLowerCase() === value.toLowerCase(),
      );
    } else {
      // alpha3: prefer iso_639_3, fall back to iso_639_2
      entry =
        entries.find(
          (d) =>
            d.language.iso_639_3 !== "" &&
            d.language.iso_639_3.toLowerCase() === value.toLowerCase(),
        ) ??
        entries.find(
          (d) => d.language.iso_639_2.toLowerCase() === value.toLowerCase(),
        );
    }

    if (!entry) {
      throw new Error(`Unknown language: ${value}`);
    }

    this.alpha2 = entry.language.iso_639_1;
    this.alpha3 = entry.language.iso_639_3 !== "" ? entry.language.iso_639_3 : entry.language.iso_639_2;
    this.name = entry.language.name;
    this.machine_name = toMachineName(entry.language.name);
  }

  public static new(value: { code: string }): Language {
    return new Language(value.code, LanguageCodeFormat.ALPHA2);
  }

  public static from(value: {
    code: string;
    format?: LanguageCodeFormat;
  }): Language {
    return new Language(value.code, value.format ?? LanguageCodeFormat.ALPHA2);
  }

  public toLocale(value: { country: string }): ILocale {
    return Locale.new({
      language: this.alpha2,
      country: value.country,
    });
  }
}
