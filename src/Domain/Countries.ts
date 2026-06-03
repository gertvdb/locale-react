import { CountryCodeFormat, ICountries, ICountry } from "@/Types";
import { Country } from "@/Domain/Country";

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
    return new Countries(
      value.alpha2.map((c) => Country.from({ code: c })),
    );
  }

  public static fromAlpha3(value: { alpha3: string[] }): Countries {
    return new Countries(
      value.alpha3.map((c) =>
        Country.from({ code: c, format: CountryCodeFormat.ALPHA3 }),
      ),
    );
  }

  public static fromNumeric(value: { numeric: string[] }): Countries {
    return new Countries(
      value.numeric.map((c) =>
        Country.from({ code: c, format: CountryCodeFormat.NUMERIC }),
      ),
    );
  }

  public static benelux(): Countries {
    return Countries.fromAlpha2({ alpha2: ["BE", "NL", "LU"] });
  }

  add(country: ICountry): ICountries {
    const exists = this.toArray().find(
      (item) => item.alpha3.toLowerCase() === country.alpha3.toLowerCase(),
    );

    if (exists) {
      return this;
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

  removeBy(by: CountryCodeFormat, identifiers: string[] | string): ICountries {
    if (Array.isArray(identifiers)) {
      const toRemove = this.lookUpsBy(by, identifiers);
      const toRemoveArray = toRemove.toArray();

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

  lookUpsBy(by: CountryCodeFormat, identifiers: string[]): ICountries {
    const normalizedIdentifiers = identifiers.map((id) => id.toLowerCase());

    const lookup = this.toArray()
      .map((country) => {
        switch (by) {
          case CountryCodeFormat.ALPHA2:
            return normalizedIdentifiers.includes(country.alpha2.toLowerCase())
              ? country
              : null;
          case CountryCodeFormat.ALPHA3:
            return normalizedIdentifiers.includes(country.alpha3.toLowerCase())
              ? country
              : null;
          case CountryCodeFormat.NUMERIC:
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

  lookUpBy(by: CountryCodeFormat, identifiers: string): ICountry | undefined {
    switch (by) {
      case CountryCodeFormat.ALPHA2:
        return this.toArray().find(
          (country) =>
            country.alpha2.toLowerCase() === identifiers.toLowerCase(),
        );
      case CountryCodeFormat.ALPHA3:
        return this.toArray().find(
          (country) =>
            country.alpha3.toLowerCase() === identifiers.toLowerCase(),
        );
      case CountryCodeFormat.NUMERIC:
        return this.toArray().find(
          (country) =>
            country.numeric.toLowerCase() === identifiers.toLowerCase(),
        );
    }
  }

  toArray(): ICountry[] {
    return this.values;
  }

  get size(): number {
    return this.values.length;
  }
}
