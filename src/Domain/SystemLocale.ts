import type { ILocale } from "@/Types";
import { createLocale } from "@/Utils/createLocale";

export const SystemLocale: ILocale = createLocale({
  languageOrLocale: Intl.DateTimeFormat().resolvedOptions().locale,
});
