import {
    ICountry,
    IRestcountriesData, ISimplelocalizeData, ISimplelocalizeCountry, ILocale, ILanguage, IContinent, ILanguages,
    ICountries,
} from "@/Types";
import { toMachineName } from "@/Utils/toMachineName";

// Dataset : https://cdn.simplelocalize.io/public/v1/locales
import simplelocalize from "@/data-sets/simplelocalize.io.json";

// Dataset : https://restcountries.com/v4/all?fields=idd,cca2,continents
import restcountries from "@/data-sets/restcountries.com.json";
import {Locale} from "@/Domain/Locale";
import {Language} from "@/Domain/Language";
import {Languages} from "@/Domain/Languages";
import {Countries} from "@/Domain/Countries";

export class Country implements ICountry {
    public readonly name: string;

    public readonly machine_name: string;

    public readonly alpha2: string;
    public readonly alpha3: string;
    public readonly numeric: string;

    public readonly direct_dialing_code: string;

    private constructor(value: string, field: "iso_3166_1_numeric" | "iso_3166_1_alpha2" | "iso_3166_1_alpha3") {
        const entry = (simplelocalize as ISimplelocalizeData[]).find(
            (d) => String((d.country as ISimplelocalizeCountry)[field]).toLowerCase() === value.toLowerCase()
        );

        if (!entry) {
            throw new Error(`Unknown country: ${value}`);
        }

        const c = entry.country;
        this.name = c.name;
        this.machine_name = toMachineName(c.name);
        this.alpha2 = c.iso_3166_1_alpha2;
        this.alpha3 = c.iso_3166_1_alpha3;
        this.numeric = String(c.iso_3166_1_numeric).padStart(3, "0");

        const rc = (restcountries as IRestcountriesData[]).find(
            (d) => d.cca2.toLowerCase() === this.alpha2.toLowerCase()
        );
        const idd = rc?.idd;
        this.direct_dialing_code = idd
            ? idd.suffixes?.length === 1
                ? idd.root + idd.suffixes[0]
                : idd.root
            : "";
    }

    public static new(value: { code: string }): Country {
        return new Country(value.code, "iso_3166_1_alpha2");
    }

    public static fromIso31661Alpha2(value: { alpha2: string }): Country {
        return new Country(value.alpha2, "iso_3166_1_alpha2");
    }

    public static fromIso31661Alpha3(value: { alpha3: string }): Country {
        return new Country(value.alpha3, "iso_3166_1_alpha3");
    }

    public static fromIso31661Numeric(value: { numeric: number | string }): Country {
        const numeric = typeof value.numeric === "number"
            ? String(value.numeric).padStart(3, "0")
            : value.numeric;
        return new Country(numeric, "iso_3166_1_numeric");
    }

    public languages(): ILanguages {
        const entry = (simplelocalize as ISimplelocalizeData[]).find(
            (d) => d.country.iso_3166_1_alpha2.toLowerCase() === this.alpha2.toLowerCase()
        );

        let languages : ILanguages = Languages.empty();
        if (!entry) {
            return languages;
        }

        entry.country.languages.map((l) => Language.new({ iso_639_1: l.iso_639_1 })).forEach((l) => {
            languages = languages.add(l);
        })

        return languages;
    }

    public borders(): ICountries {
        const entry = (simplelocalize as ISimplelocalizeData[]).find(
            (d) => d.country.iso_3166_1_alpha2.toLowerCase() === this.alpha2.toLowerCase()
        );

        let borders: ICountries = Countries.empty();
        if (!entry) {
            return borders;
        }

        entry.country.borders.map((b) => Country.fromIso31661Alpha2({ alpha2: b })).forEach((c) => {
            borders = borders.add(c);
        })

        return borders;
    }

    public toLocale(value: { language: string }): ILocale {
        return Locale.new({
            language: value.language,
            country: this.alpha2,
        });
    }
}
