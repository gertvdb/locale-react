import {IContinent, ICountry, ISimplelocalizeData} from "@/Types";
import {toMachineName} from "@/Utils/toMachineName";
import simplelocalize from "@/data-sets/simplelocalize.io.json";
import {Country} from "@/Domain/Country";

export const CONTINENT_MAP: Record<string, string> = {
    AF: 'Africa',
    AN: 'Antarctica',
    AS: 'Asia',
    EU: 'Europe',
    NA: 'North America',
    OC: 'Oceania',
    SA: 'South America',
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
        return Continent.new( {alpha2: 'AF'});
    }

    public static antarctica(): Continent {
        return Continent.new( {alpha2: 'AN'});
    }

    public static asia(): Continent {
        return Continent.new( {alpha2: 'AS'});
    }

    public static europe(): Continent {
        return Continent.new( {alpha2: 'EU'});
    }

    public static northAmerica(): Continent {
        return Continent.new( {alpha2: 'NA'});
    }

    public static oceania(): Continent {
        return Continent.new( {alpha2: 'OC'});
    }

    public static southAmerica(): Continent {
        return Continent.new( {alpha2: 'SA'});
    }

    public countries(): ICountry[] {
        const seen = new Set<string>();
        const result: ICountry[] = [];
        for (const d of simplelocalize as ISimplelocalizeData[]) {
            const alpha2 = d.country.iso_3166_1_alpha2;
            if (d.country.continent === this.name && !seen.has(alpha2)) {
                seen.add(alpha2);
                result.push(Country.fromIso31661Alpha2({ alpha2 }));
            }
        }
        return result;
    }
}

