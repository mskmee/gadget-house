import { createContext, useContext, ReactNode } from 'react';
import { getUserLocale } from '@/utils/helpers/getUserLocale';

const LocaleContext = createContext<string>('en-US');

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const locale = getUserLocale();
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
};

export const useLocale = () => useContext(LocaleContext);
