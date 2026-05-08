'use strict';

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/Utils/normalizeLocale.ts
function normalizeLocale(value) {
  const { locale } = value;
  const cleaned = locale.trim().replace("_", "-");
  const [language, region] = cleaned.split("-");
  if (!language) {
    throw new Error(`Invalid locale: ${locale}`);
  }
  if (!region) {
    return language.toLowerCase();
  }
  return `${language.toLowerCase()}-${region.toUpperCase()}`;
}
__name(normalizeLocale, "normalizeLocale");

// src/Domain/Locale.ts
var _Locale = class _Locale {
  constructor(languageOrLocale, region) {
    const locale = normalizeLocale({
      locale: languageOrLocale + (region ? "-" + region : "")
    });
    try {
      const intlLocale = new Intl.Locale(locale);
      this.locale = locale;
      this.language = intlLocale.language;
      this.region = intlLocale.region;
    } catch (e) {
      throw new Error("Invalid ILocale", { cause: e });
    }
  }
  static new(value) {
    const { languageOrLocale, region } = value;
    return new _Locale(languageOrLocale, region);
  }
};
__name(_Locale, "Locale");
var Locale = _Locale;

// src/Utils/createLocale.ts
function createLocale(value) {
  return Locale.new(value);
}
__name(createLocale, "createLocale");

// src/Domain/SystemLocale.ts
var SystemLocale = createLocale({
  languageOrLocale: Intl.DateTimeFormat().resolvedOptions().locale
});

exports.SystemLocale = SystemLocale;
exports.createLocale = createLocale;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map