# Tacky Locale

A lightweight locale management library for React and TypeScript. It provides a structured way to handle locales, languages, countries, and continents integrating with the native `Intl` API and built-in datasets from [simplelocalize.io](https://simplelocalize.io) and [restcountries.com](https://restcountries.com).

## Features

- **Type-safe domain objects**: Robust TypeScript interfaces for locales, languages, countries, and continents.
- **Normalization**: Automatically handles different locale formats (e.g., `nl_be` becomes `nl-BE`).
- **Matching policies**: Strict (exact dataset combination) or loose (language and country validated independently).
- **Locale resolution**: Resolve a detected locale to the best match within a supported list, with override rules.
- **System Locale**: Easily access the current system's locale.
- **React integration**: `LocaleProvider` and `useLocale` hook for React apps.
- **Rich country data**: ISO 3166-1 codes, direct dialing codes, borders, and spoken languages.
- **Rich language data**: Alpha-2 and alpha-3 codes backed by the simplelocalize dataset.
- **Continent support**: Group and filter countries by continent.

## Installation

```bash
pnpm add @tacky-org/locale
```

**Peer dependencies**: React >= 19

## Usage

### System locale

`SystemLocale` reflects the OS/runtime locale (used for date and number formatting). It is always resolved with strict matching — the locale must exist as a combination in the dataset.

```typescript
import { SystemLocale } from '@tacky-org/locale';

console.log(SystemLocale.locale);        // e.g., "en-US"
console.log(SystemLocale.language_code); // "en"
console.log(SystemLocale.country_code);  // "US"
```

`SystemLocale` exposes the full `ILocale` interface: `language()`, `languages()`, `country()`, `toIntlLocale()`.

### Creating a locale

```typescript
import { createLocale } from '@tacky-org/locale';

// From a locale string
const locale = createLocale({ languageOrLocale: 'nl-BE' });

// From language + country separately
const locale2 = createLocale({ languageOrLocale: 'nl', country: 'BE' });

console.log(locale.locale);        // "nl-BE"
console.log(locale.language_code); // "nl"
console.log(locale.country_code);  // "BE"
console.log(locale.language());    // ILanguage
console.log(locale.languages());   // ILanguages — country languages + locale language if not already present
console.log(locale.country());     // ICountry
```

### Matching policy

By default, `createLocale` uses **strict** matching: the language-country combination must exist as an entry in the dataset. With **loose** matching, the language and country are each validated independently — they must each appear somewhere in the dataset, but not necessarily together.

The policy can be uniform or per-language:

```typescript
import { createLocale, MatchingPolicy } from '@tacky-org/locale';

// Strict (default) — nl-BE must exist in the dataset
createLocale({ languageOrLocale: 'nl', country: 'BE' });
createLocale({ languageOrLocale: 'nl', country: 'BE', policy: MatchingPolicy.STRICT });

// Loose — en and BE must each exist in the dataset, but not as a combination
createLocale({ languageOrLocale: 'en', country: 'BE', policy: MatchingPolicy.LOOSE });

// Rule map — * wildcards and [a,b] groups, most specific pattern wins
createLocale({
  languageOrLocale: 'en',
  country: 'BE',
  policy: {
    default: MatchingPolicy.STRICT,
    locales: {
      'en-[BE,NL]': MatchingPolicy.LOOSE,  // en loose only in BE and NL
      'nl-*':       MatchingPolicy.LOOSE,  // nl loose for any country
      '*-DE':       MatchingPolicy.LOOSE,  // any language loose in DE
    },
  },
});
```

Pattern specificity (lower wins): exact `en-BE` → group `en-[BE,NL]` → wildcard `en-*` / `*-BE`.

The same pattern syntax works in `resolveLocale` override keys.

The same `policy` parameter is available on `Locale.new`, `Locale.fromLocale`, and `Locale.fromIntlLocale`.

### `languages()` on a locale

`locale.languages()` returns an `ILanguages` collection of the country's official languages from the dataset, with the locale's own language added if not already present. For strict locales the language is typically already in the list; for loose locales it is appended.

```typescript
// fr-BE (strict) — fr is already in Belgium's language list
createLocale({ languageOrLocale: 'fr-BE' }).languages().toArray();
// → [French, Dutch, German, ...]

// en-BE (loose) — en is not in Belgium's list, so it is added
createLocale({ languageOrLocale: 'en', country: 'BE', policy: MatchingPolicy.LOOSE })
  .languages().toArray();
// → [French, Dutch, German, ..., English]
```

### Resolving a locale

`resolveLocale` maps a detected locale to the best match within a list of supported locales, with optional override rules and an optional matching policy for the locales it creates internally.

**Resolution order:**
1. Exact match in the supported list
2. Exact override key match (e.g. `"en-GB": "nl-BE"`)
3. Pattern override key match using `*` and `[a,b]` group syntax (e.g. `"en-*"`, `"en-[BE,NL]"`)
4. First supported locale with the same language code
5. Catch-all `"*"` override (required — guarantees a locale is always returned)

Override keys support `*` wildcards and `[a,b]` groups — the same pattern syntax as `LocalePolicy`:

```typescript
import { resolveLocale, SystemLocale, MatchingPolicy } from '@tacky-org/locale';

const resolved = resolveLocale({
  detected: SystemLocale,
  supported: ['nl-NL', 'nl-BE', 'fr-BE'],
  overrides: {
    '*-[BE,LU]': 'fr-BE',  // users from BE or LU with an unsupported language → fr-BE
    'en-*':      'nl-NL',  // all English speakers → nl-NL
    '*':         'nl-BE',  // catch-all fallback
  },
});

// Optional: pass a policy for the locales created during resolution
const resolved2 = resolveLocale({
  detected: SystemLocale,
  supported: ['nl-NL', 'en-BE'],
  overrides: { '*': 'nl-NL' },
  policy: {
    default: MatchingPolicy.STRICT,
    locales: { 'en-[BE,NL]': MatchingPolicy.LOOSE },
  },
});
```

> **Note**: entries in `supported` and `overrides` values are only validated when they are actually used as the resolution result. Invalid entries that are never matched are silently skipped.

### Locale class

```typescript
import { Locale } from '@tacky-org/locale';

const locale  = Locale.new({ language: 'en', country: 'US' });
const locale2 = Locale.fromLocale({ locale: 'en-US' });
const locale3 = Locale.fromIntlLocale({ locale: new Intl.Locale('en-US') });

// With a matching policy
const locale4 = Locale.new({ language: 'en', country: 'BE', policy: MatchingPolicy.LOOSE });
```

### Language class

```typescript
import { Language, LanguageCodeFormat } from '@tacky-org/locale';

// format defaults to LanguageCodeFormat.ALPHA2
const lang  = Language.from({ code: 'nl' });
const lang2 = Language.from({ code: 'nl',  format: LanguageCodeFormat.ALPHA2 });
const lang3 = Language.from({ code: 'nld', format: LanguageCodeFormat.ALPHA3 });

console.log(lang.name);         // "Dutch"
console.log(lang.machine_name); // "dutch"
console.log(lang.alpha2);       // "nl"
console.log(lang.alpha3);       // "nld"

// Create a locale from a language
const locale = lang.toLocale({ country: 'BE' }); // "nl-BE"
```

### Country class

```typescript
import { Country, CountryCodeFormat } from '@tacky-org/locale';

// format defaults to CountryCodeFormat.ALPHA2
const country  = Country.from({ code: 'BE' });
const country2 = Country.from({ code: 'BE',  format: CountryCodeFormat.ALPHA2 });
const country3 = Country.from({ code: 'BEL', format: CountryCodeFormat.ALPHA3 });
const country4 = Country.from({ code: '056', format: CountryCodeFormat.NUMERIC });

console.log(country.name);                // "Belgium"
console.log(country.machine_name);        // "belgium"
console.log(country.alpha2);              // "BE"
console.log(country.alpha3);              // "BEL"
console.log(country.numeric);             // "056"
console.log(country.direct_dialing_code); // "+32"

// Related data
const languages = country.languages(); // ILanguages
const borders   = country.borders();   // ICountries

// Create a locale from a country
const locale = country.toLocale({ language: 'nl' }); // "nl-BE"
```

### Countries collection

```typescript
import { Countries, CountryCodeFormat } from '@tacky-org/locale';

const benelux = Countries.benelux();
const group   = Countries.fromAlpha2({ alpha2: ['BE', 'NL', 'DE', 'FR'] });
const group2  = Countries.fromAlpha3({ alpha3: ['BEL', 'NLD'] });
const group3  = Countries.fromNumeric({ numeric: ['056', '528'] });

// Manipulation (immutable)
const without = group.removeBy(CountryCodeFormat.ALPHA2, ['DE']);
const found   = group.lookUpBy(CountryCodeFormat.ALPHA2, 'BE'); // ICountry | undefined
const arr     = group.toArray(); // ICountry[]
console.log(group.size); // 4
```

### Continent class

```typescript
import { Continent } from '@tacky-org/locale';

const europe = Continent.europe();

console.log(europe.name);         // "Europe"
console.log(europe.machine_name); // "europe"
console.log(europe.alpha2);       // "EU"

const countries = europe.countries(); // ICountries
```

Available continent factories: `africa()`, `antarctica()`, `asia()`, `europe()`, `northAmerica()`, `oceania()`, `southAmerica()`.

### React: LocaleProvider and useLocale

Wrap your app (or a subtree) in `LocaleProvider` and consume the locale with the `useLocale` hook.

```tsx
import { LocaleProvider, useLocale } from '@tacky-org/locale';

function App() {
  return (
    <LocaleProvider locale="nl-BE">
      <MyComponent />
    </LocaleProvider>
  );
}

function MyComponent() {
  const { locale, language, country } = useLocale();

  return (
    <div>
      <p>Locale: {locale.locale}</p>
      <p>Language: {language.name}</p>
      <p>Country: {country.name}</p>
    </div>
  );
}
```

`useLocale` throws if used outside a `LocaleProvider`.

## Contributing

### Building the dataset

The library ships a single pre-built dataset at `src/Datasets/dataset.json`. It is committed to the repository and must be regenerated whenever an upstream source is updated or the output schema changes.

```bash
pnpm run build-dataset
```

#### How it works

The build pipeline lives entirely in `scripts/`:

```
scripts/
├── build-dataset.ts       # build script
├── simplelocalize.io.json # source: locale + language + country data
└── restcountries.com.json # source: dialling codes, continent names
```

`build-dataset.ts` reads both source files, joins them on the ISO 3166-1 alpha-2 country code, and writes the merged result to `src/Datasets/dataset.json`.

The output schema is defined by the `DatasetEntry`, `DatasetLanguage`, and `DatasetCountry` interfaces at the top of the script. The corresponding public types (`IDatasetEntry`, `IDatasetLanguage`, `IDatasetCountry`) in `src/Types.ts` must be kept in sync with these.

#### Field selection

Each source contributes a specific set of fields:

| Field | Source |
|---|---|
| `locale` | simplelocalize.io |
| `language.name`, `language.name_local`, `language.iso_639_*` | simplelocalize.io |
| `country.name`, `country.name_local`, `country.iso_3166_1_*` | simplelocalize.io |
| `country.continent`, `country.region`, `country.capital` | simplelocalize.io |
| `country.currency_code`, `country.currency_symbol` | simplelocalize.io |
| `country.flag`, `country.timezones`, `country.borders` | simplelocalize.io |
| `country.languages[]` | simplelocalize.io |
| `country.direct_dialing_code` | restcountries.com (joined by `cca2`) |

#### Adding a new source dataset

1. Drop the raw JSON file into `scripts/`.
2. Add source types for it in the `Source types` section of `build-dataset.ts`.
3. Load and index it in the `build()` function (use a `Map` keyed by a shared identifier such as the alpha-2 country code).
4. Add a selector function (e.g. `buildSomething`) and call it from `buildCountry` or at the entry level.
5. Add the new fields to `DatasetCountry` (or `DatasetEntry`) in the script, and mirror them in `IDatasetCountry` (or `IDatasetEntry`) in `src/Types.ts`.
6. Run `pnpm run build-dataset` to regenerate `src/Datasets/dataset.json`.

## Types

| Type | Description |
|------|-------------|
| `ILocale` | Locale object with `locale`, `language_code`, `country_code`, `language()`, `languages()`, `country()`, `toIntlLocale()` |
| `ILanguage` | Language with `name`, `machine_name`, `alpha2`, `alpha3` |
| `ILanguages` | Immutable collection of `ILanguage` with `add`, `remove`, `toArray` |
| `ICountry` | Country with `name`, `machine_name`, `alpha2`, `alpha3`, `numeric`, `direct_dialing_code`, `languages()`, `borders()` |
| `ICountries` | Immutable collection of `ICountry` with `add`, `remove`, `removeBy`, `lookUpBy`, `lookUpsBy`, `toArray`, `size` |
| `IContinent` | Continent with `name`, `machine_name`, `alpha2`, `countries()` |
| `MatchingPolicy` | Enum: `STRICT`, `LOOSE` |
| `LocalePolicy` | `MatchingPolicy` or `{ default: MatchingPolicy; locales: Record<string, MatchingPolicy> }` — keys support `*` wildcards |
| `LocaleOverrides` | `{ "*": string } & Record<string, string>` — override map for `resolveLocale` |
| `LanguageCodeFormat` | Enum: `ALPHA2`, `ALPHA3` |
| `CountryCodeFormat` | Enum: `ALPHA2`, `ALPHA3`, `NUMERIC` |
