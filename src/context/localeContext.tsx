import { ReactNode } from 'react';
import { getUserLocale } from '@/utils/helpers/getUserLocale';
import { LocaleContext } from './LocaleContext';

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const locale = getUserLocale();
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
};
