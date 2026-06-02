import type { ILocale } from "@/Types";
import { createContext } from "react";

export const LocaleContext = createContext<ILocale | undefined>(undefined);
