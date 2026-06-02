import {ILanguage, ILanguages} from "@/Types";

export class Languages implements ILanguages {
    private readonly values: ILanguage[];

    private constructor(values: ILanguage[]) {
        // Private constructor to ensure immutability
        this.values = values;
    }

    static empty(): ILanguages {
        return new Languages([]);
    }

    add(language: ILanguage): ILanguages {
        const exists = this.toArray().find(
            (item) => item.iso_639_1.toLowerCase() === language.iso_639_1.toLowerCase(),
        );

        if (exists) {
            return this; // Return the current collection if the country already exists
        }

        const newCollection = [...this.values, language];
        return new Languages(newCollection);
    }

    remove(language: ILanguage): ILanguages {
        const newCollection = this.values.filter(
            (item) => item.iso_639_1.toLowerCase() !== language.iso_639_1.toLowerCase(),
        );

        return new Languages(newCollection);
    }

    toArray(): ILanguage[] {
        return this.values;
    }
}