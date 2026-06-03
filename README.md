# @tacky-org/locale

A lightweight locale management library for React and TypeScript. It provides a structured way to handle locales, languages, countries, and continents using the native `Intl` API and built-in datasets from [simplelocalize.io](https://simplelocalize.io) and [restcountries.com](https://restcountries.com).

## Features

- **Type-safe domain objects**: Robust TypeScript interfaces for locales, languages, countries, and continents.
- **Normalization**: Automatically handles different locale formats (e.g., `nl_be` becomes `nl-BE`).
- **System Locale**: Easily access the current system's locale.
- **React integration**: `LocaleProvider` and `useLocale` hook for React apps.
- **Rich country data**: ISO 3166-1 codes, direct dialing codes, borders, and spoken languages.
- **Rich language data**: ISO 639-1/2/3 codes backed by the simplelocalize dataset.
- **Continent support**: Group and filter countries by continent.

## Installation

```bash
pnpm add @tacky-org/locale
```

**Peer dependencies**: React >= 19

## Usage

### Getting the System Locale

```typescript
import { SystemLocale } from '@tacky-org/locale';

console.log(SystemLocale.locale);        // e.g., "en-US"
console.log(SystemLocale.language_code); // "en"
console.log(SystemLocale.country_code);  // "US"

const language = SystemLocale.language(); // ILanguage
const country  = SystemLocale.country();  // ICountry
const intl     = SystemLocale.toIntlLocale(); // Intl.Locale
```

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
import { Language } from '@tacky-org/locale';

const lang = Language.fromIso6391({ iso_639_1: 'nl' });
const lang2 = Language.fromIso6392({ iso_639_2: 'nld' });
const lang3 = Language.fromIso6393({ iso_639_3: 'nld' });

console.log(lang.name);         // "Dutch"
console.log(lang.machine_name); // "dutch"
console.log(lang.iso_639_1);    // "nl"

// Create a locale from a language
const locale = lang.toLocale({ country: 'BE' });
```

### Country class

```typescript
import { Country } from '@tacky-org/locale';

const country = Country.fromIso31661Alpha2({ alpha2: 'BE' });
const country2 = Country.fromIso31661Alpha3({ alpha3: 'BEL' });
const country3 = Country.fromIso31661Numeric({ numeric: '056' });

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
const locale = country.toLocale({ language: 'nl' });
```

### Countries collection

```typescript
import { Countries, CountryLookUp } from '@tacky-org/locale';

// Create from arrays
const benelux = Countries.benelux();
const eu = Countries.fromAlpha2({ alpha2: ['BE', 'NL', 'DE', 'FR'] });

// Manipulation (immutable)
const without = eu.removeBy(CountryLookUp.ALPHA2, ['DE']);
const found   = eu.lookUpBy(CountryLookUp.ALPHA2, 'BE'); // ICountry | undefined
const arr     = eu.toArray(); // ICountry[]
```

### Continent class

```typescript
import { Continent } from '@tacky-org/locale';

const europe = Continent.europe();
const asia   = Continent.asia();

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
| `ILanguage` | Language with `name`, `machine_name`, `iso_639_1`, `iso_639_2`, `iso_639_3` |
| `ILanguages` | Immutable collection of `ILanguage` with `add`, `remove`, `toArray` |
| `ICountry` | Country with ISO codes, `direct_dialing_code`, `languages()`, `borders()` |
| `ICountries` | Immutable collection of `ICountry` with lookup, add, remove methods |
| `IContinent` | Continent with `name`, `machine_name`, `alpha2`, `countries()` |
| `CountryLookUp` | Enum: `ALPHA2`, `ALPHA3`, `NUMERIC` |
