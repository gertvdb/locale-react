# Tacky Locale

A lightweight locale management library for React and TypeScript. It provides a structured way to handle locales, languages, countries, and continents integrating with the native `Intl` API and built-in datasets from [simplelocalize.io](https://simplelocalize.io) and [restcountries.com](https://restcountries.com).

## Features

- **Type-safe domain objects**: Robust TypeScript interfaces for locales, languages, countries, and continents.
- **Normalization**: Automatically handles different locale formats (e.g., `nl_be` becomes `nl-BE`).
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

### Locale singletons

`SystemLocale` reflects the OS/runtime locale (used for date and number formatting). `BrowserLocale` reflects the user's preferred browser language (`navigator.language`). These can differ — e.g. an English OS with the browser set to Dutch.

```typescript
import { SystemLocale, BrowserLocale } from '@tacky-org/locale';

console.log(SystemLocale.locale);        // e.g., "en-US"
console.log(SystemLocale.language_code); // "en"
console.log(SystemLocale.country_code);  // "US"

console.log(BrowserLocale.locale);        // e.g., "nl-BE"
console.log(BrowserLocale.language_code); // "nl"
console.log(BrowserLocale.country_code);  // "BE"
```

Both expose the same `ILocale` interface: `language()`, `country()`, `toIntlLocale()`.

> **Note**: `BrowserLocale` requires a browser environment (`navigator` must be defined).

### Creating a Custom Locale

```typescript
import { createLocale } from '@tacky-org/locale';

// From a locale string
const locale = createLocale({ languageOrLocale: 'nl-BE' });

// From language + country separately
const locale2 = createLocale({ languageOrLocale: 'nl', country: 'BE' });

console.log(locale.locale);        // "nl-BE"
console.log(locale.language_code); // "nl"
console.log(locale.country_code);  // "BE"
```

### Locale class

```typescript
import { Locale } from '@tacky-org/locale';

const locale = Locale.new({ language: 'en', country: 'US' });
const locale2 = Locale.fromLocale({ locale: 'en-US' });
const locale3 = Locale.fromIntlLocale({ locale: new Intl.Locale('en-US') });
```

### Language class

```typescript
import { Language, LanguageCodeFormat } from '@tacky-org/locale';

// format defaults to LanguageCodeFormat.ALPHA2
const lang  = Language.from({ code: 'nl' });
const lang2 = Language.from({ code: 'nl', format: LanguageCodeFormat.ALPHA2 });
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

// Create from arrays
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

## Types

| Type | Description |
|------|-------------|
| `ILocale` | Locale object with `locale`, `language_code`, `country_code`, `language()`, `country()`, `toIntlLocale()` |
| `ILanguage` | Language with `name`, `machine_name`, `alpha2`, `alpha3` |
| `ILanguages` | Immutable collection of `ILanguage` with `add`, `remove`, `toArray` |
| `ICountry` | Country with `alpha2`, `alpha3`, `numeric`, `direct_dialing_code`, `languages()`, `borders()` |
| `ICountries` | Immutable collection of `ICountry` with `add`, `remove`, `removeBy`, `lookUpBy`, `lookUpsBy`, `toArray` |
| `IContinent` | Continent with `name`, `machine_name`, `alpha2`, `countries()` |
| `LanguageCodeFormat` | Enum: `ALPHA2`, `ALPHA3` |
| `CountryCodeFormat` | Enum: `ALPHA2`, `ALPHA3`, `NUMERIC` |
