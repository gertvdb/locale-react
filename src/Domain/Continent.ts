import { IContinent, ICountries, IRestcountriesData } from "@/Types";
import { toMachineName } from "@/Utils/toMachineName";
import restcountries from "@/data-sets/restcountries.com.json";
import { Country } from "@/Domain/Country";
import { Countries } from "@/Domain/Countries";

export const CONTINENT_MAP: Record<string, string> = {
  AF: "Africa",
  AN: "Antarctica",
  AS: "Asia",
  EU: "Europe",
  NA: "North America",
  OC: "Oceania",
  SA: "South America",
};

export class Continent implements IContinent {
  public readonly name: string;

  public readonly machine_name: string;
  public readonly alpha2: string;

  private constructor(name: string, alpha2: string) {
    this.name = name;
    this.alpha2 = alpha2;
    this.machine_name = toMachineName(name);
  }

  public static new(value: { alpha2: string }): Continent {
    const name = CONTINENT_MAP[value.alpha2.toUpperCase()];
    if (!name) {
      throw new Error(`Unknown continent code: ${value.alpha2}`);
    }
    return new Continent(name, value.alpha2.toUpperCase());
  }

  public static africa(): Continent {
    return Continent.new({ alpha2: "AF" });
  }

  public static antarctica(): Continent {
    return Continent.new({ alpha2: "AN" });
  }

  public static asia(): Continent {
    return Continent.new({ alpha2: "AS" });
  }

  public static europe(): Continent {
    return Continent.new({ alpha2: "EU" });
  }

  public static northAmerica(): Continent {
    return Continent.new({ alpha2: "NA" });
  }

  public static oceania(): Continent {
    return Continent.new({ alpha2: "OC" });
  }

  public static southAmerica(): Continent {
    return Continent.new({ alpha2: "SA" });
  }

  public countries(): ICountries {
    let result: ICountries = Countries.empty();
    for (const d of restcountries as IRestcountriesData[]) {
      if (d.continents.includes(this.name)) {
        result = result.add(Country.fromIso31661Alpha2({ alpha2: d.cca2 }));
      }
    }
    return result;
  }
}
