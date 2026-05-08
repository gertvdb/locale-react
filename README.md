# @gertvdb/locale

A lightweight locale management library for React and TypeScript. It provides a structured way to handle locale strings, languages, and regions using the native `Intl` API.

## Features

- **Type-safe Locales**: Robust TypeScript interfaces for locales, languages, and regions.
- **Normalization**: Automatically handles different locale formats (e.g., `nl_be` becomes `nl-BE`).
- **System Locale**: Easily access the current system's locale.
- **Validation**: Uses `Intl.Locale` to ensure locale strings are valid.

## Installation

```bash
pnpm add @gertvdb/locale
```

## Usage

### Getting the System Locale

```typescript
import { SystemLocale } from '@gertvdb/locale';

console.log(SystemLocale.locale);   // e.g., "en-US"
console.log(SystemLocale.language); // "en"
console.log(SystemLocale.region);   // "US"
```

### Creating a Custom Locale

```typescript
import { createLocale } from '@gertvdb/locale';

const locale = createLocale({ languageOrLocale: 'nl-be' });
// or
const locale2 = createLocale({ languageOrLocale: 'nl', region: 'BE' });

console.log(locale.locale);   // "nl-BE"
console.log(locale.language); // "nl"
console.log(locale.region);   // "BE"
```

### Types

The library provides several useful types:

- `ILocale`: Interface representing a locale object.
- `ILocaleString`: Type for locale strings (e.g., `en-US`).
- `ILanguageString`: Type for ISO 639-1 language codes.
- `IRegionString`: Type for ISO 3166-1 alpha-2 region codes.
