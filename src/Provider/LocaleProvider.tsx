import { LocaleContext } from "@/Context/LocaleContext";
import { PropsWithChildren, useMemo } from "react";
import { Locale } from "@/Domain/Locale";

export interface LocaleProviderProps extends PropsWithChildren {
  locale: string;
}

export const LocaleProvider = (props: LocaleProviderProps) => {
  const { locale, children } = props;

  const localeValue = useMemo(() => Locale.fromLocale({ locale }), [locale]);
  return (
    <LocaleContext.Provider value={localeValue}>
      {children}
    </LocaleContext.Provider>
  );
};
