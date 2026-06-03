import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── Source types ────────────────────────────────────────────────────────────

interface SimplelocalizeLanguage {
    name: string;
    name_local: string;
    iso_639_1: string;
    iso_639_2: string;
    iso_639_3: string;
}

interface SimplelocalizeCountry {
    name: string;
    name_local: string;
    iso_3166_1_alpha2: string;
    iso_3166_1_alpha3: string;
    iso_3166_1_numeric: number;
    continent: string;
    region: string;
    capital_name: string;
    currency_code: string;
    currency_symbol: string;
    flag: string;
    timezones: string[];
    borders: string[];
    languages: SimplelocalizeLanguage[];
}

interface SimplelocalizeEntry {
    locale: string;
    language: SimplelocalizeLanguage;
    country: SimplelocalizeCountry;
}

interface RestcountriesEntry {
    cca2: string;
    idd: { root: string; suffixes: string[] };
    continents: string[];
}

// ─── Output types ────────────────────────────────────────────────────────────

interface DatasetLanguage {
    name: string;
    name_local: string;
    iso_639_1: string;
    iso_639_2: string;
    iso_639_3: string;
}

interface DatasetCountry {
    name: string;
    name_local: string;
    iso_3166_1_alpha2: string;
    iso_3166_1_alpha3: string;
    iso_3166_1_numeric: number;
    continent: string;
    region: string;
    capital: string;
    direct_dialing_code: string;
    currency_code: string;
    currency_symbol: string;
    flag: string;
    timezones: string[];
    borders: string[];
    languages: DatasetLanguage[];
}

export interface DatasetEntry {
    locale: string;
    language: DatasetLanguage;
    country: DatasetCountry;
}

// ─── Field selectors ─────────────────────────────────────────────────────────

function buildLanguage(src: SimplelocalizeLanguage): DatasetLanguage {
    return {
        name:       src.name,
        name_local: src.name_local,
        iso_639_1:  src.iso_639_1,
        iso_639_2:  src.iso_639_2,
        iso_639_3:  src.iso_639_3,
    };
}

function buildDirectDialingCode(idd: RestcountriesEntry["idd"]): string {
    if (!idd?.root) return "";
    if (!idd.suffixes?.length) return idd.root;
    if (idd.suffixes.length === 1) return `${idd.root}${idd.suffixes[0]}`;
    return idd.root;
}

function buildCountry(
    src: SimplelocalizeCountry,
    restcountries: Map<string, RestcountriesEntry>,
): DatasetCountry {
    const rest = restcountries.get(src.iso_3166_1_alpha2);

    return {
        name:                 src.name,
        name_local:           src.name_local,
        iso_3166_1_alpha2:    src.iso_3166_1_alpha2,
        iso_3166_1_alpha3:    src.iso_3166_1_alpha3,
        iso_3166_1_numeric:   src.iso_3166_1_numeric,
        continent:            rest?.continents?.[0] ?? src.continent,
        region:               src.region,
        capital:              src.capital_name,
        direct_dialing_code:  rest ? buildDirectDialingCode(rest.idd) : "",
        currency_code:        src.currency_code,
        currency_symbol:      src.currency_symbol,
        flag:                 src.flag,
        timezones:            src.timezones,
        borders:              src.borders,
        languages:            src.languages.map(buildLanguage),
    };
}

// ─── Build ───────────────────────────────────────────────────────────────────

function build(): DatasetEntry[] {
    const simplelocalizeRaw = readFileSync(
        resolve(__dirname, "simplelocalize.io.json"),
        "utf-8",
    );
    const restcountriesRaw = readFileSync(
        resolve(__dirname, "restcountries.com.json"),
        "utf-8",
    );

    const simplelocalize: SimplelocalizeEntry[] = JSON.parse(simplelocalizeRaw);
    const restcountriesArr: RestcountriesEntry[] = JSON.parse(restcountriesRaw);

    const restcountries = new Map(
        restcountriesArr.map((r) => [r.cca2, r]),
    );

    return simplelocalize.map((entry) => ({
        locale:   entry.locale,
        language: buildLanguage(entry.language),
        country:  buildCountry(entry.country, restcountries),
    }));
}

// ─── Write ───────────────────────────────────────────────────────────────────

const dataset = build();

writeFileSync(
    resolve(__dirname, "../src/Dataset/dataset.json"),
    JSON.stringify(dataset, null, 2),
    "utf-8",
);

console.log(`Built dataset with ${dataset.length} entries → src/Datasets/dataset.json`);
