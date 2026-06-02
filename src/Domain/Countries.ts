import {CountryLookUp, ICountries, ICountry} from "@/Types";
import {Country} from "@/Domain/Country";

export class Countries implements ICountries {

    private readonly values: ICountry[];

    private constructor(values: ICountry[]) {
        this.values = values;
    }

    public static new(value: { countries: ICountry[] }): Countries {
        return new Countries(value.countries);
    }

    public static empty(): Countries {
        return new Countries([]);
    }

    public static fromAlpha2(value: { alpha2: string[] }): Countries {
        return new Countries(value.alpha2.map(c => Country.fromIso31661Alpha2({alpha2: c})));
    }

    public static fromAlpha3(value: { alpha3: string[] }): Countries {
        return new Countries(value.alpha3.map(c => Country.fromIso31661Alpha3({alpha3: c})));
    }

    public static fromNumeric(value: { numeric: string[] }): Countries {
        return new Countries(value.numeric.map(c => Country.fromIso31661Numeric({numeric: c})));
    }

    public static benelux() : Countries {
        return Countries.fromAlpha2({alpha2: ["BE", "NL", 'LU']});
    }

    add(country: ICountry): ICountries {
        const exists = this.toArray().find(
            (item) => item.alpha3.toLowerCase() === country.alpha3.toLowerCase(),
        );

        if (exists) {
            return this; // Return the current collection if the country already exists
        }

        const newCollection = [...this.values, country];
        return new Countries(newCollection);
    }

    remove(country: ICountry): ICountries {
        const newCollection = this.values.filter(
            (item) => item.alpha3.toLowerCase() !== country.alpha3.toLowerCase(),
        );

        return new Countries(newCollection);
    }

    removeBy(
        by: CountryLookUp,
        identifiers: string[] | string,
    ): ICountries {
        if (Array.isArray(identifiers)) {
            const toRemove = this.lookUpsBy(by, identifiers);
            const toRemoveArray = toRemove.toArray().map((country) => {
                return country;
            });

            let coll: ICountries = Countries.empty();
            toRemoveArray.forEach((country) => {
                coll = this.remove(country);
            });
            return coll;
        }

        const toRemove = this.lookUpBy(by, identifiers);
        if (toRemove) {
            return this.remove(toRemove);
        }

        return this;
    }

    lookUpsBy(
        by: CountryLookUp,
        identifiers: string[],
    ): ICountries {
        const normalizedIdentifiers = identifiers.map((identifier) => {
            return identifier.toLowerCase();
        });

        const lookup = this.toArray()
            .map((country) => {
                switch (by) {
                    case CountryLookUp.ALPHA2:
                        return normalizedIdentifiers.includes(country.alpha2.toLowerCase())
                            ? country
                            : null;
                    case CountryLookUp.ALPHA3:
                        return normalizedIdentifiers.includes(country.alpha3.toLowerCase())
                            ? country
                            : null;
                    case CountryLookUp.NUMERIC:
                        return normalizedIdentifiers.includes(country.numeric.toLowerCase())
                            ? country
                            : null;
                }
            })
            .filter(Boolean);

        let collection: ICountries = Countries.empty();
        lookup.forEach((item) => {
            if (item) {
                collection = collection.add(item);
            }
        });

        return collection;
    }

    lookUpBy(
        by: CountryLookUp,
        identifiers: string,
    ): ICountry | undefined {
        switch (by) {
            case CountryLookUp.ALPHA2:
                return this.toArray().find((country) => {
                    return country.alpha2.toLowerCase() === identifiers.toLowerCase();
                });
            case CountryLookUp.ALPHA3:
                return this.toArray().find((country) => {
                    return country.alpha3.toLowerCase() === identifiers.toLowerCase();
                });
            case CountryLookUp.NUMERIC:
                return this.toArray().find((country) => {
                    return country.numeric.toLowerCase() === identifiers.toLowerCase();
                });
        }
    }

    toArray(): ICountry[] {
        return this.values;
    }

    get size(): number {
        return this.values.length;
    }
}