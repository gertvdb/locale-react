export * from "./Types";

/**
 * Singleton instance representing the current system's locale.
 */
export { SystemLocale } from "./Domain/SystemLocale";

/**
 * Creates a new locale object.
 * @param value Object containing languageOrLocale and optional region.
 */
export { createLocale } from "./Utils/createLocale";
